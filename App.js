import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Accidents from './components/Accidents';
import Location from './components/Location';
import Bluetooth from './components/Bluetooth';
import BTSerial from 'react-native-android-btserial';
import {Heading} from '@shoutem/ui'

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF'
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5
	}
});

export default class App extends Component {
	constructor (props) {
		super(props)

	}

	render() {
		return (
			<View style={styles.container}>
				<Heading>Welcome to Caprica-Client.</Heading>
				<Accidents />
				<Location />
				<Bluetooth />
			</View>
		);
	}
}
