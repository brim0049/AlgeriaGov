
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
import ModalComponentSecurite from './ModalComponent';
export const documentCategories = [
  {
    id: 1,
    title: "Retraite",
    items: [
      'e-Retraite : Compte du retraité en ligne',
      'e-Retraite : Demande de retraite en ligne',
      'Suivi du dossier de retraite',
      "Compte Individuel du Salarié (CIS)",
    ],
  },
  {
    id: 2,
    title: "Salariés",
    items: [
      'Edition des attestations de mise à jour de sécurité sociale',
      'Déclaration des assiettes de cotisation de sécurité sociale',
      'Paiement des cotisations de sécurité sociale à travers le paiement électronique',
      "Vérification et dépôt des Déclarations Annuelles des Salaires et des salariés (DAS)",
    ],
  },
  {
    id: 3,
    title: "Non salariés",
    items: [
      'La consultation de l’historique des consommations de médicament par les non salariés',
      'Dépôt des bordereaux pharmaceutiques par les non salariés',
      'Demande d’accord médical a priori à distance par les non salariés',
      "Simulation de calcul d'une cotisation et de la majoration de retard de sécurité sociale des non salariés",
    ],
  },
  {
    id: 4,
    title: "Autres",
    items: [
      'Télédéclaration annuelles des salaires et des salariés des entreprises activant dans le secteur du BTPH',
      "Télédéclaration des arrêts de travail pour cause d'intempéries des entreprises activant dans le secteur du BTPH",
      "Déclaration en ligne de l'assiette complémentaire de cotisations des entreprises activant dans le secteur du BTPH",
      "Déclaration de reprise d'activité des entreprises activant dans le secteur du BTPH après un arrêt de travail pour cause d'intempéries",
    ],
  },

];
export default function ScreenSecuriteSocial() {
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
      <ModalComponentSecurite
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
