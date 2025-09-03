import { Module } from '@nestjs/common';
import { ShopController } from './shop.controller';
import { InventoryService } from '../inventory/inventory.service';
import { MongooseModule } from '@nestjs/mongoose';
import { InventorySchema } from '../inventory/schemas/inventory.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Inventory', schema: InventorySchema }]),
  ],
  controllers: [ShopController],
  providers: [InventoryService],
})
export class ShopModule {}
