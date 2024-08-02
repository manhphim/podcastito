import { Dimensions, ImageBackground, StyleSheet } from 'react-native';
import React from 'react';
import FontSize from '../constants/FontSize';
import Colors from '../constants/Colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import globalStyles, { space } from '../constants/GlobalStyles';
import { SafeAreaView, Text, TouchableOpacity, View } from '../components/theme/Themed';
const { height } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

const WelcomeScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  return (
    <SafeAreaView>
      <View>
        <ImageBackground
          style={{
            height: height / 2.5,
          }}
          resizeMode="contain"
          source={require('../assets/images/welcome-img.png')}
        />
        <View
          style={{
            paddingHorizontal: space.space4,
            paddingTop: space.space4,
          }}
        >
          <Text
            style={[
              {
                color: Colors.primary,
                textAlign: 'center',
              },
              globalStyles.textBold32,
            ]}
          >
            Discover our revolutionary podcast library
          </Text>

          <Text
            style={{
              fontSize: FontSize.small,
              color: Colors.text,
              textAlign: 'center',
              marginTop: space.space2,
            }}
          >
            Explore all the existing podcasts based or your interest and needs
          </Text>
        </View>
        <View
          style={{
            paddingHorizontal: space.space2,
            paddingTop: space.space1 * 6,
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
        >
          <TouchableOpacity
            onPress={() => navigate('Login')}
            style={{
              backgroundColor: Colors.primary,
              paddingVertical: space.space1 * 1.5,
              paddingHorizontal: space.space2,
              width: '48%',
              borderRadius: space.space1,
              shadowColor: Colors.primary,
              shadowOffset: {
                width: 0,
                height: space.space1,
              },
              shadowOpacity: 0.3,
              shadowRadius: space.space1,
              marginRight: space.space1,
            }}
          >
            <Text
              style={{
                color: Colors.onPrimary,
                fontSize: FontSize.large,
                textAlign: 'center',
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigate('Register')}
            style={{
              paddingVertical: space.space1,
              paddingHorizontal: space.space3,
              width: '48%',
              borderRadius: space.space1,
              borderWidth: 1,
              borderColor: Colors.primary,
            }}
          >
            <Text
              style={{
                color: Colors.text,
                fontSize: FontSize.large,
                textAlign: 'center',
              }}
            >
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
