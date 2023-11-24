import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto';
import mapStatusHTTP from 'src/helpers/mapStatusHTTP';
import { Response } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(@Res() res: Response) {
    const { status, data } = await this.userService.findAll();
    return res.status(mapStatusHTTP(status)).json(data);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const { status, data } = await this.userService.findOne(+id);
    return res.status(mapStatusHTTP(status)).json(data);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    const { status, data } = await this.userService.update(+id, updateUserDto);
    return res.status(mapStatusHTTP(status)).json(data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const { status, data } = await this.userService.remove(+id);
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
