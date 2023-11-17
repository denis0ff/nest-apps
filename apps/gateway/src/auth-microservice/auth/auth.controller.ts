import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JoiValidationPipe, LocalAuthGuard } from '@app/common';
import { CreateUserSchema } from './schemas/create-user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('createUser')
  @HttpCode(HttpStatus.CREATED)
  public async createUser(
    @Body(new JoiValidationPipe(CreateUserSchema))
    createUserDto: CreateUserDto,
  ) {
    const createdUser = await this.authService.createUser(createUserDto);

    return createdUser;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Req() req: Request) {
    const { access_token } = await this.authService.login(req.body);

    req.res.cookie('access_token', access_token, { httpOnly: true });

    return access_token;
  }
}
