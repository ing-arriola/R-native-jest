import React from 'react';
import {StyleSheet, Text, KeyboardAvoidingView} from 'react-native';
import ErrorText from '../Components/ErrorText';
import {useLoginFormState} from '../Hooks/useLoginFormState';
import Input from '../Components/Input';
import Button from '../Components/Button';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';

interface Props extends StackScreenProps<RootStackParamList, 'signInForm'> {}

const SignInForm = ({navigation}: Props) => {
  const {username, password, submit} = useLoginFormState();
  let usernameErrorMsg = '';
  let passwordErrorMsg = '';

  if (submit.value && !username.valid) {
    usernameErrorMsg = 'Invalid username.';
  }

  if (submit.value && !password.valid) {
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
      <Button
        testID="SignIn.Button"
        text="Login"
        onPress={() => submit.set()}
      />
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
