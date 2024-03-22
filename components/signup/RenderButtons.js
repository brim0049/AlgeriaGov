import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
  } from 'react-native';
  import React from 'react';
  import { useNavigation } from '@react-navigation/native';

import {Button} from '@react-native-material/core';

const RenderButtons = ({ activeIndex, handlePrev, handleNext, sections, handleSignup, signupWithGoogle,handleEnd }) => {
     const navigation = useNavigation();

    if (activeIndex === 0) {
      return (
        <View>
          <Button
            title="S'inscrire"
            color="#1B4242"
            tintColor="white"
            onPress={handleSignup}
            padding={5}
            marginRight={80}
            marginLeft={80}
            marginTop={-10}
          />
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              marginRight: 80,
              marginLeft: 80,
            }}>
            <Text
              style={{
                textAlign: 'right',
                color: '#6D9886',
              }}>{`Vous avez déjà un compte? `}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
    <Text style={{ textDecorationLine: 'underline', color: '#ff0000' }}>
      Se connecter
    </Text>
  </TouchableOpacity>
          </View>
          <View style={styles.containerLine}>
            <View style={styles.line} />
            <Text style={styles.text}>Ou continuez avec</Text>
            <View style={styles.line} />
          </View>
          <View style={styles.containerFooter}>
            <TouchableOpacity
              style={styles.background}>
              <Image
                source={require('../../assets/outlook-icon.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.background}
              onPress={signupWithGoogle}
              >
              <Image
                source={require('../../assets/google-icon.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.background}
              >
              <Image
                source={require('../../assets/yahoo-icon.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (activeIndex < sections.length - 1) {
      return (
        <View
          style={[
            styles.buttonContainer,
            {justifyContent: activeIndex === 1 ? 'center' : 'space-between'},
          ]}>
          {/* Remove the "Précédent" button from Section 2 */}
          {activeIndex !== 1 && (
            <Button
              title="  Précédent  "
              color="#1B4242"
              tintColor="white"
              onPress={handlePrev}
              padding={5}
            />
          )}
          <Button
            title="    Suivant    "
            color="#1B4242"
            tintColor="white"
            onPress={handleNext}
            padding={5}

          />
        </View>
      );
    } else {
      return (
        <View style={styles.buttonContainer}>
          <Button
            title="  Précédent  "
            color="#1B4242"
            tintColor="white"
            onPress={handlePrev}
            padding={5}
  

          />

          <Button
            title="  Terminer  "
            color="#1B4242"
            tintColor="white"
            onPress={handleEnd}
            padding={5}
          />
        </View>
      );
    }
  };
  const styles = StyleSheet.create({
  
    buttonContainer: {
      marginLeft:20,
      marginRight:20,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    containerLine: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: 20,
    },
    line: {
      flex: 1,
      height: 1,
      backgroundColor: '#1b4242',
    },
    text: {
      width: 100,
      textAlign: 'center',
      color: '#1b4242',
    },
    containerFooter: {
      margin: -10,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    icon: {
      width: 50,
      height: 50,
    },
    background: {
      width: 70,
      height: 70,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 45,
      backgroundColor: 'white',
    },
  });
  
export default RenderButtons;