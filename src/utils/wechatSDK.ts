// 微信 SDK 集成模块
import { Platform } from 'react-native';
// @ts-ignore
import WeChatLib from 'react-native-wechat-lib';

// 微信 SDK 类型定义
export interface WeChatSDKConfig {
  appId: string;
  universalLink?: string; // iOS 通用链接
}

export interface WeChatAuthResult {
  code: string;
  state?: string;
  errCode?: number;
  errStr?: string;
}

export interface WeChatPayResult {
  errCode: number;
  errStr: string;
}

/**
 * 微信 SDK 管理器
 */
class WeChatSDKManager {
  private static instance: WeChatSDKManager;
  private isInitialized = false;
  private config: WeChatSDKConfig | null = null;

  static getInstance(): WeChatSDKManager {
    if (!WeChatSDKManager.instance) {
      WeChatSDKManager.instance = new WeChatSDKManager();
    }
    return WeChatSDKManager.instance;
  }

  /**
   * 初始化微信 SDK
   */
  async initialize(config: WeChatSDKConfig): Promise<boolean> {
    try {
      this.config = config;
      
      if (Platform.OS === 'ios') {
        // iOS 初始化
        await WeChatLib.registerApp(config.appId, config.universalLink);
      } else {
        // Android 初始化
        await WeChatLib.registerApp(config.appId);
      }

      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('微信 SDK 初始化失败:', error);
      return false;
    }
  }

  /**
   * 检查微信是否已安装
   */
  async isWeChatInstalled(): Promise<boolean> {
    try {
      if (!this.isInitialized) {
        console.warn('微信 SDK 未初始化');
        return false;
      }

      return await WeChatLib.isWXAppInstalled();
    } catch (error) {
      console.error('检查微信安装状态失败:', error);
      return false;
    }
  }

  /**
   * 检查微信版本是否支持
   */
  async isWeChatSupported(): Promise<boolean> {
    try {
      if (!this.isInitialized) {
        console.warn('微信 SDK 未初始化');
        return false;
      }

      return await WeChatLib.isWXAppSupportApi();
    } catch (error) {
      console.error('检查微信版本支持失败:', error);
      return false;
    }
  }

  /**
   * 发起微信授权登录
   */
  async sendAuthRequest(): Promise<WeChatAuthResult | null> {
    try {
      if (!this.isInitialized) {
        throw new Error('微信 SDK 未初始化');
      }

      
      // 检查微信是否已安装
      const isInstalled = await this.isWeChatInstalled();
      if (!isInstalled) {
        throw new Error('微信未安装');
      }

      // 检查微信版本是否支持
      const isSupported = await this.isWeChatSupported();
      if (!isSupported) {
        throw new Error('微信版本过低');
      }
      
      const result = await WeChatLib.sendAuthRequest({
        scope: 'snsapi_userinfo',
        state: 'wechat_login_state'
      });
      
      
      // 检查授权结果
      if (result.errCode && result.errCode !== 0) {
        throw new Error(`微信授权失败: ${result.errStr || '未知错误'}`);
      }
      
      if (!result.code) {
        throw new Error('未获取到微信授权码');
      }
      
      return {
        code: result.code,
        state: result.state,
        errCode: result.errCode,
        errStr: result.errStr,
      };
    } catch (error) {
      console.error('微信授权失败:', error);
      return null;
    }
  }

  /**
   * 发起微信支付
   */
  async sendPayRequest(payParams: any): Promise<WeChatPayResult> {
    try {
      if (!this.isInitialized) {
        throw new Error('微信 SDK 未初始化');
      }

      // 这里应该调用实际的微信 SDK 支付方法
      // 例如：return await WeChatLib.sendPayRequest(payParams);
      
      console.log('发起微信支付请求');
      
      // 模拟实现
      return {
        errCode: 0,
        errStr: '支付成功',
      };
    } catch (error) {
      console.error('微信支付失败:', error);
      return {
        errCode: -1,
        errStr: '支付失败',
      };
    }
  }

  /**
   * 分享到微信
   */
  async shareToWeChat(shareData: any): Promise<boolean> {
    try {
      if (!this.isInitialized) {
        throw new Error('微信 SDK 未初始化');
      }

      // 这里应该调用实际的微信 SDK 分享方法
      // 例如：return await WeChatLib.shareToWeChat(shareData);
      
      console.log('分享到微信');
      return true;
    } catch (error) {
      console.error('微信分享失败:', error);
      return false;
    }
  }

  /**
   * 获取当前配置
   */
  getConfig(): WeChatSDKConfig | null {
    return this.config;
  }

  /**
   * 检查是否已初始化
   */
  getInitialized(): boolean {
    return this.isInitialized;
  }
}

// 导出单例实例
export const wechatSDK = WeChatSDKManager.getInstance();

// 导出便捷方法
export const initializeWeChat = (config: WeChatSDKConfig) => wechatSDK.initialize(config);
export const checkWeChatInstalled = () => wechatSDK.isWeChatInstalled();
export const checkWeChatSupported = () => wechatSDK.isWeChatSupported();
export const sendWeChatAuth = () => wechatSDK.sendAuthRequest();
export const sendWeChatPay = (payParams: any) => wechatSDK.sendPayRequest(payParams);
export const shareToWeChat = (shareData: any) => wechatSDK.shareToWeChat(shareData);
