import React from 'react';
import {StyleSheet, Text, KeyboardAvoidingView} from 'react-native';
import ErrorText from '../Components/ErrorText';
import {useLoginFormState} from '../Hooks/useLoginFormState';
import Input from '../Components/Input';
import Button from '../Components/Button';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';

export interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
}

const SignInForm = ({navigation}: Props) => {
  const {
    username,
    password,
    submit,
    setSubmit,
    isPasswordValid,
    isUsernameValid,
  } = useLoginFormState();
  let usernameErrorMsg = '';
  let passwordErrorMsg = '';

  const sendData = async () => {
    setSubmit(true);

    if (isUsernameValid && isPasswordValid) {
      await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify({
          username,
          password,
        }),
      });
      console.log('jacky me chupa la paloma');
      navigation.navigate('Home');
    }
  };

  if (submit && !username.valid) {
    usernameErrorMsg = 'Invalid username.';
  }

  if (submit && !password.valid) {
    passwordErrorMsg = 'Invalid password.';
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="position">
      <Text style={styles.headerText}>Login</Text>
      <Input
        label="Username"
        placeholder="example"
        onChangeText={username.set}
        error={usernameErrorMsg}
        testID="SignIn.usernameInput"
        secureTextEntry={false}
      />
      <Input
        label="Password"
        placeholder="***"
        secureTextEntry
        onChangeText={password.set}
        error={passwordErrorMsg}
        testID="SignIn.passwordInput"
      />
      <ErrorText messages={[usernameErrorMsg, passwordErrorMsg]} />
      <Button testID="SignIn.Button" text="Login" onPress={() => sendData()} />
    </KeyboardAvoidingView>
  );
};

export default SignInForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  headerText: {
    color: '#353031',
    fontWeight: 'bold',
    fontSize: 34,
    marginBottom: 10,
  },
});
