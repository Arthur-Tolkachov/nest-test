import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCoffeeDto {
  @ApiProperty({ description: 'Name' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'Brand' })
  @IsString()
  readonly brand: string;

  @ApiProperty({ example: [] })
  @IsString({ each: true })
  readonly flavors: string[];
}
