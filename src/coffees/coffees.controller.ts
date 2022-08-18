import { ParseIntPipe } from './../common/pipes/parse-int.pipe';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CoffeesService } from 'src/coffees/coffees.service';
import { Public } from 'src/common/decorators/public.decorator';
import { CreateCoffeeDto } from 'src/dto/create-coffee.dto';
import { PaginationQueryDto } from 'src/dto/pagination-query.dto';
import { UpdateCoffeeDto } from 'src/dto/update-cofee.dto';
import { Protocol } from 'src/common/decorators/protocol.decorator';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('coffees')
@Controller('coffees')
export class CoffeesController {
  constructor(private coffeesService: CoffeesService) {}

  @ApiForbiddenResponse({ status: 403, description: 'Forbidden' })
  @Public()
  @Get()
  findAll(
    @Protocol() protocol: string,
    @Query() paginationQueryDto: PaginationQueryDto,
  ) {
    console.log('protocol', protocol);
    return this.coffeesService.findAll(paginationQueryDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.coffeesService.findOne(id);
  }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.create(createCoffeeDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(id);
  }
}
