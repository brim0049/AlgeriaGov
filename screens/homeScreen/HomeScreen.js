import React, { useState } from "react";
import { View, Text, Image,Dimensions, TouchableOpacity, StyleSheet } from "react-native";
import Carousel from 'react-native-snap-carousel'; 
import CategorieCard from '../../components/CategorieCard';
import QuickAccess from "../../components/quickAccess";
import Header from "../../components/Header";
import { useNavigation } from "@react-navigation/native";
const {width, height} = Dimensions.get('window');
const TITLES = ["Acte de naissance", "Acte de mariage", "Acte de décès"];
const newsData = [
  { id: 1, title: 'Sécurité social', description: 'Besoin de documents officiels ou de services administratifs ?', icon:'shield', screen: 'ScreenSecuriteSocial' },
  { id: 2, title: 'Etat civil', description: 'Besoin de documents officiels ou de services administratifs ?', icon:'building', screen: 'ScreenEtatCivil' },
  { id: 3, title: 'Aides sociales', description: 'Besoin de soutien pour vous-même ou pour votre entourage ?', icon:'user-md', screen: 'ScreenAidesSociales' },
  { id: 4, title: 'Droit et Justice', description: 'Envie d’aide dans vos démarches juridiques ou administratives ?', icon:'balance-scale', screen: 'ScreenDroitJustice' },
  { id: 5, title: 'Education - Enseignement', description: 'Besoin d’infos sur les différentes structures éducatives et les enseignements ?', icon:'book', screen: 'ScreenEducationEnseignement' },
  { id: 6, title: 'Culture-Sport', description : "Besoin de savoir où pratiquer vos activités culturelles et sportives ?", icon : "soccer-ball-o", screen: 'ScreenCultureSport' },
  { id: 7 ,title :'Travail-Emploi',description :"Besoin d'aide pour trouver un emploi ou gérer votre vie professionnelle ?",icon :'briefcase', screen: 'ScreenTravailEmploi' },
  { id: 8 ,title :'Transport',description :"Besoin d'informations spécifiques sur le déplacement via les transports ?",icon :'bus', screen: 'ScreenTransport' },
  { id: 9 ,title :'Affaires Religieuses',description :"Besoin d'informations spécifiques sur les affaires religieuses ?",icon :'moon-o', screen: 'ScreenAffairesReligieuses' }
];

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleCategoryPress = (screenName) => {
    navigation.navigate( 'CategorieNav', { screen: screenName });
  };
  return (
    <View>
      <View style={{backgroundColor:'white', borderBottomRightRadius: 30,borderBottomLeftRadius: 30,
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,}}>
      <Header/>
      </View>
    <Text style={{ fontSize: 25, fontWeight:'bold', color:'black'}}> Accès rapides</Text>
    <View>
      <QuickAccess/>
    </View>
    <Text style={{ fontSize: 25, fontWeight:'bold', color:'black'}}> Catégories</Text>
        <View>
          <Carousel
            containerCustomStyle={{overflow: 'visible'}}
            data={newsData}
            renderItem={({item})=> <CategorieCard item={item} onPress={() => handleCategoryPress(item.screen)} />}
            firstItem={1}
            loop={true}
            inactiveSlideScale={0.75}
            inactiveSlideOpacity={0.75}
            sliderWidth={width}
            itemWidth={width*0.63}
            slideStyle={{display: 'flex', alignItems: 'center'}}
          />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    opacity: 0.5,
    height: 160,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10,
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  greeting: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 10,
    color: "black",
  },
  navIconContainer: {
    marginLeft: "auto",
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
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 10, // Adjust padding if needed
    paddingRight: 40, // Adjust padding for icon
    backgroundColor: "#fff",
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
});

export default HomeScreen;
