// AppTextInput.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AppTextInput from '../app/components/AppInputText.tsx'; // Adjust the import path as necessary
import Colors from '../app/constants/Colors'; // Adjust the import path as necessary
import { StyleSheet } from 'react-native';

describe('AppTextInput', () => {
  it('renders correctly with default styles', () => {
    const { getByPlaceholderText } = render(<AppTextInput placeholder="Test Input" />);

    const input = getByPlaceholderText('Test Input');
    // Assuming the style prop is an array, you need to find the specific style object
    const defaultStyle = StyleSheet.flatten(input.props.style);

    expect(defaultStyle).toMatchObject({
      fontSize: expect.any(Number),
      padding: expect.any(Number),
      backgroundColor: Colors.lightPrimary,
      borderRadius: expect.any(Number),
      marginVertical: expect.any(Number),
    });
  });

  it('changes style on focus', () => {
    const { getByPlaceholderText } = render(<AppTextInput placeholder="Test Input" />);

    const input = getByPlaceholderText('Test Input');
    fireEvent(input, 'focus');

    // After firing the event, the style prop might have changed, so flatten it again
    const focusedStyle = StyleSheet.flatten(input.props.style);

    expect(focusedStyle).toMatchObject({
      borderWidth: 3,
      borderColor: Colors.primary,
    });

    fireEvent(input, 'blur');

    const blurredStyle = StyleSheet.flatten(input.props.style);

    // Now, we are checking that the specific styles are not present after the blur event
    expect(blurredStyle.borderWidth).not.toBe(3);
    expect(blurredStyle.borderColor).not.toBe(Colors.primary);
  });

});
