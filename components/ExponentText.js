import React from 'react';
import {StyleSheet, View, Text } from 'react-native';

const ExponentText = ({ children }) => (
    <View style={{ position: 'relative', top: -10 }}>
      <Text style={styles.plus}>{children}</Text>
    </View>
  );
export default ExponentText;
const styles = StyleSheet.create({
plus: {
    fontFamily: "Baloo-Regular",
    fontSize: 25 , 
    color: "#bb0622"
  },

})
