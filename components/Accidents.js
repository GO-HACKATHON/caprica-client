import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import withAccidents from '../util/with-accidents';

export default withAccidents(({accidents = [], isLoadingAccidents, children}) => (
  <View>
    <Text>{isLoadingAccidents ? 'Loading Accident Count' : `There are ${accidents.length} accidents`}</Text>
  </View>
))
