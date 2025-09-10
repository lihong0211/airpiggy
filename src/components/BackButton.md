# BackButton 组件使用说明

## 概述

BackButton 是一个通用的返回按钮组件，使用 `static/back.png` 图片，支持安全区域适配。

## 组件特性

- ✅ 使用图片资源 (`static/back.png`)
- ✅ 支持安全区域适配
- ✅ 可自定义样式
- ✅ 提供预设样式组件
- ✅ 支持点击事件

## 使用方法

### 1. 基本使用

```typescript
import { BackButton } from '../../components/BackButton';

const MyComponent = () => {
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <BackButton onPress={handleBack} />
  );
};
```

### 2. 使用预设样式

#### 带安全区域的返回按钮（推荐）
```typescript
import { BackButtonWithSafeArea } from '../../components/BackButton';

<BackButtonWithSafeArea onPress={handleBack} />
```

#### 不带安全区域的返回按钮
```typescript
import { BackButtonWithoutSafeArea } from '../../components/BackButton';

<BackButtonWithoutSafeArea onPress={handleBack} />
```

### 3. 自定义样式

```typescript
import { BackButton } from '../../components/BackButton';

<BackButton
  onPress={handleBack}
  style={{
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
  }}
  imageStyle={{
    width: 20,
    height: 20,
    tintColor: '#333333',
  }}
  showSafeArea={true}
  safeAreaPadding={16}
/>
```

## API 参考

### BackButton Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `onPress` | `() => void` | - | 点击事件处理函数 |
| `style` | `ViewStyle` | - | 容器样式 |
| `imageStyle` | `ImageStyle` | - | 图片样式 |
| `showSafeArea` | `boolean` | `true` | 是否显示安全区域 |
| `safeAreaPadding` | `number` | `12` | 安全区域额外padding |

### 预设组件

#### BackButtonWithSafeArea
- 自动处理安全区域
- 默认 `safeAreaPadding: 12`
- 适用于大多数页面

#### BackButtonWithoutSafeArea
- 不处理安全区域
- 适用于已处理安全区域的容器内

## 样式说明

### 默认样式
```typescript
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
```

### 安全区域处理
- 使用 `useSafeAreaInsets()` 获取安全区域信息
- 动态设置 `paddingTop: insets.top + safeAreaPadding`
- 自动适配不同设备（iPhone X 系列、Android 异形屏等）

## 使用场景

### 1. 页面级返回按钮
```typescript
// 在页面顶部使用，自动处理安全区域
<BackButtonWithSafeArea onPress={() => navigation.goBack()} />
```

### 2. 弹窗内返回按钮
```typescript
// 在弹窗内使用，不需要安全区域处理
<BackButtonWithoutSafeArea onPress={closeModal} />
```

### 3. 自定义样式返回按钮
```typescript
// 自定义颜色和大小
<BackButton
  onPress={handleBack}
  imageStyle={{
    width: 20,
    height: 20,
    tintColor: themeColors.primary,
  }}
/>
```

## 注意事项

1. **图片资源**: 确保 `static/back.png` 文件存在
2. **安全区域**: 根据使用场景选择合适的预设组件
3. **样式覆盖**: 可以通过 `style` 和 `imageStyle` 自定义样式
4. **点击反馈**: 组件内置 `activeOpacity={0.7}` 提供点击反馈

## 示例

### 完整页面示例
```typescript
import React from 'react';
import { View, Text } from 'react-native';
import { BackButtonWithSafeArea } from '../../components/BackButton';

const MyPage = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <BackButtonWithSafeArea onPress={() => navigation.goBack()} />
      
      <View style={{ flex: 1, padding: 20 }}>
        <Text>页面内容</Text>
      </View>
    </View>
  );
};
```
