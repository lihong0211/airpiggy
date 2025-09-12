import { Alert, NativeModules, Platform, DeviceEventEmitter } from 'react-native';

const { WeChatSDKModule } = NativeModules;

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

export interface WeChatAuthResult {
  errCode: number;
  code?: string;
  state?: string;
  country?: string;
  lang?: string;
  errStr?: string;
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
    appId: 'wx8a3afbe6c5606590', // 真实的微信 AppID
    universalLink: 'https://www.aa5p.com/airpiggyapp/', // iOS 通用链接
    // 固定MD5签名 - 用于微信开放平台配置
    // 此签名通过 GetMD5Signature.java 工具获取，无需动态计算
    md5Signature: '8269645ad4b699ec6f9b0dadc358620d', // 应用的固定MD5签名
  },
};

/**
 * 微信登录管理器 - 集成官方SDK功能
 */
class WeChatLoginManager {
  private static instance: WeChatLoginManager;
  private isInitialized = false;

  static getInstance(): WeChatLoginManager {
    if (!WeChatLoginManager.instance) {
      WeChatLoginManager.instance = new WeChatLoginManager();
    }
    return WeChatLoginManager.instance;
  }

  /**
   * 初始化微信SDK
   */
  async initialize(): Promise<boolean> {
    try {
      if (this.isInitialized) {
        return true;
      }

      if (Platform.OS !== 'android') {
        console.log('当前版本仅支持Android平台');
        return false;
      }

      if (!WeChatSDKModule) {
        console.error('WeChatSDKModule 未找到，请检查原生模块配置');
        return false;
      }

      this.isInitialized = true;
      console.log('微信SDK初始化成功');
      return true;
    } catch (error) {
      console.error('微信SDK初始化失败:', error);
      return false;
    }
  }

  /**
   * 检查微信是否已安装
   */
  async isWeChatInstalled(): Promise<boolean> {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      if (!WeChatSDKModule) {
        return false;
      }

      const isInstalled = await WeChatSDKModule.isWeChatInstalled();
      console.log('微信安装状态:', isInstalled);
      return isInstalled;
    } catch (error) {
      console.error('检查微信安装状态失败:', error);
      return false;
    }
  }

  /**
   * 获取应用签名 (用于微信开放平台配置)
   */
  getAppSignature(): string {
    // 直接返回配置中的固定MD5签名
    const signature = THIRD_PARTY_CONFIG.wechat.md5Signature;
    if (!signature) {
      console.error('❌ MD5签名未配置，请在 THIRD_PARTY_CONFIG.wechat.md5Signature 中设置');
      return '';
    }
    
    console.log('使用固定MD5签名:', signature);
    return signature;
  }

  /**
   * 发起微信授权登录
   */
  async sendAuthRequest(scope: string = 'snsapi_userinfo', state: string = 'wechat_login_state'): Promise<WeChatAuthResult | null> {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      if (!WeChatSDKModule) {
        throw new Error('WeChatSDKModule 未找到');
      }

      console.log('开始微信授权请求...');
      
      // 创建Promise来等待微信回调
      return new Promise((resolve, reject) => {
        // 设置超时
        const timeout = setTimeout(() => {
          subscription.remove();
          reject(new Error('微信授权超时'));
        }, 30000); // 30秒超时

        // 监听微信授权结果
        const subscription = DeviceEventEmitter.addListener('WeChatAuthResult', (result: WeChatAuthResult) => {
          console.log('收到微信官方SDK授权结果:', result);
          clearTimeout(timeout);
          subscription.remove();
          
          resolve(result);
        });

        // 发送授权请求
        WeChatSDKModule.sendAuthRequest(scope, state)
          .then((requestResult: string) => {
            console.log('微信授权请求发送成功:', requestResult);
          })
          .catch((error: any) => {
            console.error('微信授权请求发送失败:', error);
            clearTimeout(timeout);
            subscription.remove();
            reject(error);
          });
      });
    } catch (error) {
      console.error('微信授权失败:', error);
      return null;
    }
  }

  /**
   * 检查SDK是否可用
   */
  isAvailable(): boolean {
    return Platform.OS === 'android' && !!WeChatSDKModule && this.isInitialized;
  }
}

// 全局实例和状态
const wechatLoginManager = WeChatLoginManager.getInstance();
let isSDKInitialized = false;

/**
 * 初始化第三方登录 SDK
 */
export const initializeThirdPartyLogin = async (): Promise<boolean> => {
  try {
    if (isSDKInitialized) {
      return true;
    }

    // 使用集成的微信登录管理器进行初始化
    const success = await wechatLoginManager.initialize();
    if (success) {
      isSDKInitialized = true;
      console.log('第三方登录 SDK 初始化成功');
    }
    
    return success;
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
    // 确保 SDK 已初始化
    if (!isSDKInitialized) {
      await initializeThirdPartyLogin();
    }

    // 使用集成的微信登录管理器
    return await wechatLoginManager.isWeChatInstalled();
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
    // 使用集成的微信登录管理器检查可用性
    return wechatLoginManager.isAvailable();
  } catch (error) {
    console.error('检查微信版本支持失败:', error);
    return false;
  }
};

/**
 * 发起微信授权登录
 */
export const sendWeChatAuthRequest = async (scope: string = 'snsapi_userinfo', state: string = 'wechat_login_state'): Promise<WeChatAuthResult | null> => {
  try {
    // 确保 SDK 已初始化
    if (!isSDKInitialized) {
      await initializeThirdPartyLogin();
    }

    return await wechatLoginManager.sendAuthRequest(scope, state);
  } catch (error) {
    console.error('微信授权登录失败:', error);
    return null;
  }
};

/**
 * 获取应用签名
 */
export const getAppSignature = (): string => {
  // 直接返回固定的MD5签名，无需异步操作
  return wechatLoginManager.getAppSignature();
};

/**
 * 检查微信登录是否可用
 */
export const isWeChatLoginAvailable = (): boolean => {
  return wechatLoginManager.isAvailable();
};


/**
 * 检查用户手机号绑定状态
 */
export const checkUserPhoneBinding = async (userId: string): Promise<PhoneBindingResult> => {
  try {

    // 这里应该调用后端 API 检查用户手机号绑定状态
    // 由于没有实际的后端接口，这里提供模拟实现
    
    // 调用真实 API
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
    // 调用真实的API获取用户详情
    const { detail } = await import('../api/api');
    const response = await detail();
    
    if (response.code === 200 && response.data) {
      const hasPhone = response.data.phone && response.data.phone.trim() !== '';
      return {
        isBound: hasPhone,
        message: hasPhone ? '手机号已绑定' : '请先绑定手机号',
      };
    } else {
      return {
        isBound: false,
        message: '获取用户信息失败',
      };
    }
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
