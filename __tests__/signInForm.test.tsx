import React from 'react';
import {act, fireEvent, render} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInForm from '../src/Screens/SignInForm';
import Home from '../src/Screens/Home';
const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  signInForm: undefined;
  Home: undefined;
};

const singIn = (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="signInForm" component={SignInForm} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  </NavigationContainer>
);

test('should render', () => {
  const {getAllByText} = render(singIn);
  expect(getAllByText('Login').length).toBe(2);
});

test('should show error messages', () => {
  const {getByTestId, getByText} = render(singIn);
  fireEvent.press(getByTestId('SignIn.Button'));
  getByText('Invalid username.');
  getByText('Invalid password.');
});

it('should show invalid username message', () => {
  const {getByTestId, getByText, queryAllByText} = render(singIn);
  fireEvent.changeText(getByTestId('SignIn.usernameInput'), 'wrong');
  fireEvent.changeText(getByTestId('SignIn.passwordInput'), 'asd');
  fireEvent.press(getByTestId('SignIn.Button'));
  getByText('Invalid username.');
  expect(queryAllByText('Invalid password.').length).toBe(0);
});

it('handle valid submission', () => {
  fetch.mockResponseOnce(JSON.stringify({passes: true}));
  const {getByTestId} = render(singIn);

  act(() => {
    /* fire events that update state */
    fireEvent.changeText(getByTestId('SignIn.usernameInput'), 'asd');
    fireEvent.changeText(getByTestId('SignIn.passwordInput'), 'asd');
    fireEvent.press(getByTestId('SignIn.Button'));
  });
});
