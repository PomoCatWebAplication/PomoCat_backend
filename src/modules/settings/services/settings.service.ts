import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSettingDto } from '../dto/create-setting.dto';
import { UpdateSettingDto } from '../dto/update-setting.dto';
import { Settings } from '../schemas/settings.schema';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Settings.name) private settingsModel: Model<Settings>,
  ) {}

  async create(createSettingDto: CreateSettingDto, userId: string) {
    const created = new this.settingsModel({ ...createSettingDto, userId });
    await created.save();
    return this.settingsModel.findById(created._id).exec();
  }

  findAllSettings() {
    return this.settingsModel.find().exec();
  }

  findAll(userId: string) {
    return this.settingsModel.find({ userId }).exec();
  }

  findOne(id: string) {
    return this.settingsModel.findOne({ _id: id }).exec();
  }

  update(id: string, updateSettingDto: UpdateSettingDto) {
    return this.settingsModel
      .findOneAndUpdate({ _id: id }, updateSettingDto, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.settingsModel.findOneAndDelete({ _id: id }).exec();
  }
}
