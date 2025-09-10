import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateInventoryDto } from 'src/modules/inventory/dto/create-inventory.dto';
import { InventoryService } from 'src/modules/inventory/services/inventory.service';



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
