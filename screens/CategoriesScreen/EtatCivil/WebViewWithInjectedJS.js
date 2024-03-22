import React, {useEffect, useState, useRef} from 'react';
import {WebView} from 'react-native-webview';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {View, Text} from 'react-native';
const WebViewWithInjectedJS = ({url}) => {
  const [userData, setUserData] = useState(null);
  const [DatapassportPassword, setPassportPassword] = useState(null);
  const [TrackIdData, setTrackIdData] = useState(null);
  const [numeroDossier, setNumeroDossier] = useState('');
  const [numeroDemande, setNumeroDemande] = useState('');
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
          const passportDoc = await firestore()
            .collection('utilisateurs')
            .doc(userId)
            .collection('Passport')
            .doc('DocumentPassport')
            .get();
          if (passportDoc.exists) {
            setPassportPassword(passportDoc.data().password)
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
    const getTrackDataIdFromFirestore = async () => {
      const currentUser = auth().currentUser;
      if (currentUser) {
        const userId = currentUser.uid;

        const idDataRef = firestore()
        .collection('utilisateurs')
        .doc(userId)
        .collection('IDData')
        .doc('DocumentID')
        try {
          const idDataSnapshot = await idDataRef.get();
          if (idDataSnapshot.exists) {
            setTrackIdData(idDataSnapshot.data());
          } else {
            console.log(
              "Les données IDData n'existent pas pour cet utilisateur.",
            );
          }
        } catch (error) {
          console.error(
            'Erreur lors de la récupération des données IDData :',
            error,
          );
        }
      }
    };
    getTrackDataIdFromFirestore();
    getUserDataFromFirestore();
  }, []);
  const onMessage = async event => {
    const message = JSON.parse(event.nativeEvent.data);
    if (message.type === 'password') {
      console.log(message.value);
      const currentUser = auth().currentUser;
      if (currentUser) {
        const userId = currentUser.uid;
        const passportData = {
          password: message.value,
        };
    
        try {
          await firestore()
            .collection('utilisateurs')
            .doc(userId)
            .collection('Passport')
            .doc('DocumentPassport')
            .set(passportData, { merge: true }); // Utilisez l'option merge: true pour fusionner les données
        } catch (error) {
          console.error(
            "Erreur lors de l'ajout de la sous-collection passport :",
            error,
          );
        }
      } else {
        console.error('Utilisateur non connecté.');
      }
    }
    
    if (message.NumeroSuiviPassport && message.DateDepotPassport) {
      console.log(message.NumeroSuiviPassport, message.DateDepotPassport);
      const currentUser = auth().currentUser;
      if (currentUser) {
        const userId = currentUser.uid;
        const passportData = {
          NumeroSuiviPassport: message.NumeroSuiviPassport,
          DateDepotPassport: message.DateDepotPassport
        };
    
        try {
          await firestore()
            .collection('utilisateurs')
            .doc(userId)
            .collection('Passport')
            .doc('DocumentPassport')
            .set(passportData, { merge: true }); // Utilisez l'option merge: true pour fusionner les données
        } catch (error) {
          console.error(
            "Erreur lors de l'ajout de la sous-collection passport :",
            error,
          );
        }
      } else {
        console.error('Utilisateur non connecté.');
      }
    }
        if (message.NumDemandePermis && message.DateDepotPermisConduire) {
      const currentUser = auth().currentUser;
      if (currentUser) {
        const userId = currentUser.uid;
        const permisConduireData = {
          NumDemandePermis: message.NumDemandePermis,
          DateDepotPermisConduire:message.DateDepotPermisConduire
        };

        try {
          await firestore()
            .collection('utilisateurs')
            .doc(userId)
            .collection('PermisConduire')
            .doc('DocumentPermisConduire')
            .set(permisConduireData);
        } catch (error) {
          console.error(
            "Erreur lors de l'ajout de la collection PermisConduire :",
            error,
          );
        }
      } else {
        console.error('Utilisateur non connecté.');
      }
    }
    if (message.id === 'numeroDossier') {
      setNumeroDossier(message.data);
    } else if (message.id === 'numeroDemande') {
      setNumeroDemande(message.data);
    }
    if (message.id === 'numeroDossier') {
      setNumeroDossier(message.data);
    } else if (message.id === 'numeroDemande') {
      setNumeroDemande(message.data);
    }
    let depositDate;
    if (message.type === 'pageText') {
      console.log('le contenu du PDF:', message.data);
      const regex = /Date dépôt:[\s\S]*?(\d{2}\/\d{2}\/\d{4})/; // Recherche une date au format DD/MM/YYYY éventuellement précédée par des caractères incluant des sauts de ligne
      const matches = message.data.match(regex);
      if (matches && matches.length > 1) {
        depositDate = matches[1];
        console.log('Date de dépôt trouvée:', depositDate);

        // Récupérer l'utilisateur actuel
        const currentUser = auth().currentUser;
        if (currentUser) {
          const userId = currentUser.uid;

          const idDataRef = firestore()
          .collection('utilisateurs')
        .doc(userId)
        .collection('IDData')
        .doc('DocumentID')
          const idDataSnapshot = await idDataRef.get();
          if (!idDataSnapshot.exists) {
            await idDataRef.set({
              numeroDemande: numeroDemande,
              numeroDossier: numeroDossier,
              dateDepot: numeroDossier
                ? new Date().toISOString().substring(0, 10)
                : depositDate,
            });
          }
        }
      } else {
        console.log('Date de dépôt non trouvée');
      }
    }
  };

  // Utilisation de la fonction pour extraire le jour, le mois et l'année

  const injectedJavaScripts = {
    'https://etatcivil.interieur.gov.dz/ActeNaissance/': `
      // Votre script pour l'acte de naissance
    `,
    'https://etatcivil.interieur.gov.dz/ActeMariage/': `
      // Votre script pour l'acte de mariage
    `,
    'https://etatcivil.interieur.gov.dz/ActeDeces/': `
      // Votre script pour l'acte de décès
    `,
    "https://passeport.interieur.gov.dz/Fr/DemandeCNIBE_Fr/Demande%20carte%20national%20d'identit%C3%A9%20biom%C3%A9trique%20%C3%A9lectronique": `
   (function() {
    var script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.min.js';
    document.head.appendChild(script);
    // Attendre que PDF.js soit chargé
    script.onload = function() {
      // Créer une instance de PDF.js
      var pdfjs = window['pdfjs-dist/build/pdf'];
    function loadPDFFromURL(url) {
      pdfjs.getDocument(url).promise.then(function(pdf) {
        var numPages = pdf.numPages;
        // Envoyer le nombre de pages au composant React Native
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'numPages', data: numPages }));
        
        // Boucler sur chaque page du PDF
        for (var i = 1; i <= numPages; i++) {
          pdf.getPage(i).then(function(page) {
            var pageNumber = page.pageNumber;
            // Envoyer le numéro de page au composant React Native
            window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'pageNumber', data: pageNumber }));
            
            // Obtenir le contenu de la page
            page.getTextContent().then(function(textContent) {
              // Convertir le contenu de la page en texte
              var text = textContent.items.map(function(item) {
                return item.str;
              }).join(' ');
              // Envoyer le texte de la page au composant React Native
              window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'pageText', data: text }));
            });
          });
        }
      }).catch(function(error) {
        // En cas d'erreur, envoyer un message d'erreur au composant React Native
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'error', data: error }));
      });
    }

    var pdfLink = document.getElementById('ctl00_ContentPlaceHolder1_WizardDemande_HLReimprimer');
    if (pdfLink) {
      var pdfURL = pdfLink.href;
      // Appeler la fonction pour charger le PDF
      loadPDFFromURL(pdfURL);
    } 
   }
      var numeroDossierElement = document.getElementById('ctl00_ContentPlaceHolder1_WizardDemande_LblNumDoss');
      var numeroDossier = numeroDossierElement ? numeroDossierElement.textContent.trim() : '';
            var numeroDemandeElement = document.getElementById('ctl00_ContentPlaceHolder1_WizardDemande_LblErreurConfirme');
      var numeroDemande = numeroDemandeElement ? numeroDemandeElement.textContent.match(/\\d+/)[0] : '';
      
      // Envoyer les numéros de dossier et de demande à l'application native en utilisant le mécanisme de communication WebView
      if (window.ReactNativeWebView) {
        if (numeroDossier) {
          window.ReactNativeWebView.postMessage(JSON.stringify({ id: "numeroDossier", data: numeroDossier }));
        }
        if (numeroDemande) {
          window.ReactNativeWebView.postMessage(JSON.stringify({ id: "numeroDemande", data: numeroDemande }));
        }
      }
          var userData = ${JSON.stringify(userData)};
    var radioButton = document.getElementById('ctl00_ContentPlaceHolder1_WizardDemande_RadioButtonList1_0');
    if (radioButton) {
        radioButton.checked = true;
    }
    var ninInput = document.getElementById('ctl00_ContentPlaceHolder1_WizardDemande_TxtNIN');
    if (ninInput) {
      ninInput.value = userData.nin;  
    } 
    var passportInput = document.getElementById('ctl00_ContentPlaceHolder1_WizardDemande_TxtNumPSP');
    if (passportInput) {
      passportInput.value = userData.passport;  
    } 
    var AddressInput = document.getElementById('ctl00_ContentPlaceHolder1_WizardDemande_TxtAdresse');
    if (AddressInput) {
     AddressInput.value = userData.address;  
   } 
   var CodepostalInput = document.getElementById('ctl00_ContentPlaceHolder1_WizardDemande_TxtCodePostal');
   if (CodepostalInput) {
     CodepostalInput.value = userData.postalCode; 
  } 
  var PhoneInput = document.getElementById('ctl00_ContentPlaceHolder1_WizardDemande_TxtNumTel');
  if (PhoneInput) {
   PhoneInput.value = userData.numeroTelephone;  
 } 
 function selectWilayaAndCommune(wilayaValue, communeName) {
  var formattedWilayaValue = ("00" + wilayaValue);
  var wilayaSelect = document.getElementById('ctl00_ContentPlaceHolder1_WizardDemande_DropWilayaResidence');
  
  if (wilayaSelect) {
      wilayaSelect.value = formattedWilayaValue;
      wilayaSelect.dispatchEvent(new Event('change'));
      setTimeout(function() {
          selectCommuneByName(communeName);
      }, 300); 
  }
}

function selectCommuneByName(communeName) {
  var selectElement = document.getElementById("ctl00_ContentPlaceHolder1_WizardDemande_DropCommuneResidence");
  selectElement.style.fontSize = '25px';
  if (selectElement) {
      for (let i = 0; i < selectElement.options.length; i++) {
        if (selectElement.options[i].text.toLowerCase().includes(communeName.toLowerCase())) {
          selectElement.selectedIndex = i;
              selectElement.dispatchEvent(new Event('change'));

              break;
          }
      } 
  }
}

selectWilayaAndCommune(userData.villeNataleValue, userData.municipaliteNatale);


 
     document.querySelector('.div_ent_01').remove();
     document.querySelector('.footer').remove();
     document.querySelector('.div_menu1').remove();
     document.querySelector('.div_parent_link').remove();
     document.querySelector('.div_principal').style.width = '';
     var Element = document.querySelector('#ctl00_ContentPlaceHolder1_WizardDemande');
     Element.style.width = '900px';
     var inputs = document.querySelectorAll('.TxTBoxSaisie-fr2');
     inputs.forEach(function(input) {
       input.style.width = '600px'; 
       input.style.height = '50px'; 
  
     });
     var tableElements = document.querySelectorAll('#ctl00_ContentPlaceHolder1_WizardDemande *');
     // Parcourir tous les éléments et augmenter leur taille
     tableElements.forEach(function(element) {
       element.style.fontSize = '25px'; 
     });
     document.querySelectorAll('.btn').forEach(function(btn) {
      btn.style.fontSize = '30px';
      btn.style.height = '60px';
    });
         document.querySelector('.TxTBoxSaisie-ar').style.width ='400px';
     document.querySelector('.TxTBoxSaisie-ar').style.height ='40px';
     document.querySelector('#ctl00_ContentPlaceHolder1_WizardDemande_Captcha1_imgCaptcha').style.width='400px';
  



   })();
  `,
    "https://passeport.interieur.gov.dz/Fr/SuiviCNIBE_Fr/Suivi%20la%20demande%20de%20la%20carte%20national%20d'identit%c3%a9%20biom%c3%a9trique%20%c3%a9lectronique": `
  (function() {

    var userData = ${JSON.stringify(userData)}; 
    var TrackIdData = ${JSON.stringify(TrackIdData)};
  
   function selectWilayaAndCommune(wilayaValue, communeName) {
    var formattedWilayaValue = ("00" + wilayaValue);
    var wilayaSelect = document.getElementById('ctl00_ContentPlaceHolder1_WizardDemande_DropWilayaReside');
    
    if (wilayaSelect) {
      if (wilayaSelect.value === localStorage.getItem('selectedWilaya')) {
          selectCommuneByName(communeName);
        return;
      }
      wilayaSelect.value = localStorage.getItem('selectedWilaya') || formattedWilayaValue;
      localStorage.setItem('selectedWilaya', wilayaSelect.value);
      wilayaSelect.dispatchEvent(new Event('change'));
          setTimeout(function() {
            selectCommuneByName(communeName);
        }, 300); 
    }
  }
  
  function selectCommuneByName(communeName) {
    var selectElement = document.getElementById("ctl00_ContentPlaceHolder1_WizardDemande_DropDairaReside");
    selectElement.style.fontSize = '25px';
    if (selectElement) {
        for (let i = 0; i < selectElement.options.length; i++) {
          if (selectElement.options[i].text.toLowerCase().includes(communeName.toLowerCase())) {
            selectElement.selectedIndex = i;
                selectElement.dispatchEvent(new Event('change'));
  
                break;
            }
        } 
    }
  }
  
  selectWilayaAndCommune(userData.villeNataleValue, userData.municipaliteNatale);


    
    document.querySelector('.div_ent_01').remove();
    document.querySelector('.footer').remove();
    document.querySelector('.div_menu1').remove();
    document.querySelector('.div_parent_link').remove();
    document.querySelector('.div_principal').style.width = '';
    var Element = document.querySelector('#ctl00_ContentPlaceHolder1_WizardDemande');
    Element.style.width = '900px';
    var inputs = document.querySelectorAll('.TxTBoxSaisie-fr2');
    inputs.forEach(function(input) {
      input.style.width = '600px'; 
      input.style.height = '50px'; 
  
    });
    var tableElements = document.querySelectorAll('#ctl00_ContentPlaceHolder1_WizardDemande *');
    // Parcourir tous les éléments et augmenter leur taille
    tableElements.forEach(function(element) {
      element.style.fontSize = '25px'; 
    });
    var btn = document.querySelector('.btn');
    if (btn) {
      btn.style.fontSize = '30px';
      btn.style.height ='60px'
    }
    document.querySelector('.TxTBoxSaisie-ar').style.width ='400px';
    document.querySelector('.TxTBoxSaisie-ar').style.height ='40px';
    document.querySelector('#ctl00_ContentPlaceHolder1_WizardDemande_Captcha1_imgCaptcha').style.width='400px';
    var NumeroDemande = document.getElementById('ctl00_ContentPlaceHolder1_WizardDemande_TxtNumDoss');
    if (NumeroDemande) {
        if (TrackIdData.numeroDemande !== null) {
            NumeroDemande.value = TrackIdData.numeroDemande;
        } else if (TrackIdData.numeroDossier !== null) {
            NumeroDemande.value = TrackIdData.numeroDossier;
        }
    }

    const extractDayMonthYearFromDate = (dateString) => {
      const parts = dateString.split('/');
      const day = parts[0];
      const month = parts[1];
      const year = parts[2];
      return { day, month, year };
  };
  let dateString = TrackIdData.dateDepot;
  
  if (dateString) {
      const { day, month, year } = extractDayMonthYearFromDate(dateString);
  
      function selectDay(dayValue) {
          var daySelect = document.getElementById('ctl00_ContentPlaceHolder1_WizardDemande_DlistJourNaissance');
          if (daySelect) {
              daySelect.value = dayValue;
              daySelect.dispatchEvent(new Event('change'));
          }
      }
      selectDay(day);
  
      function selectMonth(monthValue) {
          var monthSelect = document.getElementById('ctl00_ContentPlaceHolder1_WizardDemande_DlistMoisNaissance');
          
          if (monthSelect) {
              monthSelect.value = monthValue;
              monthSelect.dispatchEvent(new Event('change'));
          }
      }
      selectMonth(month);
  
      function selectYear(yearValue) {
          var yearSelect = document.getElementById('ctl00_ContentPlaceHolder1_WizardDemande_DlistAnneeNaissance');
          
          if (yearSelect) {
              yearSelect.value = yearValue;
              yearSelect.dispatchEvent(new Event('change'));
          }
      }
      selectYear(year);
  }
  


  })();`,
    'https://passeport.interieur.gov.dz/Fr/Rejet_Fr/Chargement_Photo': `
  (function() {
    document.querySelector('.div_ent_01').remove();
    document.querySelector('.footer').remove();
    document.querySelector('.div_menu1').remove();
    document.querySelector('.div_parent_link').remove();
    document.querySelector('.div_principal').style.width = '';
    var Element = document.querySelector('#ctl00_ContentPlaceHolder1_WizardPhoto_Panel4');
    Element.style.width = '900px';
    var inputs = document.querySelectorAll('.TxTBoxSaisie-fr2');
    inputs.forEach(function(input) {
      input.style.width = '500px'; 
      input.style.height = '50px'; 
  
    });
    var tableElements = document.querySelectorAll('#ctl00_ContentPlaceHolder1_WizardPhoto_Panel4 *');
    // Parcourir tous les éléments et augmenter leur taille
    tableElements.forEach(function(element) {
      element.style.fontSize = '25px'; // Augmenter la taille de police à 20 pixels
      // Vous pouvez également modifier d'autres styles selon vos besoins, comme la couleur, la largeur, etc.
    });
    var btn = document.querySelector('.btn');
    if (btn) {
      btn.style.fontSize = '30px'; // Augmenter la taille de police à 20 pixels
      btn.style.height ='60px'
    }
    document.querySelector('.TxTBoxSaisie-ar').style.width ='400px';
    document.querySelector('.TxTBoxSaisie-ar').style.height ='40px';
    document.querySelector('#ctl00_ContentPlaceHolder1_WizardPhoto_Captcha1_imgCaptcha').style.width='400px';
  })();`,
    // passeport

    'https://passeport.interieur.gov.dz/Fr/Inscription_Fr/Authentification': `
    
  (function() {

    var userData = ${JSON.stringify(userData)};
    var passportVV = ${JSON.stringify(DatapassportPassword)};
    // Fonction pour remplir les champs nom, prénom, email, email de confirmation
    function remplirChampNomEtPrenom(nom, prenom, email, cEmail) {
        var champNom = document.getElementById('ctl00_ContentPlaceHolder1_WizardInscription_TxtNom');
        var champPrenom = document.getElementById('ctl00_ContentPlaceHolder1_WizardInscription_TxtPrenom');
        var champEmail = document.getElementById('ctl00_ContentPlaceHolder1_WizardInscription_TxtMailIns');
        var champCEmail = document.getElementById('ctl00_ContentPlaceHolder1_WizardInscription_TxtMailInsConf');
        if (champNom && champPrenom && champEmail && champCEmail) {
            champNom.value = nom;
            champPrenom.value = prenom;
            champEmail.value = email;
            champCEmail.value = cEmail;
        }
    }
    
    // Fonction pour appliquer les styles et les événements après le chargement de la page
    function appliquerStylesEtEvenements() {
        // Appliquer les styles
        var tableElements = document.querySelectorAll('#ctl00_ContentPlaceHolder1_UpdatePanelWizard *');
        tableElements.forEach(function(element) {
            element.style.fontSize = '25px';
        });
        var inputs = document.querySelectorAll('.TxTBoxSaisie-fr, .TxTBoxSaisie-mail');
        inputs.forEach(function(input) {
            input.style.width = '500px'; 
            input.style.height = '50px'; 
        });
        document.querySelector('#ctl00_ContentPlaceHolder1_WizardInscription_Captcha1_txtCaptcha').style.width='400px';
        document.querySelector('#ctl00_ContentPlaceHolder1_WizardInscription_Captcha1_txtCaptcha').style.height='50px';
        document.querySelector('#ctl00_ContentPlaceHolder1_WizardInscription_Captcha1_imgCaptcha').style.height='200px';
        var btn = document.querySelector('.btn');
        if (btn) {
            btn.style.fontSize = '30px'; 
            btn.style.height ='60px'
        }
    
        // Ajouter un événement au bouton de création
        document.getElementById('ctl00_ContentPlaceHolder1_WizardInscription_BtnCreation').addEventListener('click', function(event) {
            var password = document.getElementById('ctl00_ContentPlaceHolder1_WizardInscription_TxtMotPasseInscr').value;
            var passwordConfirme = document.getElementById('ctl00_ContentPlaceHolder1_WizardInscription_TxtMotPasseInscrConfirm').value;
            if (password === passwordConfirme) {
                window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'password', value: password }));
            }
        });
    }
    
    // Observer les mutations dans le DOM pour détecter quand les champs deviennent disponibles
    var observerNomPrenom = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                var champNom = document.getElementById('ctl00_ContentPlaceHolder1_WizardInscription_TxtNom');
                var champPrenom = document.getElementById('ctl00_ContentPlaceHolder1_WizardInscription_TxtPrenom');
                var champEmail = document.getElementById('ctl00_ContentPlaceHolder1_WizardInscription_TxtMailIns');
                var champCEmail = document.getElementById('ctl00_ContentPlaceHolder1_WizardInscription_TxtMailInsConf');        
                if (champNom && champPrenom && champEmail && champCEmail) {
                    remplirChampNomEtPrenom(userData.nom, userData.prenom, userData.adresseCourriel,userData.adresseCourriel);
                    appliquerStylesEtEvenements();
                }
            }
        });
    });
    
    // Observer les mutations dans le corps du document
    observerNomPrenom.observe(document.body, { childList: true, subtree: true });
  
    // Fonction pour remplir les champs d'email et de mot de passe
    function remplirChampsConnexion(email, password) {
        var champEmail = document.getElementById('ctl00_ContentPlaceHolder1_WizardInscription_TxtMailConn');
        var champPassword = document.getElementById('ctl00_ContentPlaceHolder1_WizardInscription_TxtMotPasseConn');
        
        if (champEmail && champPassword) {
            champEmail.value = email;
            if (password) {
                champPassword.value = password;
            }
        }
    }
    
    // Fonction pour appliquer les styles et les événements après le chargement de la page
    function appliquerStylesEtEvenementsConnexion() {
        var tableElements = document.querySelectorAll('#ctl00_ContentPlaceHolder1_UpdatePanelWizard *');
        tableElements.forEach(function(element) {
            element.style.fontSize = '25px';
        });
      
        var inputs = document.querySelectorAll('.TxTBoxSaisie-fr, .TxTBoxSaisie-mail');
        inputs.forEach(function(input) {
            input.style.width = '500px'; 
            input.style.height = '50px'; 
        });
            var btn = document.querySelector('.btn');
        if (btn) {
            btn.style.fontSize = '30px';
            btn.style.height = '60px';
        }
    
        // Autres styles spécifiques
        document.querySelector('.TxTBoxSaisie-ar').style.width = '400px';
        document.querySelector('.TxTBoxSaisie-ar').style.height = '40px';
        document.querySelector('#ctl00_ContentPlaceHolder1_WizardPhoto_Captcha1_imgCaptcha').style.width = '400px';
    }
    
    // Observer les mutations dans le DOM pour détecter quand les champs deviennent disponibles
    var observerConnexion = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                var champEmail = document.getElementById('ctl00_ContentPlaceHolder1_WizardInscription_TxtMailConn');
                var champPassword = document.getElementById('ctl00_ContentPlaceHolder1_WizardInscription_TxtMotPasseConn');
    
                if (champEmail && champPassword) {
                    remplirChampsConnexion(userData.adresseCourriel, passportVV);
                    appliquerStylesEtEvenementsConnexion();
                }
            }
        });
    });
    
    // Observer les mutations dans le corps du document
    observerConnexion.observe(document.body, { childList: true, subtree: true });


  // Cliquer sur le lien pour ouvrir la nouvelle page
  var link = document.getElementById('ctl00_ContentPlaceHolder1_WizardInscription_LBNew');
  if (link) {
    if (!passportVV) {
        link.addEventListener('click', function() {
        });
        link.click();
    }
}
var chEmail = document.getElementById('ctl00_ContentPlaceHolder1_WizardInscription_TxtMailConn');        
var chpswrd = document.getElementById('ctl00_ContentPlaceHolder1_WizardInscription_TxtMotPasseConn');        
if (chEmail && chpswrd) {
  chEmail.value = userData.adresseCourriel;
  if (passportVV) {
  chpswrd.value = passportVV;
  }
}
   
  var btn = document.querySelector('.btn');
  if (btn) {
    btn.style.fontSize = '30px'; 
    btn.style.height ='60px'
  }


    var tableElements = document.querySelectorAll('#ctl00_ContentPlaceHolder1_UpdatePanelWizard *');
    tableElements.forEach(function(element) {
      element.style.fontSize = '25px';
    });
    document.querySelector('.div_ent_01').remove();
    document.querySelector('.footer').remove();
    document.querySelector('.div_menu1').remove();
    document.querySelector('.div_parent_link').remove();
    document.querySelector('.div_principal').style.width = '';
    var inputs = document.querySelectorAll('.TxTBoxSaisie-fr, .TxTBoxSaisie-mail');
    inputs.forEach(function(input) {
        input.style.width = '500px'; 
        input.style.height = '50px'; 
    });

    var btn = document.querySelector('.btn');
    if (btn) {
      btn.style.fontSize = '30px'; // Augmenter la taille de police à 20 pixels
      btn.style.height ='60px'
    }
    document.querySelector('.TxTBoxSaisie-ar').style.width ='400px';
    document.querySelector('.TxTBoxSaisie-ar').style.height ='40px';
    document.querySelector('#ctl00_ContentPlaceHolder1_WizardPhoto_Captcha1_imgCaptcha').style.width='400px';



    
  })();`,
    'https://passeport.interieur.gov.dz/Fr/Suivi_Fr/Suivi%20demande%20passeport': `
    (function() {
      var userData = ${JSON.stringify(userData)};
        document.getElementById('ctl00_ContentPlaceHolder1_WizardDemande_BtnRechercheDemande').addEventListener('click', function(event) {
          var NumeroSuiviPassport = document.getElementById('ctl00_ContentPlaceHolder1_WizardDemande_TxtNumDoss').value;
          var jourSelect = document.getElementById('ctl00_ContentPlaceHolder1_WizardDemande_DlistJourNaissance');
          var moisSelect = document.getElementById('ctl00_ContentPlaceHolder1_WizardDemande_DlistMoisNaissance');
          var anneeSelect = document.getElementById('ctl00_ContentPlaceHolder1_WizardDemande_DlistAnneeNaissance');
          var jour = jourSelect.options[jourSelect.selectedIndex].value;
          var mois = moisSelect.options[moisSelect.selectedIndex].value;
          var annee = anneeSelect.options[anneeSelect.selectedIndex].value;
        
          if (jour !== "00" && mois !== "00" && annee !== "00") {
            var dateDepot = jour + "/" + mois + "/" + annee;
            var data = {
                NumeroSuiviPassport: NumeroSuiviPassport,
                DateDepotPassport: dateDepot
              };
              window.ReactNativeWebView.postMessage(JSON.stringify(data));
          }
        });
      
    function selectWilayaAndCommune(wilayaValue, communeName) {
      var formattedWilayaValue = ("00" + wilayaValue);
      var wilayaSelect = document.getElementById('ctl00_ContentPlaceHolder1_WizardDemande_DropWilayaReside');
      
      if (wilayaSelect) {
        if (wilayaSelect.value === localStorage.getItem('selectedWilaya')) {
            selectCommuneByName(communeName);
          return;
        }
        wilayaSelect.value = localStorage.getItem('selectedWilaya') || formattedWilayaValue;
        localStorage.setItem('selectedWilaya', wilayaSelect.value);
        wilayaSelect.dispatchEvent(new Event('change'));
            setTimeout(function() {
              selectCommuneByName(communeName);
          }, 300); 
      }
    }
    
    function selectCommuneByName(communeName) {
      var selectElement = document.getElementById("ctl00_ContentPlaceHolder1_WizardDemande_DropDairaReside");
      selectElement.style.fontSize = '25px';
      if (selectElement) {
          for (let i = 0; i < selectElement.options.length; i++) {
            if (selectElement.options[i].text.toLowerCase().includes(communeName.toLowerCase())) {
              selectElement.selectedIndex = i;
                  selectElement.dispatchEvent(new Event('change'));
    
                  break;
              }
          } 
      }
    }
    
    selectWilayaAndCommune(userData.villeNataleValue, userData.municipaliteNatale);
  

      document.querySelector('.div_ent_01').remove();
      document.querySelector('.footer').remove();
      document.querySelector('.div_menu1').remove();
      document.querySelector('.div_parent_link').remove();
      document.querySelector('.div_principal').style.width = '';
      var Element = document.querySelector('#ctl00_ContentPlaceHolder1_WizardDemande');
      Element.style.width = '900px';
      var inputs = document.querySelectorAll('.TxTBoxSaisie-fr2');
      inputs.forEach(function(input) {
        input.style.width = '500px'; 
        input.style.height = '50px'; 
    
      });
      var tableElements = document.querySelectorAll('#ctl00_ContentPlaceHolder1_WizardDemande *');
      // Parcourir tous les éléments et augmenter leur taille
      tableElements.forEach(function(element) {
        element.style.fontSize = '25px'; // Augmenter la taille de police à 20 pixels
        // Vous pouvez également modifier d'autres styles selon vos besoins, comme la couleur, la largeur, etc.
      });
      var btn = document.querySelector('.btn');
      if (btn) {
        btn.style.fontSize = '30px'; // Augmenter la taille de police à 20 pixels
        btn.style.height ='60px'
      }
      document.querySelector('.TxTBoxSaisie-ar').style.width ='400px';
      document.querySelector('.TxTBoxSaisie-ar').style.height ='40px';
      document.querySelector('#ctl00_ContentPlaceHolder1_WizardPhoto_Captcha1_imgCaptcha').style.width='400px';
    })();`,
    // permis de conduire
    'https://capacitepc.interieur.gov.dz/GET-STARTED': `
(function() {
document.querySelector('footer').remove();
// Sélection de l'élément à supprimer
var elementToRemove = document.querySelector('div.row.justify-content-between.m-3 > div.col-md-6:nth-child(3)');

// Vérification si l'élément existe
if (elementToRemove) {
    // Suppression de l'élément
    elementToRemove.remove();
}

  document.querySelector('.navbar').remove();
  document.querySelector('#MainContent_Image1').remove();  
  document.querySelector('.col-md-4').remove();  
  document.querySelector('footer.bg-dark.text-center.text-white').remove();

  var rowElement = document.querySelector('.row.justify-content-between.m-3');
  if (rowElement) {
      var colElement = rowElement.querySelector('.col-md-8');
        if (colElement) {
          var newColElement = document.createElement('div');
          newColElement.className = 'col'; // Ajout de la classe "col" pour une colonne de taille automatique
            while (colElement.firstChild) {
              newColElement.appendChild(colElement.firstChild);
          }
  
          colElement.parentNode.removeChild(colElement);
            rowElement.appendChild(newColElement);
      }
  }
  var elements = document.querySelectorAll('.form-control, .col-form-label, .btn, .control-label');
  elements.forEach(function(element) {
      element.style.fontSize = '28px';
  });

  // Sélectionnez l'image CAPTCHA
  var captchaImage = document.getElementById('MainContent_imgCaptcha');

  // Si l'image CAPTCHA est trouvée, augmentez sa taille de police
  if (captchaImage) {
      captchaImage.style.fontSize = '28px'; // Modifiez la taille de police selon vos besoins
  }
  

})();`,
    'https://passeport.interieur.gov.dz/Fr/SuiviPCBEP_Fr/Suivi%20la%20demande%20du%20permis%20de%20conduire': `
(function() {
  var userData = ${JSON.stringify(userData)};
  function selectWilayaAndCommune(wilayaValue, communeName) {
    var formattedWilayaValue = ("00" + wilayaValue);
    var wilayaSelect = document.getElementById('ctl00_ContentPlaceHolder1_WizardDemande_DropWilayaReside');
    
    if (wilayaSelect) {
      if (wilayaSelect.value === localStorage.getItem('selectedWilaya')) {
          selectCommuneByName(communeName);
        return;
      }
      wilayaSelect.value = localStorage.getItem('selectedWilaya') || formattedWilayaValue;
      localStorage.setItem('selectedWilaya', wilayaSelect.value);
      wilayaSelect.dispatchEvent(new Event('change'));
          setTimeout(function() {
            selectCommuneByName(communeName);
        }, 300); 
    }
  }
  
  function selectCommuneByName(communeName) {
    var selectElement = document.getElementById("ctl00_ContentPlaceHolder1_WizardDemande_DropDairaReside");
    selectElement.style.fontSize = '25px';
    if (selectElement) {
        for (let i = 0; i < selectElement.options.length; i++) {
          if (selectElement.options[i].text.toLowerCase().includes(communeName.toLowerCase())) {
            selectElement.selectedIndex = i;
                selectElement.dispatchEvent(new Event('change'));
  
                break;
            }
        } 
    }
  }
  
  selectWilayaAndCommune(userData.villeNataleValue, userData.municipaliteNatale);

  document.getElementById('ctl00_ContentPlaceHolder1_WizardDemande_BtnRechercheDemande').addEventListener('click', function(event) {
    var NumDemandePermis = document.getElementById('ctl00_ContentPlaceHolder1_WizardDemande_TxtNumDoss').value;
    var jourSelect = document.getElementById('ctl00_ContentPlaceHolder1_WizardDemande_DlistJourNaissance');
    var moisSelect = document.getElementById('ctl00_ContentPlaceHolder1_WizardDemande_DlistMoisNaissance');
    var anneeSelect = document.getElementById('ctl00_ContentPlaceHolder1_WizardDemande_DlistAnneeNaissance');
    var jour = jourSelect.options[jourSelect.selectedIndex].value;
    var mois = moisSelect.options[moisSelect.selectedIndex].value;
    var annee = anneeSelect.options[anneeSelect.selectedIndex].value;
  
    if (jour !== "00" && mois !== "00" && annee !== "00") {
      var dateDepot = jour + "/" + mois + "/" + annee;
      ;
        var data = {
          NumDemandePermis: NumDemandePermis,
          DateDepotPermisConduire: dateDepot
        };
        window.ReactNativeWebView.postMessage(JSON.stringify(data));
    }
  });
  
  document.querySelector('.div_ent_01').remove();
  document.querySelector('.footer').remove();
  document.querySelector('.div_menu1').remove();
  document.querySelector('.div_parent_link').remove();
  document.querySelector('.div_principal').style.width = '';
  var Element = document.querySelector('#ctl00_ContentPlaceHolder1_WizardDemande');
  Element.style.width = '900px';
  var inputs = document.querySelectorAll('.TxTBoxSaisie-fr2');
  inputs.forEach(function(input) {
    input.style.width = '600px'; 
    input.style.height = '50px'; 

  });
  var tableElements = document.querySelectorAll('#ctl00_ContentPlaceHolder1_WizardDemande *');
  // Parcourir tous les éléments et augmenter leur taille
  tableElements.forEach(function(element) {
    element.style.fontSize = '25px'; // Augmenter la taille de police à 20 pixels
  });
  var btn = document.querySelector('.btn');
  if (btn) {
    btn.style.fontSize = '30px'; // Augmenter la taille de police à 20 pixels
    btn.style.height ='60px'
  }
  document.querySelector('.TxTBoxSaisie-ar').style.width ='400px';
  document.querySelector('.TxTBoxSaisie-ar').style.height ='40px';
  document.querySelector('#ctl00_ContentPlaceHolder1_WizardPhoto_Captcha1_imgCaptcha').style.width='400px';


})();`,
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
