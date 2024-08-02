import React from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { View, Text, SafeAreaView, Image } from '../components/theme/Themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { useGetPodcasts } from '../hooks/get-data/podcasts';
import HorizontalContentBlock from '../components/shared/HorizontalContentBlock';
import { useGetCategories } from '../hooks/get-data/category';
import CustomActivityIndicator from '../components/shared/ActivityIndicator';
import { useSelector } from 'react-redux';
import GlobalStyles from '../constants/GlobalStyles';

const { height } = Dimensions.get('window');

export interface HomeScreenProps extends NativeStackScreenProps<RootStackParamList, 'Home'> {}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const { data, isPending, isError, error } = useGetPodcasts();
  const {
    data: categoryData,
    isPending: isCategoryPending,
    isError: isCategoryError,
    error: categoryError,
  } = useGetCategories();

  const { username } = useSelector((state: any) => state.auth);

  if (isPending || isCategoryPending) {
    return <CustomActivityIndicator />;
  }

  if (isError || isCategoryError) {
    return <Text>{categoryError ? categoryError.message : error?.message}</Text>;
  }

  return (
    <SafeAreaView>
      <View style={styles.welcomeContainer}>
        <Image source={require('../assets/images/default-podcast.png')} />
        <Text style={GlobalStyles.textBold18}>Welcome back, {username}</Text>
      </View>
      <View
        style={{
          marginTop: Platform.OS === 'android' ? 50 : 0,
          paddingHorizontal: 16,
          flexGrow: 4,
        }}
      >
        <HorizontalContentBlock data={data.results} title="Top Podcasts" type="podcast" />
        <HorizontalContentBlock data={categoryData.results} title="Categories" type="category" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  welcomeContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? 50 : 0,
    marginBottom: 20,
    paddingHorizontal: 16,
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
