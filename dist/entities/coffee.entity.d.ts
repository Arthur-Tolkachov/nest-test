import { Flavor } from './flavor.entity';
export declare class Coffee {
    id: number;
    name: string;
    description: string;
    brand: string;
    recommendations: number;
    flavors: Flavor[];
}
