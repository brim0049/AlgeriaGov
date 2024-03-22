import 'react-native-gesture-handler';

import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import {DrawerActions} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';

import Splash_Screen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/homeScreen/HomeScreen';
import NewsScreen from './screens/newsScreen/NewsScreen';
import TrackScreen from './screens/trackScreen/TrackScreen';
import ProfilScreen from './screens/profilScreen/ProfilScreen';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import ScreenEtatCivil from './screens/CategoriesScreen/EtatCivil/ScreenEtatCivil';
import ScreenAffairesReligieuses from './screens/CategoriesScreen/AffairesReligieuses/ScreenAffairesReligieuses';
import ScreenSecuriteSocial from './screens/CategoriesScreen/SecuriteSocial/ScreenSecuriteSocial';
import ScreenAidesSociales from './screens/CategoriesScreen/AidesSocial/ScreenAidesSociales';
import ScreenDroitJustice from './screens/CategoriesScreen/DroitJustice/ScreenDroitJustice';
import ScreenEducationEnseignement from './screens/CategoriesScreen/EducationEnseignement/ScreenEducationEnseignement';
import ScreenCultureSport from './screens/CategoriesScreen/CultureSport/ScreenCultureSport';
import ScreenTravailEmploi from './screens/CategoriesScreen/TravailEmploi/ScreenTravailEmploi';
import ScreenTransport from './screens/CategoriesScreen/Transport/ScreenTransport';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingSpinner from './components/LoadingSpinner';
import ForgetPasswordScreen from './screens/ForgetPasswordScreen';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const {width, height} = Dimensions.get('window');
const CategorieNav = () => {
  return (
    <Stack.Navigator
      screenOptions={({navigation}) => ({
        headerShown: true,

        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Icon
              name="arrow-left"
              size={24}
              color="#000000"
              style={{marginLeft: 16}}
            />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Icon
              name="navicon"
              size={40}
              color="#1B4242"
              style={{marginRight: 16}}
            />
          </TouchableOpacity>
        ),
      })}>
      <Stack.Screen
        name="ScreenEtatCivil"
        component={ScreenEtatCivil}
        options={() => ({
          headerTitle: 'État civil',
        })}
      />
      <Stack.Screen
        name="ScreenAffairesReligieuses"
        component={ScreenAffairesReligieuses}
        options={() => ({
          headerTitle: 'Affaires religieuses',
        })}
      />
      <Stack.Screen
        name="ScreenSecuriteSocial"
        component={ScreenSecuriteSocial}
        options={() => ({
          headerTitle: 'Sécurité social',
        })}
      />
      <Stack.Screen
        name="ScreenAidesSociales"
        component={ScreenAidesSociales}
        options={() => ({
          headerTitle: 'Aides sociales',
        })}
      />
      <Stack.Screen
        name="ScreenDroitJustice"
        component={ScreenDroitJustice}
        options={() => ({
          headerTitle: 'Droit et justice',
        })}
      />
      <Stack.Screen
        name="ScreenEducationEnseignement"
        component={ScreenEducationEnseignement}
        options={() => ({
          headerTitle: 'Éducation et enseignement',
        })}
      />
      <Stack.Screen
        name="ScreenCultureSport"
        component={ScreenCultureSport}
        options={() => ({
          headerTitle: 'Culture et sport',
        })}
      />
      <Stack.Screen
        name="ScreenTravailEmploi"
        component={ScreenTravailEmploi}
        options={() => ({
          headerTitle: 'Travail et emploi',
        })}
      />
      <Stack.Screen
        name="ScreenTransport"
        component={ScreenTransport}
        options={() => ({
          headerTitle: 'Transport',
        })}
      />
    </Stack.Navigator>
  );
};
const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 70,
          position: 'absolute',
          bottom: 16,
          right: 16,
          left: 16,
          borderRadius: 20,
          overflow: 'hidden',
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#5C8374',
        tabBarInactiveTintColor: '#000000',
        tabBarInactiveBackgroundColor: 'rgba(92, 131, 116, 0.45)',
      }}>
      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Actualité',
          tabBarIcon: ({color, size, focused}) => (
            <Icon
              name="newspaper-o"
              size={focused ? size + 7 : size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size, focused}) => (
            <Icon name="home" size={focused ? size + 10 : size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Track"
        component={TrackScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Suivi',
          tabBarIcon: ({color, size, focused}) => (
            <Icon
              name="location-arrow"
              size={focused ? size + 7 : size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const AuthNavigator = ({setInitialRoute}) => (
  <Stack.Navigator>
    <Stack.Screen name="LoginScreen" options={{headerShown: false}}>
      {props => <LoginScreen {...props} setInitialRoute={setInitialRoute} />}
    </Stack.Screen>
    <Stack.Screen name="SignupScreen" options={{headerShown: false}}>
      {props => <SignupScreen {...props} setInitialRoute={setInitialRoute} />}
    </Stack.Screen>
    <Stack.Screen
      name="ForgetPassword"
      component={ForgetPasswordScreen}
      options={{
        headerShown: true,
        headerTitle: 'Réinitialiser le mot de passe',
      }}
    />
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

const App = () => {
  const [initialRoute, setInitialRoute] = useState('Auth');
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [useremail, setUseremail] = useState('');
  const [userprofil, setUserprofil] = useState('');

  useEffect(() => {
    const checkSignedUp = async () => {
      try {
        const isSignedUp = await AsyncStorage.getItem('isSignedUp');
        console.log(isSignedUp);
        setLoading(false);
        if (isSignedUp === 'true') {
          auth().onAuthStateChanged(user => {
            if (user) {
              setInitialRoute('App');
            } else {
              setInitialRoute('Auth');
            }
          });
        } else {
          setInitialRoute('Auth');
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de isSignedUp:', error);
        setInitialRoute('Auth');
      }
    };
    const getCurrentUser = async () => {
      // Récupérer l'utilisateur actuellement authentifié
      const currentUser = auth().currentUser;
      if (currentUser) {
        // Si l'utilisateur est authentifié, récupérer son ID d'utilisateur
        const userId = currentUser.uid;
    
        // Récupérer les données utilisateur à partir de Firestore
        const userDocRef = firestore()
          .collection('utilisateurs')
          .doc(userId);
    
        // Écouter les modifications du document utilisateur
        userDocRef.onSnapshot((doc) => {
          if (doc && doc.exists) { // Vérifier que doc n'est pas null avant d'accéder à ses propriétés
            const userData = doc.data();
            setUserName(`${userData.nom} ${userData.prenom}`);
            setUseremail(`${userData.adresseCourriel}`);
            setUserprofil(userData);
          }
        });
      }
    };
    checkSignedUp();
    getCurrentUser();
  }, []);

  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        setInitialRoute('Auth');
        AsyncStorage.setItem('isSignedUp', 'false');
        console.log('logout');
      })
      .catch(error => {
        console.log('Error logging out: ', error);
      });
  };
  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <NavigationContainer>
      {initialRoute === 'Auth' ? (
        <AuthNavigator setInitialRoute={setInitialRoute} />
      ) : (
        <DrawerTabs
          handleLogout={handleLogout}
          userName={userName}
          useremail={useremail}
          userprofil={userprofil}
        />
      )}
    </NavigationContainer>
  );
};
const DrawerTabs = ({handleLogout, userName, useremail, userprofil}) => {
  return (
    <Drawer.Navigator
      screenOptions={({navigation}) => ({
        drawerStyle: {
          width: 330,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 200,
          backgroundColor: '#1B4242',
        },
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Icon
              name="arrow-left"
              size={24}
              color="#000000"
              style={{marginLeft: 16}}
            />
          </TouchableOpacity>
        ),
      })}
      drawerContent={props => (
        <Sidebar
          {...props}
          handleLogout={handleLogout}
          userName={userName}
          useremail={useremail}
          userprofil={userprofil}
        />
      )}>
      <Drawer.Screen
        name="HomeTabs"
        component={HomeTabs}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfilScreen}
        options={{headerShown: true}}
      />
      <Drawer.Screen
        name="CategorieNav"
        component={CategorieNav}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

const Sidebar = ({
  navigation,
  handleLogout,
  userName,
  useremail,
  userprofil,
}) => (
  <View style={{flex: 1}}>
    <TouchableOpacity
      style={{
        alignSelf: 'flex-start',
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={() => navigation.closeDrawer()}>
      <Icon name="close" size={20} color="#1B4242" />
    </TouchableOpacity>

    <View style={{alignItems: 'center', marginVertical: 20}}>
      <Image
        source={
          userprofil.photoURL
            ? {uri: userprofil.photoURL}
            : require('./assets/profile.jpg')
        }
        style={{
          width: 140,
          height: 140,
          borderRadius: 70,
          borderWidth: 4,
          borderColor: 'white',
          overflow: 'hidden',
        }}
      />
      <Text style={{color: '#fff', fontSize: 18, marginTop: 10}}>
        {userName ? `${userName}` : 'Chargement...'}
      </Text>
      <Text style={{color: '#fff', fontSize: 16}}>
        {useremail ? `${useremail}` : 'Chargement...'}
      </Text>
    </View>
    <View style={{marginHorizontal: 20}}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10,
          borderBottomColor: 'rgba(0, 0, 0, 0.5)',
          borderBottomWidth: 1,
          paddingBottom: 20,
        }}
        onPress={() => navigation.navigate('Profile')}>
        <Icon name="user" size={20} color="#fff" />
        <Text style={{color: '#fff', fontSize: 18, marginLeft: 10}}>
          Profil
        </Text>
        <Icon
          name="angle-right"
          size={20}
          color="#fff"
          style={{marginLeft: 'auto'}}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10,
          borderBottomColor: 'rgba(0, 0, 0, 0.5)',
          borderBottomWidth: 1,
          paddingBottom: 20,
        }}
        onPress={() => navigation.navigate('Notification')}>
        <Icon name="bell" size={20} color="#fff" />
        <Text style={{color: '#fff', fontSize: 18, marginLeft: 10}}>
          Notification
        </Text>
        <Icon
          name="angle-right"
          size={20}
          color="#fff"
          style={{marginLeft: 'auto'}}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10,
          borderBottomColor: 'rgba(0, 0, 0, 0.5)',
          borderBottomWidth: 1,
          paddingBottom: 20,
        }}
        onPress={() => navigation.navigate('Home')}>
        <Icon name="home" size={20} color="#fff" />
        <Text style={{color: '#fff', fontSize: 18, marginLeft: 10}}>
          Accueil
        </Text>
        <Icon
          name="angle-right"
          size={20}
          color="#fff"
          style={{marginLeft: 'auto'}}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10,
          borderBottomColor: 'rgba(0, 0, 0, 0.5)',
          borderBottomWidth: 1,
          paddingBottom: 20,
        }}
        onPress={() => navigation.navigate('News')}>
        <Icon name="newspaper-o" size={20} color="#fff" />
        <Text style={{color: '#fff', fontSize: 18, marginLeft: 10}}>
          Actualités
        </Text>
        <Icon
          name="angle-right"
          size={20}
          color="#fff"
          style={{marginLeft: 'auto'}}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10,
          borderBottomColor: 'rgba(0, 0, 0, 0.5)',
          borderBottomWidth: 1,
          paddingBottom: 20,
        }}
        onPress={() => navigation.navigate('Parametre')}>
        <Icon name="gear" size={20} color="#fff" />
        <Text style={{color: '#fff', fontSize: 18, marginLeft: 10}}>
          Parametre
        </Text>
        <Icon
          name="angle-right"
          size={20}
          color="#fff"
          style={{marginLeft: 'auto'}}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10,
          borderBottomColor: 'rgba(0, 0, 0, 0.5)',
          borderBottomWidth: 1,
          paddingBottom: 20,
        }}
        onPress={handleLogout}>
        <Icon name="sign-out" size={20} color="#fff" />
        <Text style={{color: '#fff', fontSize: 18, marginLeft: 10}}>
          Déconnecter
        </Text>
        <Icon
          name="angle-right"
          size={20}
          color="#fff"
          style={{marginLeft: 'auto'}}
        />
      </TouchableOpacity>
    </View>
  </View>
);
export default App;
