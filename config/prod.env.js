module.exports = {
  NODE_ENV: '"production"',
  API: {
    rezo: {
      headers: {
        'Accept': '"application/json, text/plain"',
        'Origin': '"https://rezosocialnetwork.herokuapp.com/"'
      },
      baseURL: '"https://rezosocialnetwork.herokuapp.com/api"',
    },
  },
  graphql: {
    url: '"https://rezosocialnetwork.herokuapp.com/graphql"',
  },
}
