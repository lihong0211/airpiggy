import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

interface SafeAreaWrapperProps {
  children: React.ReactNode;
  style?: ViewStyle;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
  backgroundColor?: string;
  fullScreen?: boolean; // 是否全屏显示
}

export const SafeAreaWrapper: React.FC<SafeAreaWrapperProps> = ({
  children,
  style,
  edges = ['top', 'bottom', 'left', 'right'],
  backgroundColor = '#FFFFFF',
  fullScreen = false,
}) => {
  const insets = useSafeAreaInsets();

  if (fullScreen) {
    // 全屏模式，手动处理安全区域
    const dynamicPaddingStyle = {
      paddingTop: edges.includes('top') ? insets.top : 0,
      paddingBottom: edges.includes('bottom') ? insets.bottom : 0,
      paddingLeft: edges.includes('left') ? insets.left : 0,
      paddingRight: edges.includes('right') ? insets.right : 0,
    };

    return (
      <View style={[styles.fullScreen, { backgroundColor }, style]}>
        <View style={[styles.content, dynamicPaddingStyle]}>{children}</View>
      </View>
    );
  }

  // 使用 SafeAreaView 组件
  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor }, style]}
      edges={edges}
    >
      {children}
    </SafeAreaView>
  );
};

// 便捷的安全区域组件
export const SafeAreaTop: React.FC<{
  children: React.ReactNode;
  style?: ViewStyle;
}> = ({ children, style }) => (
  <SafeAreaWrapper edges={['top']} style={style}>
    {children}
  </SafeAreaWrapper>
);

export const SafeAreaBottom: React.FC<{
  children: React.ReactNode;
  style?: ViewStyle;
}> = ({ children, style }) => (
  <SafeAreaWrapper edges={['bottom']} style={style}>
    {children}
  </SafeAreaWrapper>
);

export const SafeAreaHorizontal: React.FC<{
  children: React.ReactNode;
  style?: ViewStyle;
}> = ({ children, style }) => (
  <SafeAreaWrapper edges={['left', 'right']} style={style}>
    {children}
  </SafeAreaWrapper>
);

// 获取安全区域信息的 Hook
export const useSafeArea = () => {
  const insets = useSafeAreaInsets();

  return {
    top: insets.top,
    bottom: insets.bottom,
    left: insets.left,
    right: insets.right,
    // 便捷属性
    isIPhoneX: insets.top > 20, // 判断是否为 iPhone X 及以上设备
    hasNotch: insets.top > 0, // 判断是否有刘海屏
  };
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
});
