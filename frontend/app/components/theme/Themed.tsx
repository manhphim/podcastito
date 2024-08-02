/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
  Text as DefaultText,
  useColorScheme,
  View as DefaultView,
  ScrollView as DefaultScrollView,
  FlatList as DefaultFlatList,
  SafeAreaView as DefaultSafeAreaView,
  TouchableOpacity as DefaultTouchableOpacity,
  Image as DefaultImage,
  ImageBackground as DefaultImageBackground,
  SectionList as DefaultSectionList,
  Pressable as DefaultPressable,
  StyleSheet,
} from 'react-native';

import Colors from '../../constants/Colors';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type ScrollViewProps = ThemeProps & DefaultScrollView['props'];
export type FlatListProps = ThemeProps & DefaultFlatList['props'];
export type SafeAreaViewProps = ThemeProps & DefaultSafeAreaView['props'];
export type TouchableOpacityProps = ThemeProps & DefaultTouchableOpacity['props'];
export type ImageProps = ThemeProps & DefaultImage['props'];
export type ImageBackgroundProps = ThemeProps & DefaultImageBackground['props'];
export type SectionListProps = ThemeProps & DefaultSectionList['props'];
export type PressableProps = ThemeProps & DefaultPressable['props'];

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, styles.defaultText, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style, styles.defaultContainer]} {...otherProps} />;
}

export function ScrollView(props: ScrollViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultScrollView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function FlatList(props: FlatListProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  return (
    <DefaultFlatList
      style={[{ backgroundColor }, style]}
      contentContainerStyle={styles.defaultContainer}
      {...otherProps}
    />
  );
}

export function SafeAreaView(props: SafeAreaViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultSafeAreaView style={[{ backgroundColor }, style, styles.defaultContainer]} {...otherProps} />;
}

export function TouchableOpacity(props: TouchableOpacityProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultTouchableOpacity style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function Image(props: ImageProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultImage style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function ImageBackground(props: ImageBackgroundProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultImageBackground style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function SectionList(props: SectionListProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  return (
    <DefaultSectionList
      style={[{ backgroundColor }, style]}
      contentContainerStyle={styles.defaultContainer}
      {...otherProps}
    />
  );
}

export function Pressable(props: PressableProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'button');
  return <DefaultPressable style={[{ backgroundColor }, style]} {...otherProps} />;
}

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: 'Inter Regular',
  },
  defaultContainer: {
    flex: 1,
  },
});
