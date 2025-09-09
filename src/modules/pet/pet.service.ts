import { Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { petDocument } from './schemas/pet.schema';
import { Pet } from './schemas/pet.schema';

@Injectable()
export class PetService {

  constructor(@InjectModel(Pet.name) private petModel: Model<petDocument>) {}

  create(createPetDto: CreatePetDto, userId: string) {
    const newPet = new this.petModel({ ...createPetDto, userId });
    return newPet.save();
  }

  findAll() {
    return this.petModel.find().exec();
  }

  findOne(id: string) {
    return this.petModel.findById(id).exec();
  }

  update(id: string, updatePetDto: UpdatePetDto) {
    return this.petModel.findByIdAndUpdate(id, updatePetDto).exec();
  }

  remove(id: string) {
    return this.petModel.findByIdAndDelete(id).exec();
  }
}
