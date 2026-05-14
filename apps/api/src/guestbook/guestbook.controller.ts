import { Body, Controller, Get, Post } from '@nestjs/common';
import { GuestbookService } from './guestbook.service';
import { CreateEntryDto } from './dto/create-entry.dto';

@Controller('guestbook')
export class GuestbookController {
  constructor(private readonly guestbook: GuestbookService) {}

  @Get()
  list() {
    return this.guestbook.list();
  }

  @Post()
  create(@Body() dto: CreateEntryDto) {
    return this.guestbook.create(dto);
  }
}
