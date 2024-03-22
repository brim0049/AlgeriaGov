const GetDocumentUrl = document => {
  switch (document) {
    case 'Déclaration préalable à l’exercice des activités du livre':
      return 'https://e-servicesculture.dz/formulaire-declaration-livre/';
    case 'Certificat de qualification d’architecte des monuments et des sites':
      return 'https://e-servicesculture.dz/formulaire-certificat/';
    case 'Prix Ali maachi':
      return 'https://e-servicesculture.dz/prix-ali-maachi/';
    case "Carte d'artiste":
      return "https://e-servicesculture.dz/carteartiste/";
    case 'Carte professionnelle du cinéma':
      return "https://e-servicesculture.dz/cartecinema/";
    case "Subvention annuelle des associations culturelles":
      return 'https://e-servicesculture.dz/appui-association/';
    default:
      return null;
  }
};

export default GetDocumentUrl;
