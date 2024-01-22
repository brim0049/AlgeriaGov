import React, { useState } from 'react';
import { Input } from '@rneui/themed';
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Stack, Button } from "@react-native-material/core";
import Icon from 'react-native-vector-icons/FontAwesome';
import ExponentText from '../components/ExponentText';
const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <LinearGradient
      style={styles.loginscreen}
      locations={[0, 1]}
      colors={["#6d9886", "#1b4242"]}
      useAngle={true}
      angle={180}
    >
        <View style={styles.centerContent}>
        <Image
            style={styles.logo}
            resizeMode="cover"
            source={require("../assets/GovLogo.png")}
          />
          <Text style={ styles.slogo}>
            <Text style={styles.d}>D</Text>
            <Text style={styles.jazar}>jazaïr</Text>
            <Text style={styles.d}>G</Text>
            <Text style={styles.jazar}>ov</Text>
            <ExponentText>+</ExponentText>
          </Text>
        </View>
        <View style={styles.containerElementOne}>
            <Text style={styles.bonjour}>Bonjour!</Text>
            <Text style={styles.connectezVousPourContinuer}>Connectez-vous pour continuer </Text>
        </View>
        <View>
            
        </View>
        <View style={styles.containerInput}>
        <Input
        label="Adresse courriel"
        placeholder="Adresse courriel"
        leftIcon={{ type: 'font-awesome',name: "envelope", color:"white"}}
        inputStyle={{ color: 'white' }}
        inputContainerStyle={{ borderColor: 'white', borderBottomWidth: 3,}}
        labelStyle={{ color: 'white' }}
        
      />
      <Input
          label="Mot de passe"
          placeholder="Mot de passe"
          leftIcon={{ type: 'font-awesome',name: "lock", color:"white"}}
          rightIcon={<TouchableOpacity onPress={toggleShowPassword}>
          <Icon
          name={showPassword ? 'eye' : 'eye-slash'}
          size={20}
          color="lightgray"          />
          </TouchableOpacity>}
            inputStyle={{ color: 'white' }}
            inputContainerStyle={{ borderColor: 'white', borderBottomWidth: 3,}}
            labelStyle={{ color: 'white' }}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={(text) => setPassword(text)}
        />
         <Text style={{ textAlign: 'right', color:'white', marginTop:-15  }}> Mot de passe oublié ? </Text>
        </View> 
    <View style={{marginTop:20, marginHorizontal:90}}>
      <Button title="Se connecter" color="white" tintColor="black" HitRect="1000"/>
      <View style={{ marginTop:10, flexDirection: 'row'}} >
         <Text style={{ textAlign: 'right', color:'white' }} >{`vous n'avez pas de compte ? `}</Text>
         <Text style={{  textDecorationLine: 'underline', color: "#ff0000",}} >S'inscrire</Text>
      </View>
    </View>
    <View style={styles.containerLine}>
        <View style={styles.line} />
        <Text style={styles.text}>Ou continuez avec</Text>
        <View style={styles.line} />
    </View>
    <View style={styles.container}>
      <TouchableOpacity onPress={() => console.log('Outlook Pressed')} style={styles.background}>
        <Image source={require('../assets/outlook-icon.png')} style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => console.log('Google Pressed')} style={styles.background}>
        <Image source={require('../assets/google-icon.png')} style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => console.log('Facebook Pressed')} style={styles.background}>
        <Image source={require('../assets/yahoo-icon.png')} style={styles.icon} />
      </TouchableOpacity>
    </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({

      containerLine: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 20,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: 'white',
    },
    text: {
        width: 100,
        textAlign: 'center',
        color:'white'
    },
    containerElementOne: {
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
      },
      bonjour: {
        fontSize: 24,
        color: "#fff",
        fontFamily: "kreon.regular",
        letterSpacing: 0,
      },
      connectezVousPourContinuer: {
        color: "rgba(255, 255, 255, 0.27)",
        fontFamily: "kreon.regular",
        letterSpacing: 0,
        fontSize: 20,

      },
      containerInput:{
        marginTop: 30,
        marginLeft: 5,
        marginRight: 5,
      },
  loginscreen: {
    flex: 1,
    width: "100%",
    backgroundColor: "transparent",
    overflow: "hidden",
  },
  slogo: {
    textAlign: "center",
    fontFamily: "Baloo-Regular",
    letterSpacing: 0,
    fontSize: 25,
    
  },
   centerContent: {
        
    justifyContent: "center",
        alignItems: "center", 
      },
  logo: {
    width: 230,
    height: 200,
  },
  d: {
    color: "#1b4242",
  },
  jazar: {
    color: "#fff",
  },
  plus: {
    fontFamily: "Baloo-Regular",
    fontSize: 25 , 
    color: "#bb0622"
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
  },
  icon: {
    width: 50,
    height: 50,
  },
  background:{
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center", 
    borderRadius: 45,
    backgroundColor:'white',
  }
});

export default LoginScreen;
