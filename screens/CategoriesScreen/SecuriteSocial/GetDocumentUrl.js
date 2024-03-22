const GetDocumentUrl = document => {
  switch (document) {
    case 'e-Retraite : Compte du retraité en ligne':
      return 'https://maqraa.dz/courses';
    case 'e-Retraite : Demande de retraite en ligne':
      return 'https://www.marw.dz/%D8%A7%D9%84%D9%81%D8%AA%D9%88%D9%89-%D8%A7%D9%84%D8%A5%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A%D8%A9';
    case 'Suivi du dossier de retraite':
      return 'https://bawabetelhadj.dz/Account/Login';
    case 'Compte Individuel du Salarié (CIS)':
      return 'https://bawabetelomra.dz/Account/Login';
    case 'Edition des attestations de mise à jour de sécurité sociale':
      return 'https://www.marw.dz/%D8%B7%D9%84%D8%A8-%D8%B4%D9%87%D8%A7%D8%AF%D8%A9-%D8%A7%D9%84%D8%AE%D8%A8%D8%B1%D8%A9-%D8%A7%D9%84%D9%85%D9%87%D9%86%D9%8A%D8%A9-%D9%84%D8%A3%D8%B3%D8%A7%D8%AA%D8%B0%D8%A9-%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85-%D8%A7%D9%84%D8%A3%D8%B5%D9%84%D9%8A';
    case 'Déclaration des assiettes de cotisation de sécurité sociale':
      return 'https://www.marw.dz/%D8%B7%D9%84%D8%A8-%D8%B4%D9%87%D8%A7%D8%AF%D8%A9-%D9%86%D8%AC%D8%A7%D8%AD-%D9%81%D9%8A-%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85-%D8%A7%D9%84%D8%A3%D8%B5%D9%84%D9%8A-%D9%84%D9%84%D8%A3%D9%87%D9%84%D9%8A%D8%A9-%D9%88-%D8%A7%D9%84%D8%A8%D9%83%D8%A7%D9%84%D9%88%D8%B1%D9%8A%D8%A7';
    case 'Paiement des cotisations de sécurité sociale à travers le paiement électronique':
      return 'https://www.marw.dz/%D8%B7%D9%84%D8%A8-%D8%B4%D9%87%D8%A7%D8%AF%D8%A9-%D9%86%D8%AC%D8%A7%D8%AD-%D9%81%D9%8A-%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85-%D8%A7%D9%84%D8%A3%D8%B5%D9%84%D9%8A-%D9%84%D9%84%D8%A3%D9%87%D9%84%D9%8A%D8%A9-%D9%88-%D8%A7%D9%84%D8%A8%D9%83%D8%A7%D9%84%D9%88%D8%B1%D9%8A%D8%A7';
    case 'Vérification et dépôt des Déclarations Annuelles des Salaires et des salariés (DAS)':
      return 'https://www.marw.dz/%D8%B7%D9%84%D8%A8-%D8%B4%D9%87%D8%A7%D8%AF%D8%A9-%D9%86%D8%AC%D8%A7%D8%AD-%D9%81%D9%8A-%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85-%D8%A7%D9%84%D8%A3%D8%B5%D9%84%D9%8A-%D9%84%D9%84%D8%A3%D9%87%D9%84%D9%8A%D8%A9-%D9%88-%D8%A7%D9%84%D8%A8%D9%83%D8%A7%D9%84%D9%88%D8%B1%D9%8A%D8%A7';
    case 'La consultation de l’historique des consommations de médicament par les non salariés':
      return 'https://maqraa.dz/courses';
    case 'Dépôt des bordereaux pharmaceutiques par les non salariés':
      return 'https://maqraa.dz/courses';
    case 'Demande d’accord médical a priori à distance par les non salariés':
      return 'https://maqraa.dz/courses';
    case "Simulation de calcul d'une cotisation et de la majoration de retard de sécurité sociale des non salariés":
      return 'https://maqraa.dz/courses';
    case 'Télédéclaration annuelles des salaires et des salariés des entreprises activant dans le secteur du BTPH':
      return 'https://maqraa.dz/courses';
    case "Télédéclaration des arrêts de travail pour cause d'intempéries des entreprises activant dans le secteur du BTPH":
      return 'https://maqraa.dz/courses';
    case "Déclaration en ligne de l'assiette complémentaire de cotisations des entreprises activant dans le secteur du BTPH":
      return 'https://maqraa.dz/courses';
    case "Déclaration de reprise d'activité des entreprises activant dans le secteur du BTPH après un arrêt de travail pour cause d'intempéries":
      return 'https://maqraa.dz/courses';

    default:
      return null;
  }
};

export default GetDocumentUrl;
