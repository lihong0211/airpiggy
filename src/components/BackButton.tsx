import React from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  ViewStyle,
  ImageStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface BackButtonProps {
  onPress: () => void;
  style?: ViewStyle;
  imageStyle?: ImageStyle;
  showSafeArea?: boolean; // 是否显示安全区域
  safeAreaPadding?: number; // 安全区域额外padding
}

export const BackButton: React.FC<BackButtonProps> = ({
  onPress,
  style,
  imageStyle,
  showSafeArea = true,
  safeAreaPadding = 12,
}) => {
  const insets = useSafeAreaInsets();

  const containerStyle = showSafeArea
    ? [styles.container, { paddingTop: insets.top + safeAreaPadding }, style]
    : [styles.container, style];

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image
        source={require('../static/back.png')}
        style={[styles.backImage, imageStyle]}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

// 预设样式的返回按钮
export const BackButtonWithSafeArea: React.FC<{
  onPress: () => void;
  style?: ViewStyle;
  imageStyle?: ImageStyle;
}> = ({ onPress, style, imageStyle }) => (
  <BackButton
    onPress={onPress}
    style={style}
    imageStyle={imageStyle}
    showSafeArea={true}
    safeAreaPadding={12}
  />
);

export const BackButtonWithoutSafeArea: React.FC<{
  onPress: () => void;
  style?: ViewStyle;
  imageStyle?: ImageStyle;
}> = ({ onPress, style, imageStyle }) => (
  <BackButton
    onPress={onPress}
    style={style}
    imageStyle={imageStyle}
    showSafeArea={false}
  />
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backImage: {
    width: 24,
    height: 24,
  },
});
