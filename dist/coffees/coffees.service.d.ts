import { Flavor } from '../entities/flavor.entity';
import { UpdateCoffeeDto } from './../dto/update-cofee.dto';
import { CreateCoffeeDto } from './../dto/create-coffee.dto';
import { Coffee } from '../entities/coffee.entity';
import { Repository, DataSource } from 'typeorm';
import { PaginationQueryDto } from 'src/dto/pagination-query.dto';
import { ConfigService } from '@nestjs/config';
export declare class CoffeesService {
    private readonly coffeeRepository;
    private readonly flavorRepository;
    private readonly dataSource;
    private readonly configService;
    constructor(coffeeRepository: Repository<Coffee>, flavorRepository: Repository<Flavor>, dataSource: DataSource, configService: ConfigService);
    findAll(paginationQueryDto: PaginationQueryDto): Promise<Coffee[]>;
    findOne(id: string): Promise<Coffee>;
    create(createCoffeeDto: CreateCoffeeDto): Promise<Coffee>;
    update(id: string, updateCoffeeDto: UpdateCoffeeDto): Promise<Coffee>;
    remove(id: string): Promise<Coffee>;
    recommendCoffee(coffee: Coffee): Promise<void>;
    private preloadFlavorByName;
}
