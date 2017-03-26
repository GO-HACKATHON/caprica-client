import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import withBluetooth from '../util/with-bluetooth';

export default withBluetooth(({address = '', deviceName = '', isBTEnabled = false, messageCount = 0, message = ''}) => (
  <View>
    <Text>{address}</Text>
    <Text>{deviceName}</Text>
    <Text>{isBTEnabled ? 'BT ENABLED' : 'BT DISABLED'}</Text>
    <Text>{messageCount}</Text>
    <Text>{message}</Text>
  </View>
))
