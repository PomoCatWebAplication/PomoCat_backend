import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Post(':user/:userId')
  create(@Body() createSettingDto: CreateSettingDto, @Param('userId') userId: string) {
    return this.settingsService.create(createSettingDto, userId);
  }

  @Get()
  findAllSettings() {
    return this.settingsService.findAllSettings();
  }

  @Get('user/:userId')
  findAll(@Param('userId') userId: string) {
    return this.settingsService.findAll(userId);
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.settingsService.findOne(id);
  }

  @Patch('id/:id')
  update(@Param('id') id: string, @Body() updateSettingDto: UpdateSettingDto) {
    return this.settingsService.update(id, updateSettingDto);
  }

  @Delete('id/:id')
  remove(@Param('id') id: string) {
    return this.settingsService.remove(id);
  }
}
