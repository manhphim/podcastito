import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from './theme/Themed';
import { useDebouncedValue } from '../hooks';
interface SearchInputProps {
  searchTerm: string;
  onChangeText: (searchTerm: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ searchTerm, onChangeText }) => {
  return (
    <SafeAreaView style={{ width: '100%' }}>
      <TextInput value={searchTerm} placeholder="Search episodes" onChangeText={onChangeText} style={styles.input} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
});
export default SearchInput;
