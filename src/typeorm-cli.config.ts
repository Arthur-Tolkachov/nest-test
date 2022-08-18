import { CoffeeRefactor1659474569765 } from './migrations/1659474569765-CoffeeRefactor';
import { DataSource } from 'typeorm';
import { Flavor } from 'src/entities/flavor.entity';
import { Coffee } from 'src/entities/coffee.entity';
import { SchemaSync1659475249654 } from 'src/migrations/1659475249654-SchemaSync';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  entities: [Coffee, Flavor],
  migrations: [CoffeeRefactor1659474569765, SchemaSync1659475249654],
});
