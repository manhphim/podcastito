import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontSize from '../constants/FontSize';
import Colors from '../constants/Colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import AppTextInput from '../components/AppInputText';
import { space } from '../constants/GlobalStyles';
import { useSelector } from 'react-redux';
import { loginAsync, selectIsLoading, selectError } from '../store/authSlice';
import { useAppDispatch } from '../store/store';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector(selectIsLoading);
  const loginError = useSelector(selectError);

  const [value, setValue] = useState({
    email: '',
    password: '',
    error: '',
  });

  const handleLogin = async () => {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.',
      });
      return;
    }

    try {
      await dispatch(loginAsync({ username: value.email, password: value.password }));
    } catch (error) {
      setValue({
        ...value,
        error: 'Something went wrong.',
      });
    }
  };

  return (
    <SafeAreaView>
      <View style={{ padding: space.space2 }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: FontSize.xLarge, color: Colors.primary, marginVertical: space.space3 }}>
            Login here
          </Text>
          <Text style={{ fontSize: FontSize.large, maxWidth: '60%', textAlign: 'center' }}>
            Welcome back! You've been missed!
          </Text>
        </View>
        <View style={{ marginVertical: space.space3 }}>
          <AppTextInput
            placeholder="Email"
            value={value.email}
            onChangeText={(text) => setValue({ ...value, email: text })}
          />
          <AppTextInput
            placeholder="Password"
            onChangeText={(text) => setValue({ ...value, password: text })}
            secureTextEntry={true}
          />
        </View>
        {loginError && (
          <Text style={{ color: 'red', fontSize: FontSize.small, marginBottom: space.space2 }}>{loginError}</Text>
        )}
        <Text style={{ fontSize: FontSize.small, color: Colors.primary, alignSelf: 'flex-end' }}>
          Forgot your password?
        </Text>
        <TouchableOpacity
          onPress={handleLogin}
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
          disabled={isLoading}
        >
          <Text style={{ color: Colors.onPrimary, textAlign: 'center', fontSize: FontSize.large }}>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')} style={{ padding: space.space1 }}>
          <Text style={{ color: Colors.text, textAlign: 'center', fontSize: FontSize.small }}>
            Create a new account
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
