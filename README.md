## How to run

#### With Docker
```bash
cd frontend
cp .env.example .env
nano .env # Fill in the necessary variables
cd ..
docker-compose up
```


#### Without Docker
```bash

# Being at the root of the repository
cd backend
cp .env.example .env
nano .env # Fill in the necessary variables
yarn install
yarn dev

# Being at the root of the repository
cd frontend
cp .env.example .env
nano .env # Fill in the necessary variables
yarn install
yarn dev

```

<p>For more details, just consult the README of each project.</p>


## License

FakeEcommerce is [MIT licensed](LICENSE).