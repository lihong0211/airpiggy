# Toast 组件使用说明

## 概述

Toast 组件提供了两种使用方式：
1. **函数式调用** - 推荐使用，可以在任何地方调用
2. **组件式使用** - 传统方式，需要在组件中管理状态

## 函数式调用（推荐）

### 1. 在 App 根组件中添加 ToastContainer

```tsx
import React from 'react';
import { ToastContainer } from './src/components/Toast';

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* 你的其他组件 */}
      <ToastContainer />
    </View>
  );
};
```

### 2. 在任何地方调用 showToastMessage

```tsx
import { showToastMessage } from '../components/Toast';

// 基本使用
showToastMessage({ msg: '操作成功' });

// 自定义延迟时间
showToastMessage({ 
  msg: '请先阅读并同意用户协议和隐私协议', 
  duration: 2000 
});

// 在函数中使用
const handleLogin = () => {
  if (!isAgreed) {
    showToastMessage({ 
      msg: '请先阅读并同意用户协议和隐私协议', 
      duration: 2000 
    });
    return;
  }
  // 继续登录逻辑...
};
```

## 组件式使用

```tsx
import React, { useState } from 'react';
import { Toast } from '../components/Toast';

const MyComponent = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const showToast = (msg: string) => {
    setMessage(msg);
    setVisible(true);
  };

  const hideToast = () => {
    setVisible(false);
  };

  return (
    <View>
      {/* 你的其他组件 */}
      <Toast
        message={message}
        visible={visible}
        onHide={hideToast}
        duration={2500}
      />
    </View>
  );
};
```

## API 参考

### showToastMessage 函数

```typescript
showToastMessage(options: ToastOptions): void
```

**参数：**
- `options.msg` (string): 要显示的消息内容
- `options.duration` (number, 可选): 显示持续时间，默认 2500ms

### Toast 组件 Props

```typescript
interface ToastProps {
  message: string;        // 显示的消息
  duration?: number;      // 延迟关闭时间，默认 2500ms
  visible: boolean;       // 是否显示
  onHide: () => void;    // 隐藏回调
}
```

### ToastContainer 组件

无需 props，自动管理 Toast 的显示状态。

## 特性

- ✅ 显示在页面正中心
- ✅ 宽度自适应，最小宽度为页面 2/5
- ✅ 自动关闭
- ✅ 点击穿透（不阻塞用户操作）
- ✅ 全局可调用
- ✅ 支持自定义延迟时间
- ✅ 单例模式，确保同时只显示一个 Toast

## 注意事项

1. 确保在 App 根组件中添加 `<ToastContainer />`
2. 函数式调用需要在组件外部导入 `showToastMessage`
3. 同时只会显示一个 Toast，新的调用会覆盖之前的
4. Toast 会自动在指定时间后关闭，无需手动管理
