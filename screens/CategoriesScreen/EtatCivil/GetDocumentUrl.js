const GetDocumentUrl = document => {
  switch (document) {
    case 'Acte de naissance':
      return 'https://etatcivil.interieur.gov.dz/ActeNaissance/';
    case 'Acte de mariage':
      return 'https://etatcivil.interieur.gov.dz/ActeMariage/';
    case 'Acte de décès':
      return 'https://etatcivil.interieur.gov.dz/ActeDeces/';
    case 'Demander votre carte nationale d’identité biométrique':
      return "https://passeport.interieur.gov.dz/Fr/DemandeCNIBE_Fr/Demande%20carte%20national%20d'identit%C3%A9%20biom%C3%A9trique%20%C3%A9lectronique";
    case 'Suivre votre demande CNIBE':
      return "https://passeport.interieur.gov.dz/Fr/SuiviCNIBE_Fr/Suivi%20la%20demande%20de%20la%20carte%20national%20d'identit%c3%a9%20biom%c3%a9trique%20%c3%a9lectronique";
    case "Charger une nouvelle photo d'identité conforme aux normes ICAO":
      return 'https://passeport.interieur.gov.dz/Fr/Rejet_Fr/Chargement_Photo';
      case "Demander votre passeport":
        return 'https://passeport.interieur.gov.dz/Fr/Inscription_Fr/Authentification';
    case "Suivre votre demande du passeport":
      return 'https://passeport.interieur.gov.dz/Fr/Suivi_Fr/Suivi%20demande%20passeport';
      case "Demandes de certificat de capacité du permis de conduire, au profit des ressortissants algériens établis à l'étranger en ligne":
        return 'https://capacitepc.interieur.gov.dz/GET-STARTED';
      case "Suivi de demande de permis de conduire":
        return 'https://passeport.interieur.gov.dz/Fr/SuiviPCBEP_Fr/Suivi%20la%20demande%20du%20permis%20de%20conduire';
    default:
      return null;
  }
};

export default GetDocumentUrl;
