import { CoffeesService } from 'src/coffees/coffees.service';
import { CreateCoffeeDto } from 'src/dto/create-coffee.dto';
import { PaginationQueryDto } from 'src/dto/pagination-query.dto';
import { UpdateCoffeeDto } from 'src/dto/update-cofee.dto';
export declare class CoffeesController {
    private coffeesService;
    constructor(coffeesService: CoffeesService);
    findAll(protocol: string, paginationQueryDto: PaginationQueryDto): Promise<import("../entities/coffee.entity").Coffee[]>;
    findOne(id: string): Promise<import("../entities/coffee.entity").Coffee>;
    create(createCoffeeDto: CreateCoffeeDto): Promise<import("../entities/coffee.entity").Coffee>;
    update(id: string, updateCoffeeDto: UpdateCoffeeDto): Promise<import("../entities/coffee.entity").Coffee>;
    remove(id: string): Promise<import("../entities/coffee.entity").Coffee>;
}
