// 第三方登录使用示例
import { 
  initializeThirdPartyLogin,
  wechatThirdLogin,
  checkUserPhoneBinding,
  handleWeChatLoginResult,
  getThirdPartyConfig,
  updateThirdPartyConfig,
  WeChatLoginResult,
  PhoneBindingResult
} from './thirdPartyLogin';

/**
 * 第三方登录管理器
 */
export class ThirdPartyLoginManager {
  private static instance: ThirdPartyLoginManager;
  private isInitialized = false;

  static getInstance(): ThirdPartyLoginManager {
    if (!ThirdPartyLoginManager.instance) {
      ThirdPartyLoginManager.instance = new ThirdPartyLoginManager();
    }
    return ThirdPartyLoginManager.instance;
  }

  /**
   * 初始化第三方登录
   */
  async initialize(): Promise<boolean> {
    try {
      if (this.isInitialized) {
        return true;
      }

      console.log('🚀 初始化第三方登录管理器');
      
      // 更新配置（在实际项目中应该从配置文件或环境变量中读取）
      updateThirdPartyConfig({
        wechat: {
          appId: 'wx1234567890abcdef', // 替换为实际的微信 AppID
          universalLink: 'https://your-app.com/universal-link', // 替换为实际的通用链接
        },
      });

      // 初始化第三方登录 SDK
      const success = await initializeThirdPartyLogin();
      if (success) {
        this.isInitialized = true;
        console.log('✅ 第三方登录管理器初始化成功');
      } else {
        console.warn('⚠️ 第三方登录管理器初始化失败，将使用模拟模式');
        this.isInitialized = true; // 即使失败也标记为已初始化，使用模拟模式
      }

      return this.isInitialized;
    } catch (error) {
      console.error('第三方登录管理器初始化失败:', error);
      return false;
    }
  }

  /**
   * 微信登录
   */
  async loginWithWeChat(): Promise<{
    success: boolean;
    result?: WeChatLoginResult;
    error?: string;
  }> {
    try {
      console.log('🔐 开始微信登录');

      // 确保已初始化
      if (!this.isInitialized) {
        await this.initialize();
      }

      // 执行微信登录
      const result = await wechatThirdLogin();
      
      if (!result) {
        return {
          success: false,
          error: '微信登录失败',
        };
      }

      // 处理登录结果
      const isValid = handleWeChatLoginResult(result);
      if (!isValid) {
        return {
          success: false,
          error: '微信登录结果无效',
        };
      }

      console.log('✅ 微信登录成功');
      return {
        success: true,
        result,
      };
    } catch (error) {
      console.error('微信登录异常:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : '未知错误',
      };
    }
  }

  /**
   * 检查用户手机号绑定状态
   */
  async checkPhoneBinding(userId: string): Promise<{
    success: boolean;
    result?: PhoneBindingResult;
    error?: string;
  }> {
    try {
      console.log('📱 检查用户手机号绑定状态:', userId);

      // 确保已初始化
      if (!this.isInitialized) {
        await this.initialize();
      }

      // 检查手机号绑定状态
      const result = await checkUserPhoneBinding(userId);
      
      console.log('📱 手机号绑定检查结果:', result);
      return {
        success: true,
        result,
      };
    } catch (error) {
      console.error('检查手机号绑定状态异常:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : '未知错误',
      };
    }
  }

  /**
   * 完整的第三方登录流程
   */
  async performThirdPartyLogin(platform: 'wechat'): Promise<{
    success: boolean;
    loginResult?: WeChatLoginResult;
    phoneBindingResult?: PhoneBindingResult;
    error?: string;
  }> {
    try {
      console.log(`🚀 开始 ${platform} 第三方登录流程`);

      // 确保已初始化
      if (!this.isInitialized) {
        await this.initialize();
      }

      let loginResult: WeChatLoginResult | undefined;

      // 根据平台执行登录
      switch (platform) {
        case 'wechat': {
          const wechatLogin = await this.loginWithWeChat();
          if (!wechatLogin.success) {
            return {
              success: false,
              error: wechatLogin.error,
            };
          }
          loginResult = wechatLogin.result;
          break;
        }
        default:
          return {
            success: false,
            error: '不支持的登录平台',
          };
      }

      // 检查手机号绑定状态（如果需要）
      let phoneBindingResult: PhoneBindingResult | undefined;
      if (loginResult?.code) {
        // 这里应该根据登录结果获取用户ID
        const userId = `user_${Date.now()}`; // 模拟用户ID
        const phoneCheck = await this.checkPhoneBinding(userId);
        if (phoneCheck.success) {
          phoneBindingResult = phoneCheck.result;
        }
      }

      console.log('✅ 第三方登录流程完成');
      return {
        success: true,
        loginResult,
        phoneBindingResult,
      };
    } catch (error) {
      console.error('第三方登录流程异常:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : '未知错误',
      };
    }
  }

  /**
   * 获取当前配置
   */
  getConfig() {
    return getThirdPartyConfig();
  }

  /**
   * 检查是否已初始化
   */
  getInitialized(): boolean {
    return this.isInitialized;
  }
}

// 导出单例实例
export const thirdPartyLoginManager = ThirdPartyLoginManager.getInstance();

// 导出便捷方法
export const initializeThirdPartyLoginManager = () => thirdPartyLoginManager.initialize();
export const loginWithWeChat = () => thirdPartyLoginManager.loginWithWeChat();
export const checkPhoneBinding = (userId: string) => thirdPartyLoginManager.checkPhoneBinding(userId);
export const performThirdPartyLogin = (platform: 'wechat') => thirdPartyLoginManager.performThirdPartyLogin(platform);
