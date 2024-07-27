import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { expenses } from './helper/expenses';
import { gains } from './helper/gains';

@Controller('react-wallet')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('expenses')
  async expenses(): Promise<any> {
    return expenses;
  }

  @Get('gains')
  async gains(): Promise<any> {
    return gains;
  }

  @Get('/all')
  async all(): Promise<any> {
    return [...gains, ...expenses];
  }
}
