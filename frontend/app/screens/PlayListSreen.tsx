import React from 'react';
import {
  StyleSheet,
  ScrollView,
  FlatList,
  View,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  TextInput,
  Button,
  ActivityIndicator,
} from 'react-native';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import { LinearGradient } from 'react-native-svg';
import AddPlaylist from '../components/AddPlaylist';
import { useGetPlaylists } from '../hooks/get-data/playlist';
import Colors from '../constants/Colors';

type PlayList = {
  id: string;
  name: string;
  episodes: number;
};

export default function PlayListScreen() {
  const [isLoading, setLoading] = useState(true); // Set initial state to true
  //   const [data, setData] = useState<PlayList[]>([]);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [currentScrollPos, setCurrentScrollPos] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const [search, setSearch] = useState('');
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState('');
  const [episodeTitle, setEpisodeTitle] = useState('');

  const { data, isError, error, isPending } = useGetPlaylists();

  if (isPending) {
    return <ActivityIndicator size="large" color={Colors.primary} />;
  }

  if (isError) {
    return <Text>{error?.message}</Text>;
  }

  console.log(data);

  const handleModal = () => setIsModalVisible(() => !isModalVisible);

  async function componentDidMount() {
    await Font.loadAsync({
      'inter-regular': require('../assets/fonts/Inter-Regular.otf'),
      'inter-bold': require('../assets/fonts/Inter-Bold.otf'),
    });

    setFontLoaded(true);
  }

  // useEffect(() => {
  //   componentDidMount();
  // }, []);

  function calculatePlaylistHeight() {
    if (currentScrollPos > 173) {
      const height = 160 - (currentScrollPos - 172);
      return height >= 0 ? height : 0;
    }
    return 510;
  }

  function calculateButtonPos() {
    return currentScrollPos < 376 ? 420 - currentScrollPos : 44;
  }

  function calculateArtSize() {
    return {
      width: 185 - currentScrollPos / 10,
      height: 185 - currentScrollPos / 10,
      opacity: 1 - currentScrollPos / 350,
    };
  }
  async function editPlaylist(playlistName: any) {
    try {
      const response = await fetch('http://192.168.0.102:5500/api/v1/playlists/edit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: playlistName }),
      });
      const data = await response.json();
      console.log('Playlist created:', data);
      // Handle the response data as needed
    } catch (error) {
      console.error('Error creating playlist:', error);
      // Handle the error as needed
    }
  }
  async function addPlaylist(playlistName: any) {
    try {
      const response = await fetch('http://192.168.0.102:5500/api/v1/playlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: playlistName }),
      });
      const data = await response.json();
      console.log('Playlist created:', data);
      // Handle the response data as needed
    } catch (error) {
      console.error('Error creating playlist:', error);
      // Handle the error as needed
    }
  }
  const addEpisodeToPlaylist = async (playlistId: any, episode: any) => {
    try {
      const response = await fetch(`http://localhost:5500/api/v1/playlists/${playlistId}/episodes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(episode),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedPlaylist = await response.json();
      console.log('Episode added:', updatedPlaylist);
    } catch (error) {
      console.error('Error adding episode:', error);
    }
  };

  const AddPlaylist = () => {
    return (
      <Modal
        style={styles.modalContainer}
        testID={'modal'}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Enter Playlist Name</Text>
            <TextInput style={styles.input} onChangeText={(text) => setPlaylistName(text)} value={playlistName} />
            <Button
              title="Add"
              onPress={() => {
                setModalVisible(false);
                addPlaylist(playlistName);
              }}
            />
          </View>
        </View>
      </Modal>
    );
  };

  const EditPlaylist = () => {
    return (
      <Modal
        style={styles.modalContainer}
        testID={'modal'}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        {' '}
        <View style={styles.modalView}>
          <TextInput style={styles.input} placeholder="Episode Title" onChangeText={(text) => setEpisodeTitle(text)} />
          <Button
            title="Add Episode"
            onPress={() => {
              const episode = { title: episodeTitle };
              addEpisodeToPlaylist(selectedPlaylistId, episode);
              setModalVisible(false);
            }}
          />
        </View>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Edit Playlist Name</Text>
            <TextInput style={styles.input} onChangeText={(text) => setPlaylistName(text)} value={playlistName} />
            <Button
              title="Add"
              onPress={() => {
                setModalVisible(false);
                editPlaylist(playlistName);
              }}
            />
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient />
      <FlatList
        style={styles.list}
        data={data}
        renderItem={({ item }) => (
          <View style={styles.playlistItem}>
            <View>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                {EditPlaylist()}
                <Image
                  style={styles.playlistEdit}
                  source={{
                    uri: 'https://png.pngtree.com/element_our/20190601/ourmid/pngtree-white-edit-icon-image_1338673.jpg',
                  }}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.playlistItemTitle}>{item.name}</Text>
            <Text style={styles.playlistItemMeta}>
              {item.id}
              {item.episodes}
            </Text>
          </View>
        )}
      />
      <View style={{ ...styles.playlistDetails, height: calculatePlaylistHeight() }} pointerEvents="none">
        <Image
          style={calculateArtSize()}
          source={{ uri: 'https://kinsta.com/nl/wp-content/uploads/sites/7/2021/12/what-is-a-podcast.jpg' }}
        />
        {currentScrollPos < 103 ? <Text style={styles.playlistTitle}>Podcast Name</Text> : null}
      </View>

      <View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          {AddPlaylist()}

          <Image
            style={styles.addPlaylist}
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/OOjs_UI_icon_add.svg/1024px-OOjs_UI_icon_add.svg.png',
            }}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={{ ...styles.playlistButton, top: calculateButtonPos() }}
        onPress={() => console.log('shuffle')}
      >
        <Text style={styles.playlistButtonText}>SHUFFLE</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    width: 50,
    height: 50,
  },
  view: {
    margin: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: 200,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d0bebe',
  },
  header: {
    width: '100%',
    height: 400,
  },
  list: {
    width: '100%',
    height: 800,
    backgroundColor: '#413737',
    top: 500,
    color: '#fff',
  },
  addPlaylist: {
    position: 'absolute',
    bottom: 700,
    left: 150,
    width: 50, // Set the width of the image
    height: 50, // Set the height of the image
  },
  playlistDetails: {
    width: '100%',
    position: 'absolute',
    top: 90,
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
  },
  playlistEdit: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 25,
    top: 5,
  },
  playlistTitle: {
    fontFamily: 'inter-bold',
    color: 'rgba(23,24,23,0.75)',
    fontSize: 30,
    marginTop: 50,
  },

  playlistButton: {
    backgroundColor: '#0f29d2',
    width: 230,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    position: 'absolute',
    left: 90,
    top: 0,
  },
  playlistButtonText: {
    fontFamily: 'inter-bold',
    fontSize: 12,
    color: '#fff',
    letterSpacing: 2,
  },
  playlistItem: {
    marginLeft: 25,
    marginBottom: 25,
  },
  playlistItemTitle: {
    fontFamily: 'inter-bold',
    fontSize: 18,
    color: '#fff',
  },
  playlistItemMeta: {
    fontFamily: 'inter-regular',
    color: '#b9bdbe',
    fontSize: 15,
  },
});
