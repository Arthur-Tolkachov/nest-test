import { PartialType } from '@nestjs/swagger';
import { CreateCoffeeDto } from 'src/dto/create-coffee.dto';
export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {}
