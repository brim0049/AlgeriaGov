import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useRoute } from '@react-navigation/native';

import ProgressBar from 'react-native-progress/Bar';
import {Input} from '@rneui/themed';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Dropdown} from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import wilayas from '../assets/data/wilayas';
import SegmentForm from '../components/signup/SegmentForm';
import LogoSignup from '../components/signup/Logo';
import sections from '../components/signup/Sections';
import mapInputToIcon from '../components/signup/MapInputToIcon';
import RenderButtons from '../components/signup/RenderButtons';
import firestore from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SCREEN_WIDTH = Dimensions.get('window').width;

const SignupScreen = ({ setInitialRoute }) => {
  const route = useRoute();
  const [selectedCommune, setSelectedCommune] = useState('');
  const [communes, setCommunes] = useState([]);

  const handleWilayaChange = wilaya => {
    setSelectedWilaya(wilaya);
    const selectedWilayaData = wilayas.find(item => item.value === wilaya);
    if (selectedWilayaData) {
      setCommunes(
        selectedWilayaData.communes.map(commune => ({
          label: commune,
          value: commune,
        })),
      );
      setSelectedCommune('');
    }
  };
  const [inputValues, setInputValues] = useState({
    'Adresse courriel': '',
    'Mot de passe': '',
    'Confirmation de mot de passe': '',
  });

  const [inputErrors, setInputErrors] = useState({});
  const [inputErrorsSection2, setInputErrorsSection2] = useState({});
  const [inputErrorsSection3, setInputErrorsSection3] = useState({});

  const validateFields = () => {
    const errors = {};

    Object.keys(inputValues).forEach(field => {
      if (!inputValues[field]) {
        errors[field] = `${field} est obligatoire`;
      } else if (
        field === 'Adresse courriel' &&
        !isValidEmail(inputValues[field])
      ) {
        errors[field] = 'Adresse e-mail invalide';
      } else if (field === 'Mot de passe' && inputValues[field].length < 6) {
        errors[field] = 'Le mot de passe doit comporter au moins 6 caractères';
      } else if (
        field === 'Confirmation de mot de passe' &&
        inputValues[field] !== inputValues['Mot de passe']
      ) {
        errors[field] = 'Les mots de passe ne correspondent pas';
      }
    });

    return errors;
  };
  const isValidEmail = email => {
    // Implémentez votre logique de validation d'adresse e-mail ici
    return /\S+@\S+\.\S+/.test(email);
  };
  const validateFieldsSection2 = () => {
    const errors = {};

    if (!inputValues['Nom']) {
      errors['Nom'] = 'Nom est obligatoire';
    }

    if (!inputValues['Prénom']) {
      errors['Prénom'] = 'Prénom est obligatoire';
    }

    if (!birthdate) {
      errors['Date de naissance'] = 'Date de naissance est obligatoire';
    }
    if (!selectedWilaya) {
      errors['Ville natale'] = 'Ville natale est obligatoire';
    }
    if (!selectedCommune) {
      errors['Municipalité de naissance'] =
        'Municipalité de naissance est obligatoire';
    }
    return errors;
  };
  const validateFieldsSection3 = () => {
    const errors = {};

    if (!inputValues['Nationalité']) {
      errors['Nationalité'] = 'Nationalité est obligatoire';
    }

    if (!inputValues['Numero téléphone']) {
      errors['Numero téléphone'] = 'Le numéro de téléphone est obligatoire';
    } else if (!/^0[567][0-9]{8}$/.test(inputValues['Numero téléphone'])) {
      errors['Numero téléphone'] =
        'Le numéro de téléphone doit être au format 0XXXXXXXXX';
    }

    if (!inputValues['Nom en Arabe']) {
      errors['Nom en Arabe'] = 'Le nom en Arabe est obligatoire';
    } else if (!/[\u0600-\u06FF]/.test(inputValues['Nom en Arabe'])) {
      errors['Nom en Arabe'] =
        'Le nom en Arabe doit être écrit en caractères arabes';
    }

    if (!inputValues['Prénom en Arabe']) {
      errors['Prénom en Arabe'] = 'Le prénom en Arabe est obligatoire';
    } else if (!/[\u0600-\u06FF]/.test(inputValues['Prénom en Arabe'])) {
      errors['Prénom en Arabe'] =
        'Le prénom en Arabe doit être écrit en caractères arabes';
    }

    return errors;
  };
  const [isFocus, setIsFocus] = useState(false);
  const [isFocusMunicipality, setIsFocusMunicipality] = useState(false);
  const [selectedWilaya, setSelectedWilaya] = useState(null);
  const [activeIndex, setActiveIndex] = useState(route.params?.activeIndex || 0);
  const [formData, setFormData] = useState({
    // Initialiser avec les valeurs par défaut ou vides
    nin: '',
    passport: '', 
    address: '',
    postalCode: '',

  });
  const handleFormChange = newFormData => {
    setFormData(newFormData);
  };
  const [inputErrorsSection4, setInputErrorsSection4] = useState({});

  // Créez une fonction de validation pour la section 4
  const validateFieldsSection4 = () => {
    const errors = {};
  
    // Effectuez vos validations ici pour les champs de la section 4
    if (!formData.nin) {
      errors['Numéro d\'identification national (NIN)'] = 'Le NIN est obligatoire';
    }
  
    if (!formData.passport) {
      errors['Numéro de carte national / Passeport'] = 'Le numéro de passeport est obligatoire';
    }
  
    if (!formData.address) {
      errors['Adresse'] = 'L\'adresse est obligatoire';
    }
  
    if (!formData.postalCode) {
      errors['Code postal'] = 'Le code postal est obligatoire';
    }
  
    return errors;
  };
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '764473570697-nq57d471rbg8tios5fp2ir0saip2g5cs.apps.googleusercontent.com',
    });
  }, []);

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

  const signupWithYahoo = async () => {};

  // Fonction pour lier un utilisateur avec Google
  const signupWithGoogle = async () => {
    try {
      await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // Exchange the Google token for a Firebase credential
      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.idToken,
      );
      const userCredential = await auth().signInWithCredential(
        googleCredential,
      );
      // Check if the user is a new user or an existing user
      const additionalUserInfo = userCredential.additionalUserInfo;
      if (additionalUserInfo.isNewUser) {
        // New user, redirect to another page
        updateUserDataInFirestore(userCredential.user.uid, {
          adresseCourriel: userCredential.user.email,
        });
        console.log('E-mail de l\'utilisateur:', userCredential.user.email);
        handleNext();
      } else {
        // Existing user, handle accordingly
        alert(`L'utilisateur est déjà lié à ce compte Google.`);
      }
    } catch (error) {
      alert(`Erreur lors de la liaison de l'utilisateur avec compte Google.`);
      console.error(error);
    }
  };

  const handleSignup = () => {
    let fieldErrors = {};

    switch (activeIndex) {
      case 0:
        fieldErrors = validateFields();
        setInputErrors(fieldErrors);
        break;
      default:
        break;
    }

    if (Object.keys(fieldErrors).length > 0) {
      return;
    }
    auth()
      .createUserWithEmailAndPassword(
        inputValues['Adresse courriel'],
        inputValues['Mot de passe'],
      )
      .then(userCredential => {
        const user = userCredential.user;
        updateUserDataInFirestore(user.uid, {
          adresseCourriel: inputValues['Adresse courriel'],
        });
        handleNext();
        console.log('signed up', user.email);
      })
      .catch(handleAuthError);
  };

  const handleAuthError = error => {
    let errorMessage = "Une erreur s'est produite. Veuillez réessayer.";

    if (error.code === 'auth/invalid-email') {
      errorMessage =
        'Adresse e-mail invalide. Veuillez vérifier votre adresse e-mail.';
    } else if (error.code === 'auth/email-already-in-use') {
      errorMessage =
        'Cette adresse e-mail est déjà utilisée. Veuillez utiliser une autre adresse.';
    }

    alert(errorMessage);
  };

  const handleNext = async () => {
    if (activeIndex < sections.length - 1) {
      let fieldErrors = {};

      switch (activeIndex) {
        case 1:
          fieldErrors = validateFieldsSection2();
          setInputErrorsSection2(fieldErrors);
          setInputErrorsSection3({});
          break;
        case 2:
          // Valider les champs de la section 3
          fieldErrors = validateFieldsSection3();
          setInputErrorsSection3(fieldErrors);
          break;
        default:
          break;
      }

      if (Object.keys(fieldErrors).length > 0) {
        return;
      }
      const user = auth().currentUser;

      switch (activeIndex) {
        case 1:
          // Section 2 (Nom, Prénom, Date de naissance, Ville natale, Municipalité de naissance)
          const wilayaLabel = wilayas.find(wilaya => wilaya.value === selectedWilaya)?.label || '';
          await updateUserDataInFirestore(user.uid, {
            nom: inputValues['Nom'],
            prenom: inputValues['Prénom'],
            dateDeNaissance: birthdate,
            villeNatale: wilayaLabel,
            villeNataleValue:selectedWilaya,
            municipaliteNatale: selectedCommune,
          });
          break;
        case 2:
          // Section 3 (Nationalité, Numéro téléphone, Nom en Arabe, Prénom en Arabe)
          await updateUserDataInFirestore(user.uid, {
            nationalite: inputValues['Nationalité'],
            numeroTelephone: inputValues['Numero téléphone'],
            nomArabe: inputValues['Nom en Arabe'],
            prenomArabe: inputValues['Prénom en Arabe'],
          });
          break;

        default:
          break;
      }
      setActiveIndex(activeIndex + 1);
    }
  };
  const handleEnd = async () => {
    const user = auth().currentUser;
    // Valider les champs de la section 4
  const fieldErrors = validateFieldsSection4();
  setInputErrorsSection4(fieldErrors);

  if (Object.keys(fieldErrors).length > 0) {
    // S'il y a des erreurs, retournez simplement
    return;
  }
    await updateUserDataInFirestore(user.uid, {
      nin: formData.nin,
      passport: formData.passport,
      address:formData.address,
      postalCode:formData.postalCode
    });
    AsyncStorage.setItem('isSignedUp', "true");
    setInitialRoute('App')
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };
  const [birthdate, setBirthdate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const onChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setBirthdate(selectedDate);
    }
  };
  return (
    <KeyboardAwareScrollView style={styles.signupscreen}>
      <LogoSignup />
      {activeIndex === 0 && (
        <View style={styles.containerElementOne}>
          <Text style={styles.bonjour}>Créer un compte!</Text>
        </View>
      )}

      <View style={styles.container}>
        <ProgressBar
          progress={(activeIndex + 1) / sections.length}
          width={SCREEN_WIDTH - 40}
          color="#CC3E00"
          borderRadius={5}
          style={styles.progressContainer}
        />
        <View style={styles.sectionContainer}>
          {sections[activeIndex].inputs.map((input, index) => {
            if (input === 'Date de naissance') {
              return (
                <View key={index}>
                  <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                    <Input
                      key={index}
                      placeholder={input}
                      label={input}
                      leftIcon={{
                        type: 'font-awesome',
                        name: mapInputToIcon(input),
                        color: '#1B4242',
                      }}
                      value={birthdate ? birthdate.toDateString() : ''}
                      inputStyle={{color: '#1B4242'}}
                      inputContainerStyle={[
                        styles.inputContainer,
                        inputErrors[input] && {borderColor: 'red'}, // Gérer les erreurs ici
                        activeIndex === 1 &&
                          inputErrorsSection2[input] && {borderColor: 'red'},
                        activeIndex === 2 &&
                          inputErrorsSection3[input] && {borderColor: 'red'},
                      ]}
                      labelStyle={{color: '#1B4242'}}
                      editable={false}
                      onChangeText={text => setBirthdate(text)}
                      errorMessage={inputErrorsSection2['Date de naissance']}
                      errorStyle={styles.errorStyle}
                    />
                  </TouchableOpacity>
                  {showDatePicker && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={birthdate || new Date()}
                      mode="date"
                      is24Hour={true}
                      display="default"
                      onChange={onChange}
                    />
                  )}
                </View>
              );
            } else if (input === 'Ville natale') {
              return (
                <View extraScrollHeight={100} key={index} style={styles.containerSel}>
                  <Text style={styles.label}>Ville natale</Text>
                  <Dropdown
                    key={index}
                    style={[
                      styles.dropdown,
                      inputErrorsSection2['Ville natale']
                        ? {borderColor: 'red'}
                        : null,
                      isFocus && {borderColor: '#bb0622'},
                    ]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={wilayas}
                    maxHeight={500}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Ville natale' : '...'}
                    value={selectedWilaya}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      setSelectedWilaya(item.value);
                      setIsFocus(false);
                      handleWilayaChange(item.value);
                    }}
                    renderLeftIcon={() => (
                      <Icon
                        name={'building'}
                        size={20}
                        color={isFocus ? '#bb0622' : '#1B4242'}
                      />
                    )}
                    dropdownPosition="top"
                  />
                  {inputErrorsSection2['Ville natale'] && (
                    <Text
                      style={[
                        styles.errorText,
                        {color: 'red', fontSize: 12, marginLeft: 8},
                      ]}>
                      {inputErrorsSection2['Ville natale']}
                    </Text>
                  )}
                </View>
              );
            } else if (input === 'Municipalité de naissance') {
              return (
                <View key={index} style={styles.containerSel}>
                  <Text style={styles.label}>Municipalité de naissance</Text>
                  <Dropdown
                    key={index}
                    style={[
                      styles.dropdown,
                      inputErrorsSection2['Municipalité de naissance']
                        ? {borderColor: 'red'}
                        : null,
                      isFocusMunicipality && {borderColor: '#bb0622'},
                    ]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={communes}
                    maxHeight={500}
                    labelField="label"
                    valueField="value"
                    placeholder={
                      !isFocusMunicipality ? 'Municipalité de naissance' : '...'
                    }
                    value={selectedCommune}
                    onFocus={() => setIsFocusMunicipality(true)}
                    onBlur={() => setIsFocusMunicipality(false)}
                    onChange={item => {
                      setSelectedCommune(item.value);
                      setIsFocus(false);
                    }}
                    renderLeftIcon={() => (
                      <Icon
                        name={'map'}
                        size={20}
                        color={isFocusMunicipality ? '#bb0622' : '#1B4242'}
                      />
                    )}
                    disabled={!selectedWilaya}
                    dropdownPosition="top"
                  />
                  {inputErrorsSection2['Municipalité de naissance'] && (
                    <Text
                      style={[
                        styles.errorText,
                        {color: 'red', fontSize: 12, marginLeft: 8},
                      ]}>
                      {inputErrorsSection2['Municipalité de naissance']}
                    </Text>
                  )}
                </View>
              );
            } else {
              return (
                <Input
                  key={index}
                  placeholder={input}
                  label={input}
                  leftIcon={{
                    type: 'font-awesome',
                    name: mapInputToIcon(input),
                    color: '#1B4242',
                  }}
                  inputStyle={{color: '#1B4242'}}
                  inputContainerStyle={[
                    styles.inputContainer,

                    inputErrors[input] && {borderColor: 'red'},

                    activeIndex === 1 &&
                      inputErrorsSection2[input] && {borderColor: 'red'},
                    activeIndex === 2 &&
                      inputErrorsSection3[input] && {borderColor: 'red'},
                  ]}
                  labelStyle={{color: '#1B4242'}}
                  value={inputValues[input]}
                  onChangeText={text =>
                    setInputValues(prevValues => ({
                      ...prevValues,
                      [input]: text,
                    }))
                  }
                  errorMessage={
                    (activeIndex === 0 && inputErrors[input])||
                    (activeIndex === 1 && inputErrorsSection2[input]) ||
                    (activeIndex === 2 && inputErrorsSection3[input])
                  }
                  errorStyle={styles.errorStyle} // Utilisez errorStyle pour définir le style du message d'erreur
                  secureTextEntry={
                    input === 'Mot de passe' ||
                    input === 'Confirmation de mot de passe'
                  }
                  keyboardType={input === 'Numero téléphone' ? 'numeric' : 'default'} 
                />
              );
            }
          })}
        </View>
      </View>
      {activeIndex === 3 && (
        <View style={{marginTop: -25}}>
          <Text style={styles.bonjour}> Choisissez la méthode d’entrée</Text>
          <SegmentForm onValuesChange={handleFormChange}
          inputErrorsSection4={inputErrorsSection4}
          setInputErrorsSection4={setInputErrorsSection4}
           />
        </View>
      )}
      <RenderButtons
        activeIndex={activeIndex}
        handlePrev={handlePrev}
        handleNext={handleNext}
        sections={sections}
        handleSignup={handleSignup}
        signupWithGoogle={signupWithGoogle}
        handleEnd={handleEnd}
      />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderColor: '#1B4242',
    borderBottomWidth: 3,
    marginBottom: -15,
  },
  errorStyle: {
    marginTop: 15, 
  },
  containerSel: {
    padding: 9,
  },
  dropdown: {
    height: 50,
    borderColor: '#1B4242',
    borderBottomWidth: 3,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1B4242',
  },
  placeholderStyle: {
    marginLeft: 10,
    fontSize: 18,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 30,
    height: 30,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderColor: '#bb0622',
  },
  signupscreen: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },

  containerElementOne: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  bonjour: {
    fontSize: 24,
    color: '#1B4242',
    fontFamily: 'kreon.regular',
    fontWeight: 'bold',
    letterSpacing: 0,
  },

  container: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  progressContainer: {
    marginBottom: 20,
  },
  sectionContainer: {
    width: SCREEN_WIDTH - 40,
  },
});
export default SignupScreen;
