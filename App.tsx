import 'react-native-gesture-handler';
import React from 'react';
import SignInForm from './src/Screens/SignInForm';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/Screens/Home';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  signInForm: undefined;
  Home: undefined;
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="signInForm" component={SignInForm} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
