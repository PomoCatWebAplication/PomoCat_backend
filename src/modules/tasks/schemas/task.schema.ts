import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { TaskState } from "../dto/create-task.dto";
import { Types } from "mongoose";

@Schema({timestamps: true})
export class Task extends Document {

    @Prop({ required: true })
    title: string;

    @Prop()
    description: string;

    @Prop({ enum: TaskState, default: TaskState.PENDING })
    state: TaskState;

    @Prop({type: Types.ObjectId, ref: 'User', required: true})
    userId: string;

    @Prop()
    notifyLocalTime?: string; // hora en la que avisar

    @Prop()
    dailyMinutes?: number;    // minutos planificados en el día

    @Prop()
    timezone?: string;        // se tiene en cuenta la timezone para poder realizar la contabilidad de las horas

    @Prop({ type: Date, required: false })
    dueDate?: Date;           // fecha límite para completar la tarea

}

export const TaskSchema = SchemaFactory.createForClass(Task);
