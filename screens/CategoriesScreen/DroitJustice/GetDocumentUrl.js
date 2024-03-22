const GetDocumentUrl = document => {
  switch (document) {
    case "Rectification électronique des erreurs contenues dans les registres d'état civil":
      return 'https://portail.mjustice.dz/remote/login?lang=en';
    case 'E-doléance-Mjustice':
      return 'https://www.mjustice.dz/ar/%d8%a7%d9%86%d8%b4%d8%ba%d8%a7%d9%84%d8%a7%d8%aa/';
    case 'E-participation-Mjustice':
      return 'https://www.mjustice.dz/fr/e-participation/';
    case "Obtention d'une copie conforme du décret de naturalisation en ligne":
      return 'https://portail.mjustice.dz/remote/login?lang=en';
    case 'Suivi du cours de votre affaire':
      return 'https://coursdesaffaires.mjustice.dz/affaire/index.php';
    case 'Obtention du certificat de nationalité en ligne':
      return 'https://portail.mjustice.dz/remote/login?lang=en';
    case 'Demande et retrait en ligne du casier judiciaire (Bulletin n°03)':
      return 'https://www.mjustice.dz/ar/%d8%b5%d9%80%d8%ad%d9%8a%d9%81%d8%a9%d8%a7%d9%84%d8%b3%d9%88%d8%a7%d8%a8%d9%82-%d8%a7%d9%84%d9%82%d8%b6%d8%a7%d8%a6%d9%8a%d8%a9/';
    case 'Attestation de présence en détention durant la guerre de libération nationale':
      return 'https://www.mjustice.dz/ar/archive/';
    case "Copies d'actes des tribunaux du droit musulman El-Mahakim El-Charîa":
      return 'https://www.mjustice.dz/ar/tr-ch/';
      case "Parquet électronique":
        return 'https://e-nyaba.mjustice.dz/choix.php';
  
    default:
      return null;
  }
};

export default GetDocumentUrl;
