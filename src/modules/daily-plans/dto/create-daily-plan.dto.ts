import { IsDate, IsEnum, IsOptional, IsString } from "class-validator";

export enum dayOfWeek {
    SABADO = 0,
    LUNES = 1,
    MARTES = 2,
    MIERCOLES = 3,
    JUEVES = 4,
    VIERNES = 5,
    DOMINGO = 6
}

export class CreateDailyPlanDto {

    @IsEnum(dayOfWeek)
    day: dayOfWeek;

    @IsDate()
    startTime: string;

    @IsDate()
    endTime: string;

    @IsOptional()
    @IsString()
    timezone: string;
  userId: any;
}
