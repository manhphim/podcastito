import React from 'react';
import { StyleSheet } from 'react-native';
import { FlatList } from '../theme/Themed';
import PodcastCard from '../PodcastCard';
import CategoryCard from '../CategoryCard';
import EpisodeCard from '../EpisodeCard';

const VerticalCardList = ({ data, type, onEndReached, numColumns }: any): React.ReactElement => {
  const keyExtractor = (item: any, index: number): string => index.toString();

  const renderItem = (info: any): React.ReactElement => renderedItem({ type, data: info });

  return (
    <FlatList
      contentContainerStyle={styles.contentContainer}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      scrollEnabled={false}
      numColumns={numColumns ? numColumns : 1}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    marginVertical: 4,
  },
});

const renderedItem: ({ type, data }: any) => JSX.Element = ({ type, data }: any) => {
  if (type === 'podcast') {
    return <PodcastCard data={data} />;
  } else if (type === 'category') {
    return <CategoryCard data={data} />;
  } else if (type === 'episode') {
    return <EpisodeCard data={data} />;
  }
  return <></>;
};

export default VerticalCardList;
