import React from 'react';
import {Image, View, ActivityIndicator} from 'react-native';

const LoadingSpinner = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        source={require('../assets/GovLogo.png')}
        style={{width: 250, height: 250, resizeMode: 'contain'}}
      />
      <ActivityIndicator size={90} color="#1b4242" />
    </View>
  );
};

export default LoadingSpinner;
