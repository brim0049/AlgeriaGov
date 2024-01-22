import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';

const Stack = createStackNavigator();

const App = () => {
  const [isSplashVisible, setSplashVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSplashVisible(false);
    }, 5000); // Masquer l'écran de démarrage après 5 secondes
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isSplashVisible ? 'Splash' : 'SignupScreen'}>
        {isSplashVisible ? (
                    <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />

            ) : (
          <>

                      <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ headerShown: false }} />
                      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />


          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>  );
};

export default App;
