import { Module } from '@nestjs/common';
import { InventoryService } from '../inventory/services/inventory.service';
import { MongooseModule } from '@nestjs/mongoose';
import { InventorySchema } from '../inventory/schemas/inventory.schema';
import { ShopController } from './controllers/shop.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Inventory', schema: InventorySchema }]),
  ],
  controllers: [ShopController],
  providers: [InventoryService],
})
export class ShopModule {}
