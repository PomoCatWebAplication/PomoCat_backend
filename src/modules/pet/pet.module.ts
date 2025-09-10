import { Module } from '@nestjs/common';
import { PetService } from './services/pet.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PetSchema } from './schemas/pet.schema';
import { PetController } from './controllers/pet.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Pet', schema: PetSchema }]),
  ],
  controllers: [PetController],
  providers: [PetService],
})
export class PetModule {}
