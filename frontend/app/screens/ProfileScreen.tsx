import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Input, Button, Select, SelectItem, Text, Avatar, Icon, IndexPath } from '@ui-kitten/components';
import ImagePicker, { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { any, string } from 'prop-types';


type UserProfileProps = {};

const podcastCategories = [
  'Business',
  'Comedy',
  'Education',
  'Fiction',
  'History',
  'Technology',
  'Travel'
];

const UserProfile: React.FC<UserProfileProps> = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    address: ''
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [avatarSource, setAvatarSource] = useState<any>();

  const onSave = async () => {
    const url = "http://192.168.1.193:5500/profile/favorites"; // Replace with your backend endpoint URL

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: 1,
          recommendations: selectedCategories
        })
      });

      const data = await response.json();
      if (response.ok) {
        alert("Profile saved successfully!");
      } else {
        alert(`Error: ${data.message || "Could not save profile"}`);
      }

    } catch (error) {
      // @ts-ignore
      alert(`Network Error: ${error.message}`);
    }
  };

  const selectPhoto = () => {
    const options: any = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera picker');
      } else if (response.errorMessage) {
        console.log('CameraPicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets[0]?.uri) {
        const source = { uri: response.assets[0].uri };
        setAvatarSource(source);
      }
    }).then(r => alert(r)

    ).catch(e => alert(e));
  };

  const handleNameChange = (name: string) => {
    setUserData({ ...userData, name });
  };

  const handleEmailChange = (email: string) => {
    setUserData({ ...userData, email });
  };

  const handlePasswordChange = (password: string) => {
    setUserData({ ...userData, password });
  };

  const handleAddressChange = (address: string) => {
    setUserData({ ...userData, address });
  };

  const handleCategorySelect = (indices: IndexPath | IndexPath[]) => {
    // Always handle as an array to support both single and multi-selection
    const selectedIndices = Array.isArray(indices) ? indices : [indices];

    const selectedCategories = selectedIndices.map((index) => podcastCategories[index.row]);
    setSelectedCategories(selectedCategories);
  };

      return (
    <ScrollView style={{ padding: 20 }}>
     <Text category="h4" style={{ marginBottom: 20 }}>
        User Profile
      </Text>

      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Avatar
          size="giant"
          source={avatarSource}
          style={{ marginBottom: 10 }}
        />
        <Button
          appearance="ghost"
          accessoryLeft={<Icon name="camera-outline" />}
          onPress={selectPhoto}
        >
          Change Photo
        </Button>
      </View>

      <Input
        label="Name"
        value={userData.name || ''}
        onChangeText={handleNameChange}
        style={{ marginBottom: 16 }}
      />
      <Input
        label="Email"
        value={userData.email || ''}
        onChangeText={handleEmailChange}
        style={{ marginBottom: 16 }}
      />
      <Input
        label="Password"
        value={userData.password || ''}
        secureTextEntry
        onChangeText={handlePasswordChange}
        style={{ marginBottom: 16 }}
      />
      <Input
        label="Address"
        value={userData.address || ''}
        onChangeText={handleAddressChange}
        style={{ marginBottom: 16 }}
      />
      <Text category="h5" style={{ marginBottom: 20, marginTop: 20 }}>
        Podcast Preferences
      </Text>
      <Select
        multiSelect
        value={selectedCategories.join(', ')}
        placeholder="Select Podcast Categories"
        onSelect={handleCategorySelect}
      >
        {podcastCategories.map((category) => (
          <SelectItem key={category} title={category} />
        ))}
      </Select>
      <Button style={{ marginTop: 20 }} onPress={onSave}>Save Profile</Button>
    </ScrollView>
  );
};

export default UserProfile;
