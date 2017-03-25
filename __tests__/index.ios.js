import renderer from 'react-test-renderer';
import React from 'react';
import Index from '../index.ios';

it('renders correctly', () => {
	const tree = renderer.create(
		<Index/>
  );
	expect(tree).toBeTruthy();
});
