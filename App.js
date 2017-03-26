import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Accidents from './components/Accidents';
import Location from './components/Location';
import BTSerial from 'react-native-android-btserial';

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
		this.state = {
			bluetoothIsEnabled: false,
			bts: false,
			devices: [],
			status: null,
			string: null,
			deviceName: null,
			err: null,
			count: null
		}
	}
	componentDidMount() {
		const self = this
		BTSerial.isEnabled((err, enabled) => {
			if (!err) {
				self.setState({bluetoothIsEnabled: enabled || false, bts: true})
			}
		})
		BTSerial.listDevices(function(err, devices) {
			if (!err) {
				const arr = JSON.parse(devices)
				self.setState({devices: arr}, () => {
					const {address} = self.state.devices[1]
					console.log(address, self.state)
					BTSerial.connect(address, function(err, status, deviceName){
						console.log(err, status, deviceName)
						self.setState({err, status, deviceName})
						setInterval(() => {
							console.log('interval')
							BTSerial.available(function(err, count) {
								console.log(count)
								self.setState({count})
								if (count) {
									BTSerial.read(null, function(err, string){
										console.log(string)
										self.setState({string})
									});
								}
							});
						}, 1000)
					});
				})
			}
		})
		const address = '98:D3:32:70:78:67'


		setTimeout(() => {
			BTSerial.enableBT((err, enabled) => {
				if (!err) {
					self.setState({bluetoothIsEnabled: enabled || false, bts: true})
				}
			})
		}, 2000)
	}
	render() {
		const {bluetoothIsEnabled, bts, devices, status, string, deviceName, count} = this.state
		return (
			<View style={styles.container}>
				<Text>Welcome to Caprica-Client.</Text>
				<Accidents />
				<Location />
				<Text>{bluetoothIsEnabled ? 'BT IS ENABLED' : 'BT DISABLED'}</Text>
				<Text>{bts ? 'BTS ACTIVE' : 'BTS NON ACTIVE'}</Text>
				<Text>Devices</Text>
				{
					devices.length < 1 ? <Text>No devices</Text> : devices.map(({name, address, id}, idx) => <Text key={idx}>{name} - {address} - @{id}</Text>)
				}
				<Text>DEVICENAME: {deviceName}</Text>
				<Text>STATUS: {status}</Text>
				<Text>{count}</Text>
				<Text>{Date.now()} MESSAGE IS: {string}</Text>
			</View>
		);
	}
}
