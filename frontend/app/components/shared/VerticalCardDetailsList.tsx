import React from 'react';
import { StyleSheet } from 'react-native';
import { FlatList } from '../theme/Themed';
import EpisodeCard from '../EpisodeCard';
import { FlashList } from '@shopify/flash-list';

const VerticalCardDetailsList = ({ data }: any): React.ReactElement => {
  const keyExtractor = (item: any, index: number): string => index.toString();

  const renderItem = (info: any): React.ReactElement => <EpisodeCard data={info} />;

  return (
    <FlatList
      contentContainerStyle={styles.contentContainer}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      scrollEnabled={false}
      // estimatedItemSize={40}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 4,
    overflow: 'hidden',
  },
  item: {
    marginVertical: 4,
  },
});

export default VerticalCardDetailsList;
