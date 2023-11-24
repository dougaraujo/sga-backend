import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto';
import { Response } from 'express';
import mapStatusHTTP from 'src/helpers/mapStatusHTTP';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('signup')
  async singUp(@Body() dto: CreateUserDto, @Res() res: Response) {
    const serviceResponse = (await this.userService.create(dto)) as any;
    console.log(serviceResponse);

    return res.status(201).json(serviceResponse);
  }

  @Post('signin')
  async signIn(@Body() dto: CreateUserDto, @Res() res: Response) {
    const { status, data } = await this.authService.signIn(
      dto.email,
      dto.password,
    );

    return res.status(mapStatusHTTP(status)).json(data);
  }
}
