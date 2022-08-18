"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const Joi = require("@hapi/joi");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const coffees_module_1 = require("./coffees/coffees.module");
const coffee_rating_module_1 = require("./coffee-rating/coffee-rating.module");
const common_module_1 = require("./common/common.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: () => ({
                    type: 'postgres',
                    host: process.env.DATABASE_HOST,
                    port: +process.env.DATABASE_PORT,
                    username: process.env.DATABASE_USER,
                    password: process.env.DATABASE_PASSWORD,
                    database: process.env.DATABASE_NAME,
                    autoLoadEntities: true,
                    synchronize: true,
                }),
            }),
            config_1.ConfigModule.forRoot({
                validationSchema: Joi.object({
                    DATABASE_HOST: Joi.required(),
                    DATABASE_PORT: Joi.number().default(5432),
                }),
            }),
            coffees_module_1.CoffeesModule,
            coffee_rating_module_1.CoffeeRatingModule,
            common_module_1.CommonModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map