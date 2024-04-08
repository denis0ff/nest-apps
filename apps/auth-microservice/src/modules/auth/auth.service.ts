import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from './auth.repository';
import { JwtTokensService } from './jwt.tokens.service';
import { PrismaService } from '@app/common/prisma/prisma.service';
import { bcryptSalt } from '@app/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly repository: AuthRepository,
    private readonly jwtTokenService: JwtTokensService,
    private readonly prisma: PrismaService,
  ) {}

  public async register(dto: AuthDto) {
    const findUser = await this.repository.findUser(dto);

    if (findUser) {
      throw new BadRequestException('User with such login is already exist');
    }

    const hashedPassword = await this.hashData(dto.password);

    const newUser = await this.repository.createNewUser(dto, hashedPassword);

    const tokens = await this.jwtTokenService.signTokens(
      newUser.id,
      newUser.username,
    );

    await this.jwtTokenService.updateRefreshTokenHash(newUser.id, tokens.refreshToken);

    return tokens;
  }

  public async login(dto: AuthDto) {
    const user = await this.repository.findUser(dto);

    if (!user) {
      throw new NotFoundException('Such user are not exist');
    }

    const passwordMatches = await bcrypt.compare(dto.password, user.password);

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid password credential');
    }

    const tokens = await this.jwtTokenService.signTokens(
      user.id,
      user.username,
    );

    await this.jwtTokenService.updateRefreshTokenHash(user.id, tokens.refreshToken);

    return tokens;
  }

  public async validateUser(username: string) {
    const user = await this.repository.findGoogleUser(username);

    if (!user) {
      await this.prisma.users.create({
        data: { username, password: '' },
      });
    }

    const tokens = await this.jwtTokenService.signTokens(
      user.id,
      user.username,
    );

    await this.jwtTokenService.updateRefreshTokenHash(user.id, tokens.refreshToken);

    return tokens;
  }

  public async logout(userId: number): Promise<void> {
    await this.repository.logout(userId);
  }

  public async hashData(data: string): Promise<string> {
    return await bcrypt.hash(data, bcryptSalt);
  }
}
