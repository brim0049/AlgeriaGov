import React, {useEffect, useState, useRef} from 'react';
import {WebView} from 'react-native-webview';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {View, Text} from 'react-native';
const WebViewWithInjectedJS = ({url}) => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    // Fonction pour récupérer les données de l'utilisateur depuis Firestore
    const getUserDataFromFirestore = async () => {
      try {
        const currentUser = auth().currentUser;
        if (currentUser) {
          const userId = currentUser.uid;
          const userDataDoc = await firestore()
            .collection('utilisateurs')
            .doc(userId)
            .get();
          if (userDataDoc.exists) {
            setUserData(userDataDoc.data());
          } else {
            console.error('Aucune donnée utilisateur trouvée');
          }
        } else {
          console.error('Aucun utilisateur connecté');
        }
        
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des données utilisateur depuis Firestore',
          error,
        );
      }
    };
    getUserDataFromFirestore();

  }, []);
  const onMessage = async event => {
    const message = JSON.parse(event.nativeEvent.data);
  };

  // Utilisation de la fonction pour extraire le jour, le mois et l'année

  const injectedJavaScripts = {
    'https://www.mjustice.dz/ar/%d8%b5%d9%80%d8%ad%d9%8a%d9%81%d8%a9%d8%a7%d9%84%d8%b3%d9%88%d8%a7%d8%a8%d9%82-%d8%a7%d9%84%d9%82%d8%b6%d8%a7%d8%a6%d9%8a%d8%a9/': `

    `,
    'https://www.mjustice.dz/ar/archive/': `
    var elementToRemove = document.querySelector('.elementor-element-0103d77');
    if (elementToRemove) {
        elementToRemove.parentNode.removeChild(elementToRemove);
    }
    var elementToRemove1 = document.querySelector('.elementor-container.elementor-column-gap-no');
    
    if (elementToRemove1) {
        elementToRemove1.parentNode.removeChild(elementToRemove1);
    }
    var elementToRemove2 = document.querySelector('.elementor-element-d93d630');
    if (elementToRemove2) {
        elementToRemove2.parentNode.removeChild(elementToRemove2);
    }
    var elementToRemove3 = document.querySelector('.elementor.elementor-227.elementor-location-footer');
    if (elementToRemove3) {
        elementToRemove3.parentNode.removeChild(elementToRemove3);
    }
    var userData = ${JSON.stringify(userData)}; 
    document.querySelector('input[name="nom"]').value= userData.nomArabe;
    document.querySelector('input[name="prenom"]').value= userData.prenomArabe;
    const firebaseTimestamp = new Date(userData.dateDeNaissance.seconds * 1000 + userData.dateDeNaissance.nanoseconds / 1000000);
    const formattedDate = firebaseTimestamp.toISOString().split('T')[0].replace(/-/g, '/');         
    document.querySelector('input[name="date_naiss"]').value= formattedDate;
    document.querySelector('input[name="lieu_naiss"]').value= userData.villeNatale;
    document.querySelector('input[name="email"]').value= userData.adresseCourriel;
    document.querySelector('input[name="adresse"]').value= userData.address;
    document.querySelector('input[name="tel"]').value= userData.numeroTelephone;
    document.querySelector('input[name="nom_fr"]').value= userData.nom;
    document.querySelector('input[name="prenom_fr"]').value= userData.prenom;
     `,
    'https://www.mjustice.dz/ar/tr-ch/': `
    var elementToRemove = document.querySelector('.elementor-element-0103d77');
    if (elementToRemove) {
        elementToRemove.parentNode.removeChild(elementToRemove);
    }
    var elementToRemove1 = document.querySelector('.elementor-container.elementor-column-gap-no');
    
    if (elementToRemove1) {
        elementToRemove1.parentNode.removeChild(elementToRemove1);
    }
    var elementToRemove2 = document.querySelector('.elementor-element-cf6085f');
    if (elementToRemove2) {
        elementToRemove2.parentNode.removeChild(elementToRemove2);
    }
    var elementToRemove3 = document.querySelector('.elementor.elementor-227.elementor-location-footer');
    if (elementToRemove3) {
        elementToRemove3.parentNode.removeChild(elementToRemove3);
    }
    var userData = ${JSON.stringify(userData)}; 
    document.querySelector('input[name="nom"]').value= userData.nomArabe;
    document.querySelector('input[name="prenom"]').value= userData.prenomArabe;
    const firebaseTimestamp = new Date(userData.dateDeNaissance.seconds * 1000 + userData.dateDeNaissance.nanoseconds / 1000000);
    const formattedDate = firebaseTimestamp.toISOString().split('T')[0].replace(/-/g, '/');         
    document.querySelector('input[name="date_naiss"]').value= formattedDate;
    document.querySelector('input[name="lieu_naiss"]').value= userData.villeNatale;
    document.querySelector('input[name="email"]').value= userData.adresseCourriel;
    document.querySelector('input[name="adresse"]').value= userData.address;
    document.querySelector('input[name="tel"]').value= userData.numeroTelephone;

  `,
      'https://e-nyaba.mjustice.dz/choix.php': `
      var userData = ${JSON.stringify(userData)}; 
      const firebaseTimestamp = new Date(userData.dateDeNaissance.seconds * 1000 + userData.dateDeNaissance.nanoseconds / 1000000);
      const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
      const formattedDate = firebaseTimestamp.toLocaleDateString('fr-CA', options).replace(/\-/g, '/');
      
      const nomarInput = document.querySelector('input[name="NOM"]');
      const prenomarInput = document.querySelector('input[name="PRENOM"]');
      const nomfrInput = document.querySelector('input[name="NOM_FR"]');
      const prenomfrInput = document.querySelector('input[name="PRENOM_FR"]');
      const dateInput = document.querySelector('input[name="DATE_NAIS"]');
      const lieuInput = document.querySelector('input[name="LIEU_NAIS"]');
      const selectWilaya = document.querySelector('select[name="WILAYA_NAIS"]');
      const ninInput = document.querySelector('input[name="NIN"]');
      const selectElement = document.querySelector('select[name="PI"]');
      const numPiInput = document.querySelector('input[name="NUM_PI"]');
      const adresseInput = document.querySelector('input[name="ADRESSE_RESID"]');
      const telInput = document.querySelector('input[name="TEL"]');
      const tel1Input = document.querySelector('input[name="TEL1"]');
      const emailInput = document.querySelector('input[name="EMAIL"]');
      const email1Input = document.querySelector('input[name="EMAIL1"]');

  
      if(nomarInput){
        nomarInput.value =userData.nomArabe;
      }
      if(prenomarInput){
        prenomarInput.value =userData.prenomArabe;
      }
      if(nomfrInput){
        nomfrInput.value =userData.nom;
      }
      if(prenomfrInput){
        prenomfrInput.value =userData.prenom;
      }
      if(dateInput){
        dateInput.value =formattedDate;
      }
      if(lieuInput){
        lieuInput.value =userData.villeNatale;
      } 
      if(selectWilaya){
        selectWilaya.value = userData.villeNataleValue;
      }
      if(ninInput){
        ninInput.value =userData.nin;
      }  
      if(selectElement){
        selectElement.value = "2";
      }
      if(numPiInput){
        numPiInput.value =userData.passport;
      } 
      if(adresseInput){
        adresseInput.value =userData.address;
      }
      if(telInput && tel1Input){
        telInput.value =userData.numeroTelephone;
        tel1Input.value =userData.numeroTelephone;
      } 
      if(emailInput && email1Input){
        emailInput.value =userData.adresseCourriel;
        email1Input.value =userData.adresseCourriel;
      } 
 `,
  };

  const injectedJS = injectedJavaScripts[url] || '';

  return (
    <View style={{flex: 1}}>
      <WebView
        source={{uri: url}}
        injectedJavaScript={injectedJS}
        onMessage={onMessage}
        javaScriptEnabled={true}
      />
    </View>
  );
};

export default WebViewWithInjectedJS;
