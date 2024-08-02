import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../app/screens/HomeScreen';
import { useGetPodcasts } from '../app/hooks';
import { useGetCategories } from '../app/hooks';

// Mocking the hooks
jest.mock('../app/hooks/get-data/podcasts', () => ({
  useGetPodcasts: jest.fn(),
}));
jest.mock('../app/hooks/get-data/category', () => ({
  useGetCategories: jest.fn(),
}));

describe('HomeScreen', () => {
  it('renders the loading state when data is being fetched', () => {
    useGetPodcasts.mockReturnValue({ isPending: true });
    useGetCategories.mockReturnValue({ isPending: true });

    const screen = render(<HomeScreen />);
    expect(screen.getByTestId('ActivityIndicator')).toBeTruthy();
  });

  it('renders the error state when there is an error fetching podcasts', () => {
    const errorMessage = 'Error fetching podcasts';
    useGetPodcasts.mockReturnValue({ isError: true, error: { message: errorMessage } });
    useGetCategories.mockReturnValue({ data: { results: [] } }); // Assuming no error for categories

    const screen = render(<HomeScreen />);
    expect(screen.getByText(errorMessage)).toBeTruthy();
  });

  it('renders the error state when there is an error fetching categories', () => {
    const errorMessage = 'Error fetching categories';
    useGetPodcasts.mockReturnValue({ data: { results: [] } }); // Assuming no error for podcasts
    useGetCategories.mockReturnValue({ isError: true, error: { message: errorMessage } });

    const screen = render(<HomeScreen />);
    expect(screen.getByText(errorMessage)).toBeTruthy();
  });

  it('renders content blocks when data is fetched successfully', () => {
    useGetPodcasts.mockReturnValue({
      data: { results: [{ id: 1, name: 'Podcast 1' }] },
      isPending: false,
      isError: false,
    });
    useGetCategories.mockReturnValue({
      data: { results: [{ id: 'cat1', name: 'Category 1' }] },
      isPending: false,
      isError: false,
    });

    const screen = render(<HomeScreen />);
    expect(screen.getByText('Top Podcasts')).toBeTruthy();
    expect(screen.getByText('Categories')).toBeTruthy();
  });
});
