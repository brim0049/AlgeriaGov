import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { Input, Image, Text } from '@rneui/themed'; // Import Image from the correct library

const SegmentForm = ({ onValuesChange, inputErrorsSection4, setInputErrorsSection4 }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [formValues, setFormValues] = useState({
    nin: '',
    passport: '',
    address: '',
    postalCode: '',
  });
  const handleValuesChange = (field, value) => {
    setFormValues(prevValues => ({
      ...prevValues,
      [field]: value,
    }));
  };
  
  useEffect(() => {
    onValuesChange(formValues);
  }, [formValues, onValuesChange]);
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
            name: 'id-card',
            color: '#1B4242',
          }}
          inputStyle={{color: '#1B4242'}}
          inputContainerStyle={[styles.inputContainer, inputErrorsSection4['Numéro d\'identification national (NIN)'] && {borderColor: 'red'}]}
          labelStyle={{color: '#1B4242'}}
          value={formValues.nin}
          onChangeText={(text) => handleValuesChange('nin', text)}
          errorMessage={inputErrorsSection4['Numéro d\'identification national (NIN)']}
          errorStyle={styles.errorStyle}

        />
        <Input
          label="Numéro de carte national / Passeport"
          placeholder="Numéro de carte national / Passeport"
          keyboardType="numeric"
          leftIcon={{
            type: 'font-awesome',
            name: 'keyboard-o',
            color: '#1B4242',
          }}
          inputStyle={{color: '#1B4242'}}
          inputContainerStyle={[styles.inputContainer, inputErrorsSection4['Numéro de carte national / Passeport'] && {borderColor: 'red'}]}
          labelStyle={{color: '#1B4242'}}
          value={formValues.passport}
          onChangeText={(text) => handleValuesChange('passport', text)}
          errorMessage={inputErrorsSection4['Numéro de carte national / Passeport']}
          errorStyle={styles.errorStyle}

        />
                  <Input
            label="Adresse"
            placeholder="Adresse"
            leftIcon={{
              type: 'font-awesome',
              name: 'home',
              color: '#1B4242',
            }}
            inputStyle={{ color: '#1B4242' }}
            inputContainerStyle={[styles.inputContainer, inputErrorsSection4['Adresse'] && {borderColor: 'red'}]}
            labelStyle={{ color: '#1B4242' }}
            onChangeText={text => handleValuesChange('address', text)}
            errorMessage={inputErrorsSection4['Adresse']}
            errorStyle={styles.errorStyle}

          />
          <Input
            label="Code postal"
            placeholder="Code postal"
            keyboardType="numeric"
            leftIcon={{
              type: 'font-awesome',
              name: 'map-marker',
              color: '#1B4242',
            }}
            inputStyle={{ color: '#1B4242' }}
            inputContainerStyle={[styles.inputContainer, inputErrorsSection4['Code postal'] && {borderColor: 'red'}]}
            labelStyle={{ color: '#1B4242' }}
             onChangeText={text => handleValuesChange('postalCode', text)}
             errorMessage={inputErrorsSection4['Code postal']}
             errorStyle={styles.errorStyle}

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
      backgroundColor = '#F8EFEF'
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
  inputContainer: {
    borderColor: '#1B4242',
    borderBottomWidth: 3,
    marginBottom: -15,
  },
  container: {
    padding: 16,
  },
  form: {
    marginVertical: 16,
  },
  errorStyle: {
    marginTop: 15, 
  },

});

export default SegmentForm;
