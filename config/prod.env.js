module.exports = {
  NODE_ENV: '"production"',
  API: {
    rezo: {
      headers: {
        'Accept': '"application/json, text/plain"',
        'Origin': '"http://localhost:9999/"'
      },
      baseURL: '"http://localhost:9999/api"',
    },
  },
  graphql: {
    url: '"http://localhost:9999/graphql"',
  },
}
