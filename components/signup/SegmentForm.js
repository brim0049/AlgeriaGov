import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { Input, Image } from '@rneui/themed'; // Import Image from the correct library

const SegmentForm = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Définir une fonction pour rendre le champ approprié en fonction de l'index sélectionné
  const renderSegmentContent = () => {
    if (selectedIndex === 0) {
      // Manuel
      return (
        <View style={styles.form}>
<Input
          label="Numéro d'identification national (NIN)"
          placeholder="Numéro d'identification national (NIN)"
          keyboardType="numeric"
          leftIcon={{
            type: 'font-awesome',
            name: 'user',
            color: '#1B4242',
          }}
          inputStyle={{color: '#1B4242'}}
          inputContainerStyle={{
            borderColor: '#1B4242',
            borderBottomWidth: 3,
            marginBottom: -15,
          }}
          labelStyle={{color: '#1B4242'}}
        />
        <Input
          label="Numéro de carte national / Passeport"
          placeholder="Numéro de carte national / Passeport"
          keyboardType="numeric"
          leftIcon={{
            type: 'font-awesome',
            name: 'user',
            color: '#1B4242',
          }}
          inputStyle={{color: '#1B4242'}}
          inputContainerStyle={{
            borderColor: '#1B4242',
            borderBottomWidth: 3,
            marginBottom: -15,
          }}
          labelStyle={{color: '#1B4242'}}
        />
                  <Input
            label="Nom en Arabe"
            placeholder="Nom en Arabe"
            leftIcon={{
              type: 'font-awesome',
              name: 'user',
              color: '#1B4242',
            }}
            inputStyle={{ color: '#1B4242' }}
            inputContainerStyle={{
              borderColor: '#1B4242',
              borderBottomWidth: 3,
              marginBottom: -15,
            }}
            labelStyle={{ color: '#1B4242' }}
          />
          <Input
            label="Prénom en Arabe"
            placeholder="Prénom en Arabe"
            leftIcon={{
              type: 'font-awesome',
              name: 'user',
              color: '#1B4242',
            }}
            inputStyle={{ color: '#1B4242' }}
            inputContainerStyle={{
              borderColor: '#1B4242',
              borderBottomWidth: 3,
              marginBottom: -15,
            }}
            labelStyle={{ color: '#1B4242' }}
          />
        </View>
      );
    } else if (selectedIndex === 1) {
      // Passeport
      return (
        <View style={[styles.form, { backgroundColor: 'red' }]}>
          {/* Afficher une image pour le passeport */}
         
        </View>
      );
    } else if (selectedIndex === 2) {
      // Carte nationale
      return (
        <View style={[styles.form, { backgroundColor: 'red' }]}>
          {/* Afficher une image vide avec un fond rouge pour la carte nationale */}
       
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <SegmentedControl
      style={{height:50}}
      
        values={['Manuel', 'Passeport', 'Carte nationale']}
        selectedIndex={selectedIndex}
        onChange={(event) => {
          setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
        }}
      />
      {renderSegmentContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  form: {
    marginVertical: 16,
  },
});

export default SegmentForm;
