import { Controller, Get } from '@nestjs/common';

@Controller('activity')
export class ActivityController {
  @Get()
  getActivity() {
    return 'This action returns all activities';
  }

  @Get(':id')
  getActivityById() {
    return 'This action returns activity by id';
  }
}
