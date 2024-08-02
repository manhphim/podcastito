import { SafeAreaView, ScrollView, Text } from '../components/theme/Themed';
import { StyleSheet } from 'react-native';
import React from 'react';
import { useGetCategoriesWithPagination } from '../hooks/get-data/category';
import VerticalCardList from '../components/shared/VerticalCardList';
import CustomActivityIndicator from '../components/shared/ActivityIndicator';

const CategoryDetailsListScreen = () => {
  const param = { pageParam: 0 };
  const { data, isLoading, isFetching, isError, error, hasNextPage, fetchNextPage } = useGetCategoriesWithPagination(
    {},
  );

  const flattenData = data?.pages.flatMap((page) => page.results);
  if (isLoading) return <CustomActivityIndicator />;
  if (isError) return <Text>{error?.message}</Text>;

  const loadNextPageData = () => {
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.infoContainer}>
        <Text style={styles.title}>Podcasts</Text>

        <VerticalCardList data={flattenData} type="category" onEndReached={loadNextPageData} numColumns={2} />
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

export default CategoryDetailsListScreen;
