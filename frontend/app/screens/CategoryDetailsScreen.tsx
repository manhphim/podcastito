import { StyleSheet } from 'react-native';
import React from 'react';
import { useGetPodcastsByCategory } from '../hooks';
import { SafeAreaView, ScrollView, Text } from '../components/theme/Themed';
import CustomActivityIndicator from '../components/shared/ActivityIndicator';

import VerticalCardList from '../components/shared/VerticalCardList';
interface CategoryDetailsProps {
  route: any;
}

const CategoryDetails = ({ route }: any) => {
  const { category } = route.params;

  const { data, isPending, isError, error } = useGetPodcastsByCategory(category.id);

  if (isPending) {
    return <CustomActivityIndicator />;
  }

  if (isError) {
    return <Text>{error.message}</Text>;
  }

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.infoContainer}>
        <Text style={styles.title}>{category.name}</Text>

        <VerticalCardList data={data.results} type="podcast" numColumns={2} />
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

export default CategoryDetails;
