import React from 'react';
import { View, Image, Text } from 'react-native';
import ExponentText from '../ExponentText';
const LogoSignup = () => {
  return (
    <View style={styles.centerContent}>
      <Image
        style={styles.logo}
        resizeMode="cover"
        source={require('../../assets/GovLogo.png')}
      />
      <Text style={styles.slogo}>
        <Text style={styles.d}>D</Text>
        <Text style={styles.jazar}>jazaïr</Text>
        <Text style={styles.d}>G</Text>
        <Text style={styles.jazar}>ov</Text>
        <ExponentText>+</ExponentText>
      </Text>
    </View>
  );
};
const styles = {
    slogo: {
        textAlign: 'center',
        fontFamily: 'Baloo-Regular',
        letterSpacing: 0,
        fontSize: 25,
      },
      centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      logo: {
        width: 230,
        height: 200,
      },
      d: {
        color: '#1b4242',
      },
      jazar: {
        color: '#608B7B',
      },
    };

export default LogoSignup;
