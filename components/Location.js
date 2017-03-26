import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import withLocation from '../util/with-location';

export default withLocation(({initialPosition, lastPosition}) => (
	<View>
		<Text>{initialPosition}</Text>
		<Text>{lastPosition}</Text>
	</View>
));
