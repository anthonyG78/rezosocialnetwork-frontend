var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API: {
    rezo: {
      headers: {
        'Accept': '"application/json, text/plain"',
        'Origin': '"http://localhost:8080/"'
      },
      baseURL: '"http://localhost:9999/api"',
    },
  },
  graphql: {
    url: '"http://localhost:9999/graphql"',
  },
})
