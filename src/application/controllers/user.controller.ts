import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { UserService } from '../../domain/users/user.service';
import { ApiTags } from '@nestjs/swagger';
import { UserUpdateRequest } from '../dto/users/users.request';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UserUpdateRequest) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
