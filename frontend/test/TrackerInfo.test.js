import React from 'react';
import { render } from '@testing-library/react-native';
import { TrackInfo } from '../app/components/TrackInfo'; // Assuming TrackInfo is in a file named TrackInfo.js

// Mock track data
const mockTrack = {
  artwork: 'https://example.com/artwork.jpg',
  title: 'Test Title',
  artist: 'Test Artist',
};

describe('TrackInfo', () => {
  it('renders correctly with track data', () => {
    const { getByTestId, getByText } = render(<TrackInfo track={mockTrack} />);

    const artworkImage = getByTestId('track-artwork');
    expect(artworkImage.props.source.uri).toBe(mockTrack.artwork);

    const titleText = getByText(mockTrack.title);
    expect(titleText).toBeTruthy();

    const artistText = getByText(mockTrack.artist);
    expect(artistText).toBeTruthy();
  });
  // it('renders correctly without track data', () => {
  //   const { queryByTestId } = render(<TrackInfo />);
  //
  //   const artworkImage = queryByTestId('track-artwork');
  //
  //   // Since the image may still render without a source, we check if it's there without a source.uri
  //   expect(artworkImage.props.source).toBeUndefined();
  //
  //   // Since there's no track, the title and artist should not be found
  //   const titleText = queryByText('Test Title');
  //   expect(titleText).toBeFalsy();  // toBeFalsy will pass for null, undefined, false, 0, '', NaN
  //
  //   const artistText = queryByText('Test Artist');
  //   expect(artistText).toBeFalsy();
  // });

});

