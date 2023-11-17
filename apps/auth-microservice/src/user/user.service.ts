import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async readAll() {
    const users = await this.userRepository.readAll();

    return users;
  }

  async readById(id: string) {
    const user = await this.userRepository.readById(id);

    return user;
  }

  async readByUsername(username: string) {
    const user = await this.userRepository.readByUsername(username);

    return user;
  }

  async create(user: CreateUserDto) {
    const existingUser = await this.userRepository.readByUsername(
      user.username,
    );

    if (existingUser) {
      throw new BadRequestException('Such username currently is exist');
    }

    const createdUser = await this.userRepository.create(user);

    return createdUser;
  }

  async deleteById(id: string) {
    const existingUser = await this.userRepository.readById(id);

    if (!existingUser) {
      throw new BadRequestException('User with such id is not exist');
    }

    await this.userRepository.deleteById(id);
  }
}
