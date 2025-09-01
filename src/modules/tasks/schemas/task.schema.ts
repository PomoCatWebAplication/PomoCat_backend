import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { TaskState } from "../dto/create-task.dto";

export class Task {

    @Prop({ required: true })
    title: string;

    @Prop()
    description: string;

    @Prop()
    dueDate: Date;

    @Prop({ enum: TaskState, default: TaskState.TODO })
    state: TaskState;

    @Prop()
    userId: string;

}

export const TaskSchema = SchemaFactory.createForClass(Task);
