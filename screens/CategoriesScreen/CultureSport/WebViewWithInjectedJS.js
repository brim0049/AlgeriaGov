import React, {useEffect, useState, useRef} from 'react';
import {WebView} from 'react-native-webview';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {View, Text} from 'react-native';
const WebViewWithInjectedJS = ({url}) => {
  const [userData, setUserData] = useState(null);
  const [DataElMoquraaPassword, setElMoquraaPassword] = useState(null);
  const [TrackIdData, setTrackIdData] = useState(null);
  const [DateNaissance, setDateNaissance] = useState(null);
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
          const ElMoquraaDoc = await firestore()
            .collection('utilisateurs')
            .doc(userId)
            .collection('ServicesReligieux')
            .doc('ElMoquraa')
            .get();
          if (ElMoquraaDoc.exists) {
            setElMoquraaPassword(ElMoquraaDoc.data().password)
            console.log("wacha" + ElMoquraaDoc.data().password)
          }
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
    if (message.type === 'password') {
      console.log(message.value);
      const currentUser = auth().currentUser;
      if (currentUser) {
        const userId = currentUser.uid;
        const MEData = {
          password: message.value,
        };
    
        try {
          await firestore()
            .collection('utilisateurs')
            .doc(userId)
            .collection('ServicesReligieux')
            .doc('ElMoquraa')
            .set(MEData); 
           }
           catch (error) {
          console.error(
            "Erreur lors de l'ajout de la sous-collection passport :",
            error,
          );
        }
      } else {
        console.error('Utilisateur non connecté.');
      }
    }
  };

  // Utilisation de la fonction pour extraire le jour, le mois et l'année

  const injectedJavaScripts = {
    'https://e-servicesculture.dz/formulaire-declaration-livre/': `

      var userData = ${JSON.stringify(userData)}; 
      var sectionToRemove = document.querySelector('[data-id="d9b0a1c"]');
            if (sectionToRemove) {
          sectionToRemove.parentNode.removeChild(sectionToRemove);
      } 
      var sectionToRemove = document.querySelector('[data-id="da746d8"]');
      if (sectionToRemove) {
          sectionToRemove.parentNode.removeChild(sectionToRemove);
      }
      document.getElementById('form-field-Nom_fondateur').value= userData.nom;
      document.getElementById('form-field-prenom_fondateur').value= userData.prenom;
      document.getElementById('form-field-email').value= userData.adresseCourriel;
      document.getElementById('form-field-Tel').value= userData.numeroTelephone;

    `,
    'https://e-servicesculture.dz/formulaire-certificat/': `
    var userData = ${JSON.stringify(userData)}; 
    const firebaseTimestamp = new Date(userData.dateDeNaissance.seconds * 1000 + userData.dateDeNaissance.nanoseconds / 1000000);
    const formattedDate = firebaseTimestamp.toISOString().split('T')[0];

    document.getElementById('form-field-nom').value= userData.nom;
    document.getElementById('form-field-prenom').value= userData.prenom;
    document.getElementById('form-field-nin').value= userData.nin;
    var dateInput = document.getElementById('form-field-date_naissance');
    if (dateInput) {
        dateInput.value = formattedDate;
    } 
    document.getElementById('form-field-lieu_naissance').value= userData.villeNatale;
    document.getElementById('form-field-adresse').value= userData.address;
    document.getElementById('form-field-Email').value= userData.adresseCourriel;
    document.getElementById('form-field-tel').value= userData.numeroTelephone;

    
    
     `,
    'https://e-servicesculture.dz/prix-ali-maachi/': `
    // Fonction pour fermer le popup après un délai
    function fermerPopupApresDélai() {
        var closeButton = document.querySelector('.dialog-close-button');
        if (closeButton) {
            closeButton.click();

            // Sélectionner le lien après avoir fermé le popup
            var element = document.querySelector('a[href="#elementor-action%3Aaction%3Dpopup%3Aopen%26settings%3DeyJpZCI6IjY3NyIsInRvZ2dsZSI6ZmFsc2V9"]');
            if (element) {
                element.click();
                var userData = ${JSON.stringify(userData)}; 
                const firebaseTimestamp = new Date(userData.dateDeNaissance.seconds * 1000 + userData.dateDeNaissance.nanoseconds / 1000000);
                const formattedDate = firebaseTimestamp.toISOString().split('T')[0];            
                document.getElementById('form-field-nom').value= userData.nom;
                document.getElementById('form-field-prenom').value= userData.prenom;
                const inputElement = document.querySelector('.elementor-field.elementor-size-sm.elementor-field-textual.elementor-date-field.flatpickr-input.flatpickr-mobile');
                if (inputElement) {
                  const dateValue = formattedDate;
                  inputElement.value = dateValue;
                  inputElement.dispatchEvent(new Event('change'));
                }
                document.getElementById('form-field-lieu_de_naissance').value= userData.villeNatale;
                document.getElementById('form-field-Adresse').value= userData.address;
                document.getElementById('form-field-Nationalite').value= userData.nationalite;
                document.getElementById('form-field-Email').value= userData.adresseCourriel;
                document.getElementById('form-field-tel1').value= userData.numeroTelephone;
            }
        } 
    }

    // Définir le délai avant de fermer le popup (en millisecondes)
    var delaiFermeture = 2000;
    setTimeout(fermerPopupApresDélai, delaiFermeture);



        `,
    "https://e-servicesculture.dz/carteartiste/": `
   (function() {
    const buttonElement = document.querySelector('.elementor-button-link.elementor-button.elementor-size-xs');
    if (buttonElement) {
      buttonElement.click();
    }
    var userData = ${JSON.stringify(userData)}; 
    const firebaseTimestamp = new Date(userData.dateDeNaissance.seconds * 1000 + userData.dateDeNaissance.nanoseconds / 1000000);
    const formattedDate = firebaseTimestamp.toISOString().split('T')[0];
    document.getElementById('form-field-nom').value= userData.nom;
    document.getElementById('form-field-prenom').value= userData.prenom;
    document.getElementById('form-field-NIN').value= userData.nin;
    const inputElement = document.querySelector('.elementor-field.elementor-size-sm.elementor-field-textual.elementor-date-field.flatpickr-input.flatpickr-mobile');
    if (inputElement) {
      const dateValue = formattedDate;
      inputElement.value = dateValue;
      inputElement.dispatchEvent(new Event('change'));
    }
    const selectElement = document.querySelector('#form-field-lieu_de_naissance');
    if (selectElement) {
      const wilayaNumber = userData.villeNataleValue;
      const optionElement = Array.from(selectElement.options).find(option => option.value.startsWith(wilayaNumber));
      if (optionElement) {
        optionElement.selected = true;
        selectElement.dispatchEvent(new Event('change'));
      }
    }
    document.getElementById('form-field-Adresse').value= userData.address;
    document.getElementById('form-field-Nationalite').value= userData.nationalite;
    document.getElementById('form-field-Email').value= userData.adresseCourriel;
    document.getElementById('form-field-tel').value= userData.numeroTelephone;

   })();
  `,
    "https://e-servicesculture.dz/cartecinema/": `
  (function() {
    const buttonElement = document.querySelector('.elementor-button-link.elementor-button.elementor-size-xs');
    if (buttonElement) {
      buttonElement.click();
    }
    var userData = ${JSON.stringify(userData)}; 
    const firebaseTimestamp = new Date(userData.dateDeNaissance.seconds * 1000 + userData.dateDeNaissance.nanoseconds / 1000000);
    const formattedDate = firebaseTimestamp.toISOString().split('T')[0];
    document.getElementById('form-field-nom').value= userData.nom;
    document.getElementById('form-field-prenom').value= userData.prenom;
    document.getElementById('form-field-NIN').value= userData.nin;
    const inputElement = document.querySelector('.elementor-field.elementor-size-sm.elementor-field-textual.elementor-date-field.flatpickr-input.flatpickr-mobile');
    if (inputElement) {
      const dateValue = formattedDate;
      inputElement.value = dateValue;
      inputElement.dispatchEvent(new Event('change'));
    }
    const selectElement = document.querySelector('#form-field-lieu_de_naissance');
    if (selectElement) {
      const wilayaNumber = userData.villeNataleValue;
      const optionElement = Array.from(selectElement.options).find(option => option.value.startsWith(wilayaNumber));
      if (optionElement) {
        optionElement.selected = true;
        selectElement.dispatchEvent(new Event('change'));
      }
    }
    document.getElementById('form-field-Adresse').value= userData.address;
    document.getElementById('form-field-Email').value= userData.adresseCourriel;
    document.getElementById('form-field-telephone').value= userData.numeroTelephone;


  })();
  `,

    'https://e-servicesculture.dz/appui-association/': `
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
