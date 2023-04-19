import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcrypt";
import { error } from 'console';
@Injectable()
export class UserService {
  
  constructor(private prisma: PrismaService){}
 
  async create(createUserDto: CreateUserDto) {

  const data = {
    ...createUserDto,
    password: await bcrypt.hash(createUserDto.password, 10),
  };

    const createdUser = await this.prisma.user.create({
      data
    });

    return {
      ...createdUser,
      password:undefined,      
    };
  }

  findEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {email},
    });
    }

   async changePassword(email: string, password:string){
    const checkEmail = await this.findEmail(email);
    const encrypted = await bcrypt.hash(password, 10);

    if(checkEmail){
     return this.prisma.user.update({
        where:{email},
        data: {email, password: encrypted}
      })
    }else {
      throw new NotFoundException('Usuário não encontrado');
    }
   }
  }


