"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1659474569765_CoffeeRefactor_1 = require("./migrations/1659474569765-CoffeeRefactor");
const typeorm_1 = require("typeorm");
const flavor_entity_1 = require("./entities/flavor.entity");
const coffee_entity_1 = require("./entities/coffee.entity");
const _1659475249654_SchemaSync_1 = require("./migrations/1659475249654-SchemaSync");
exports.default = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'pass123',
    database: 'postgres',
    entities: [coffee_entity_1.Coffee, flavor_entity_1.Flavor],
    migrations: [_1659474569765_CoffeeRefactor_1.CoffeeRefactor1659474569765, _1659475249654_SchemaSync_1.SchemaSync1659475249654],
});
//# sourceMappingURL=typeorm-cli.config.js.map