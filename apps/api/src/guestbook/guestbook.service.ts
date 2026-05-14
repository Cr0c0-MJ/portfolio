import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEntryDto } from './dto/create-entry.dto';

@Injectable()
export class GuestbookService {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.guestbookEntry.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
  }

  create(data: CreateEntryDto) {
    return this.prisma.guestbookEntry.create({ data });
  }
}
