import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';

import { INestApplication } from '@nestjs/common';
import { ProductsModule } from './products.module';
import { ProductsService } from './products.service';
import { SharedModule } from 'src/shared.module';
import { CreateProductDTO } from './dto/create-product.dto';
import { Types } from 'mongoose';

describe('Products', () => {
  let app: INestApplication;
  const service = {
    getMany: () => ['test'],
    getOne: () => {
      return {};
    },
    create: () => {
      return {};
    },

    updateOne: () => {
      return {};
    },
    deleteById: () => {
      return {};
    },
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [SharedModule, ProductsModule],
    })
      .overrideProvider(ProductsService)
      .useValue(service)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it(`/GET products`, () => {
    return request(app.getHttpServer())
      .get('/products')
      .expect(200)
      .expect(service.getMany());
  });

  it(`/POST products`, () => {
    return request(app.getHttpServer())
      .post('/products')
      .expect(201)
      .expect(service.create());
  });

  it('/GET/[id] products', () => {
    return request(app.getHttpServer())
      .get(`/products/${String(new Types.ObjectId())}`)
      .expect(200)
      .expect(service.getOne());
  });

  it('/PUT products', () => {
    return request(app.getHttpServer())
      .put(`/products/${String(new Types.ObjectId())}`)
      .expect(200)
      .expect(service.updateOne());
  });

  it(`/PATCH products`, () => {
    return request(app.getHttpServer())
      .patch(`/products/${String(new Types.ObjectId())}`)
      .expect(200)
      .expect(service.updateOne());
  });

  it(`/DELETE products`, () => {
    return request(app.getHttpServer())
      .delete(`/products/${String(new Types.ObjectId())}`)
      .expect(200)
      .expect(service.deleteById());
  });

  afterAll(async () => {
    await app.close();
  });
});
