const GetDocumentUrl = document => {
  switch (document) {
    case 'Délivrance de document administratif de distance':
      return 'https://portail.mtpt.gov.dz/service.php?id=8&lg=ar';
    default:
      return null;
  }
};

export default GetDocumentUrl;
