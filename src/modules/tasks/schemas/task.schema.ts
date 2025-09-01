import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { TaskState } from "../dto/create-task.dto";

@Schema({timestamps: true})
export class Task {

    @Prop({ required: true })
    title: string;

    @Prop()
    description: string;

    @Prop()
    dueDate: Date;

    @Prop({ enum: TaskState, default: TaskState.TODO })
    state: TaskState;

    @Prop({required: true})
    userId: string;

}

export const TaskSchema = SchemaFactory.createForClass(Task);
