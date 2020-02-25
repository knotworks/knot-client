export default ({ $auth, $axios }, inject) => {
  const client = {
    auth: true,
    withoutAuth() {
      this.auth = false

      return this
    }
  }

  const verbs = ['get', 'post', 'put', 'patch', 'delete']

  verbs.forEach((verb) => {
    client[verb] = (url, data = {}, headers = {}) => {
      $axios.setToken(false)

      return new Promise((resolve, reject) => {
        const requestHeaders = client.auth
          ? {
              ...headers,
              Authorization: $auth.getToken('local')
            }
          : headers
        $axios({
          method: verb,
          url,
          data,
          headers: requestHeaders
        })
          .then((res) => {
            client.auth = true
            resolve(res.data)
          })
          .catch((error) => {
            client.auth = true
            reject(error.response.data)
          })
      })
    }
  })

  inject('client', client)
}
