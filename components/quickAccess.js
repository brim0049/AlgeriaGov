import React from "react";
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from "react-native";
import ModalComponentEtatCivil from "../screens/CategoriesScreen/EtatCivil/ModalComponent";
const TITLES = ["Acte de naissance", "Acte de mariage", "Acte de décès"];

export default function QuickAccess() {
  const [modalVisible, setModalVisible] = React.useState(false);
const [selectedDocument, setSelectedDocument] = React.useState(null);

  return (
    <View style={styles.container}>
      <FlatList
        data={TITLES}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.button} onPress={() => { setSelectedDocument(item); setModalVisible(true); }}>
            <Text style={styles.text}>{item}</Text>
          </TouchableOpacity>
        )}
      />
      <ModalComponentEtatCivil visible={modalVisible} document={selectedDocument} closeModal={() => setModalVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 10,
    marginVertical:10
  },
  button: {
    backgroundColor: "#CDCDCD",
    padding: 10,
    borderRadius: 25,
    marginHorizontal: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1B4242",
  },
});
