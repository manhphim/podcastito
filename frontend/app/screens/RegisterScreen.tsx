import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import FontSize from '../constants/FontSize';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import AppTextInput from '../components/AppInputText';
import { space } from '../constants/GlobalStyles';
import { registerAsync } from '../store/authSlice';
import { useAppDispatch } from '../store/store';
import Toast from 'react-native-root-toast';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;
const RegisterScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  const [value, setValue] = React.useState({
    username: '',
    password: '',
    confirmPassword: '',
    error: '',
  });

  const dispatch = useAppDispatch();

  async function signUp() {
    if (value.username === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Username and password are mandatory.',
      });
      return;
    }

    try {
      const result = await dispatch(registerAsync({ username: value.username, password: value.password }));
      if (result.meta.requestStatus === 'fulfilled') {
        Toast.show('You have registered successfully', {
          position: Toast.positions.TOP,
          duration: Toast.durations.LONG,
          backgroundColor: Colors.success,
        });
        navigate('Login');
      } else if (result.meta.requestStatus === 'rejected') {
        Toast.show(result.payload as string, {
          position: Toast.positions.TOP,
          duration: Toast.durations.LONG,
          backgroundColor: Colors.error,
        });
        setValue({
          username: '',
          password: '',
          confirmPassword: '',

          error: '',
        });
      }
    } catch (error) {
      Toast.show('Something went wrong.', {
        position: Toast.positions.TOP,
        duration: Toast.durations.LONG,
        backgroundColor: Colors.error,
      });
      setValue({
        username: '',
        password: '',
        confirmPassword: '',

        error: '',
      });
    }
  }

  return (
    <SafeAreaView>
      <View
        style={{
          padding: space.space2,
        }}
      >
        <View
          style={{
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: FontSize.xLarge,
              color: Colors.primary,
              marginVertical: space.space3,
            }}
          >
            Create account
          </Text>
          <Text
            style={{
              fontSize: FontSize.small,
              maxWidth: '80%',
              textAlign: 'center',
            }}
          >
            Create an account so you can explore all the existing podcasts
          </Text>
        </View>
        <View
          style={{
            marginVertical: space.space3,
          }}
        >
          <AppTextInput
            placeholder="Username"
            value={value.username}
            onChangeText={(text) => setValue({ ...value, username: text })}
          />
          <AppTextInput
            placeholder="Password"
            onChangeText={(text) => setValue({ ...value, password: text })}
            secureTextEntry={true}
          />
          <AppTextInput
            placeholder="Confirm Password"
            onChangeText={(text) => setValue({ ...value, confirmPassword: text })}
            secureTextEntry={true}
          />
        </View>

        <TouchableOpacity
          onPress={signUp}
          style={{
            padding: space.space2,
            backgroundColor: Colors.primary,
            marginVertical: space.space3,
            borderRadius: space.space1,
            shadowColor: Colors.primary,
            shadowOffset: {
              width: 0,
              height: space.space1,
            },
            shadowOpacity: 0.3,
            shadowRadius: space.space1,
          }}
        >
          <Text
            style={{
              color: Colors.onPrimary,
              textAlign: 'center',
              fontSize: FontSize.large,
            }}
          >
            Sign up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: space.space1,
          }}
          onPress={() => navigate('Login')}
        >
          <Text
            style={{
              color: Colors.text,
              textAlign: 'center',
              fontSize: FontSize.small,
            }}
          >
            Already have an account
          </Text>
        </TouchableOpacity>

        <View
          style={{
            marginVertical: space.space3,
          }}
        ></View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
