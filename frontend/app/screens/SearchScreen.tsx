import SearchInput from '../components/SearchInput';
import { View, Text } from '../components/theme/Themed';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useDebouncedValue } from '../hooks';
import SearchBar from '../components/SearchBar';
import SearchResult from '../components/SearchResult';
const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [inputClicked, setInputClicked] = useState(false);

  const debouncedSearchTerm = useDebouncedValue(searchTerm, 500);

  return (
    <View style={styles.container}>
      <SearchBar
        clicked={inputClicked}
        setClicked={setInputClicked}
        searchPhrase={searchTerm}
        setSearchPhrase={setSearchTerm}
      />
      <SearchResult searchTerm={debouncedSearchTerm} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
});
export default SearchScreen;
