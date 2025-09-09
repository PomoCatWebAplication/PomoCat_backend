import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type DailyPlanDocument = HydratedDocument<DailyPlan>;

@Schema()
export class DailyPlan {
    @Prop({ required: true })
    day: number;

    @Prop({ required: true, match: /^([01]\d|2[0-3]):[0-5]\d$/ })
    startTime: string;

    @Prop({ required: true, match: /^([01]\d|2[0-3]):[0-5]\d$/ })
    endTime: string;

    @Prop({ default: 'America/Bogota' })
    timezone?: string;

    @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
    userId: string;

    @Prop({ required: true, type: Types.ObjectId, ref: 'Task' })
    taskId: string;
}

export const DailyPlanSchema = SchemaFactory.createForClass(DailyPlan);