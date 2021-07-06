
<h1 align="center">March</h1>
<p align="center">Search for favorite products among marketplaces</p>



## Getting started

### Running

#### With Docker
```bash
$ cp .env.example .env
$ nano .env # Fill in the necessary variables
$ docker build -t march .
$ docker run -dp 3333:3333 march
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

# unit tests coverage
$ yarn run test:coverage

# integration tests (opening browser )
$ yarn run cypress:open

# integration tests (headless)
$ yarn run cypress:run
```

## Features
- [x] Mercado Livre Integration
- [x] FakeEcommerce Integration
- [x] FakeStore Integration
- [x] Login by Google
- [x] Favorite products
- [x] Persist searches and filters
- [x] Dynamic filtering
- [x] Pagination
- [x] Permission Control
- and more...