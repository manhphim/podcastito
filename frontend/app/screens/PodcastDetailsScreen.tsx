import { Platform, StyleSheet } from 'react-native';
import React from 'react';
import { Image, SafeAreaView, View, ScrollView, Text } from '../components/theme/Themed';
import { useGetEpisodesByFeedId } from '../hooks/get-data/episode';
import VerticalCardDetailsList from '../components/shared/VerticalCardDetailsList';
import CustomTopNavigation from '../components/TopNavigation';
import CustomActivityIndicator from '../components/shared/ActivityIndicator';
export interface PodcastDetailsScreenProps {
  route: any;
  navigation: any;
}

const PodcastDetailsScreen = ({ route, navigation }: PodcastDetailsScreenProps) => {
  const { item } = route.params;

  const {
    data: episodesData,
    isPending: episodesIsPending,
    isError: episodesIsError,
    error: episodesError,
  } = useGetEpisodesByFeedId(item.id);

  if (episodesIsPending) {
    return <CustomActivityIndicator />;
  }

  if (episodesIsError) {
    return <Text>{episodesError?.message}</Text>;
  }

  return (
    <SafeAreaView>
      <CustomTopNavigation navigation={navigation} />
      <ScrollView contentContainerStyle={styles.infoContainer}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={[styles.description, { marginBottom: 10 }]}>{item.author}</Text>
        <Text style={styles.description}>{item.description}</Text>

        <VerticalCardDetailsList data={episodesData.results} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PodcastDetailsScreen;

const styles = StyleSheet.create({
  infoContainer: {
    alignItems: 'center',
    marginVertical: 20,
    flexGrow: 1,
  },
  title: {
    fontFamily: 'Inter SemiBold',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: 'grey',
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
});
