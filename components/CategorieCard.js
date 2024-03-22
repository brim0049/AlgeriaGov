import React from 'react';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');

export default function CategorieCard({item, onPress}) {
  return (
    <LinearGradient
      style={cardContainerStyle}
      locations={[0, 0.7, 1]}
      colors={['#1b4242', '#6d9886', '#1b4242']}
      useAngle={true}
      angle={180}>
      <View style={iconContainerStyle}>
        <Icon name={item.icon} size={50} color="#000" style={iconStyle} />
      </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
        <Text style={descriptionStyle}>{item.description}</Text>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginBottom: 10,
        }}>
        <TouchableOpacity onPress={onPress}>
          <Text style={textStyle}>{item.title}</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
const cardContainerStyle = {
  marginTop: 40,
  borderRadius: 40,
  height: height * 0.47,
  width: width * 0.65,
};

const iconContainerStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: -40,
  shadowColor: 'black',
  shadowRadius: 20,
  shadowOffset: {width: 0, height: 30},
  shadowOpacity: 0.8,
};

const iconStyle = {
  backgroundColor: 'white',
  borderRadius: 50,
  padding: 20,
  shadowRadius: 20,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 60,
  },
  shadowOpacity: 0.7,
  shadowRadius: 20,
  elevation: 11,
};

const textStyle = {
  backgroundColor: 'white',
  borderRadius: 26,
  padding: 15,
  fontSize: 28,
  color: 'black',
  fontWeight: 'bold',
  textAlign: 'center',
  justifyContent: 'flex-end',
  shadowColor: 'red',
  shadowOffset: {
    width: 0,
    height: 60,
  },
  shadowOpacity: 0.7,
  shadowRadius: 20,
};

const descriptionStyle = {
  fontSize: 18,
  color: '#fff',
  marginHorizontal: 1,
  lineHeight: 25,
};
