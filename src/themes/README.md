# 颜色主题系统使用指南

## 概述

这个颜色主题系统与 `variable.css` 中的 CSS 变量保持一致，确保 React Native 和 Web 端的颜色统一。

## 使用方法

### 1. 导入颜色主题

```typescript
import { colors, themeColors } from '../themes/colors';
```

### 2. 使用方式

#### 方式一：使用完整的颜色对象
```typescript
const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: colors.primary[600], // #F28C28
  },
  text: {
    color: colors.grey[900], // #111827
  },
  errorText: {
    color: colors.error[600], // #FF445D
  },
});
```

#### 方式二：使用主题颜色别名（推荐）
```typescript
const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: themeColors.primary, // #F28C28
  },
  text: {
    color: themeColors.text.primary, // #111827
  },
  errorText: {
    color: themeColors.error, // #FF445D
  },
});
```

## 颜色分类

### 主色调 (Primary)
- `themeColors.primary` - 主要品牌色 (#F28C28)
- `themeColors.primaryLight` - 浅色版本
- `themeColors.primaryDark` - 深色版本

### 功能色
- `themeColors.success` - 成功色 (#25D076)
- `themeColors.warning` - 警告色 (#fdc83d)
- `themeColors.error` - 错误色 (#FF445D)

### 文本色
- `themeColors.text.primary` - 主要文本色
- `themeColors.text.secondary` - 次要文本色
- `themeColors.text.disabled` - 禁用文本色

### 背景色
- `themeColors.background.primary` - 主要背景色
- `themeColors.background.secondary` - 次要背景色
- `themeColors.background.disabled` - 禁用背景色

### 边框色
- `themeColors.border.primary` - 主要边框色
- `themeColors.border.secondary` - 次要边框色

## 最佳实践

1. **优先使用 `themeColors`**：它提供了语义化的颜色名称
2. **避免硬编码颜色值**：始终使用主题颜色
3. **保持一致性**：确保与 Web 端的 CSS 变量保持一致
4. **扩展性**：如需添加新颜色，先在 `variable.css` 中定义，再在 `colors.ts` 中添加

## 示例组件

```typescript
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { themeColors } from '../themes/colors';

const ExampleComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>标题</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>按钮</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: themeColors.background.primary,
    padding: 16,
  },
  title: {
    color: themeColors.text.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: themeColors.primary,
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: themeColors.background.primary,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default ExampleComponent;
```
