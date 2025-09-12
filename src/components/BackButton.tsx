import React from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { themeColors } from '../themes/colors';

const backIcon = require('../static/back.png');

interface BackButtonProps {
  onPress?: () => void;
  style?: any;
  iconStyle?: any;
}

export const BackButton: React.FC<BackButtonProps> = ({
  onPress,
  style,
  iconStyle,
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <TouchableOpacity
      style={[styles.backButton, style]}
      onPress={handlePress}
    >
      <Image 
        source={backIcon} 
        style={[styles.backIcon, iconStyle]} 
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#555555', // 深灰色
  },
});

export default BackButton;