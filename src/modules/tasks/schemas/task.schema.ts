import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { TaskState } from "../dto/create-task.dto";
import { Types } from "mongoose";

@Schema({timestamps: true})
export class Task {

    @Prop({ required: true })
    title: string;

    @Prop()
    description: string;

    @Prop({ enum: TaskState, default: TaskState.PENDING })
    state: TaskState;

    @Prop({type: Types.ObjectId, ref: 'User', required: true})
    userId: string;

}

export const TaskSchema = SchemaFactory.createForClass(Task);
