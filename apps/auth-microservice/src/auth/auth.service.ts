import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  public async createUser(createUserDto: CreateUserDto) {
    const registratedUser = await this.userService.create(createUserDto);

    return registratedUser;
  }

  public async loginUser(payload: Express.User) {
    const access_token = await this.jwtService.signAsync(payload);

    return { access_token };
  }

  public async validateUser(username: string, password: string) {
    const user = await this.userService.readByUsername(username);

    if (user && password !== user.password) {
      throw new BadRequestException('Invalid credentials');
    }

    return { id: user.id, username: user.username };
  }
}
