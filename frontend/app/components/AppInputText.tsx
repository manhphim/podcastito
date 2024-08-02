import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import React, { useState } from 'react';
import Colors from '../constants/Colors';
import { space } from '../constants/GlobalStyles';
import FontSize from '../constants/FontSize';

const AppTextInput: React.FC<TextInputProps> = ({ ...otherProps }) => {
  const [focused, setFocused] = useState<boolean>(false);
  return (
    <TextInput
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      placeholderTextColor={Colors.darkText}
      style={[
        {
          fontSize: FontSize.small,
          padding: space.space2,
          backgroundColor: Colors.lightPrimary,
          borderRadius: space.space1,
          marginVertical: space.space1,
        },
        focused && {
          borderWidth: 3,
          borderColor: Colors.primary,
          shadowOffset: { width: 4, height: space.space1 },
          shadowColor: Colors.primary,
          shadowOpacity: 0.2,
          shadowRadius: space.space1,
        },
      ]}
      {...otherProps}
    />
  );
};

export default AppTextInput;

const styles = StyleSheet.create({});
