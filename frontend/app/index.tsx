import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { fonts } from './constants';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import store from './store/store';
import { Provider as ReduxProvider } from 'react-redux';
import { registerRootComponent } from 'expo';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import TrackPlayer from 'react-native-track-player';
import Colors from './constants/Colors';
import Navigation from './navigation/navigation';
import React from 'react';
import { RootSiblingParent } from 'react-native-root-siblings';
import { PlaybackService } from './services';
import * as Keychain from 'react-native-keychain';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts(fonts);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        // retry: false,
      },
    },
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // useEffect(() => {
  //   Keychain.resetGenericPassword().then(() => {
  //     console.log('Keychain reset');
  //   });
  // }, []);

  if (!loaded) {
    return null;
  }

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: Colors.primary,
    },
  };

  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <RootSiblingParent>
            <SafeAreaProvider>
              <StatusBar />
              <NavigationContainer theme={theme}>
                <Navigation />
              </NavigationContainer>
            </SafeAreaProvider>
          </RootSiblingParent>
        </ApplicationProvider>
      </QueryClientProvider>
    </ReduxProvider>
  );
}

registerRootComponent(App);

TrackPlayer.registerPlaybackService(() => PlaybackService);
