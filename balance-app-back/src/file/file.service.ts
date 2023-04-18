import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFileDto } from './dto/create-file.dto';

@Injectable()
export class FileService {

    constructor(private prisma: PrismaService) { }

    async create(createFileDto: CreateFileDto) {

        const data = {
            ...createFileDto,
        };
        const createFile = await this.prisma.file_data.create({ data });
        
        return {
            createFile
        }
    }

    async getBalanceSumByCpf(){
        const sum = await this.prisma.file_data.groupBy({
            by: ["cpf", "sate"],
            _sum:{balance:true}
        });
        
        return sum;   

    }
}
