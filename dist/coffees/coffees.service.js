"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoffeesService = void 0;
const flavor_entity_1 = require("../entities/flavor.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const coffee_entity_1 = require("../entities/coffee.entity");
const typeorm_2 = require("typeorm");
const event_entity_1 = require("../entities/event.entity");
const config_1 = require("@nestjs/config");
let CoffeesService = class CoffeesService {
    constructor(coffeeRepository, flavorRepository, dataSource, configService) {
        this.coffeeRepository = coffeeRepository;
        this.flavorRepository = flavorRepository;
        this.dataSource = dataSource;
        this.configService = configService;
        const databaseHost = this.configService.get('DATABASE_HOST');
        console.log('databaseHost', databaseHost);
    }
    findAll(paginationQueryDto) {
        const { offset, limit } = paginationQueryDto;
        return this.coffeeRepository.find({
            relations: {
                flavors: true,
            },
            skip: offset,
            take: limit,
        });
    }
    async findOne(id) {
        const coffee = await this.coffeeRepository.findOne({
            where: { id: +id },
            relations: {
                flavors: true,
            },
        });
        if (!coffee) {
            throw new common_1.NotFoundException(`Coffee #${id} not found`);
        }
        return coffee;
    }
    async create(createCoffeeDto) {
        const flavors = await Promise.all(createCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)));
        const coffee = this.coffeeRepository.create(Object.assign(Object.assign({}, createCoffeeDto), { flavors }));
        return this.coffeeRepository.save(coffee);
    }
    async update(id, updateCoffeeDto) {
        const flavors = updateCoffeeDto.flavors &&
            (await Promise.all(updateCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name))));
        const coffee = await this.coffeeRepository.preload(Object.assign(Object.assign({ id: +id }, updateCoffeeDto), { flavors }));
        if (!coffee) {
            throw new common_1.NotFoundException(`Coffee #${id} not found`);
        }
        return this.coffeeRepository.save(coffee);
    }
    async remove(id) {
        const coffee = await this.findOne(id);
        return this.coffeeRepository.remove(coffee);
    }
    async recommendCoffee(coffee) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            coffee.recommendations++;
            const recommendEvent = new event_entity_1.Event();
            recommendEvent.name = 'recommend_coffee';
            recommendEvent.type = 'coffee';
            recommendEvent.payload = { coffeeId: coffee.id };
            queryRunner.manager.save(coffee);
            queryRunner.manager.save(recommendEvent);
            await queryRunner.commitTransaction();
        }
        catch (e) {
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
        }
    }
    async preloadFlavorByName(name) {
        const existingFlavor = await this.flavorRepository.findOne({
            where: { name },
        });
        if (existingFlavor) {
            return existingFlavor;
        }
        return this.flavorRepository.create({ name });
    }
};
CoffeesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(coffee_entity_1.Coffee)),
    __param(1, (0, typeorm_1.InjectRepository)(flavor_entity_1.Flavor)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource,
        config_1.ConfigService])
], CoffeesService);
exports.CoffeesService = CoffeesService;
//# sourceMappingURL=coffees.service.js.map