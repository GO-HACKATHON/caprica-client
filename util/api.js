const {create} = require('axios');
const {resolve, reject} = require('bluebird');

const api = create({
	baseURL: 'https://caprica-server.mustadi.xyz',
	responseType: 'json',
	timeout: 10000
});

api.fetch = ({method, url, params, data}) => api({
	method,
	url,
	params,
	data: (/post/i.test(method) || /put/i.test(method) || /patch/i.test(method)) && data
})
  .then(({data}) => {
	return resolve(data);
})
  .catch(err => {
	const {response: {data}} = err;
	return reject(data);
});

api.createUser = ({name}) => api.fetch({
	method: 'post',
	url: '/users',
	data: {name}
});

api.reportRASH = ({id, rash, status, latitude, longitude}) => api.fetch({
	method: 'post',
	url: `/users/${id}/rash`,
	data: {
		rash,
		status,
		latitude,
		longitude
	}
});

api.logSpeed = ({id, speed}) => api.fetch({
	method: 'post',
	url: `/users/${id}/speeds`,
	data: {
		speed
	}
});

api.reportSpeed = ({id, speed, reportTime, warning}) => api.fetch({
	method: 'post',
	url: `/users/${id}/speedwarning`,
	data: {speed, reportTime, warning}
});

api.reportAccident = ({id, latitude, longitude, speed}) => api.fetch({
	method: 'post',
	url: `/users/${id}/accident`,
	data: {latitude, longitude, speed},
	params: {id}
});

api.connectUser = ({id}) => api.fetch({
	method: 'post',
	url: `/users/${id}/connect`
});

api.disconnectUser = ({id}) => api.fetch({
	method: 'post',
	url: `/users/${id}/disconnect`
});

module.exports = api;
