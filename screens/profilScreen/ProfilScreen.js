import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Dropdown} from 'react-native-element-dropdown';
import wilayas from '../../assets/data/wilayas';
import * as ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';
const ProfilScreen = () => {
  const [user, setUser] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [isFocusMunicipality, setIsFocusMunicipality] = useState(false);
  const [selectedWilaya, setSelectedWilaya] = useState(null);
  const [selectedCommune, setSelectedCommune] = useState('');
  const [communes, setCommunes] = useState([]);
  const fieldLabels = {
    nom: 'le nom',
    prenom: 'le prénom',
    villeNatale: 'la ville natale',
    municipaliteNatale: 'la commune',
    address: "l'adresse",
    postalCode: 'le code postal',
    nomArabe: 'le nom en Arabe',
    prenomArabe: 'le prénom en Arabe',
  };
  const handleWilayaChange = wilaya => {
    setSelectedWilaya(wilaya);
    const selectedWilayaData = wilayas.find(item => item.value === wilaya);
  };
  const selectImage = () => {
    const options = {
      maxWidth: 800,
      maxHeight: 600,
      quality: 0.7,
    };
  
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("L'utilisateur a annulé la sélection d'image");
      } else if (response.error) {
        console.log('Une erreur s\'est produite : ', response.error);
      } else if (response.assets && response.assets.length > 0) {
        // Accédez au premier élément du tableau assets pour obtenir l'URI
        const source = { uri: response.assets[0].uri };
        console.log('Image sélectionnée : ', source);
        uploadImage(source);
      } else {
        console.log('Aucune image sélectionnée');
      }
    });
  };
  
  
  const uploadImage = async (source) => {
    // Vérifiez que source.uri est une chaîne de caractères
    if (typeof source.uri === 'string') {
      const reference = storage().ref(`profile_pictures/${auth().currentUser.uid}`);
      const task = reference.putFile(source.uri);
  
      task.then(() => {
        return reference.getDownloadURL();
      })
      .then((url) => {
        console.log('Image téléchargée avec succès : ', url);
        // Mettez à jour l'URL de l'image dans Firestore
        return firestore()
          .collection('utilisateurs')
          .doc(auth().currentUser.uid)
          .update({ photoURL: url });
      })
      .catch((error) => {
        console.error('Erreur lors du téléchargement de l\'image : ', error);
      });
    } else {
      console.error('Le chemin du fichier n\'est pas une chaîne de caractères : ', source.uri);
    }
  };
  
  

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('utilisateurs')
      .doc(auth().currentUser.uid)
      .onSnapshot(snapshot => {
        if (snapshot.exists) {
          const userData = snapshot.data();
          setUser(userData);
        }
      });

    return () => unsubscribe();
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [modalField, setModalField] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const openModal = field => {
    setModalVisible(true);
    setModalField(field);
    setInputValue(user[field]);
  };

  const updateValue = async () => {
    const userId = auth().currentUser;
    let updatedValue = inputValue;
    if (modalField === 'villeNatale') {
      const wilayaLabel =
        wilayas.find(wilaya => wilaya.value === selectedWilaya)?.label || '';
      updatedValue = wilayaLabel;
      updateValueWilaya(selectedWilaya);
      const selectedWilayaData = wilayas.find(
        item => item.value === selectedWilaya,
      );
      if (selectedWilayaData) {
        const newCommunes = selectedWilayaData.communes.map(commune => ({
          label: commune,
          value: commune,
        }));
        setCommunes(newCommunes);
        setSelectedCommune(newCommunes[0].value);
        updateValueCommune(newCommunes[0].value);
      }
    }
    await firestore()
      .collection('utilisateurs')
      .doc(userId.uid)
      .update({
        [modalField]: updatedValue,
      });
    setModalVisible(false);
  };
  const updateValueCommune = async updatedValue => {
    const userId = auth().currentUser;
    await firestore().collection('utilisateurs').doc(userId.uid).update({
      municipaliteNatale: updatedValue,
    });
  };
  const updateValueWilaya = async updatedValue => {
    const userId = auth().currentUser;
    await firestore().collection('utilisateurs').doc(userId.uid).update({
      villeNataleValue: updatedValue,
    });
  };
  const defaultImage = require('../../assets/profile.jpg');

  return (
    <KeyboardAwareScrollView style={{flex: 1, backgroundColor: '#f4f2ec'}}>
      <View style={{alignItems: 'center', marginVertical: 5}}>
        <TouchableOpacity onPress={selectImage}>
          <Image
  source={user.photoURL ? { uri: user.photoURL } : defaultImage}
  style={{
              width: 140,
              height: 140,
              borderRadius: 70,
              borderWidth: 4,
              borderColor: 'white',
              overflow: 'hidden',
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: 'black',
            fontSize: 18,
            fontWeight: 500,
            marginTop: 10,
          }}>
          {user ? `${user.nom} ${user.prenom}` : 'Chargement...'}
        </Text>
        <View
          style={{
            borderColor: 'white',
            borderWidth: 2.5,
            width: '100%',
            margin: 20,
          }}></View>
        <TouchableOpacity
          onPress={() => openModal('nom')}
          style={{
            alignSelf: 'flex-start',
            marginHorizontal: 10,
            marginTop: 20,
            width: '100%',
            paddingBottom: 15,
            borderBottomColor: 'white',
            borderBottomWidth: 1,
          }}>
          <Text style={{fontSize: 18, color: 'black', fontWeight: '500'}}>
            Nom
          </Text>
          <Text
            style={{
              fontSize: 15,
              marginTop: 10,
              marginLeft: 20,
              fontWeight: '400',
            }}>
            {user.nom}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => openModal('prenom')}
          style={{
            alignSelf: 'flex-start',
            marginHorizontal: 10,
            marginTop: 20,
            width: '100%',
            paddingBottom: 15,
            borderBottomColor: 'white',
            borderBottomWidth: 1,
          }}>
          <Text style={{fontSize: 18, color: 'black', fontWeight: '500'}}>
            Prénom
          </Text>
          <Text
            style={{
              fontSize: 15,
              marginTop: 10,
              marginLeft: 20,
              fontWeight: '400',
            }}>
            {user.prenom}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => openModal('villeNatale')}
          style={{
            alignSelf: 'flex-start',
            marginHorizontal: 10,
            marginTop: 20,
            width: '100%',
            paddingBottom: 15,
            borderBottomColor: 'white',
            borderBottomWidth: 1,
          }}>
          <Text style={{fontSize: 18, color: 'black', fontWeight: '500'}}>
            Ville natale
          </Text>
          <Text
            style={{
              fontSize: 15,
              marginTop: 10,
              marginLeft: 20,
              fontWeight: '400',
            }}>
            {user.villeNatale}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => openModal('municipaliteNatale')}
          style={{
            alignSelf: 'flex-start',
            marginHorizontal: 10,
            marginTop: 20,
            width: '100%',
            paddingBottom: 15,
            borderBottomColor: 'white',
            borderBottomWidth: 1,
          }}>
          <Text style={{fontSize: 18, color: 'black', fontWeight: '500'}}>
            Municipalité de naissance
          </Text>
          <Text
            style={{
              fontSize: 15,
              marginTop: 10,
              marginLeft: 20,
              fontWeight: '400',
            }}>
            {user.municipaliteNatale}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => openModal('address')}
          style={{
            alignSelf: 'flex-start',
            marginHorizontal: 10,
            marginTop: 20,
            width: '100%',
            paddingBottom: 15,
            borderBottomColor: 'white',
            borderBottomWidth: 1,
          }}>
          <Text style={{fontSize: 18, color: 'black', fontWeight: '500'}}>
            Adresse
          </Text>
          <Text
            style={{
              fontSize: 15,
              marginTop: 10,
              marginLeft: 20,
              fontWeight: '400',
            }}>
            {user.address}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => openModal('postalCode')}
          style={{
            alignSelf: 'flex-start',
            marginHorizontal: 10,
            marginTop: 20,
            width: '100%',
            paddingBottom: 15,
            borderBottomColor: 'white',
            borderBottomWidth: 1,
          }}>
          <Text style={{fontSize: 18, color: 'black', fontWeight: '500'}}>
            Code postal
          </Text>
          <Text
            style={{
              fontSize: 15,
              marginTop: 10,
              marginLeft: 20,
              fontWeight: '400',
            }}>
            {user.postalCode}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => openModal('nomArabe')}
          style={{
            marginRight: 20,
            marginLeft: 20,
            marginTop: 20,
            width: '100%',
            paddingBottom: 15,
            borderBottomColor: 'white',
            borderBottomWidth: 1,
          }}>
          <Text
            style={{
              fontSize: 18,
              color: 'black',
              fontWeight: '500',
              marginLeft: 10,
            }}>
            Nom en Arabe
          </Text>
          <Text
            style={{
              fontSize: 15,
              marginTop: 10,
              fontWeight: '400',
              marginRight: 20,
            }}>
            {user.nomArabe}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => openModal('prenomArabe')}
          style={{
            marginRight: 20,
            marginLeft: 20,
            marginTop: 20,
            width: '100%',
            paddingBottom: 15,
            borderBottomColor: 'white',
            borderBottomWidth: 1,
          }}>
          <Text
            style={{
              fontSize: 18,
              color: 'black',
              fontWeight: '500',
              marginLeft: 10,
            }}>
            Prénom en Arabe
          </Text>
          <Text
            style={{
              fontSize: 15,
              marginTop: 10,
              fontWeight: '400',
              marginRight: 20,
            }}>
            {user.prenomArabe}
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        {/* Modal Content */}
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 10,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}>
            <Image
              style={{
                width: 60,
                height: 60,
                alignSelf: 'center',
              }}
              resizeMode="cover"
              source={require('../../assets/GovLogo.png')}
            />

            <Text style={{color: 'black', fontSize: 20, margin:20}}>Voulez-vous corriger {fieldLabels[modalField]}?</Text>
            {modalField === 'villeNatale' && (
              <Dropdown
                data={wilayas}
                maxHeight={500}
                labelField="label"
                valueField="value"
                dropdownPosition="top"
                placeholder={!isFocus ? user.villeNatale : '...'}
                value={selectedWilaya}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setSelectedWilaya(item.value);
                  setIsFocus(false);
                  setInputValue(item.value);
                  setButtonDisabled(item.value === user.villeNataleValue);
                  handleWilayaChange(item.value);
                  setSelectedCommune(communes[0]);
                }}
              />
            )}
            {modalField === 'municipaliteNatale' && (
              <Dropdown
                data={communes}
                maxHeight={500}
                labelField="label"
                valueField="value"
                dropdownPosition="top"
                placeholder={
                  !isFocusMunicipality ? user.municipaliteNatale : '...'
                }
                value={selectedCommune}
                onFocus={() => setIsFocusMunicipality(true)}
                onBlur={() => setIsFocusMunicipality(false)}
                onChange={item => {
                  setSelectedCommune(item.value);
                  setIsFocusMunicipality(false);
                  setInputValue(item.value);
                  setButtonDisabled(item.value === user.municipaliteNatale);
                }}
              />
            )}
            {modalField !== 'villeNatale' &&
              modalField !== 'municipaliteNatale' && (
                <TextInput
                  style={{
                    height: 50,
                    margin: 12,
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: '#ccc',

                    padding: 10,
                    backgroundColor: '#fff',
                    opacity: 0.9,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 9,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                  }}
                  value={inputValue}
                  onChangeText={text => {
                    setInputValue(text);
                    setButtonDisabled(text === user[modalField]);
                  }}
                />
              )}
            <TouchableOpacity
              style={{
                marginTop: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              disabled={buttonDisabled}
              onPress={updateValue}>
              <Text
                style={{
                  fontSize: 16,
                  color: 'white',
                  backgroundColor: buttonDisabled ? 'gray' : 'blue',
                  paddingHorizontal: 40,
                  paddingVertical: 15,
                  borderRadius: 10,
                }}>
                Appliquer
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginTop: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              title="Cancel"
              onPress={() => setModalVisible(false)}>
              <Text
                style={{
                  fontSize: 16,
                  color: 'black',
                  backgroundColor: 'lightgrey',
                  paddingHorizontal: 50,
                  paddingVertical: 15,
                  borderRadius: 10,
                }}>
                Annuler
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default ProfilScreen;
