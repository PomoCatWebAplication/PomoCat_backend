import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ItemType, quality } from "../dto/create-item.dto";
import { HydratedDocument, Types } from "mongoose";

export type itemDocument = HydratedDocument<Item>;

@Schema({ timestamps: true })
export class Item {

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    sprite_path: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true, enum: ItemType, default: ItemType.HAT })
    type: ItemType;

    @Prop({ required: true, enum: quality, default: quality.COMMON })
    itemQuality: quality;

    @Prop({ required: true, default: true })
    isValid: boolean;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
