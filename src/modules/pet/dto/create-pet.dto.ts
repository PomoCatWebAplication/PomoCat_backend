import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';


export class CreatePetDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsMongoId()
    hat: string;

    @IsMongoId()
    shirt: string;

    @IsMongoId()
    accesory: string;

    @IsMongoId()
    skin: string;

    @IsMongoId()
    background: string;

}



