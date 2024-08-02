import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import RegisterScreen from '../app/screens/RegisterScreen';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// Create a mock store for the Redux provider
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// Mock navigation
const mockNavigate = jest.fn();

// Mock the useDispatch hook
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: () => jest.fn().mockImplementation(() => mockNavigate),
}));

describe('RegisterScreen', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
    });
  });

  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <RegisterScreen navigation={{ navigate: mockNavigate }} />
      </Provider>
    );

    // Check if the input fields are present
    expect(getByPlaceholderText('Username')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByPlaceholderText('Confirm Password')).toBeTruthy();

    // Check if the buttons are present
    expect(getByText('Sign up')).toBeTruthy();
    expect(getByText('Already have an account')).toBeTruthy();
  });

});

