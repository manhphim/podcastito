// import React from 'react';
// import { render, fireEvent, waitFor } from '@testing-library/react-native';
// import EpisodeCard from '../app/components/EpisodeCard';
// import { NavigationContainer } from '@react-navigation/native';
//
// // Mocks for navigation and hooks
// jest.mock('@react-navigation/native', () => ({
//   ...jest.requireActual('@react-navigation/native'),
//   useNavigation: () => ({
//     navigate: jest.fn(),
//   }),
// }));
//
// jest.mock('../app/hooks', () => ({
//   useGetPodcastDetails: jest.fn(),
// }));
//
// // Mock data for the component
// const mockData = {
//   item: {
//     feedId: '1',
//     image: 'test_image_url',
//     title: 'Test Episode Title',
//     duration: 3600,
//     datePublishedPretty: '1st Jan 2020',
//     description: 'Test description',
//     enclosureUrl: 'test_enclosure_url',
//   },
// };
//
// // Write tests
// describe('EpisodeCard', () => {
//   // Render test
//   it('renders correctly', () => {
//     const { getByText } = render(<EpisodeCard data={mockData} />);
//     expect(getByText('Test Episode Title')).toBeTruthy();
//   });
//
//   // Loading state test
//   it('displays a loading indicator when the podcast details are being fetched', () => {
//     // Set up the useGetPodcastDetails hook to return isPending as true
//     useGetPodcastDetails.mockReturnValue({ isPending: true });
//     const { getByTestId } = render(<EpisodeCard data={mockData} />);
//     expect(getByTestId('activity-indicator')).toBeTruthy();
//   });
//
//   // Success state test
//   it('displays the episode details when the data is successfully fetched', async () => {
//     // Mock the successful return of the podcast details
//     useGetPodcastDetails.mockReturnValue({
//       data: { author: 'Test Author' },
//       isError: false,
//       isPending: false,
//       error: null,
//     });
//
//     const { getByText } = render(<EpisodeCard data={mockData} />);
//     await waitFor(() => {
//       expect(getByText('Test Episode Title')).toBeTruthy();
//       expect(getByText('Test description')).toBeTruthy();
//       expect(getByText('60 minutes')).toBeTruthy(); // assuming your convertDuration is correct
//       expect(getByText('1st Jan 2020')).toBeTruthy();
//     });
//   });
//
//   // Navigation test
//   it('navigates to the EpisodePlayer screen with correct parameters when the card is pressed', () => {
//     // Mock the successful return of the podcast details
//     useGetPodcastDetails.mockReturnValue({
//       data: { author: 'Test Author' },
//       isError: false,
//       isPending: false,
//       error: null,
//     });
//
//     const navigate = jest.fn();
//     useNavigation.mockReturnValue({ navigate });
//
//     const { getByTestId } = render(
//       <NavigationContainer>
//         <EpisodeCard data={mockData} />
//       </NavigationContainer>
//     );
//
//     const card = getByTestId('episode-card');
//     fireEvent.press(card);
//
//     expect(navigate).toHaveBeenCalledWith('EpisodePlayer', {
//       track: {
//         artwork: 'test_image_url',
//         title: 'Test Episode Title',
//         artist: 'Test Author',
//         url: 'test_enclosure_url',
//       },
//     });
//   });
//
//   // ... additional tests
// });
