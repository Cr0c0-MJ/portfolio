import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { PrismaModule } from './prisma/prisma.module';
import { HealthModule } from './health/health.module';
import { ContactModule } from './contact/contact.module';
import { GuestbookModule } from './guestbook/guestbook.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrometheusModule.register({
      path: '/metrics',
      defaultMetrics: { enabled: true },
    }),
    PrismaModule,
    HealthModule,
    ContactModule,
    GuestbookModule,
  ],
})
export class AppModule {}
