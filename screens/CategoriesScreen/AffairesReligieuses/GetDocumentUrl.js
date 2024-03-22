const GetDocumentUrl = document => {
  switch (document) {
    case 'El Moquraa Electronique':
      return 'https://maqraa.dz/courses';
    case 'Fatwa':
      return 'https://www.marw.dz/%D8%A7%D9%84%D9%81%D8%AA%D9%88%D9%89-%D8%A7%D9%84%D8%A5%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A%D8%A9';
    case 'Portail du Hadj':
      return 'https://bawabetelhadj.dz/Account/Login';
    case 'Portail de la Omra':
      return "https://bawabetelomra.dz/Account/Login";
    case 'Demande d’attestation d’expérience professionnelle des enseignants de l’enseignement original':
      return "https://www.marw.dz/%D8%B7%D9%84%D8%A8-%D8%B4%D9%87%D8%A7%D8%AF%D8%A9-%D8%A7%D9%84%D8%AE%D8%A8%D8%B1%D8%A9-%D8%A7%D9%84%D9%85%D9%87%D9%86%D9%8A%D8%A9-%D9%84%D8%A3%D8%B3%D8%A7%D8%AA%D8%B0%D8%A9-%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85-%D8%A7%D9%84%D8%A3%D8%B5%D9%84%D9%8A";
    case "Demande de certificat du succès à l’enseignement original du brevet et du Baccalauréat":
      return 'https://www.marw.dz/%D8%B7%D9%84%D8%A8-%D8%B4%D9%87%D8%A7%D8%AF%D8%A9-%D9%86%D8%AC%D8%A7%D8%AD-%D9%81%D9%8A-%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85-%D8%A7%D9%84%D8%A3%D8%B5%D9%84%D9%8A-%D9%84%D9%84%D8%A3%D9%87%D9%84%D9%8A%D8%A9-%D9%88-%D8%A7%D9%84%D8%A8%D9%83%D8%A7%D9%84%D9%88%D8%B1%D9%8A%D8%A7';
      case "Demande d’autorisation préalable d’importation du livre religieux":
        return 'https://www.marw.dz/%D8%B7%D9%84%D8%A8-%D8%A7%D9%84%D8%AA%D8%B1%D8%AE%D9%8A%D8%B5-%D8%A7%D9%84%D9%85%D8%B3%D8%A8%D9%82-%D9%84%D8%A7%D8%B3%D8%AA%D9%8A%D8%B1%D8%A7%D8%AF-%D8%A7%D9%84%D9%83%D8%AA%D8%A7%D8%A8-%D8%A7%D9%84%D8%AF%D9%8A%D9%86%D9%8A';  
    default:
      return null;
  }
};

export default GetDocumentUrl;
