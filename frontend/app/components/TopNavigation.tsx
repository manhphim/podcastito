import { View, Text } from 'react-native';
import React from 'react';
import { Icon, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

const BackIcon = (props: any) => <Icon {...props} name="arrow-back" />;

const CustomTopNavigation = ({ navigation }: any) => {
  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => <TopNavigationAction icon={BackIcon} onPress={navigateBack} />;
  return <TopNavigation alignment="center" accessoryLeft={BackAction} />;
};

export default CustomTopNavigation;
