import { Injectable } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inventory, InventoryDocument } from './schemas/inventory.schema';

@Injectable()
export class InventoryService {

  constructor(@InjectModel(Inventory.name) private inventoryModel: Model<InventoryDocument>) {}

  create(createInventoryDto: CreateInventoryDto) {
    const inventory = new this.inventoryModel(createInventoryDto);
    return inventory.save();
  }

  findAll() {
    return this.inventoryModel.find().exec();
  }

  findOne(id: string) {
    return this.inventoryModel.findById(id).exec();
  }

  update(id: string, updateInventoryDto: UpdateInventoryDto) {
    return this.inventoryModel.findByIdAndUpdate(id, updateInventoryDto).exec();
  }

  remove(id: string) {
    return this.inventoryModel.findByIdAndDelete(id).exec();
  }
}
