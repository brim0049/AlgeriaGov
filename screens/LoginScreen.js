import React, {useState, useEffect} from 'react';
import {Input} from '@rneui/themed';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Button} from '@react-native-material/core';
import Icon from 'react-native-vector-icons/FontAwesome';
import ExponentText from '../components/ExponentText';
import {useNavigation} from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const LoginScreen = ({setInitialRoute}) => {

  useEffect (()=>{
    GoogleSignin.configure({
      webClientId:'764473570697-nq57d471rbg8tios5fp2ir0saip2g5cs.apps.googleusercontent.com'
    })
  }, []);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [inputErrors, setInputErrors] = useState({});
  const validateFields = () => {
    const errors = {};
  
    if (!email) {
      errors['Adresse courriel'] = "L'adresse courriel est obligatoire";
    } else if (!isValidEmail(email)) {
      errors['Adresse courriel'] = 'Adresse e-mail invalide';
    }
  
    if (!password) {
      errors['Mot de passe'] = 'Le mot de passe est obligatoire';
    }
  
    return errors;
  };
  
  const isValidEmail = email => {
    // Implémentez votre logique de validation d'adresse e-mail ici
    return /\S+@\S+\.\S+/.test(email);
  };
  const updateUserDataInFirestore = async (userId, userData) => {
    try {
      await firestore()
        .collection('utilisateurs')
        .doc(userId)
        .set(userData, {merge: true}); // Utilisation de merge pour ajouter ou mettre à jour les données existantes
      console.log(
        'Données utilisateur mises à jour dans Firestore avec succès',
      );
    } catch (error) {
      console.error(
        'Erreur lors de la mise à jour des données utilisateur dans Firestore',
        error,
      );
    }
  };

  const navigation = useNavigation();
  const loginWithGoogle = async () => {
    try {
      await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // Exchange the Google token for a Firebase credential
      const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
      const userCredential = await auth().signInWithCredential(googleCredential);
      // Check if the user is a new user or an existing user
      const additionalUserInfo = userCredential.additionalUserInfo;
      if (additionalUserInfo.isNewUser) {
        // New user, redirect to another page
        updateUserDataInFirestore(userCredential.user.uid, {
          adresseCourriel: userCredential.user.email,
        });
        console.log('E-mail de l\'utilisateur:', userCredential.user.email);
        navigation.navigate('SignupScreen', { activeIndex: 1 });
      } else {
        // Existing user, handle accordingly
        AsyncStorage.setItem('isSignedUp', 'true');  
    setInitialRoute('App');
         console.log('logged in')

      }
    } catch (error) {
      alert(`Erreur lors de la liaison de l'utilisateur avec compte Google.`);
      console.error(error);
    }
  };
  
const handlelogin = ()=>{
  const fieldErrors = validateFields();
  setInputErrors(fieldErrors);

  if (Object.keys(fieldErrors).length > 0) {
    // S'il y a des erreurs, retournez simplement
    return;
  }
  auth()
  .signInWithEmailAndPassword(email, password)
  .then(userCredential=>{
    const user = userCredential.user;
    AsyncStorage.setItem('isSignedUp', "true");
        console.log('logged in',user.email);
    setInitialRoute('App');
    return;

  })
  .catch(error => {
    let errorMessage = 'Une erreur s\'est produite lors de la connexion. Veuillez réessayer.' ;
  
    // Vérifier si l'objet d'erreur existe et a une propriété de code
    if (error && error.code) {
      // Vérifier si l'erreur contient une adresse e-mail invalide
      if (error.code.includes('auth/invalid-email')) {
        errorMessage = 'Adresse e-mail invalide. Veuillez vérifier votre adresse e-mail.';
      } else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = 'Adresse e-mail ou mot de passe incorrect. Veuillez vérifier vos informations.';
      }
    }
  
    alert(errorMessage);
  });  
}
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (

    <LinearGradient
      style={styles.loginscreen}
      locations={[0, 1]}
      colors={['#6d9886', '#1b4242']}
      useAngle={true}
      angle={180}>
    <KeyboardAwareScrollView>

      <View style={styles.centerContent}>
        <Image
          style={styles.logo}
          resizeMode="cover"
          source={require('../assets/GovLogo.png')}
        />
        <Text style={styles.slogo}>
          <Text style={styles.d}>D</Text>
          <Text style={styles.jazar}>jazaïr</Text>
          <Text style={styles.d}>G</Text>
          <Text style={styles.jazar}>ov</Text>
          <ExponentText>+</ExponentText>
        </Text>
      </View>
      <View style={styles.containerElementOne}>
        <Text style={styles.bonjour}>Bonjour!</Text>
        <Text style={styles.connectezVousPourContinuer}>
          Connectez-vous pour continuer{' '}
        </Text>
      </View>
      <View></View>
      <View style={styles.containerInput}>
        <Input
          label="Adresse courriel"
          placeholder="Adresse courriel"
          value={email}
          onChangeText={text =>setEmail(text)}
          leftIcon={{type: 'font-awesome', name: 'envelope', color: 'white'}}
          inputStyle={{color: 'white'}}
          inputContainerStyle={[styles.inputContainer, inputErrors['Adresse courriel'] && {borderColor: 'red'}]}
          labelStyle={{color: 'white'}}
          errorMessage={inputErrors['Adresse courriel']}
          errorStyle={styles.errorStyle}

        />
        <Input
          label="Mot de passe"
          placeholder="Mot de passe"
          value={password}
          onChangeText={text =>setPassword(text)}
          leftIcon={{type: 'font-awesome', name: 'lock', color: 'white'}}
          rightIcon={
            <TouchableOpacity onPress={toggleShowPassword}>
              <Icon
                name={showPassword ? 'eye' : 'eye-slash'}
                size={20}
                color="lightgray"
              />
            </TouchableOpacity>
          }
          inputStyle={{color: 'white'}}
          inputContainerStyle={[styles.inputContainer, inputErrors['Mot de passe'] && {borderColor: 'red'}]}
          labelStyle={{color: 'white'}}
          secureTextEntry={!showPassword}
          errorMessage={inputErrors['Mot de passe']}
          errorStyle={styles.errorStyle}

        />
                  <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
        <Text style={{textAlign: 'right', color: 'white', marginTop: -15}}>
          {' '}
          Mot de passe oublié ?{' '}
        </Text>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 20, marginHorizontal: 90}}>
        <Button
          padding={5}
          title="Se connecter"
          color="white"
          tintColor="black"
          HitRect="1000"
          onPress={handlelogin}
        />
        <View style={{marginTop: 10, flexDirection: 'row'}}>
          <Text
            style={{
              textAlign: 'right',
              color: 'white',
            }}>{`vous n'avez pas de compte ? `}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
            <Text style={{textDecorationLine: 'underline', color: '#ff0000'}}>
              S'inscrire
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.containerLine}>
        <View style={styles.line} />
        <Text style={styles.text}>Ou continuez avec</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => console.log('Outlook Pressed')}
          style={styles.background}>
          <Image
            source={require('../assets/outlook-icon.png')}
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={loginWithGoogle}
          style={styles.background}>
          <Image
            source={require('../assets/google-icon.png')}
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => console.log('Facebook Pressed')}
          style={styles.background}>
          <Image
            source={require('../assets/yahoo-icon.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>

    </LinearGradient>

  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderColor: 'white',
    borderBottomWidth: 3,
    marginBottom: -15,
  },
  errorStyle: {
    marginTop: 15, 
  },
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
    color: 'white',
  },
  containerElementOne: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  bonjour: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'kreon.regular',
    letterSpacing: 0,
  },
  connectezVousPourContinuer: {
    color: 'rgba(255, 255, 255, 0.27)',
    fontFamily: 'kreon.regular',
    letterSpacing: 0,
    fontSize: 20,
  },
  containerInput: {
    marginTop: 30,
    marginLeft: 5,
    marginRight: 5,
  },
  loginscreen: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
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
    color: '#fff',
  },
  plus: {
    fontFamily: 'Baloo-Regular',
    fontSize: 25,
    color: '#bb0622',
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
  background: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 45,
    backgroundColor: 'white',
  },
});

export default LoginScreen;
