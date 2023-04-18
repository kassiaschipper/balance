import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";
import { File } from "../entities/file.entity";
import { MaxLength } from "class-validator";
import { Type } from "class-transformer";

export class CreateFileDto extends File{

    @IsString()
    @MaxLength(11)
    cpf: string;

    @IsNumber()
    balance: number;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    sate?: Date;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    deletedAt?: Date;
}

