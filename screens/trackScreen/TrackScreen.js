import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
} from 'react-native';
import Header from '../../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const TrackScreen = () => {
  const [demandesID, setDemandesID] = useState([]);
  const [demandesPassport, setDemandesPassport] = useState([]);
  const [demandesPermisConduire, setDemandesPermisConduire] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [demandeToDelete, setDemandeToDelete] = useState(null);

  useEffect(() => {
    const currentUser = auth().currentUser;
    if (!currentUser) {
      return;
    }

    const userId = currentUser.uid;
    const idPermisConduireRef = firestore()
      .collection('utilisateurs')
      .doc(userId)
      .collection('PermisConduire')
      .doc('DocumentPermisConduire');
    const idDataRef = firestore()
      .collection('utilisateurs')
      .doc(userId)
      .collection('IDData')
      .doc('DocumentID');
    const idPassportRef = firestore()
      .collection('utilisateurs')
      .doc(userId)
      .collection('Passport')
      .doc('DocumentPassport');

    const unsubscribePermisConduire = idPermisConduireRef.onSnapshot(
      snapshot => {
        const permisConduireData = snapshot.data();
        setDemandesPermisConduire(
          permisConduireData
            ? [
                {
                  id: snapshot.id,
                  type: 'PermisConduire',
                  imageSource: require('../../assets/PConduire.jpg'),
                  text: 'Suivi de la demande de permis de conduire',
                  dateDepot: permisConduireData.DateDepotPermisConduire,
                },
              ]
            : [],
        );
      },
    );

    const unsubscribeIDData = idDataRef.onSnapshot(snapshot => {
      const idData = snapshot.data();
      setDemandesID(
        idData
          ? [
              {
                id: snapshot.id,
                type: 'IDData',
                imageSource: require('../../assets/IDCard.jpg'),
                text: 'Suivi de la demande de carte nationale biométrique',
                dateDepot: idData.dateDepot,
              },
            ]
          : [],
      );
    });
    const unsubscribePassport = idPassportRef.onSnapshot(snapshot => {
      const passportData = snapshot.data();
      setDemandesPassport(
        passportData
          ? [
              {
                id: snapshot.id,
                type: 'Passport',
                imageSource: require('../../assets/passport.jpg'),
                text: 'Suivi de la demande de passeport',
                dateDepot: passportData.DateDepotPassport,
              },
            ]
          : [],
      );
    });
    return () => {
      unsubscribePermisConduire();
      unsubscribeIDData();
      unsubscribePassport();
    };
  }, []);

  const handleDeleteConfirmation = (id, type) => {
    setDemandeToDelete({id, type});
    setModalVisible(true);
  };

  const handleDeleteDemande = () => {
    const currentUser = auth().currentUser;
    const {id, type} = demandeToDelete;
    if (currentUser && demandeToDelete) {
      const userId = currentUser.uid;
      const demandeRef = firestore()
        .collection('utilisateurs')
        .doc(userId)
        .collection(type)
        .doc(id);
      demandeRef
        .delete()

        .then(() => {
          console.log('Demande deleted successfully!');
          setModalVisible(false);
          if (type === 'PermisConduire') {
            setDemandesPermisConduire([]);
          } else if (type === 'IDData') {
            setDemandesID([]);
          } else if (type === 'Passport') {
            setDemandesPassport([]);
          }
        })
        .catch(error => {
          console.error('Error deleting demande: ', error);
        });
    }
  };

  const renderTrackItem = ({item}) => {
    return (
      <View
        key={item.id}
        style={{
          marginLeft: 10,
          marginRight: 10,
          marginVertical: 10,
          backgroundColor: 'white',
          borderRadius: 20,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}>
        <TouchableOpacity>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={item.imageSource}
              style={{
                width: 100,
                height: 100,
                marginRight: 10,
                borderRadius: 20,
              }}
            />
            <View style={{flex: 1, margin: 5}}>
              <Text
                style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}
                numberOfLines={2}
                ellipsizeMode="tail">
                {item.text}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text>
                  <Icon name={'calendar'} size={15} color="#5C8374" /> date de
                  depot: {item.dateDepot}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: 'red',
                paddingHorizontal: 15,
                paddingVertical: 40,
                borderRadius: 10,
              }}
              onPress={() => handleDeleteConfirmation(item.id, item.type)}>
              <Icon name={'trash-o'} size={30} color="black" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <Header showSearch={false} />
      <Text
        style={{
          fontSize: 25,
          fontWeight: 'bold',
          color: 'black',
          marginLeft: 10,
          marginTop: 10,
        }}>
        Suivre mes demandes
      </Text>
      <FlatList
        data={demandesID.concat(demandesPermisConduire, demandesPassport)}
        renderItem={renderTrackItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <Text style={{fontSize: 16, marginTop: 70, alignSelf: 'center'}}>
            Il n'y a pas de demandes à afficher.
          </Text>
        }
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
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

            <Text style={{color: 'black', fontSize: 20}}>
              Voulez-vous supprimer cette demande?
            </Text>
            <TouchableOpacity
              style={{
                marginTop: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              title="Delete"
              onPress={handleDeleteDemande}>
              <Text
                style={{
                  fontSize: 16,
                  color: 'white',
                  backgroundColor: 'red',
                  paddingHorizontal: 40,
                  paddingVertical: 15,
                  borderRadius: 10,
                }}>
                Supprimer
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
    </View>
  );
};

export default TrackScreen;
