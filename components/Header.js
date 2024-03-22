import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Modal,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {documentCategories as etatCivilData} from '../screens/CategoriesScreen/EtatCivil/ScreenEtatCivil';
import {documentCategories as aidesSocialesData} from '../screens/CategoriesScreen/AidesSocial/ScreenAidesSociales';
import {documentCategories as affairesReligieusesData} from '../screens/CategoriesScreen/AffairesReligieuses/ScreenAffairesReligieuses';
import {documentCategories as cultureSportData} from '../screens/CategoriesScreen/CultureSport/ScreenCultureSport';
import {documentCategories as droitJusticeData} from '../screens/CategoriesScreen/DroitJustice/ScreenDroitJustice';
import {documentCategories as educationEnseignementData} from '../screens/CategoriesScreen/EducationEnseignement/ScreenEducationEnseignement';
import {documentCategories as securiteSocialData} from '../screens/CategoriesScreen/SecuriteSocial/ScreenSecuriteSocial';
import {documentCategories as transportData} from '../screens/CategoriesScreen/Transport/ScreenTransport';
import {documentCategories as travailEmploiData} from '../screens/CategoriesScreen/TravailEmploi/ScreenTravailEmploi';
import ModalComponentEtatCivil from '../screens/CategoriesScreen/EtatCivil/ModalComponent';
import ModalComponentAidesSociales from '../screens/CategoriesScreen/AidesSocial/ModalComponent';
import ModalComponentAffaireReligieuses from '../screens/CategoriesScreen/AffairesReligieuses/ModalComponent';
import ModalComponentCultureSport from '../screens/CategoriesScreen/CultureSport/ModalComponent';
import ModalComponentDroitJustice from '../screens/CategoriesScreen/DroitJustice/ModalComponent';
const Header = ({showSearch = true}) => {
  const [userprofil, setUser] = useState('');

  const [searchText, setSearchText] = useState('');
  const [modalVisible1, setModalVisible1] = useState(false);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const openModalWithDocument = ({categoryName, document}) => {
    setSelectedDocument({categoryName, document});
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedDocument(null);
  };

  // Récupérez tous les éléments des catégories
  const allCategories = [
    {name: 'État civil', data: etatCivilData},
    {name: 'Aides sociales', data: aidesSocialesData},
    {name: 'Affaires religieuses', data: affairesReligieusesData},
    {name: 'Culture-Sport', data: cultureSportData},
    {name: 'Droit-Justice', data: droitJusticeData},
    {name: 'Éducation-Enseignement', data: educationEnseignementData},
    {name: 'Sécurité social', data: securiteSocialData},
    {name: 'Transport', data: transportData},
    {name: 'Travail-Emploi', data: travailEmploiData},
    // Ajoutez d'autres catégories ici si nécessaire
  ];
  const allItems = allCategories.reduce((acc, category) => {
    category.data.forEach(cat => {
      cat.items.forEach(item => {
        acc.push({categoryName: category.name, categoryTitle: cat.title, item});
      });
    });
    return acc;
  }, []);

  // Filtrez les éléments en fonction du texte saisi
  const filteredItems = allItems.filter(item =>
    item.item.toLowerCase().includes(searchText.toLowerCase()),
  );
  const getModalComponent = ({categoryName, document, closeModal}) => {
    if (!categoryName) {
      return null; // Retourner null si categoryName n'est pas défini
    }
    switch (categoryName) {
      case 'État civil':
        return (
          <ModalComponentEtatCivil
            visible={true}
            document={document}
            closeModal={closeModal}
          />
        );
      case 'Aides sociales':
        return (
          <ModalComponentAidesSociales
            visible={true}
            document={document}
            closeModal={closeModal}
          />
        );
      case 'Affaires religieuses':
        return (
          <ModalComponentAffaireReligieuses
            visible={true}
            document={document}
            closeModal={closeModal}
          />
        );
      case 'Culture-Sport':
        return (
          <ModalComponentCultureSport
            visible={true}
            document={document}
            closeModal={closeModal}
          />
        );
      case 'Droit-Justice':
        return (
          <ModalComponentDroitJustice
            visible={true}
            document={document}
            closeModal={closeModal}
          />
        );
      case 'Éducation-Enseignement':
        return (
          <ModalComponentEdu
            visible={true}
            document={document}
            closeModal={closeModal}
          />
        );
      case 'Sécurité social':
        return (
          <ModalComponentSecurite
            visible={true}
            document={document}
            closeModal={closeModal}
          />
        );
      case 'Transport':
        return (
          <ModalComponentTransport
            visible={true}
            document={document}
            closeModal={closeModal}
          />
        );
      case 'Travail-Emploi':
        return (
          <ModalComponentTravailEmploi
            visible={true}
            document={document}
            closeModal={closeModal}
          />
        );
      default:
        return null;
    }
  };
  const ModalComponent = getModalComponent(
    selectedDocument ? selectedDocument.categoryName : '',
  );

  const [userName, setUserName] = useState('');
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async user => {
      if (user) {
        const userId = user.uid;
  
        const userDocRef = firestore().collection('utilisateurs').doc(userId);
        const unsubscribeFromUserDoc = userDocRef.onSnapshot(snapshot => {
          if (snapshot && snapshot.exists) {
            const userData = snapshot.data();
            setUserName(`${userData.nom} ${userData.prenom}`);
            setUser(userData);
          }
        });
  
        // Retourner une fonction de nettoyage pour annuler l'abonnement lorsque le composant est démonté
        return () => {
          unsubscribeFromUserDoc();
        };
      }
    });
  
    // Retourner une fonction de nettoyage pour annuler l'abonnement lorsque le composant est démonté
    return () => {
      unsubscribe();
    };
  }, []);
  

  const defaultImage = require('../assets/profile.jpg');
  return (
    <View>
      <ImageBackground
        source={require('../assets/header.jpg')}
        imageStyle={styles.container}>
        <View style={{padding: 20}}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Image
                source={
                  userprofil.photoURL
                    ? {uri: userprofil.photoURL}
                    : defaultImage
                }
                style={styles.profile}
              />
            </TouchableOpacity>

            <Text style={styles.greeting}>
              {userName ? `Bonjour, ${userName}` : 'Chargement...'}
            </Text>
            <View style={styles.navIconContainer}>
              <TouchableOpacity
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                <Icon name="navicon" size={40} color="#1B4242" />
              </TouchableOpacity>
            </View>
          </View>

          {showSearch && (
            <View style={styles.inputContainer}>
              <TouchableOpacity onPress={() => setModalVisible1(true)}>
                <TextInput
                  style={styles.search}
                  placeholder="Recherche"
                  value={searchText}
                  onChangeText={setSearchText}
                  editable={false}
                  onPressIn={() => setModalVisible1(true)}
                />
                <Icon
                  name="search"
                  size={20}
                  color="#1B4242"
                  style={styles.searchIcon}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ImageBackground>

      {/* le modal de recherche */}
      <Modal visible={modalVisible1} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  marginRight: 10,
                  width: 40,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 45,
                  backgroundColor: 'white',
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible1(!modalVisible1);
                  }}>
                  <Icon name={'arrow-left'} size={20} color="black" />
                </TouchableOpacity>
              </View>

              <View style={{flex: 1}}>
                <TextInput
                  style={styles.search}
                  placeholder="Rechercher..."
                  onChangeText={text => setSearchText(text)}
                  value={searchText}
                />
                <Icon
                  name="search"
                  size={20}
                  color="#1B4242"
                  style={styles.searchIcon}
                />
              </View>
            </View>

            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black',
                marginVertical: 8,
              }}>
              {' '}
              Raccourcis
            </Text>

            <FlatList
              data={filteredItems}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <View>
                  {index === 0 ||
                  filteredItems[index - 1].categoryTitle !==
                    item.categoryTitle ? (
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: 'black',
                        marginVertical: 8,
                      }}>
                      {item.categoryName} - {item.categoryTitle}
                    </Text>
                  ) : null}
                  <TouchableOpacity
                    onPress={() =>
                      openModalWithDocument({
                        categoryName: item.categoryName,
                        document: item.item,
                      })
                    }>
                    <Text
                      style={{fontSize: 16, color: 'black', marginVertical: 8}}>
                      {item.item}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </View>
      </Modal>
      {selectedDocument && (
        <View>{getModalComponent({...selectedDocument, closeModal})}</View>
      )}
    </View>
  );
};

// Les styles CSS pour le header et ses éléments
const styles = StyleSheet.create({
  container: {
    flex: 1,
    opacity: 0.5,
    height: 'auto',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  greeting: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'black',
  },
  navIconContainer: {
    marginLeft: 'auto',
  },
  searchIcon: {
    position: 'absolute',
    right: 15,
    top: 17.5,
    elevation: 6,
  },
  inputContainer: {
    position: 'relative',
    marginTop: 20,
  },
  search: {
    height: 55,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 40,
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
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    paddingVertical: 20,
    padding: 10,
    borderRadius: 10,
    width: '100%',
    height: '100%',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  closeModalButton: {
    alignItems: 'center',
    marginTop: 10,
  },
  closeModalButtonText: {
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default Header;
