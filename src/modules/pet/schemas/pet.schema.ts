import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export const defaultSkinPath = "../../../../public/sprites/pets/skin1.png";
export const defaultBackgroundPath = "../../../../public/sprites/backgrounds/bg1.png";

export type petDocument = HydratedDocument<Pet>;

@Schema({ timestamps: true })
export class Pet {
    @Prop({ required: true })
    name: string;

    @Prop({ optional: true, type: Types.ObjectId, ref: 'Hat' })
    hat: string;

    @Prop({ optional: true, type: Types.ObjectId, ref: 'Shirt' })
    shirt: string;

    @Prop({ optional: true, type: Types.ObjectId, ref: 'Accesory' })
    accesory: string;

    @Prop({ default: defaultSkinPath, required: true, type: Types.ObjectId, ref: 'Skin' })   
    skin: string;

    @Prop({ default: defaultBackgroundPath, required: true, type: Types.ObjectId, ref: 'Background' })
    background: string;

    @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
    userId: string;
}

export const PetSchema = SchemaFactory.createForClass(Pet);
