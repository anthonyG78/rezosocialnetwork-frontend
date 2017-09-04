module.exports = {
  NODE_ENV: '"production"',
  API: {
    defaults: {
      headers: {
        get: {
          'Accept': '"application/json, text/html"'
        }
      }
    },
    rezo: {
      headers: {
        'Accept': '"application/json, text/plain"'
      },
      baseURL: '"http://rezo/api"',
    }
  }
}
