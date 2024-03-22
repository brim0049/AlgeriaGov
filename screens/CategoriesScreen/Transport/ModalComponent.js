import React from 'react';
import { Modal, View, Button, TouchableOpacity, Text } from 'react-native';
import WebViewWithInjectedJS from './WebViewWithInjectedJS';
import GetDocumentUrl from './GetDocumentUrl'; 

const ModalComponentTransport = ({ visible, document, closeModal }) => {
  const url = GetDocumentUrl(document);

  return (
    <Modal visible={visible} animationType="slide">
      <View style={{ flex: 1 }}>
      <View
            style={{
              marginVertical: 5,
          alignSelf:'center'
        
            }}>
        <TouchableOpacity style={{ 
          padding:10,
              backgroundColor: 'white',
              borderColor:'red',  
              borderRadius:20,
              borderStartWidth:8,
              borderEndWidth:8,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 10},
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 20,}}
               onPress={closeModal}>
               <Text style={{
              color:'black',

               }}>
                Fermer l'onglet
               </Text>
                </TouchableOpacity>
        </View>
        {url && <WebViewWithInjectedJS url={url} />}
     
      </View>
    </Modal>
  );
};

export default ModalComponentTransport;
