import React from 'react';
import { StyleSheet, TextInput, View, Keyboard, Button } from 'react-native';
import { Feather, Entypo } from '@expo/vector-icons';
import { SafeAreaView } from './theme/Themed';

// SearchBarProp interface
interface SearchBarProps {
  clicked: boolean;
  searchPhrase: string;
  setSearchPhrase: (searchPhrase: string) => void;
  setClicked: (clicked: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ clicked, searchPhrase, setSearchPhrase, setClicked }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={clicked ? styles.searchBar__clicked : styles.searchBar__unclicked}>
        {/* search Icon */}
        <Feather name="search" size={20} color="black" style={{ marginLeft: 1 }} />
        {/* Input field */}
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
        />
        {/* cross Icon, depending on whether the search bar is clicked or not */}
        {clicked && (
          <Entypo
            name="cross"
            size={20}
            color="black"
            style={{ padding: 1 }}
            onPress={() => {
              setSearchPhrase('');
            }}
          />
        )}
      </View>
      {/* cancel button, depending on whether the search bar is clicked or not */}
      {clicked && (
        <View>
          <Button
            title="Cancel"
            onPress={() => {
              Keyboard.dismiss();
              setClicked(false);
            }}
          ></Button>
        </View>
      )}
    </SafeAreaView>
  );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    flexBasis: 100,
    margin: 15,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    width: '95%',
  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#d9dbda',
    borderRadius: 15,
    alignItems: 'center',
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: 'row',
    width: '80%',
    backgroundColor: '#d9dbda',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: '90%',
  },
});
