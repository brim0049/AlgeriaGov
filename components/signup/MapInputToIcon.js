const mapInputToIcon = input => {
    switch (input) {
      case 'Adresse courriel':
        return 'envelope';
      case 'Mot de passe':
      case 'Confirmation de mot de passe':
        return 'lock';
      case 'Nom':
      case 'Nom en Arabe':
        return 'user';
      case 'Prénom':
      case 'Prénom en Arabe':
        return 'user';
      case 'Date de naissance':
        return 'calendar';
      case 'Ville natale':
        return 'location-arrow';
      case 'Municipalité de naissance':
        return 'building';
      case 'Nationalité':
        return 'flag';
      case 'Numero téléphone':
        return 'phone';
      case 'Additional Info':
        return 'info';
      default:
        return 'lock';
    }
  };
export default mapInputToIcon;