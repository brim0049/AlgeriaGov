import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import {Input} from '@rneui/themed';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Dropdown} from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import wilayas from '../assets/data/wilayas';
import SegmentForm from '../components/signup/SegmentForm';
import LogoSignup from '../components/signup/Logo';
import sections from '../components/signup/Sections';
import mapInputToIcon from '../components/signup/MapInputToIcon';
import RenderButtons from '../components/signup/RenderButtons';
const SCREEN_WIDTH = Dimensions.get('window').width;

const SignupScreen = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [isFocusMunicipality, setIsFocusMunicipality] = useState(false);
  const [selectedWilaya, setSelectedWilaya] = useState(null);
  const [selectedMunicipality, setSelectedMunicipality] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  
  const handleNext = () => {
    if (activeIndex < sections.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };
  const [birthdate, setBirthdate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const onChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setBirthdate(selectedDate);
    }
  };
  return (
    <View style={styles.signupscreen}>
      <LogoSignup/>
      {activeIndex === 0 && (
        <View style={styles.containerElementOne}>
          <Text style={styles.bonjour}>Créer un compte!</Text>
        </View>
      )}
     
      <View style={styles.container}>
        <ProgressBar
          progress={(activeIndex + 1) / sections.length}
          width={SCREEN_WIDTH - 40}
          color="#CC3E00"
          borderRadius={5}
          style={styles.progressContainer}
        />
        <View style={styles.sectionContainer}>
          {sections[activeIndex].inputs.map((input, index) => {
            if (input === 'Date de naissance') {
              return (
                <View key={index}>
                  <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                    <Input
                      placeholder={input}
                      label={input}
                      leftIcon={{
                        type: 'font-awesome',
                        name: mapInputToIcon(input),
                        color: '#1B4242',
                      }}
                      value={birthdate ? birthdate.toDateString() : ''}
                      inputStyle={{color: '#1B4242'}}
                      inputContainerStyle={{
                        borderColor: '#1B4242',
                        borderBottomWidth: 3,
                        marginBottom: -15,
                      }}
                      labelStyle={{color: '#1B4242'}}
                      editable={false}
                    />
                  </TouchableOpacity>
                  {showDatePicker && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={birthdate || new Date()}
                      mode="date"
                      is24Hour={true}
                      display="default"
                      onChange={onChange}
                    />
                  )}
                </View>
              );
            } else if (input === 'Ville natale') {
              return (
                <View style={styles.containerSel}>
                  <Text style={styles.label}>Ville natale</Text>
                  <Dropdown
                    style={[
                      styles.dropdown,
                      isFocus && {borderColor: '#bb0622'},
                    ]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={wilayas}
                    search
                    maxHeight={500}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Ville natale' : '...'}
                    searchPlaceholder="Recherche..."
                    value={selectedWilaya}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      setSelectedWilaya(item.value);
                      setIsFocus(false);
                    }}
                    renderLeftIcon={() => (
                      <Icon
                        name={'building'}
                        size={20}
                        color={isFocus ? '#bb0622' : '#1B4242'}
                      />
                    )}
                    dropdownPosition="top"
                  />
                </View>
              );
            } else if (input === 'Municipalité de naissance') {
              return (
                <View style={styles.containerSel}>
                  <Text style={styles.label}>Municipalité de naissance</Text>
                  <Dropdown
                    style={[
                      styles.dropdown,
                      isFocusMunicipality && {borderColor: '#bb0622'},
                    ]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={wilayas}
                    search
                    maxHeight={500}
                    labelField="label"
                    valueField="value"
                    placeholder={
                      !isFocusMunicipality ? 'Municipalité de naissance' : '...'
                    }
                    searchPlaceholder="Recherche..."
                    value={selectedMunicipality}
                    onFocus={() => setIsFocusMunicipality(true)}
                    onBlur={() => setIsFocusMunicipality(false)}
                    onChange={item => {
                      setSelectedMunicipality(item.value);
                      setIsFocusMunicipality(false);
                    }}
                    renderLeftIcon={() => (
                      <Icon
                        name={'map'}
                        size={20}
                        color={isFocusMunicipality ? '#bb0622' : '#1B4242'}
                      />
                    )}
                    dropdownPosition="top"
                  />
                </View>
              );
            } else {
              return (
                <Input
                  key={index}
                  placeholder={input}
                  label={input}
                  leftIcon={{
                    type: 'font-awesome',
                    name: mapInputToIcon(input),
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
              );
            }
          })}
        </View>
        
      </View>
      {activeIndex === 3 && (
          <SegmentForm />
      )}
      <RenderButtons activeIndex={activeIndex} handlePrev={handlePrev} handleNext={handleNext} sections={sections} />
    </View>
  );
};

const styles = StyleSheet.create({
  containerSel: {
    padding: 9,
  },
  dropdown: {
    height: 50,
    borderColor: '#1B4242',
    borderBottomWidth: 3,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1B4242',
  },
  placeholderStyle: {
    marginLeft: 10,
    fontSize: 18,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 30,
    height: 30,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderColor: '#bb0622',
  },
  signupscreen: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },

  containerElementOne: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  bonjour: {
    fontSize: 24,
    color: '#1B4242',
    fontFamily: 'kreon.regular',
    fontWeight: 'bold',
    letterSpacing: 0,
  },

  container: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  progressContainer: {
    marginBottom: 20,
  },
  sectionContainer: {
    width: SCREEN_WIDTH - 40,
  },

});
export default SignupScreen;
