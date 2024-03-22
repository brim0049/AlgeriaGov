import {StyleSheet, TextInput, View, Alert} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import LogoSignup from '../components/signup/Logo';
import {Input} from '@rneui/themed';
import {Button} from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
const ForgetPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  const [inputErrors, setInputErrors] = useState({});
  const validateFields = () => {
    const errors = {};
  
    if (!email) {
      errors['Entrez votre adresse e-mail'] = "L'adresse courriel est obligatoire";
    } else if (!isValidEmail(email)) {
      errors['Entrez votre adresse e-mail'] = 'Adresse e-mail invalide';
    }

  
    return errors;
  };
  
  const isValidEmail = email => {
    // Implémentez votre logique de validation d'adresse e-mail ici
    return /\S+@\S+\.\S+/.test(email);
  };
  const handleResetPassword = () => {
    const fieldErrors = validateFields();
  setInputErrors(fieldErrors);

  if (Object.keys(fieldErrors).length > 0) {
    // S'il y a des erreurs, retournez simplement
    return;
  }
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        navigation.navigate('LoginScreen');
        Alert.alert(
          'E-mail de réinitialisation envoyé !',
          'Veuillez vérifier votre boîte de réception.',
        );
      })
      .catch(error => {
        Alert.alert('Erreur', error.message);
      });
  };
  return (
    <View style={{backgroundColor:'white'}}>
      <LogoSignup/>
      <View style={{marginTop:40}}>

      </View>
      <Input
        label="Entrez votre adresse e-mail"
        placeholder="Entrez votre adresse e-mail"
        value={email}
        onChangeText={text => setEmail(text)}
        leftIcon={{type: 'font-awesome', name: 'envelope', color: 'black'}}
        inputStyle={{color: 'black'}}
        labelStyle={{color: 'black'}}
        inputContainerStyle={[styles.inputContainer, inputErrors['Entrez votre adresse e-mail'] && {borderColor: 'red'}]}
        errorMessage={inputErrors['Entrez votre adresse e-mail']}
        errorStyle={styles.errorStyle}

      />
      <Button margin={5}
      padding={5}
      color='black'
        title="Réinitialiser le mot de passe"
        onPress={handleResetPassword}
      />
    </View>
  );
};

export default ForgetPasswordScreen;

const styles = StyleSheet.create({
    inputContainer: {
      borderColor: 'black',
      borderBottomWidth: 3,
      marginBottom: -15,
    },
    errorStyle: {
        marginTop: 15, 
      },
   
});
