import api from './api';
import {
	SPEED,
	POINT,
	RASH
} from './test-constants';

const TESTER_NAME = `Odi ${Date.now()}`;
let user;

beforeAll(async () => {
	user = await api.createUser({name: TESTER_NAME});
});

it('can create a new user', async () => {
	const name = TESTER_NAME;
	const newUser = await api.createUser({name});
	expect(newUser).toBeDefined();
	expect(newUser.name).toBe(name);
	expect(newUser.id).toBeDefined();
	expect(newUser.created_at).toBeDefined();
	expect(newUser.updated_at).toBeDefined();
});

it('can report RASH', async () => {
	const {id} = user;
	const rashData = {
		rash: RASH.MEDIUM,
		status: RASH.STATUS.ACCELERATE,
		latitude: POINT.LATITUDE,
		longitude: POINT.LONGITUDE
	};
	const rashResponse = await api.reportRASH(Object.assign({}, rashData, {id}));
	expect(rashResponse).toBeDefined();
	expect(rashResponse.name).toBe(TESTER_NAME);
});

it('can log speed', async () => {
	const {id} = user;
	const speed = SPEED.MEDIUM;
	const speedResponse = await api.logSpeed({id, speed});
	expect(speedResponse).toBeDefined();
	expect(speedResponse.name).toBe(TESTER_NAME);
});

it('can report if speed is too high', async () => {
	const {id} = user;
	const speed = SPEED.HIGH;
	const reportTime = new Date();
	const warning = 'Speed is too high';
	const speedResponse = await api.reportSpeed({id, speed, reportTime, warning});
	expect(speedResponse).toBeDefined();
	expect(speedResponse.name).toBe(TESTER_NAME);
});

it('can report for accident', async () => {
	const {id} = user;
	const latitude = POINT.RANDOM;
	const longitude = POINT.RANDOM;
	const speed = SPEED.RANDOM;
	const accidentResponse = await api.reportAccident({id, latitude, longitude, speed});
	expect(accidentResponse).toBeDefined();
	expect(accidentResponse.name).toBe(TESTER_NAME);
});

it('can CONNECT user to server', async () => {
	const {id} = user;
	const connectResponse = await api.connectUser({id});
	expect(connectResponse).toBeDefined();
	expect(connectResponse.id).toBe(id);
	expect(connectResponse.name).toBe(TESTER_NAME);
	expect(connectResponse.is_connected).toBe(true);
});

it('can DISCONNECT user to server', async () => {
	const {id} = user;
	// /users/:user_id/connect
	const connectResponse = await api.disconnectUser({id});
	expect(connectResponse).toBeDefined();
	expect(connectResponse.id).toBe(id);
	expect(connectResponse.name).toBe(TESTER_NAME);
	expect(connectResponse.is_connected).toBe(false);
});
