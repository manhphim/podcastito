// import React from 'react';
// import { render, waitFor, act } from '@testing-library/react-native';
// import PodcastDetailsScreen from '../app/screens/PodcastDetailsScreen';
// import * as hooks from '../app/hooks/get-data/episode';
//
// // Mock navigation route
// const mockRoute = {
//   params: {
//     item: {
//       id: 'podcast1',
//       usedImage: 'image-url',
//       title: 'Podcast Title',
//       author: 'Author Name',
//       description: 'Podcast Description',
//     },
//   },
// };
//
// // Mock the hook used to fetch episodes
// const mockUseGetEpisodesByFeedId = jest.spyOn(hooks, 'useGetEpisodesByFeedId');
//
// describe('PodcastDetailsScreen', () => {
//   it('renders loading state', () => {
//     mockUseGetEpisodesByFeedId.mockReturnValue({
//       data: null,
//       isPending: true,
//       isError: false,
//       error: null,
//     });
//
//     const { getByText } = render(<PodcastDetailsScreen route={mockRoute} />);
//     expect(getByText('Loading...')).toBeTruthy();
//   });
//
//   it('renders error state', () => {
//     mockUseGetEpisodesByFeedId.mockReturnValue({
//       data: null,
//       isPending: false,
//       isError: true,
//       error: { message: 'Error fetching episodes' },
//     });
//
//     const { getByText } = render(<PodcastDetailsScreen route={mockRoute} />);
//     expect(getByText('Error fetching episodes')).toBeTruthy();
//   });
//
//   it('renders podcast details and episodes list', async () => {
//     const mockEpisodesData = {
//       results: [
//         // ... your episodes data
//       ],
//     };
//
//     mockUseGetEpisodesByFeedId.mockReturnValue({
//       data: mockEpisodesData,
//       isPending: false,
//       isError: false,
//       error: null,
//     });
//
//     const { getByText } = render(<PodcastDetailsScreen route={mockRoute} />);
//
//     await waitFor(() => {
//       expect(getByText(mockRoute.params.item.title)).toBeTruthy();
//       expect(getByText(mockRoute.params.item.author)).toBeTruthy();
//       expect(getByText(mockRoute.params.item.description)).toBeTruthy();
//       // Here you can add expectations to ensure that the episodes are rendered.
//       // For example, if your episodes have titles, you can check for them here.
//     });
//   });
//
//   // ... any other tests specific to your component
// });
//
// afterEach(() => {
//   jest.clearAllMocks();
// });
