// WelcomeScreen.test.js

import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import WelcomeScreen from '../app/screens/WelcomeScreen';
import expect from 'expect'; // Adjust the import path accordingly

// A mock navigation object with a navigate function
const mockNavigate = jest.fn();
const mockNavigation = {
  navigate: mockNavigate,
};

describe('WelcomeScreen', () => {
  it('renders the welcome message correctly', () => {
    // Render the WelcomeScreen with the mockNavigation prop
    const { getByText } = render(<WelcomeScreen navigation={mockNavigation} />);

    const welcomeMessage = getByText('Discover our revolutionary podcast library');
    expect(welcomeMessage).toBeTruthy(); // or .not.toBeNull()
  });

  it('navigates to Login screen on button press', () => {
    const { getByText } = render(<WelcomeScreen navigation={mockNavigation} />);
    fireEvent.press(getByText('Login'));
    expect(mockNavigate).toHaveBeenCalledWith('Login');
  });


  it('navigates to Register screen on button press', () => {
    const { getByText } = render(<WelcomeScreen navigation={mockNavigation} />);
    fireEvent.press(getByText('Register'));
    expect(mockNavigate).toHaveBeenCalledWith('Register');
  });
});
