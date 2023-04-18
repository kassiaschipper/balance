import { Body, Controller, Get, Post } from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';

@Controller('home')
export class FileController {
    constructor(private readonly fileService: FileService){}

    @Post()
    create(@Body() createFileDto:CreateFileDto){
        return this.fileService.create(createFileDto);
    }

    @Get()
    getTotal(){
        return this.fileService.getBalanceSumByCpf();
    }
}
