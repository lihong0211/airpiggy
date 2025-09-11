import { Platform, Alert } from 'react-native';
import { 
  mockWeChatLogin, 
  shouldUseMockLogin, 
  mockCheckWeChatInstalled,
  mockCheckWeChatSupported 
} from './mockWechatLogin';
import { 
  wechatSDK, 
  initializeWeChat, 
  checkWeChatInstalled as sdkCheckWeChatInstalled,
  checkWeChatSupported as sdkCheckWeChatSupported,
  sendWeChatAuth,
  WeChatSDKConfig 
} from './wechatSDK';

// 微信登录相关类型定义
export interface WeChatLoginResult {
  code: string;
  state?: string;
  errCode?: number;
  errStr?: string;
}

export interface WeChatLoginError {
  errCode: number;
  errStr: string;
}

// 用户手机号绑定检查结果
export interface PhoneBindingResult {
  isBound: boolean;
  phoneNumber?: string;
  message?: string;
}

// 第三方登录配置
const THIRD_PARTY_CONFIG = {
  wechat: {
    appId: 'wx1234567890abcdef', // 需要替换为实际的微信 AppID
    universalLink: 'https://your-domain.com/universal-link', // iOS 通用链接
  },
};

// 初始化第三方登录 SDK
let isSDKInitialized = false;

/**
 * 初始化第三方登录 SDK
 */
export const initializeThirdPartyLogin = async (): Promise<boolean> => {
  try {
    if (isSDKInitialized) {
      return true;
    }


    // 初始化微信 SDK
    const wechatConfig: WeChatSDKConfig = {
      appId: THIRD_PARTY_CONFIG.wechat.appId,
      universalLink: THIRD_PARTY_CONFIG.wechat.universalLink,
    };

    const wechatInitialized = await initializeWeChat(wechatConfig);
    if (!wechatInitialized) {
      console.warn('微信 SDK 初始化失败，将使用模拟模式');
    }

    isSDKInitialized = true;
    return true;
  } catch (error) {
    console.error('第三方登录 SDK 初始化失败:', error);
    return false;
  }
};

/**
 * 检查微信是否已安装
 */
export const checkWeChatInstalled = async (): Promise<boolean> => {
  try {
    if (shouldUseMockLogin()) {
      return mockCheckWeChatInstalled();
    }

    // 确保 SDK 已初始化
    if (!isSDKInitialized) {
      await initializeThirdPartyLogin();
    }

    return await sdkCheckWeChatInstalled();
  } catch (error) {
    console.error('检查微信安装状态失败:', error);
    return false;
  }
};

/**
 * 检查微信版本是否支持
 */
export const checkWeChatSupported = async (): Promise<boolean> => {
  try {
    if (shouldUseMockLogin()) {
      return mockCheckWeChatSupported();
    }

    // 确保 SDK 已初始化
    if (!isSDKInitialized) {
      await initializeThirdPartyLogin();
    }

    return await sdkCheckWeChatSupported();
  } catch (error) {
    console.error('检查微信版本支持失败:', error);
    return false;
  }
};

/**
 * 微信第三方登录
 */
export const wechatThirdLogin = async (): Promise<WeChatLoginResult | null> => {
  try {

    // 检查微信是否已安装
    const isInstalled = await checkWeChatInstalled();
    if (!isInstalled) {
      Alert.alert('提示', '请先安装微信客户端');
      return null;
    }

    // 检查微信版本是否支持
    const isSupported = await checkWeChatSupported();
    if (!isSupported) {
      Alert.alert('提示', '微信版本过低，请升级到最新版本');
      return null;
    }

    if (shouldUseMockLogin()) {
      // 开发模式：使用模拟登录
      const mockResult = await mockWeChatLogin();
      if (mockResult && mockResult.code) {
        return {
          code: mockResult.code,
          state: mockResult.state,
        };
      }
      return null;
    }

    // 生产模式：调用真实的微信登录
    return await performRealWeChatLogin();

  } catch (error) {
    console.error('微信登录失败:', error);
    
    let errorMessage = '微信登录过程中发生错误，请重试';
    if (error instanceof Error) {
      if (error.message.includes('微信未安装')) {
        errorMessage = '请先安装微信客户端';
      } else if (error.message.includes('微信版本过低')) {
        errorMessage = '微信版本过低，请升级到最新版本';
      } else if (error.message.includes('微信授权失败')) {
        errorMessage = '微信授权失败，请重试';
      } else if (error.message.includes('未获取到微信授权码')) {
        errorMessage = '未获取到微信授权码，请重试';
      }
    }
    
    Alert.alert('登录失败', errorMessage);
    return null;
  }
};

