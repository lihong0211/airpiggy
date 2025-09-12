import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { themeColors } from '../themes/colors';

const backIcon = require('../static/back.png');

interface BackButtonProps {
  onPress?: () => void;
  style?: any;
  iconStyle?: any;
}

interface BackHeaderProps {
  title?: string;
  onBackPress?: () => void;
  headerStyle?: any;
  titleStyle?: any;
  showBackButton?: boolean;
  backgroundColor?: string;
  statusBarBackgroundColor?: string;
  statusBarBarStyle?: 'default' | 'light-content' | 'dark-content';
}

const BackButton: React.FC<BackButtonProps> = ({
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

export const BackHeader: React.FC<BackHeaderProps> = ({
  title,
  onBackPress,
  headerStyle,
  titleStyle,
  showBackButton = true,
  backgroundColor = themeColors.background.secondary,
  statusBarBackgroundColor = 'transparent',
  statusBarBarStyle = 'dark-content',
}) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      // 默认行为：使用 navigation.goBack() 返回上一页
      navigation.goBack();
    }
  };

  return (
    <>
      <StatusBar 
        backgroundColor={statusBarBackgroundColor} 
        barStyle={statusBarBarStyle} 
      />
      <View style={[styles.header, { backgroundColor }, headerStyle]}>
        {showBackButton ? (
          <BackButton onPress={handleBackPress} />
        ) : (
          <View style={styles.placeholder} />
        )}
        <Text style={[styles.title, titleStyle]}>{title}</Text>
        <View style={styles.placeholder} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40, // 与返回按钮宽度相同，保持平衡
  },
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

export { BackButton };
export default BackHeader;
