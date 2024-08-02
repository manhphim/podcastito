import React, { useEffect } from 'react';
import { View, Text, ScrollView, FlatList, Image } from './theme/Themed';
import { Dimensions, StyleSheet } from 'react-native';
import { useSearchEpisodes } from '../hooks';
import CustomActivityIndicator from './shared/ActivityIndicator';
import VerticalCardList from './shared/VerticalCardList';
import { Card } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
interface SearchResultProps {
  searchTerm: string;
}

const SearchResult: React.FC<SearchResultProps> = ({ searchTerm }) => {
  if (!searchTerm) {
    return (
      <View>
        <Text>Search for something</Text>
      </View>
    );
  }

  const { data, isLoading, isError, error, hasNextPage, fetchNextPage } = useSearchEpisodes(searchTerm, {});

  if (isLoading) {
    return <CustomActivityIndicator />;
  }

  if (isError) {
    return <Text>{error?.message}</Text>;
  }

  const loadNextPageData = () => {
    if (hasNextPage) {
      setTimeout(fetchNextPage, 1000);
    }
  };

  const flattenData = data?.pages.flatMap((page) => page.results);

  const keyExtractor = (item: any, index: number): string => index.toString();

  const renderItem = (info: any): React.ReactElement => <SearchResultItem data={info} />;

  return (
    <View style={{ width: '100%' }}>
      <ScrollView contentContainerStyle={styles.infoContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Results</Text>
        {!flattenData?.length && <Text>No results found</Text>}
        <FlatList
          contentContainerStyle={styles.contentContainer}
          data={flattenData}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          scrollEnabled={false}
          numColumns={1}
          onEndReached={loadNextPageData}
        />
      </ScrollView>
    </View>
  );
};

const SearchResultItem = ({ data }: any) => {
  const [usedImage, setUsedImage] = React.useState<any>(require('../assets/images/default-podcast.png'));
  const navigation = useNavigation();

  const openEpisodePlayer = () => {
    const track = {
      artwork: data.item.image,
      title: data.item.title,
      artist: data.item.author,
      url: data.item.enclosureUrl,
      duration: data.item.duration,
      transcriptUrl: data.item.transcriptUrl,
    };

    navigation.navigate('EpisodePlayer', {
      track: track,
    });
  };
  return (
    <Card style={styles.item} onPress={openEpisodePlayer}>
      <Image source={usedImage} style={styles.image} />

      <Text style={styles.resultTitle} numberOfLines={1} ellipsizeMode="tail">
        {data.item.title}
      </Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Inter Bold',
    fontSize: 24,
  },
  infoContainer: {
    flexGrow: 1,
    marginVertical: 20,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  contentContainer: {
    width: '100%',
    marginTop: 20,
  },
  item: {
    marginVertical: 4,
    marginRight: 10,
    flexDirection: 'row',
    textAlign: 'left',
  },
  resultTitle: {
    fontFamily: 'Inter SemiBold',
    fontSize: 16,
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});

export default SearchResult;
