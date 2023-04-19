import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFileDto } from './dto/create-file.dto';

@Injectable()
export class FileService {

    constructor(private prisma: PrismaService) { }

    async createOrUpdate(createFileDto: CreateFileDto) {

        const fileDatas = await this.prisma.file_data.findMany({
            where: {
                cpf: createFileDto.cpf,
                date: createFileDto.date,
            },
        });
      
        if (fileDatas.length > 0) {
            const existingRecord = fileDatas[0];
      
            const updatedRecord = await this.prisma.file_data.update({
                where: {
                    id: existingRecord.id,
                },
                data: {
                    balance: createFileDto.balance,
                    deletedAt: new Date(),
                },
            });
      
            return updatedRecord;
        } else {
            const newRecord = await this.prisma.file_data.create({
                data: {
                    cpf: createFileDto.cpf,
                    balance: createFileDto.balance,
                    date: createFileDto.date,
                },
            });
      
            return newRecord;
        }
    }

    async getBalanceSumByCpf() {
        const sum = await this.prisma.file_data.groupBy({
            by: ["cpf"],
            _sum: { balance: true }
        });

        return sum.map((value) => ({
            sum: value._sum.balance,
            cpf: value.cpf,
            
        }));

    }

}
