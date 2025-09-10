import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateItemDto } from '../dto/create-item.dto';
import { UpdateItemDto } from '../dto/update-item.dto';
import { Item } from '../schemas/item.schema';

@Injectable()
export class ItemsService {

  constructor(@InjectModel(Item.name) private itemModel: Model<Item>) {}

  create(createItemDto: CreateItemDto) {
    const createdItem = new this.itemModel(createItemDto);
    return createdItem.save();
  }

  findAll() {
    return this.itemModel.find().exec();
  }

  findAllValid() {
    return this.itemModel.find({ isValid: true }).exec();
  }

  findOne(id: string) {
    return this.itemModel.findById(id).exec();
  }

  update(id: string, updateItemDto: UpdateItemDto) {
    return this.itemModel.findByIdAndUpdate(id, updateItemDto).exec();
  }

  remove(id: string) {
    return this.itemModel.findByIdAndDelete(id).exec();
  }
}
