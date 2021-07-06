import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import {
  closeMongooseTestModule,
  getMongooseTestModule,
  modelMock,
} from 'src/mongoose/utils';
import { ProductsModule } from './products.module';
import { ProductsService } from './products.service';
import { SharedTestModule } from 'src/shared.test.module';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [getMongooseTestModule(), SharedTestModule, ProductsModule],
      providers: [ProductsService],
    })
      .overrideProvider(getModelToken('Product'))
      .useValue(modelMock)
      .compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getMany', () => {
    it('should return non-paged results', () => {
      const spy1 = jest.spyOn(modelMock, 'find');
      const spy2 = jest.spyOn(modelMock, 'countDocuments');

      service.getMany();

      expect(spy1).toHaveBeenCalled();
      expect(spy2).not.toHaveBeenCalled();
    });

    it('should return paged results', () => {
      const spy1 = jest.spyOn(modelMock, 'find');
      const spy2 = jest.spyOn(modelMock, 'countDocuments');

      service.getMany({
        pagination: {
          limit: 10,
          skip: 10,
        },
      });

      expect(spy1).toHaveBeenCalled();
      expect(spy2).toHaveBeenCalled();
    });
  });

  describe('getOne', () => {
    it('should look for a result', () => {
      const spy1 = jest.spyOn(modelMock, 'findOne');

      service.getOne({});

      expect(spy1).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a product', () => {
      const spy1 = jest.spyOn(modelMock, 'create');
      service.create({} as any);
      expect(spy1).toHaveBeenCalled();
    });
  });

  describe('createMany', () => {
    it('should create many products', () => {
      const spy1 = jest.spyOn(modelMock, 'create');
      service.createMany({} as any);
      expect(spy1).toHaveBeenCalled();
    });
  });

  describe('updateOne', () => {
    it('should update a product', () => {
      const spy1 = jest.spyOn(modelMock, 'findOneAndUpdate');
      service.updateOne({} as any);
      expect(spy1).toHaveBeenCalled();
    });
  });

  describe('deleteById', () => {
    it('should delete a product', () => {
      const spy1 = jest.spyOn(modelMock, 'deleteOne');
      service.deleteById('');
      expect(spy1).toHaveBeenCalled();
    });
  });

  afterAll(async () => {
    await closeMongooseTestModule();
  });
});
