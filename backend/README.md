<h1 align="center">Fake Ecommerce API</h1>
<p align="center">Ecommerce Product Dummy Data API</p>



## Getting started

<p>Consult the documentation via the "/docs" API route.</p>
<p>OBS: You can POST to /v1/products/seeds to enroll 200 random products in the database.</p>


### Running

#### With Docker
```bash
$ cp .env.example .env
$ nano .env # Fill in the necessary variables
$ docker build -t fakeecommerceapi .
$ docker run -dp 3333:3333 fakeecommerceapi
```


#### Without Docker
```bash
$ cp .env.example .env
$ nano .env # Fill in the necessary variables
$ yarn install
$ yarn dev
```

### Testing
```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Features
- [x] Products CRUD
- [x] Filtering
- [x] Pagination
- [x] Database seeding
- and more...