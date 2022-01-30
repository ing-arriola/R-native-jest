import React from 'react';
import {act, fireEvent, render} from '@testing-library/react-native';
import SignInForm from '../src/Screens/SignInForm';

describe('Test for signInForm', () => {
  it('should render', () => {
    const {getAllByText} = render(<SignInForm />);
    expect(getAllByText('Login').length).toBe(2);
  });

  it('should show error messages', () => {
    const {getByTestId, getByText} = render(<SignInForm />);
    fireEvent.press(getByTestId('SignIn.Button'));
    getByText('Invalid username.');
    getByText('Invalid password.');
  });

  it('should show invalid username message', () => {
    const {getByTestId, getByText, queryAllByText} = render(<SignInForm />);
    fireEvent.changeText(getByTestId('SignIn.usernameInput'), 'wrong');
    fireEvent.changeText(getByTestId('SignIn.passwordInput'), 'asd');
    fireEvent.press(getByTestId('SignIn.Button'));
    getByText('Invalid username.');
    expect(queryAllByText('Invalid password.').length).toBe(0);
  });

  it('should show invalid password message', () => {
    const {getByTestId, getByText, queryAllByText} = render(<SignInForm />);
    fireEvent.changeText(getByTestId('SignIn.usernameInput'), 'asd');
    fireEvent.changeText(getByTestId('SignIn.passwordInput'), 'wrong');
    fireEvent.press(getByTestId('SignIn.Button'));
    getByText('Invalid password.');
    expect(queryAllByText('Invalid username.').length).toBe(0);
  });

  it('handle valid submission', () => {
    const {getByTestId} = render(<SignInForm />);
    act(() => {
      fireEvent.changeText(getByTestId('SignIn.usernameInput'), 'asd');
      fireEvent.changeText(getByTestId('SignIn.passwordInput'), 'asd');
      fireEvent.press(getByTestId('SignIn.Button'));
    });
  });
});
