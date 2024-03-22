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
    'https://maqraa.dz/courses': `

      var passportVV = ${JSON.stringify(DataElMoquraaPassword)};
      var userData = ${JSON.stringify(userData)}; 
      var linkClickedd = false;

      var link = document.getElementById('login_btn');
      if (link) {
        if (passportVV) {
            link.addEventListener('click', function() {
              linkClickedd = true;
              document.querySelector('.navbar').style.display = 'none';
              document.querySelector('.body-top').style.display = 'none';
            });
            link.click();
        }
        else {
          document.querySelector('.navbar').remove();
          document.querySelector('.body-top').remove();
        }
      }
    
document.getElementById('mobile_login').value = userData.numeroTelephone;
      document.getElementById('password_login').value = passportVV;


      function calculateAge(birthdate) {
        const today = new Date();
        const birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age;
      }
      var date = new Date(userData.dateDeNaissance.seconds * 1000 + userData.dateDeNaissance.nanoseconds / 1000000);
      var formattedDate = date.toLocaleDateString(); 
         
      document.querySelector('#footer').remove();
      let section = document.querySelector('section > div.gap.theme-bg.bottom-spac50.top-spac270');
      if (section) {
      section.parentNode.removeChild(section);
      }

      document.querySelector('select[name="country"]').value='الجزائر';
      document.querySelector('input[name="firstname"]').value =userData.prenom;
      document.querySelector('input[name="lastname"]').value =userData.nom;
      document.querySelector('input[name="age"]').value = calculateAge(formattedDate);;
      document.querySelector('select[name="wilaya_id"]').value = userData.villeNataleValue;
      document.querySelectorAll('input[name="email"]')[1].value = userData.adresseCourriel;
      document.querySelector('input[name="username"]').value = userData.numeroTelephone;


      const form = document.querySelector('form#register_form');

      form.addEventListener('submit', function(event) {
      event.preventDefault();

      const password = document.querySelector('input[name="password"]').value;

      window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'password', value: password }));
      setTimeout(function() {
        if (!linkClickedd) {
          document.querySelector('.navbar').remove();
          document.querySelector('.body-top').remove();
        } else {
          document.querySelector('.navbar').style.display = 'block';
          document.querySelector('.body-top').style.display = 'block';
        }
      }, 1000); 
      window.addEventListener('unload', function() {
        localStorage.setItem('linkClickedd', false);
      });
      });



    `,
    'https://www.marw.dz/%D8%A7%D9%84%D9%81%D8%AA%D9%88%D9%89-%D8%A7%D9%84%D8%A5%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A%D8%A9': `

    document.querySelector('.row').remove();
    document.querySelector('.logo-container').remove();
    document.querySelector('.main-menu-container').remove();
    document.querySelector('.slideshow-container').remove();
    document.querySelector('.bottoms-container').remove();
    document.querySelector('.footer').remove();
    var userData = ${JSON.stringify(userData)}; 

    document.getElementById('edit-name').value= userData.nom +' '+ userData.prenom;
    document.getElementById('edit-email').value= userData.adresseCourriel;
    document.getElementById('edit-phone').value= userData.numeroTelephone;
    var wilayaValue = userData.villeNatale;
    
    // Sélectionne l'élément <select> par son ID
    var selectElement = document.getElementById('edit-wilaya');
    
    // Parcourt toutes les options pour trouver celle avec la valeur correspondante
    for (var i = 0; i < selectElement.options.length; i++) {
        // Obtient les 4 premières lettres de la valeur de l'option
        var optionValuePrefix = selectElement.options[i].value.substring(0, 4);
        // Obtient les 4 premières lettres de la valeur de wilayaValue
        var wilayaValuePrefix = wilayaValue.substring(0, 4);
        // Vérifie si les 4 premières lettres de l'option correspondent à celles de wilayaValue
        if (optionValuePrefix.toLowerCase() === wilayaValuePrefix.toLowerCase()) {
            // Sélectionne l'option correspondante
            selectElement.selectedIndex = i;
            // Déclenche un événement de changement pour simuler la sélection manuelle
            var event = new Event('change', { bubbles: true });
            selectElement.dispatchEvent(event);
            break;
        }
    }
    
    
     `,
    'https://bawabetelhadj.dz/Account/Login': `
    
    `,
    "https://bawabetelomra.dz/Account/Login": `
   (function() {

   })();
  `,
    "https://www.marw.dz/%D8%B7%D9%84%D8%A8-%D8%B4%D9%87%D8%A7%D8%AF%D8%A9-%D8%A7%D9%84%D8%AE%D8%A8%D8%B1%D8%A9-%D8%A7%D9%84%D9%85%D9%87%D9%86%D9%8A%D8%A9-%D9%84%D8%A3%D8%B3%D8%A7%D8%AA%D8%B0%D8%A9-%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85-%D8%A7%D9%84%D8%A3%D8%B5%D9%84%D9%8A": `
  (function() {
    document.querySelector('.row').remove();
    document.querySelector('.logo-container').remove();
    document.querySelector('.main-menu-container').remove();
    document.querySelector('.slideshow-container').remove();
    document.querySelector('.bottoms-container').remove();
    document.querySelector('.footer').remove();
    var userData = ${JSON.stringify(userData)}; 
    document.getElementById('edit-firstname').value=userData.prenom;
    document.getElementById('edit-lastname').value= userData.nom;
    document.getElementById('edit-email').value= userData.adresseCourriel;
    document.getElementById('edit-phone').value= userData.numeroTelephone;
  })();
  `,
    'https://www.marw.dz/%D8%B7%D9%84%D8%A8-%D8%B4%D9%87%D8%A7%D8%AF%D8%A9-%D9%86%D8%AC%D8%A7%D8%AD-%D9%81%D9%8A-%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85-%D8%A7%D9%84%D8%A3%D8%B5%D9%84%D9%8A-%D9%84%D9%84%D8%A3%D9%87%D9%84%D9%8A%D8%A9-%D9%88-%D8%A7%D9%84%D8%A8%D9%83%D8%A7%D9%84%D9%88%D8%B1%D9%8A%D8%A7': `
    (function() {
      document.querySelector('.row').remove();
      document.querySelector('.logo-container').remove();
      document.querySelector('.main-menu-container').remove();
      document.querySelector('.slideshow-container').remove();
      document.querySelector('.bottoms-container').remove();
      document.querySelector('.footer').remove();
      var userData = ${JSON.stringify(userData)}; 
      document.getElementById('edit-firstname').value=userData.prenom;
      document.getElementById('edit-lastname').value= userData.nom;
      document.getElementById('edit-email').value= userData.adresseCourriel;
      document.getElementById('edit-phone').value= userData.numeroTelephone;
  
    })();
  
 `,
    'https://www.marw.dz/%D8%B7%D9%84%D8%A8-%D8%A7%D9%84%D8%AA%D8%B1%D8%AE%D9%8A%D8%B5-%D8%A7%D9%84%D9%85%D8%B3%D8%A8%D9%82-%D9%84%D8%A7%D8%B3%D8%AA%D9%8A%D8%B1%D8%A7%D8%AF-%D8%A7%D9%84%D9%83%D8%AA%D8%A7%D8%A8-%D8%A7%D9%84%D8%AF%D9%8A%D9%86%D9%8A': `
     (function() {
    document.querySelector('.row').remove();
    document.querySelector('.logo-container').remove();
    document.querySelector('.main-menu-container').remove();
    document.querySelector('.slideshow-container').remove();
    document.querySelector('.bottoms-container').remove();
    document.querySelector('.footer').remove();
  })();

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
