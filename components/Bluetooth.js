import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import withBluetooth from '../util/with-bluetooth';

export default withBluetooth(({ts, address = '', deviceName = '', isBTEnabled = false, messageCount = 0, message = ''}) => (
  <View>
    <Text>Address: {address}</Text>
    <Text>Device Name: {deviceName}</Text>
    <Text>Status: {isBTEnabled ? 'BT ENABLED' : 'BT DISABLED'}</Text>
    <Text>Count: {messageCount}</Text>
    <Text>Message: {message}</Text>
    <Text>ts: {ts}</Text>
  </View>
))
