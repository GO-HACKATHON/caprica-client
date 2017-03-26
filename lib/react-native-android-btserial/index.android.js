const {NativeModules, DeviceEventEmitter} = require('react-native');

const BTSerial = NativeModules.BTSerial;

// Add setConnectionStatusCallback(cb) function
//  cb({devicename: 'xyz'})
//
BTSerial.setConnectionStatusCallback = function (cb) {
	if (DeviceEventEmitter.addListener) {
		DeviceEventEmitter.addListener(BTSerial.eventConnectionLost, cb);
	}
};

// Add setDataAvailableCallback(cb) function
//  cb({available: n})
//
BTSerial.setDataAvailableCallback = function (cb) {
	if (DeviceEventEmitter.addListener) {
		DeviceEventEmitter.addListener(BTSerial.eventDataAvailable, cb);
	}
};

module.exports = BTSerial;
