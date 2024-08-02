import React from 'react';
import { StyleSheet } from 'react-native';
import { List } from '@ui-kitten/components';
import PodcastCard from '../PodcastCard';
import CategoryCard from '../CategoryCard';

const HorizontalCardList = ({ data, type }: any): React.ReactElement => {
  const keyExtractor = (item: any, index: number): string => index.toString();

  const renderItem = (info: any): React.ReactElement => renderedItem({ type, data: info });

  return (
    <List
      contentContainerStyle={styles.contentContainer}
      data={data}
      renderItem={renderItem}
      horizontal
      keyExtractor={keyExtractor}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: '#fff',
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
  }
  return <></>;
};

export default HorizontalCardList;
