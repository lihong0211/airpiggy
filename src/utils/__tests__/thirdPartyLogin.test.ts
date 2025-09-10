// 第三方登录功能测试
import { 
  wechatThirdLogin,
  checkUserPhoneBinding,
  initializeThirdPartyLogin,
  handleWeChatLoginResult 
} from '../thirdPartyLogin';

// Mock 模拟函数
jest.mock('../mockWechatLogin', () => ({
  shouldUseMockLogin: () => true,
  mockWeChatLogin: jest.fn(() => Promise.resolve({
    code: 'mock_code_123',
    state: 'mock_state'
  })),
  mockCheckWeChatInstalled: () => true,
  mockCheckWeChatSupported: () => true,
}));

describe('第三方登录功能测试', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('微信登录', () => {
    test('应该能够成功进行微信登录', async () => {
      const result = await wechatThirdLogin();
      
      expect(result).toBeTruthy();
      expect(result?.code).toBe('mock_code_123');
      expect(result?.state).toBe('mock_state');
    });

    test('应该能够处理微信登录结果', () => {
      const validResult = {
        code: 'valid_code',
        state: 'valid_state'
      };

      const invalidResult = {
        code: '',
        state: 'invalid_state'
      };

      expect(handleWeChatLoginResult(validResult)).toBe(true);
      expect(handleWeChatLoginResult(invalidResult)).toBe(false);
      expect(handleWeChatLoginResult(null)).toBe(false);
    });
  });

  describe('手机号绑定检查', () => {
    test('应该能够检查用户手机号绑定状态', async () => {
      const result = await checkUserPhoneBinding('test_user_123');
      
      expect(result).toBeTruthy();
      expect(typeof result.isBound).toBe('boolean');
    });
  });

  describe('SDK 初始化', () => {
    test('应该能够初始化第三方登录 SDK', async () => {
      const result = await initializeThirdPartyLogin();
      
      expect(result).toBe(true);
    });
  });
});
