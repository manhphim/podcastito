import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import UserProfile from '../app/screens/ProfileScreen';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

beforeEach(() => {
  fetch.resetMocks();
  jest.clearAllMocks();
});

// Mock the ImagePicker module
jest.mock('react-native-image-picker', () => ({
  launchCamera: jest.fn(),
}));

describe('UserProfile', () => {
  it('allows the user to enter their name, email, password, and address', () => {
    const { getByLabelText } = render(<UserProfile />);

    fireEvent.changeText(getByLabelText('Name'), 'John Doe');
    fireEvent.changeText(getByLabelText('Email'), 'john@example.com');
    fireEvent.changeText(getByLabelText('Password'), 'password123');
    fireEvent.changeText(getByLabelText('Address'), '123 Main St');

    // You can assert state changes or the presence of values if your inputs are controlled
  });

  it('saves the profile data when the save button is pressed', async () => {
    fetch.mockResponseOnce(JSON.stringify({ success: true }));

    const { getByText } = render(<UserProfile />);
    fireEvent.press(getByText('Save Profile'));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(expect.any(Object)), // Add your expected body here
      }));
    });
  });

  it('selects categories correctly', () => {
    const { getByText, getAllByText } = render(<UserProfile />);
    fireEvent.press(getByText('Select Podcast Categories'));
    fireEvent.press(getAllByText('Business')[0]); // Assuming 'Business' is a category in the UI

    // Here you should check if the state was updated as expected
  });

  it('opens the camera to change the photo', () => {
    const { launchCamera } = require('react-native-image-picker');
    const { getByText } = render(<UserProfile />);

    fireEvent.press(getByText('Change Photo'));
    expect(launchCamera).toHaveBeenCalled();
  });
});
