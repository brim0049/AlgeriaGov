import React, {useState} from 'react';
import {
  Text,
  Image,
  FlatList,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SearchInput from '../../../components/cathegories/SearchInput';
import ModalComponentEdu from './ModalComponent';
export const documentCategories = [
  {
    id: 1,
    title: 'Enseignement supérieur',
    items: [
      'Plateforme de Gestion des Projets de Recherche Formation-Universitaire',
      'Plateforme du nouveau bachelier',
      "Portail d'inscription des étudiants titulaires d'un baccalauréat étranger",
      //   'Plateforme de candidature au concours de doctorat',
      "Plateforme d'authentification des diplômes universitaires",
      'Plateforme des équivalence des diplômes étrangers',
      'Plateforme des œuvres universitaire',
      //"Plateforme de prise en charge des boursier à l'étranger",
      'Plateforme Programmes Nationaux de Recherche (PNR)',
    //  "Plateforme de demande de création d'un établissement privé de formation supérieure",
  //    'Plateforme des doléances',
      'Plateforme de transport universitaire',
    ],
  },
  {
    id: 2,
    title: 'Primaire-moyen-secondaire',
    items: [
      "Inscrire à l'examen du baccalauréat (BAC)",
      "Inscrire à l'examen du brevet d'enseignement moyen (BEM)",
      "Suivre les inscriptions du fin de cycle primaire",
      "Inscription aux concours d'examens professionnels",
      "Plateforme des parents d'élèves",
      'Plateforme de formation à distance',
    ],
  },
  {
    id: 3,
    title: 'Formation Professionnelle',
    items: [
      "Accès à la formation et l'enseignement professionnels via MIHNATI",
    ],
  },

];
export default function ScreenEducationEnseignement() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const openModalWithDocument = document => {
    setSelectedDocument(document);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedDocument(null);
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <SearchInput />
      <View style={{flex: 1, backgroundColor: '#f4f2ec'}}>
        <View style={styles.container}>
          <FlatList
            data={documentCategories}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View key={item.id} style={styles.continerItem}>
                <Text style={styles.textTitle}>{item.title}</Text>

                {item.items.map((document, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => openModalWithDocument(document)}>
                    <View
                      style={{
                        ...styles.items,
                        borderBottomWidth:
                          index !== item.items.length - 1 ? 1 : 0,
                      }}>
                      <View style={styles.viewItem}>
                        <View style={styles.englobe}>
                          <Text style={styles.number}>{index + 1}</Text>
                          <View style={{marginLeft: 5}}>
                            <Text
                              numberOfLines={2}
                              style={{
                                fontSize: 18,
                                color: '#000',
                                flexWrap: 'wrap',
                                height: 'auto',
                              }}
                              key={index}>
                              {document}
                            </Text>
                          </View>
                        </View>
                        <Icon
                          name={'chevron-right'}
                          size={16}
                          color="#000"
                          style={{alignSelf: 'center'}}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          />
        </View>
      </View>
      <ModalComponentEdu
        visible={modalVisible}
        document={selectedDocument}
        closeModal={closeModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f2ec',
    marginHorizontal: 10,
  },
  continerItem: {
    marginTop: 15,
    borderRadius: 15,
    marginBottom: 10,
    backgroundColor: 'white',
    opacity: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  textTitle: {
    marginTop: 5,
    marginLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  items: {
    height: 70,
    alignSelf: 'center',
    borderRadius: 30,
    width: '100%',
    borderBottomColor: '#848484',
    paddingBottom: 10,
  },
  viewItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 20,
    alignItems: 'center',
  },
  number: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4a3d3d',
    textAlign: 'center',
    backgroundColor: '#f4f2ec',
    height: 20,
    width: 20,
    borderRadius: 25,
    lineHeight: 20,
  },
  englobe: {
    margin: 20,
    flexDirection: 'row',
    flex: 1,
    height: 45,
  },
});
