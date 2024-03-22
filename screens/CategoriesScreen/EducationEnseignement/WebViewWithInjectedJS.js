import React, {useEffect, useState, useRef} from 'react';
import {WebView} from 'react-native-webview';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {View, Text} from 'react-native';
const WebViewWithInjectedJS = ({url}) => {
  const [userData, setUserData] = useState(null);
  const [DataAuthPassword, setDataAuthPassword] = useState(null);
  const [DataEDEPassword, setDataEDEPassword] = useState(null);
  const [DataParentStudentPassword, setDataParentStudentPassword] = useState(null);
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
          const AuthDoc = await firestore()
            .collection('utilisateurs')
            .doc(userId)
            .collection('Enseignement')
            .doc('PAutthentification')
            .get();
          if (AuthDoc.exists) {
            setDataAuthPassword(AuthDoc.data().password)
          }
          const EDEDoc = await firestore()
            .collection('utilisateurs')
            .doc(userId)
            .collection('Enseignement')
            .doc('PEDE')
            .get();
          if (EDEDoc.exists) {
            setDataEDEPassword(EDEDoc.data().password)
          }
          const ParentStudentDoc = await firestore()
          .collection('utilisateurs')
          .doc(userId)
          .collection('Enseignement')
          .doc('ParentStudent')
          .get();
        if (ParentStudentDoc.exists) {
          setDataParentStudentPassword(ParentStudentDoc.data().password)
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
        const PAutthentificationData = {
          password: message.value,
        };
    
        try {
          await firestore()
            .collection('utilisateurs')
            .doc(userId)
            .collection('Enseignement')
            .doc('PAutthentification')
            .set(PAutthentificationData); 

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
    if (message.type === 'passwordEDE') {
      console.log(message.value);
      const currentUser = auth().currentUser;
      if (currentUser) {
        const userId = currentUser.uid;
        const PEDEData = {
          password: message.value,
        };
    
        try {
          await firestore()
            .collection('utilisateurs')
            .doc(userId)
            .collection('Enseignement')
            .doc('PEDE')
            .set(PEDEData); 
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
    if (message.type === 'passwordPS') {
      console.log(message.value);
      const currentUser = auth().currentUser;
      if (currentUser) {
        const userId = currentUser.uid;
        const PPSData = {
          password: message.value,
        };
    
        try {
          await firestore()
            .collection('utilisateurs')
            .doc(userId)
            .collection('Enseignement')
            .doc('ParentStudent')
            .set(PPSData); 
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
    'https://www.prfu-mesrs.dz/': `
    const divToRemove = document.querySelector('.row.text-center.baniere_Pub.margin-bottom7.correct_margin');
    if (divToRemove) {
      divToRemove.parentNode.removeChild(divToRemove);
    }
      var userData = ${JSON.stringify(userData)}; 
      const firebaseTimestamp = new Date(userData.dateDeNaissance.seconds * 1000 + userData.dateDeNaissance.nanoseconds / 1000000);
      const formattedDate = firebaseTimestamp.toISOString().split('T')[0];

      var link = document.getElementById('sinscrire');
      if (link) {
            link.addEventListener('click', function() {
            });
            link.click();
      }
    
      document.getElementById('nom_fr').value = userData.nom;
      document.getElementById('prenom_fr').value = userData.prenom;
      document.getElementById('nom_ar').value = userData.nomArabe;
      document.getElementById('prenom_ar').value = userData.prenomArabe;
      var dateInput = document.getElementById('date_n');
      if (dateInput) {
          dateInput.value = formattedDate;
      }
      document.getElementById('mail').value = userData.adresseCourriel;
      document.getElementById('telephone').value = userData.numeroTelephone;
      document.getElementById('adresse').value = userData.address;





    `,
    'https://progres.mesrs.dz/webetu/': `

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
    'https://progres.mesrs.dz/webetrangers/': `
    
    `,
    "https://progres.mesrs.dz/webauthentification/": `
   
    
    var userData = ${JSON.stringify(userData)}; 
    var passwordVV = ${JSON.stringify(DataAuthPassword)};

    if (!passwordVV) {
    const buttonElement = document.querySelector('.note div a:nth-child(2)');
    if (buttonElement) {
      buttonElement.click();
    }
  }
  // Assigne les valeurs si les éléments existent dans le DOM
  if (document.getElementById('loginFrm:j_username')) {
      document.getElementById('loginFrm:j_username').value = userData.adresseCourriel;
  }
  if (document.getElementById('loginFrm:j_password')) {
      document.getElementById('loginFrm:j_password').value = passwordVV;
  }
  if (document.getElementById('compte:Nom')) {
      document.getElementById('compte:Nom').value = userData.nom;
  }
  if (document.getElementById('compte:Prenom')) {
      document.getElementById('compte:Prenom').value = userData.prenom;
  }
  if (document.getElementById('compte:Mail')) {
      document.getElementById('compte:Mail').value = userData.adresseCourriel;
  }
  if (document.getElementById('compte:Mail2')) {
      document.getElementById('compte:Mail2').value = userData.adresseCourriel;
  }
    
    // Fonction pour gérer la soumission du formulaire
    function handleFormSubmission() {
        const password = document.getElementById('compte:MDP').value;
        const passwordConfirme = document.getElementById('compte:CMDP').value;
        if (password === passwordConfirme) {
            window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'password', value: password }));
        }
    }
    
    // Fonction pour attacher l'écouteur d'événements au bouton de soumission du formulaire
    function attachEventListenerToSubmitButton() {
        const submitButton = document.getElementById('compte:j_idt82');
        if (submitButton) {
            submitButton.addEventListener('click', function(event) {
                event.preventDefault();
                handleFormSubmission();
            });
        }
    }
    attachEventListenerToSubmitButton();
    
    // Surveiller périodiquement l'existence du bouton de soumission du formulaire
    setInterval(function() {
        attachEventListenerToSubmitButton();
    }, 1000); // Vérifier toutes les secondes
  `,
  'https://progres.mesrs.dz/webequivalence/': `
  var userData = ${JSON.stringify(userData)}; 
  var passwordVV = ${JSON.stringify(DataEDEPassword)};
  if (!passwordVV) {
  const buttonElement = document.querySelector('.note div a:nth-child(2)');
  if (buttonElement) {
    buttonElement.click();
  }
}
    if (document.getElementById('loginFrm:j_username')) {
        document.getElementById('loginFrm:j_username').value = userData.adresseCourriel;
    }
    if (document.getElementById('loginFrm:j_password')) {
        document.getElementById('loginFrm:j_password').value = passwordVV;
    }
    if (document.getElementById('compte:Nom')) {
        document.getElementById('compte:Nom').value = userData.nom;
    }
    if (document.getElementById('compte:Prenom')) {
        document.getElementById('compte:Prenom').value = userData.prenom;
    }
    if (document.getElementById('compte:Mail')) {
        document.getElementById('compte:Mail').value = userData.adresseCourriel;
    }
    if (document.getElementById('compte:Mail2')) {
        document.getElementById('compte:Mail2').value = userData.adresseCourriel;
    }

      // Fonction pour gérer la soumission du formulaire
      function handleFormSubmission() {
          const password = document.getElementById('compte:MDP').value;
          const passwordConfirme = document.getElementById('compte:CMDP').value;
          if (password === passwordConfirme) {
              window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'passwordEDE', value: password }));
          }
      }
  
  // Fonction pour attacher l'écouteur d'événements au bouton de soumission du formulaire
  function attachEventListenerToSubmitButton() {
      const submitButton = document.getElementById('compte:j_idt109');
      if (submitButton) {
          submitButton.addEventListener('click', function(event) {
              event.preventDefault();
              handleFormSubmission();
          });
      }
  }
  attachEventListenerToSubmitButton();
  
  // Surveiller périodiquement l'existence du bouton de soumission du formulaire
  setInterval(function() {
      attachEventListenerToSubmitButton();
  }, 1000); // Vérifier toutes les secondes
  
  const tdElement = document.querySelector('td[width="40%"]');
  if (tdElement) {
    tdElement.parentNode.removeChild(tdElement);
  }
  
  `,
  'https://progres.mesrs.dz/webonou/': `
    
  `,
  'https://pnr.dgrsdt.dz/': `
const elementToRemove = document.querySelector('.republic');
if (elementToRemove) {
  elementToRemove.remove();
}
  var userData = ${JSON.stringify(userData)}; 
  const email = document.getElementById('login');
if (email) {
  email.value = userData.adresseCourriel;
}
  const firebaseTimestamp = new Date(userData.dateDeNaissance.seconds * 1000 + userData.dateDeNaissance.nanoseconds / 1000000);
  const formattedDate = firebaseTimestamp.toISOString().split('T')[0];

  var link = document.getElementById('sinscrire');
  if (link) {
        link.addEventListener('click', function() {
        });
        link.click();
  }

  document.getElementById('nom_fr').value = userData.nom;
  document.getElementById('prenom_fr').value = userData.prenom;
  document.getElementById('nom_ar').value = userData.nomArabe;
  document.getElementById('prenom_ar').value = userData.prenomArabe;
  var dateInput = document.getElementById('date_n');
  if (dateInput) {
      dateInput.value = formattedDate;
  }
  document.getElementById('mail').value = userData.adresseCourriel;
  document.getElementById('telephone').value = userData.numeroTelephone;
  document.getElementById('adresse').value = userData.address;


  `,
  'https://pnr.dgrsdt.dzz/': `
    
  `,

  'https://awlyaa.education.gov.dz/login': `
  var userData = ${JSON.stringify(userData)}; 
  var passwordVV = ${JSON.stringify(DataParentStudentPassword)};
  
 

  var link = document.querySelector('a.btn-danger');
  if (!passwordVV) {
  if (link) {
        link.addEventListener('click', function() {
        });
        link.click();
    }
  }
  const usernameInput = document.querySelector('input[name="username"]');
  if(usernameInput){
    usernameInput.value =userData.adresseCourriel;
  }
  const passwordInput = document.querySelector('input[name="password"]');
  if(passwordInput){
    passwordInput.value =passwordVV;
  }

    const firebaseTimestamp = new Date(userData.dateDeNaissance.seconds * 1000 + userData.dateDeNaissance.nanoseconds / 1000000);
    const formattedDate = firebaseTimestamp.toISOString().split('T')[0];
    const emailInput = document.querySelector('input[name="email"]');
    const mobileInput = document.querySelector('input[name="mobile"]');
    if(emailInput){
      emailInput.value =userData.adresseCourriel;
    }
    if(mobileInput){
      mobileInput.value =userData.numeroTelephone;
    }
    const submitButton = document.querySelector("button.btn.btn-success.btn-block.nextstep");
      if (submitButton) {
          submitButton.addEventListener('click', function(event) {
              event.preventDefault();
              const password = document.querySelector('input[name="password"]').value;
              const passwordConfirme = document.querySelector('input[name="confirmPassword"]').value;
              if (password === passwordConfirme) {
                window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'passwordPS', value: password }));
              }
            });
      }

    const nomarInput = document.querySelector('input[name="nomar"]');
    const prenomarInput = document.querySelector('input[name="prenomar"]');
    const nomfrInput = document.querySelector('input[name="nomfr"]');
    const prenomfrInput = document.querySelector('input[name="prenomfr"]');
    const datenInput = document.querySelector('input[name="daten"]');

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
    if(datenInput){
      datenInput.value =formattedDate;
    }
    var selectElement = document.getElementById("wilid");

    for (var i = 0; i < selectElement.options.length; i++) {
        if (selectElement.options[i].value === userData.villeNataleValue) {
            selectElement.selectedIndex = i;
            selectElement.dispatchEvent(new Event('change'));

            break; 
        }
    }
    const adresseInput = document.querySelector('input[name="adresse"]');
    if(adresseInput){
      adresseInput.value =userData.address;
    }
    
    
  `,
  //formation professionnelle
  'https://www.mfep.gov.dz/%D8%A7%D9%84%D8%AA%D8%B3%D8%AC%D9%8A%D9%84%D8%A7%D8%AA/': `

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
