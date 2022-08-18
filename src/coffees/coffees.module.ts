import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CoffeesController } from 'src/coffees/coffees.controller';
import { CoffeesService } from 'src/coffees/coffees.service';
import { Coffee } from '../entities/coffee.entity';
import { Flavor } from '../entities/flavor.entity';
import { Event } from '../entities/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event]), ConfigModule],
  controllers: [CoffeesController],
  providers: [CoffeesService],
  exports: [CoffeesService],
})
export class CoffeesModule {}
