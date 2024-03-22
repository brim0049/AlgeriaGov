const GetDocumentUrl = document => {
  switch (document) {
    case 'Plateforme de Gestion des Projets de Recherche Formation-Universitaire':
      return 'https://www.prfu-mesrs.dz/';
    case 'Plateforme du nouveau bachelier':
      return 'https://progres.mesrs.dz/webetu/';
    case "Portail d'inscription des étudiants titulaires d'un baccalauréat étranger":
      return 'https://progres.mesrs.dz/webetrangers/';
    //case 'Plateforme de candidature au concours de doctorat':
    //   return 'https://bawabetelomra.dz/Account/Login';
    case "Plateforme d'authentification des diplômes universitaires":
      return 'https://progres.mesrs.dz/webauthentification/';
    case 'Plateforme des équivalence des diplômes étrangers':
      return 'https://progres.mesrs.dz/webequivalence/';
    case 'Plateforme des œuvres universitaire':
      return 'https://progres.mesrs.dz/webonou/';
    //  case "Plateforme de prise en charge des boursier à l'étranger":
    //  return 'https://progres.mesrs.dz/webonou/';
    case 'Plateforme Programmes Nationaux de Recherche (PNR)':
      return 'https://pnr.dgrsdt.dz/';
    //  case "Plateforme de demande de création d'un établissement privé de formation supérieure":
    //  return 'https://progres.mesrs.dz/webonou/';
    //case 'Plateforme des doléances':
    //   return 'https://progres.mesrs.dz/webonou/';
    case 'Plateforme de transport universitaire':
      return 'https://progres.mesrs.dz/webonou/';
    case "Inscrire à l'examen du baccalauréat (BAC)":
      return 'https://bac.onec.dz/';
    case "Inscrire à l'examen du brevet d'enseignement moyen (BEM)":
      return 'https://bem.onec.dz/';
    case 'Suivre les inscriptions du fin de cycle primaire':
      return 'https://cinq.onec.dz/';
      case "Inscription aux concours d'examens professionnels":
        return 'https://concours.onec.dz/';
  
    case "Plateforme des parents d'élèves":
      return 'https://awlyaa.education.gov.dz/login';
      case 'Plateforme de formation à distance':
        return 'http://scolarium-moyen.onefd.edu.dz/';
        case "Accès à la formation et l'enseignement professionnels via MIHNATI":
          return 'https://www.mfep.gov.dz/%D8%A7%D9%84%D8%AA%D8%B3%D8%AC%D9%8A%D9%84%D8%A7%D8%AA/';
  

    default:
      return null;
  }
};

export default GetDocumentUrl;
