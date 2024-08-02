import { Card } from '@ui-kitten/components';
import { Image, Text, View } from './theme/Themed';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Episode } from '../model';
import { useGetPodcastDetails } from '../hooks';
import { useNavigation } from '@react-navigation/native';
import CustomActivityIndicator from './shared/ActivityIndicator';
import { convertDuration } from '../utils/convertMinute';
import GlobalStyles from '../constants/GlobalStyles';

interface EpisodeCardProps {
  data: any;
}

const EpisodeCard = ({ data }: EpisodeCardProps) => {
  const navigation = useNavigation();
  const [usedImage, setUsedImage] = React.useState<any>(require('../assets/images/default-podcast.png'));

  const { feedId, image, title, duration, datePublishedPretty, description, enclosureUrl, transcriptUrl }: Episode =
    data.item;
  const { data: podcastData, isError, isPending, error } = useGetPodcastDetails(feedId);

  if (isPending) {
    return <CustomActivityIndicator />;
  }

  if (isError) {
    return <Text>{error.message}</Text>;
  }

  // useEffect(() => {
  //   validImage(image).then((image) => {
  //     setUsedImage(image);
  //   });
  // }, []);

  const { author } = podcastData;

  const openEpisodePlayer = () => {
    const track = {
      artwork: image,
      title: title,
      artist: author,
      url: enclosureUrl,
      duration: duration,
      transcriptUrl: transcriptUrl,
    };

    navigation.navigate('EpisodePlayer', {
      track: track,
    });
  };

  return (
    <Card style={styles.item} onPress={openEpisodePlayer}>
      <Image source={usedImage} style={styles.image} />

      <View style={{ flex: 1, gap: 10 }}>
        <Text style={styles.title}>{title}</Text>

        <Text numberOfLines={3} ellipsizeMode="tail">
          {description}
        </Text>
        {/* <Text>{convertDuration(duration)}</Text> */}
        <Text style={styles.dateText}>
          {datePublishedPretty} - {convertDuration(duration)}
        </Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  item: {
    marginVertical: 4,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter SemiBold',
    fontSize: 16,
    marginTop: 10,
  },
  dateText: {
    fontFamily: 'Inter SemiBold',
    fontSize: 14,
  },
});

export default EpisodeCard;
