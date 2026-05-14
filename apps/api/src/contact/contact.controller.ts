import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contact: ContactService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() dto: CreateContactDto) {
    const saved = await this.contact.create(dto);
    return { id: saved.id, createdAt: saved.createdAt };
  }
}
