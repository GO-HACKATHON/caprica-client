const {create} = require('axios')
const {resolve, reject} = require('bluebird')

const api = create({
  baseURL: 'https://caprica-server.mustadi.xyz',
  responseType: 'json',
  timeout: 10000,
})

api.fetch = ({method, url, params, data}) => api({
  method,
  url,
  params,
  data: (/post/i.test(method) || /put/i.test(method) || /patch/i.test(method)) && data
})
  .then(({data}) => {
    return resolve(data)
  })
  .catch(({response: {data}}) => {
    return reject(data)
  })

api.createUser = ({name}) => api.fetch({
  method: 'post',
  url: '/users',
  data: {name}
})

api.reportRASH = ({userId, rash, status, latitude, longitude}) => api.fetch({
  method: 'post',
  url: `/users/${userId}/rash`,
  data: {
    rash,
    status,
    latitude,
    longitude
  }
})

module.exports = exports = api
