import { View, Text, SafeAreaView, ScrollView } from '../components/theme/Themed';
import { StyleSheet } from 'react-native';
import React from 'react';
import VerticalCardList from '../components/shared/VerticalCardList';
import { useGetPodcasts, useGetPodcastsWithPagination } from '../hooks/get-data/podcasts';
import Colors from '../constants/Colors';
import CustomActivityIndicator from '../components/shared/ActivityIndicator';

const PodcastDetailsListScreen = () => {
  const { data, isLoading, isError, error, hasNextPage, fetchNextPage } = useGetPodcastsWithPagination({});

  if (isLoading) {
    return <CustomActivityIndicator />;
  }

  if (isError) {
    return <Text>{error?.message}</Text>;
  }

  const loadNextPageData = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const flattenData = data?.pages.flatMap((page) => page.results);
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.infoContainer}>
        <Text style={styles.title}>Podcasts</Text>

        <VerticalCardList data={flattenData} type="podcast" onEndReached={loadNextPageData} numColumns={2} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Inter Bold',
    fontSize: 24,
  },
  infoContainer: {
    alignItems: 'center',
    marginVertical: 20,
    flexGrow: 1,
  },
});

export default PodcastDetailsListScreen;
