# 第三方登录工具模块

这个模块提供了完整的第三方登录功能，包括微信登录、手机号绑定检查等。

## 文件结构

```
src/utils/
├── thirdPartyLogin.ts          # 主要的第三方登录功能
├── wechatSDK.ts               # 微信 SDK 封装
├── mockWechatLogin.ts         # 模拟微信登录（开发测试用）
├── thirdPartyLoginExample.ts  # 使用示例
└── README_thirdPartyLogin.md  # 说明文档
```

## 主要功能

### 1. 微信登录
- 检查微信是否已安装
- 检查微信版本是否支持
- 发起微信授权登录
- 处理登录结果

### 2. 手机号绑定检查
- 检查用户是否已绑定手机号
- 获取绑定状态信息

### 3. SDK 管理
- 自动初始化第三方登录 SDK
- 配置管理
- 错误处理

## 使用方法

### 基本使用

```typescript
import { 
  initializeThirdPartyLogin,
  wechatThirdLogin,
  checkUserPhoneBinding 
} from './utils/thirdPartyLogin';

// 1. 初始化第三方登录
await initializeThirdPartyLogin();

// 2. 微信登录
const loginResult = await wechatThirdLogin();
if (loginResult) {
  console.log('登录成功，授权码:', loginResult.code);
}

// 3. 检查手机号绑定
const bindingResult = await checkUserPhoneBinding('user123');
console.log('绑定状态:', bindingResult.isBound);
```

### 使用管理器（推荐）

```typescript
import { thirdPartyLoginManager } from './utils/thirdPartyLoginExample';

// 1. 初始化
await thirdPartyLoginManager.initialize();

// 2. 微信登录
const result = await thirdPartyLoginManager.loginWithWeChat();
if (result.success) {
  console.log('登录成功:', result.result);
}

// 3. 完整登录流程
const fullResult = await thirdPartyLoginManager.performThirdPartyLogin('wechat');
if (fullResult.success) {
  console.log('完整登录流程成功');
}
```

## 配置

### 微信配置

在 `thirdPartyLogin.ts` 中更新配置：

```typescript
const THIRD_PARTY_CONFIG = {
  wechat: {
    appId: 'your_wechat_app_id',        // 微信 AppID
    universalLink: 'your_universal_link', // iOS 通用链接
  },
};
```

### 动态更新配置

```typescript
import { updateThirdPartyConfig } from './utils/thirdPartyLogin';

updateThirdPartyConfig({
  wechat: {
    appId: 'wx1234567890abcdef',
    universalLink: 'https://your-app.com/universal-link',
  },
});
```

## 开发模式

在开发模式下，系统会自动使用模拟登录功能：

```typescript
// 检查是否使用模拟模式
import { shouldUseMockLogin } from './utils/mockWechatLogin';

if (shouldUseMockLogin()) {
  console.log('当前使用模拟登录模式');
}
```

## 错误处理

所有函数都包含完整的错误处理：

```typescript
try {
  const result = await wechatThirdLogin();
  if (result) {
    // 处理成功结果
  } else {
    // 处理失败情况
  }
} catch (error) {
  console.error('登录失败:', error);
}
```

## 类型定义

### WeChatLoginResult
```typescript
interface WeChatLoginResult {
  code: string;        // 授权码
  state?: string;      // 状态参数
  errCode?: number;    // 错误码
  errStr?: string;     // 错误信息
}
```

### PhoneBindingResult
```typescript
interface PhoneBindingResult {
  isBound: boolean;        // 是否已绑定
  phoneNumber?: string;    // 手机号
  message?: string;        // 消息
}
```

## 注意事项

1. **生产环境配置**：确保在生产环境中正确配置微信 AppID 和通用链接
2. **权限配置**：确保在 Android 和 iOS 中正确配置相关权限
3. **错误处理**：始终处理可能的错误情况
4. **测试**：在开发环境中使用模拟模式进行测试

## 集成步骤

1. 安装必要的依赖包
2. 配置微信 AppID 和通用链接
3. 在应用启动时初始化第三方登录
4. 在登录页面中集成第三方登录功能
5. 处理登录结果和错误情况

## 示例代码

查看 `thirdPartyLoginExample.ts` 文件获取完整的使用示例。
