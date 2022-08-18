import { NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Coffee } from '../entities/coffee.entity';
import { Flavor } from '../entities/flavor.entity';
import { DataSource, Repository } from 'typeorm';
import { CoffeesService } from './coffees.service';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
});

describe('CoffeeService', () => {
  let service: CoffeesService;
  let coffeeRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeesService,
        ConfigService,
        {
          provide: DataSource,
          useValue: {},
        },
        {
          provide: getRepositoryToken(Flavor),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(Coffee),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<CoffeesService>(CoffeesService);
    coffeeRepository = module.get<MockRepository>(getRepositoryToken(Coffee));
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('when coffee with ID exist', () => {
      it('should return a coffee object', async () => {
        const coffeeId = '1';
        const expectedObject = {};

        coffeeRepository.findOne.mockReturnValue(expectedObject);
        const coffee = await service.findOne(coffeeId);
        expect(coffee).toEqual(expectedObject);
      });
    });
    describe('otherwise', () => {
      it("should throw the 'Not found exception'", async () => {
        const coffeeId = '1';
        coffeeRepository.findOne(undefined);

        try {
          await service.findOne(coffeeId);
          expect(false).toBeTruthy();
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
          expect(error.message).toBe(`Coffee #${coffeeId} not found`);
        }
      });
    });
  });
});
