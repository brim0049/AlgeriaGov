const GetDocumentUrl = document => {
  switch (document) {
    case 'Plateforme de recrutement':
      return 'https://progres.mesrs.dz/webrecrutement/';
    case "Suivi En ligne des offres d'emploi (entreprises Grand Compte)":
      return 'https://www.marw.dz/%D8%A7%D9%84%D9%81%D8%AA%D9%88%D9%89-%D8%A7%D9%84%D8%A5%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A%D8%A9';
    case "Préinscription au dispositif de l'Allocation Chômage - MINHA":
      return 'https://bawabetelhadj.dz/Account/Login';
    case "Prise de Rendez Vous au niveau de la plateforme de l'allocation du chômage (MINHA)":
      return "https://bawabetelomra.dz/Account/Login";
    case "FORSATI (Postulation en ligne à une offre d'emploi)":
      return "https://www.marw.dz/%D8%B7%D9%84%D8%A8-%D8%B4%D9%87%D8%A7%D8%AF%D8%A9-%D8%A7%D9%84%D8%AE%D8%A8%D8%B1%D8%A9-%D8%A7%D9%84%D9%85%D9%87%D9%86%D9%8A%D8%A9-%D9%84%D8%A3%D8%B3%D8%A7%D8%AA%D8%B0%D8%A9-%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85-%D8%A7%D9%84%D8%A3%D8%B5%D9%84%D9%8A";
    case "Plateforme de la gestion de la main d'œuvre étrangère":
      return 'https://www.marw.dz/%D8%B7%D9%84%D8%A8-%D8%B4%D9%87%D8%A7%D8%AF%D8%A9-%D9%86%D8%AC%D8%A7%D8%AD-%D9%81%D9%8A-%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85-%D8%A7%D9%84%D8%A3%D8%B5%D9%84%D9%8A-%D9%84%D9%84%D8%A3%D9%87%D9%84%D9%8A%D8%A9-%D9%88-%D8%A7%D9%84%D8%A8%D9%83%D8%A7%D9%84%D9%88%D8%B1%D9%8A%D8%A7';
      case "Plateforme de sondage et de suggestion en ligne AraaCom":
        return 'https://www.marw.dz/%D8%B7%D9%84%D8%A8-%D8%B4%D9%87%D8%A7%D8%AF%D8%A9-%D9%86%D8%AC%D8%A7%D8%AD-%D9%81%D9%8A-%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85-%D8%A7%D9%84%D8%A3%D8%B5%D9%84%D9%8A-%D9%84%D9%84%D8%A3%D9%87%D9%84%D9%8A%D8%A9-%D9%88-%D8%A7%D9%84%D8%A8%D9%83%D8%A7%D9%84%D9%88%D8%B1%D9%8A%D8%A7';
        case "Inscription en ligne des employeurs a travers la plateforme wassitonline":
        return 'https://www.marw.dz/%D8%B7%D9%84%D8%A8-%D8%B4%D9%87%D8%A7%D8%AF%D8%A9-%D9%86%D8%AC%D8%A7%D8%AD-%D9%81%D9%8A-%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85-%D8%A7%D9%84%D8%A3%D8%B5%D9%84%D9%8A-%D9%84%D9%84%D8%A3%D9%87%D9%84%D9%8A%D8%A9-%D9%88-%D8%A7%D9%84%D8%A8%D9%83%D8%A7%D9%84%D9%88%D8%B1%D9%8A%D8%A7';

      default:
      return null;
  }
};

export default GetDocumentUrl;
