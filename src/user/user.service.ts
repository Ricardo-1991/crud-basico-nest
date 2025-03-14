import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService){}
  async create(createUserDto: CreateUserDto) {
     const { email } = createUserDto

    const foundUser = await this.prisma.user.findUnique({
      where: { email },
    })

    if (foundUser) {
      throw new ConflictException(`User with email ${email} already exists`);
    }

    const newUser = await this.prisma.user.create({
      data: createUserDto,
    });
    return newUser;
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { zipCode, country, city, neighborhood } = updateUserDto;
    const foundUser = await this.prisma.user.findUnique({
      where: { id },
    })
    if (!foundUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return this.prisma.user.update({
      where: { id },
      data: { zipCode, country, city, neighborhood },
    })
  }

  async remove(id: number) {
    const foundUser = await this.prisma.user.findUnique({
      where: { id },
    })
    if (!foundUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return this.prisma.user.delete({
      where: { id },
    })
  }
}
