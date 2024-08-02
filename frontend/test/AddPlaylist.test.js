// AddPlaylist.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AddPlaylist from '../app/components/AddPlaylist.tsx'; // Adjust the import path as necessary

describe('AddPlaylist', () => {
  it('opens the modal when the "Add Playlist" button is pressed', () => {
    const { getByText, getByPlaceholderText } = render(<AddPlaylist />);

    // Before button press, the modal and text input should not be in the document
    expect(() => getByPlaceholderText('Playlist name')).toThrow('Unable to find an element');

    // Simulate button press
    const button = getByText('Add Playlist');
    fireEvent.press(button);

    // After button press, the modal and text input should be present
    expect(getByPlaceholderText('Playlist name')).toBeTruthy();
  });

  it('closes the modal when the "Close" button is pressed', () => {
    const { getByText, queryByText } = render(<AddPlaylist />);

    // Open the modal
    fireEvent.press(getByText('Add Playlist'));
    // Close the modal
    fireEvent.press(getByText('Close'));

    // The 'Add Playlist' button should be visible again, and 'Close' button should not
    expect(queryByText('Close')).toBeNull();
    expect(getByText('Add Playlist')).toBeTruthy();
  });

});
