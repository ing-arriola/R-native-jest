import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import SignInForm, {Props} from '../src/Screens/SignInForm';

const mockedNavigate = jest.fn();

describe('Test for signInForm', () => {
  let props: Props;

  beforeEach(() => {
    props = {
      navigation: {navigate: mockedNavigate} as any,
    };
  });

  it('should render', () => {
    const {toJSON} = render(<SignInForm {...props} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should have 2 login texts', () => {
    const {getAllByText} = render(<SignInForm {...props} />);
    expect(getAllByText('Login').length).toBe(2);
  });

  it('should show error messages', () => {
    const {getByTestId, getByText} = render(<SignInForm {...props} />);
    fireEvent.press(getByTestId('SignIn.Button'));
    getByText('Invalid username.');
    getByText('Invalid password.');
  });

  it('should show invalid username message', () => {
    const {getByTestId, getByText, queryAllByText} = render(
      <SignInForm {...props} />,
    );
    fireEvent.changeText(getByTestId('SignIn.usernameInput'), 'wrong');
    fireEvent.changeText(getByTestId('SignIn.passwordInput'), 'asd');
    fireEvent.press(getByTestId('SignIn.Button'));
    getByText('Invalid username.');
    expect(queryAllByText('Invalid password.').length).toBe(0);
  });

  it('should show invalid password message', () => {
    const {getByTestId, getByText, queryAllByText} = render(
      <SignInForm {...props} />,
    );
    fireEvent.changeText(getByTestId('SignIn.usernameInput'), 'asd');
    fireEvent.changeText(getByTestId('SignIn.passwordInput'), 'wrong');
    fireEvent.press(getByTestId('SignIn.Button'));
    getByText('Invalid password.');
    expect(queryAllByText('Invalid username.').length).toBe(0);
  });

  it('should navigate Home', async () => {
    const {getByTestId} = render(<SignInForm {...props} />);

    fireEvent.changeText(getByTestId('SignIn.usernameInput'), 'asd');
    fireEvent.changeText(getByTestId('SignIn.passwordInput'), 'asd');
    fireEvent.press(getByTestId('SignIn.Button'));

    await waitFor(() => {
      expect(mockedNavigate).toBeCalledWith('Home');
    });
  });
});
