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
import ModalComponentAffaireReligieuses from './ModalComponent';
export const documentCategories = [
  {
    id: 1,
    title: 'Services Religieux',
    items: ['El Moquraa Electronique', 'Fatwa', 'Portail du Hadj','Portail de la Omra'],
  },
  {
    id: 2,
    title: "Demandes liées aux affaires religieuses",
    items: [
      'Demande d’attestation d’expérience professionnelle des enseignants de l’enseignement original',
      'Demande de certificat du succès à l’enseignement original du brevet et du Baccalauréat',
      "Demande d’autorisation préalable d’importation du livre religieux",
    ],
  },

];
export default function ScreenAffairesReligieuses() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const openModalWithDocument = (document) => {
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
                  <TouchableOpacity key={index}
                  onPress={() => openModalWithDocument(document)}
                  >
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
                                height:'auto'
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
      <ModalComponentAffaireReligieuses
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
