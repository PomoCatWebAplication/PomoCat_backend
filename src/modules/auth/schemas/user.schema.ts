import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
}

@Schema()
export class User {

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, enum: UserRole })
    role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
