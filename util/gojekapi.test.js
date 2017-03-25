import gApi from './gojekapi';

it('can get nearby gojeks', async () => {
	const location = '-6.2635056,106.8236571';
	const nearbyGojeks = await gApi.getNearbyGojek({location});
	expect(nearbyGojeks).toBeDefined();
	expect(Array.isArray(nearbyGojeks)).toBe(true);
});

it('can get nearby goCars', async () => {
	const location = '-6.2635056,106.8236571';
	const nearbyGojeks = await gApi.getNearbyGoCar({location});
	expect(nearbyGojeks).toBeDefined();
	expect(Array.isArray(nearbyGojeks)).toBe(true);
});
