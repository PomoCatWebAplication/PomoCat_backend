import { IsEnum, IsNotEmpty, IsOptional} from 'class-validator';

export enum TaskState {
    COMPLETED="COMPLETED",
    PENDING="PENDING",
}

export class CreateTaskDto {

    @IsNotEmpty()
    title: string;

    @IsOptional()
    description: string;

    @IsOptional()
    @IsEnum(TaskState)
    state: TaskState;

}
