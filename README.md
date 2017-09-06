# REZO fronted

REZO social network final project to IFOCOP

## Requirements

* [yarn](https://yarnpkg.com/en/)


## Build Setup

### Installation
``` bash
# install dependencies
yarn install
```

### Development
``` bash
# serve with hot reload at localhost:8080 with an environment configuration
yarn start -- --env=[development|staging|production|testing]

# shortcuts
yarn dev
# for 
yarn start -- --env=development

yarn staging
# for 
yarn start -- --env=staging

yarn prod
# for 
yarn start -- --env=production

# serve with hot reload at localhost:8080 with the environment by default (development)
yarn start
```

### Build
``` bash
# build with minification and an environment configuration
yarn build -- --env=[staging|production|testing]

# build with minification and with the environment by default (production)
yarn build

# build for production and view the bundle analyzer report
yarn build --report
```
