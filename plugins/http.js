export default ({ $auth, $axios }, inject) => {
  const client = {}

  const verbs = ['get', 'post', 'put', 'patch', 'delete']

  verbs.forEach((verb) => {
    client[verb] = (url, data = {}, headers = {}) => {
      $axios.setToken(false)

      return new Promise((resolve, reject) => {
        const requestHeaders =
          !url.startsWith('http') && $auth.getToken('local')
            ? {
                ...headers,
                Authorization: $auth.getToken('local'),
              }
            : headers
        $axios({
          method: verb,
          url,
          data,
          headers: requestHeaders,
        })
          .then((res) => {
            resolve(res.data)
          })
          .catch((error) => {
            reject(error.response.data)
          })
      })
    }
  })

  inject('client', client)
}