/**
 * 执行真实的微信登录
 */
const performRealWeChatLogin = async (): Promise<WeChatLoginResult | null> => {
  try {
    // 确保 SDK 已初始化
    if (!isSDKInitialized) {
      await initializeThirdPartyLogin();
    }

    // 使用微信 SDK 进行授权登录
    const authResult = await sendWeChatAuth();
    if (!authResult) {
      return null;
    }

    return {
      code: authResult.code,
      state: authResult.state,
      errCode: authResult.errCode,
      errStr: authResult.errStr,
    };
  } catch (error) {
    console.error('真实微信登录失败:', error);
    return null;
  }
};

/**
 * 检查用户手机号绑定状态
 */
export const checkUserPhoneBinding = async (userId: string): Promise<PhoneBindingResult> => {
  try {

    // 这里应该调用后端 API 检查用户手机号绑定状态
    // 由于没有实际的后端接口，这里提供模拟实现
    
    if (shouldUseMockLogin()) {
      // 开发模式：模拟返回结果
      await new Promise(resolve => setTimeout(resolve, 1000)); // 模拟网络延迟
      
      const mockResult: PhoneBindingResult = {
        isBound: Math.random() > 0.5, // 随机返回绑定状态
        phoneNumber: Math.random() > 0.5 ? '138****8888' : undefined,
        message: '模拟检查结果',
      };
      
      return mockResult;
    }

    // 生产模式：调用真实 API
    return await performRealPhoneBindingCheck(userId);

  } catch (error) {
    console.error('检查手机号绑定状态失败:', error);
    return {
      isBound: false,
      message: '检查失败，请重试',
    };
  }
};

/**
 * 执行真实的手机号绑定检查
 */
const performRealPhoneBindingCheck = async (userId: string): Promise<PhoneBindingResult> => {
  try {
    // 这里应该调用实际的后端 API
    // 示例 API 调用：
    // const response = await fetch(`/api/user/${userId}/phone-binding`);
    // const data = await response.json();
    
    
    // 模拟 API 响应
    return {
      isBound: false,
      message: '请先绑定手机号',
    };
  } catch (error) {
    console.error('API 调用失败:', error);
    return {
      isBound: false,
      message: '网络错误，请重试',
    };
  }
};

/**
 * 处理微信登录结果
 */
export const handleWeChatLoginResult = (result: WeChatLoginResult | null): boolean => {
  if (!result) {
    console.log('微信登录失败');
    return false;
  }

  if (result.errCode && result.errCode !== 0) {
    console.error('微信登录错误:', result.errStr);
    Alert.alert('登录失败', result.errStr || '微信登录失败');
    return false;
  }

  if (!result.code) {
    console.error('微信登录失败：未获取到授权码');
    Alert.alert('登录失败', '未获取到微信授权码');
    return false;
  }

  return true;
};

/**
 * 获取第三方登录配置
 */
export const getThirdPartyConfig = () => {
  return THIRD_PARTY_CONFIG;
};

/**
 * 更新第三方登录配置
 */
export const updateThirdPartyConfig = (config: Partial<typeof THIRD_PARTY_CONFIG>) => {
  Object.assign(THIRD_PARTY_CONFIG, config);
};
