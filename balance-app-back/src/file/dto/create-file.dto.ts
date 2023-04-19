import { IsDate, IsNumber, IsOptional, IsString, Length } from "class-validator";
import { File } from "../entities/file.entity";
import { Type } from "class-transformer";

export class CreateFileDto extends File{

    @IsString()
    @Length(11,11)
    cpf: string;

    @IsNumber()
    balance: number;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    date?: Date;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    deletedAt?: Date;
}

