import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import PlayListScreen from '../app/screens/PlayListSreen';
import * as Font from 'expo-font';
import { useGetPlaylists } from '../app/hooks/get-data/playlist';

// Mocking the external modules and hooks
jest.mock('expo-font');
jest.mock('../app/hooks/get-data/playlist', () => ({
  useGetPlaylists: jest.fn(),
}));

// Mocking successful data fetch
const mockData = [
  { id: '1', name: 'Playlist 1', episodes: 10 },
  { id: '2', name: 'Playlist 2', episodes: 20 },
];

describe('<PlayListScreen />', () => {


  it('renders an error message when there is an error', async () => {
    useGetPlaylists.mockReturnValue({ data: null, isError: true, error: { message: 'Error fetching data' }, isPending: false });
    const { getByText } = render(<PlayListScreen />);
    await waitFor(() => {
      expect(getByText('Error fetching data')).toBeTruthy();
    });
  });

  // it('renders the flatlist with items when data is loaded', async () => {
  //   useGetPlaylists.mockReturnValue({ data: mockData, isError: false, error: null, isPending: false });
  //   Font.loadAsync.mockResolvedValue(true);
  //
  //   const { getByText, queryByTestId } = render(<PlayListScreen />);
  //   await waitFor(() => {
  //     expect(queryByTestId('flatlist')).toBeTruthy();
  //     expect(getByText('Playlist 1')).toBeTruthy();
  //     expect(getByText('Playlist 2')).toBeTruthy();
  //   });
  // });

});

