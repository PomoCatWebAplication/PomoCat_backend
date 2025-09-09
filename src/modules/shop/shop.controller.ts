import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InventoryService } from '../inventory/inventory.service';
import { CreateInventoryDto } from '../inventory/dto/create-inventory.dto';


@Controller('shop')
export class ShopController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post('purchase')
  purchaseItem(@Body() dto: CreateInventoryDto) {
    return this.inventoryService.create(dto);
  }

  @Get('items')
  findAllItems() {
    return this.inventoryService.findAll();
  }

  @Get('items/:id')
  findOneItem(@Param('id') id: string) {
    return this.inventoryService.findOne(id);
  }

}
