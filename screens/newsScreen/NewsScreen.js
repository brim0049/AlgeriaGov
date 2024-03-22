import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Modal,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Header from '../../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import HTML from 'react-native-render-html';
import auth from '@react-native-firebase/auth'; // Import de l'authentification Firebase

const NewsScreen = () => {
  const windowWidth = useWindowDimensions().width;

  const compareDates = (a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime(); // Tri décroissant
  };
  const [news, setNews] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('news')
      .onSnapshot(snapshot => {
        const updatedNews = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        updatedNews.sort(compareDates);
        setNews(updatedNews);
      });

    return () => unsubscribe();
  }, []);

  const handleLike = async newsId => {
    try {
      // Récupérer l'utilisateur actuellement authentifié
      const currentUser = auth().currentUser;

      if (currentUser) {
        const userId = currentUser.uid;

        const newsRef = firestore().collection('news').doc(newsId);
        const newsDoc = await newsRef.get();

        if (newsDoc.exists) {
          const newsData = newsDoc.data();
          const likes = newsData.likes || 0;

          // Vérifier si l'utilisateur a déjà aimé l'article
          if (newsData.usersLiked && newsData.usersLiked.includes(userId)) {
            // L'utilisateur a déjà aimé l'article, donc on supprime le like
            await newsRef.update({
              likes: firestore.FieldValue.increment(-1),
              usersLiked: firestore.FieldValue.arrayRemove(userId),
            });
          } else {
            // L'utilisateur n'a pas encore aimé l'article, donc on ajoute le like
            await newsRef.update({
              likes: firestore.FieldValue.increment(1),
              usersLiked: firestore.FieldValue.arrayUnion(userId),
            });
          }
        }
      } else {
        // Gérer le cas où aucun utilisateur n'est actuellement authentifié
        console.log('Aucun utilisateur actuellement authentifié');
      }
    } catch (error) {
      console.error('Error updating like count:', error);
    }
  };

  const handleMainNewsPress = newsId => {
    // Handle main news press, e.g., navigate to the full article screen
    console.log('Main news pressed:', newsId);
  };

  const handleNewsPress = newsItem => {
    setSelectedNews(newsItem);
    setModalVisible(true);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#F0F8FF'}}>
      <View
        style={{
          backgroundColor: 'white',
          borderBottomRightRadius: 30,
          borderBottomLeftRadius: 30,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}>
        <Header showSearch={false} />
      </View>
      <View style={{borderBottomRightRadius: 30, borderBottomLeftRadius: 30}}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            color: 'black',
            marginLeft: 20,
          }}>
          Actualités
        </Text>
      </View>
      <ScrollView style={{flex: 1, marginBottom: 90}}>
        {/* Main News */}
        {news.length > 0 && (
          <TouchableOpacity
            onPress={() => handleNewsPress(news[0])}
            style={{
              marginHorizontal: 20,
              marginVertical: 15,
              height: 320,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              backgroundColor: 'white',
              borderRadius: 30,
            }}>
            <View>
              <Image
                source={{uri: news[0].image}}
                style={{width: '100%', height: 210, borderRadius: 30}}
              />
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: 'black',
                  marginHorizontal: 10,
                  marginTop: 5,
                }}
                numberOfLines={2}
                ellipsizeMode="tail">
                {news[0].title}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: 10,
                }}>
                <Text>
                  <Icon
                    name={'calendar'}
                    size={15}
                    color="#5C8374"
                    style={{alignSelf: 'center'}}
                  />
                  {'  '}
                  {news[0].date}
                </Text>
                <TouchableOpacity onPress={() => handleLike(news[0].id)}>
                  <Text>
                    {news[0].likes || 0}
                    {'  '}
                    <Icon
                      name={
                        news[0].usersLiked &&
                        news[0].usersLiked.includes(auth().currentUser.uid)
                          ? 'heart'
                          : 'heart-o'
                      }
                      size={30}
                      color="#5C8374"
                    />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}

        {/* Other News */}
        <View style={{flex: 1}}>
          {news.slice(1).map(item => (
            <View
              key={item.id}
              style={{
                marginHorizontal: 20,
                marginVertical: 5,
                backgroundColor: 'white',
                borderRadius: 20,
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}>
              <TouchableOpacity onPress={() => handleNewsPress(item)}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={{uri: item.image}}
                    style={{
                      width: 100,
                      height: 100,
                      marginRight: 10,
                      borderRadius: 20,
                    }}
                  />
                  <View style={{flex: 1, margin: 5}}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: 'black',
                      }}
                      numberOfLines={2}
                      ellipsizeMode="tail">
                      {item.title}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Text>
                        <Icon name={'calendar'} size={15} color="#5C8374" />
                        {'  '}
                        {item.date}
                      </Text>
                      <TouchableOpacity onPress={() => handleLike(item.id)}>
                        <Text>
                          {item.likes || 0}
                          {'  '}
                          <Icon
                            name={
                              item.usersLiked &&
                              item.usersLiked.includes(auth().currentUser.uid)
                                ? 'heart'
                                : 'heart-o'
                            }
                            size={30}
                            color="#5C8374"
                          />{' '}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
      {/* Modal */}
      <Modal animationType="slide" visible={modalVisible}>
        <View style={{backgroundColor: '#F0F8FF'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1,
            }}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <View
                style={{
                  marginLeft: 10,
                  marginTop: 5,
                  width: 40,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 45,
                  backgroundColor: 'white',
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}>
                <Icon name={'arrow-left'} size={20} color="black" />
              </View>
            </TouchableOpacity>
            <Text style={{textAlign: 'right',marginTop:20, color:'black'}}>
              {selectedNews?.date}
            </Text>
            <View
              style={{
                marginRight: 10,
                marginTop: 5,
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 45,
                backgroundColor: 'white',
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Icon name={'send'} size={20} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView style={{marginHorizontal: 10}}>
            <View
              style={{
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                backgroundColor: 'white',
                borderRadius: 30,
                marginTop: 60,
              }}>
              <Image
                source={{uri: selectedNews?.image}}
                style={{width: '100%', height: 210, borderRadius: 30}}
              />
            </View>
            <Text style={styles.modalText}>{selectedNews?.title}</Text>
            <View
              style={{borderBottomWidth: 1, borderBottomColor: 'black'}}></View>
            {/*  
            <Text style={{textAlign: 'right', marginRight: 20}}>
              {selectedNews?.date}
            </Text>
            */}
            <View style={{marginTop: 5}}>
              <HTML
                source={{html: selectedNews?.description}}
                contentWidth={windowWidth}
              />
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  modalView: {
    backgroundColor: 'white',
  },
  openButton: {
    backgroundColor: '#F194FF',
    padding: 10,
    margin: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginVertical: 15,
    marginHorizontal: 5,
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
});
export default NewsScreen;
