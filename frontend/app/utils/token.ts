import { jwtDecode } from 'jwt-decode';
import * as Keychain from 'react-native-keychain';
import 'core-js/stable/atob';
export const isTokenExpired = (token: string) => {
  const decoded = jwtDecode(token);

  if (!decoded.exp) {
    return false;
  }
  if (decoded.exp < Date.now() / 1000) {
    return true;
  } else {
    return false;
  }
};

export const getAccessToken = async () => {
  const credentials = await Keychain.getGenericPassword();

  if (!credentials) {
    return null;
  }

  const decodedToken = jwtDecode(credentials.username);

  if (decodedToken.exp) {
    if (decodedToken.exp * 1000 < Date.now()) {
      return null;
    } else {
      return credentials.username;
    }
  }
};

export const getRefreshToken = async () => {
  const credentials = await Keychain.getGenericPassword();

  if (!credentials) {
    return null;
  }

  const decodedToken = jwtDecode(credentials.password);

  if (decodedToken.exp) {
    if (decodedToken.exp * 1000 < Date.now()) {
      return null;
    } else {
      return credentials.password;
    }
  }
};

export const setTokens = async (accessToken: string, refreshToken: string) => {
  await Keychain.setGenericPassword(accessToken, refreshToken);
};

export const resetTokens = async () => {
  await Keychain.resetGenericPassword();
};

export const getAuthHeader = async () => {
  const accessToken = await getAccessToken();

  if (accessToken) {
    return {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
  } else {
    return null;
  }
};
