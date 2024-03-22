import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchInput = () => {
  return (
    <View style={styles.inputContainer}>
      <TextInput style={styles.search} placeholder="Recherche" />
      <Icon name="search" size={20} color="#1B4242" style={styles.searchIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
    margin: 5,
  },
  searchIcon: {
    position: 'absolute',
    right: 15,
    top: 17.5,
    elevation: 6,
  },
  search: {
    height: 55,
    borderColor: '#1B4242',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 40,
    backgroundColor: '#fff',
    opacity: 0.9,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default SearchInput;
