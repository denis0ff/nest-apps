import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JoiValidationPipe } from '@app/common';
import { CreateUserSchema } from './schemas/create-user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { Request, Response } from 'express';
import { LocalAuthGuard } from '../../guards/local.guard';

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
  public async login(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token } = await this.authService.login(req.body);

    res.cookie('access_token', access_token, { httpOnly: true });

    return access_token;
  }
}
