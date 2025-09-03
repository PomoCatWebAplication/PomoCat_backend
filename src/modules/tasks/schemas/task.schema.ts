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

    @Prop()
    notifyLocalTime?: string; // hora en la que avisar

    @Prop()
    dailyMinutes?: number;    // minutos planificados en el día

    @Prop()
    timezone?: string;        // se tiene en cuenta la timezone para poder realizar la contabilidad de las horas


}

export const TaskSchema = SchemaFactory.createForClass(Task);
