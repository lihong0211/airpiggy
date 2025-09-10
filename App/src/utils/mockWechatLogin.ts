// 模拟微信登录功能（用于开发测试）
import { Platform } from 'react-native';

export interface MockWeChatLoginResult {
  code: string | undefined;
  state?: string;
}

/**
 * 模拟微信登录（仅用于开发测试）
 */
export const mockWeChatLogin = async (): Promise<MockWeChatLoginResult | null> => {
  try {
    console.log('🔧 模拟微信登录（开发模式）');
    
    // 模拟延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 模拟返回授权码
    const mockCode = `mock_wechat_code_${Date.now()}`;
    const mockState = 'wechat_login_state';
    
    console.log('模拟微信授权码:', mockCode);
    
    return {
      code: mockCode,
      state: mockState,
    };
  } catch (error) {
    console.error('模拟微信登录失败:', error);
    return null;
  }
};

/**
 * 检查是否应该使用模拟登录
 */
export const shouldUseMockLogin = (): boolean => {
  return __DEV__ && Platform.OS === 'android';
};

/**
 * 模拟微信安装检查
 */
export const mockCheckWeChatInstalled = (): boolean => {
  if (__DEV__) {
    console.log('🔧 模拟微信安装检查：返回true（开发模式）');
    return true;
  }
  return false;
};

/**
 * 模拟微信版本支持检查
 */
export const mockCheckWeChatSupported = (): boolean => {
  if (__DEV__) {
    console.log('🔧 模拟微信版本支持检查：返回true（开发模式）');
    return true;
  }
  return false;
};
