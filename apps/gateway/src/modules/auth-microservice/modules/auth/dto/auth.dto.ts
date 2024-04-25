import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty({ description: 'User login', nullable: false })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ description: 'User password', nullable: false })
  @IsNotEmpty()
  @IsString()
  password: string;
}
