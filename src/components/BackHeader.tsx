import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { BackButton } from './BackButton';
import { themeColors } from '../themes/colors';

interface BackHeaderProps {
  title: string;
  onBackPress?: () => void;
  headerStyle?: any;
  titleStyle?: any;
  showBackButton?: boolean;
}

export const BackHeader: React.FC<BackHeaderProps> = ({
  title,
  onBackPress,
  headerStyle,
  titleStyle,
  showBackButton = true,
}) => {
  return (
    <View style={[styles.header, headerStyle]}>
      {showBackButton ? (
        <BackButton onPress={onBackPress} />
      ) : (
        <View style={styles.placeholder} />
      )}
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      <View style={styles.placeholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: themeColors.background.secondary,
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
});

export default BackHeader;
