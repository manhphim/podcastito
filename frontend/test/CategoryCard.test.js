// CategoryCard.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';

import CategoryCard from '../app/components/CategoryCard.tsx'; // Adjust the import path as necessary

// Mock the useNavigation hook
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

describe('CategoryCard', () => {

  const mockNavigate = useNavigation().navigate;
  const mockData = {
    item: {
      name: 'Test Category',
      id: '1',
    },
  };

  it('renders the image and title', () => {
    const { getByText } = render(<CategoryCard data={mockData} />);
    expect(getByText('Test Category')).toBeTruthy();
  });

  // it('navigates when pressed', () => {
  //   // Define mockNavigate inside the test to capture the mock function from useNavigation
  //   const mockNavigate = jest.fn();
  //
  //   // Mock the useNavigation hook inside the test to return the mockNavigate function
  //   jest.mock('@react-navigation/native', () => {
  //     return {
  //       ...jest.requireActual('@react-navigation/native'),
  //       useNavigation: () => ({
  //         navigate: mockNavigate,
  //       }),
  //     };
  //   });
  //
  //   // Now render the CategoryCard
  //   const { getByText } = render(<CategoryCard data={mockData} />);
  //
  //   const titleElement = getByText('Test Category');
  //   fireEvent.press(titleElement);
  //
  //   // Check if mockNavigate was called with the correct arguments
  //   expect(mockNavigate).toHaveBeenCalledWith('CategoryDetails', {
  //     category: mockData.item,
  //   });
  // });

});
