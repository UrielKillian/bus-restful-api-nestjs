import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripsModule } from './trips/trips.module';
import { DepartmentsModule } from './departments/departments.module';
import { PassengersModule } from './passengers/passengers.module';
import { SeatsModule } from './seats/seats.module';
import { TicketsModule } from './tickets/tickets.module';

@Module({
  imports: [
    // Configuration Module
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: '.env',
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),
    TripsModule,
    DepartmentsModule,
    PassengersModule,
    SeatsModule,
    TicketsModule,
    //
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
