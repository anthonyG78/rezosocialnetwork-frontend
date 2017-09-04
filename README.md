# Genymotion Cloud Admin

[![Build Status](http://jenkins.genymobile.com/job/genymotion-cloud-fe-admin-master/badge/icon)](http://jenkins.genymobile.com/job/genymotion-cloud-fe-admin-master/)

The `genymotion-cloud-admin` project provide a backoffice for the Genymotion cloud platform.
For more information, see the project [specifications](https://docs.google.com/a/genymobile.com/document/d/1oe9rderQ5pierCTmZSi2fnJS_OKk4odFD9We7HNMYMU/edit?usp=sharing).

* **Issue tracker:** [jira](https://genymobile.atlassian.net/secure/RapidBoard.jspa?rapidView=122&projectKey=GCBO)

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

### Tests

``` bash
# run unit tests
yarn unit

# run e2e tests
yarn e2e

# run all tests
yarn test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
