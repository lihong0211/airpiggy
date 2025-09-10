import React, { useEffect, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { genTestUserSig, APPKey } from '../../../debug/GenerateTestUserSig';
import { LoginChat, LoginInfo } from '../../../initApp';
import { IRouterParams } from '../../../interface';
import { useIsFocused } from '@react-navigation/native';
import { colors, themeColors } from '../../themes/colors';
import { ToastContainer, showToastMessage } from '../../components/Toast';
import { sendSmsCode, smsLogin } from '../../api/api';
import type { sendSmsCodeRequest, smsLoginRequest } from '../../api/types';
import {
  wechatThirdLogin,
  checkUserPhoneBinding,
} from '../../utils/thirdPartyLogin';

const CustomCheckBox = ({
  value,
  onValueChange,
  style,
}: {
  value: boolean;
  onValueChange: (value: boolean) => void;
  style?: any;
}) => (
  <TouchableOpacity
    style={[styles.customCheckbox, style]}
    onPress={() => onValueChange(!value)}
  >
    {value && (
      <Image
        source={require('../../static/selected.png')}
        style={styles.checkmarkImage}
      />
    )}
  </TouchableOpacity>
);

export const Login = ({ navigation }: IRouterParams) => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [isAgreed, setIsAgreed] = useState<boolean>(false);
  const [isPageShow, setIsPageShow] = useState<boolean>(true);
  const [countdown, setCountdown] = useState<number>(0);

  const [phoneError, setPhoneError] = useState<string>('');
  const [verificationError, setVerificationError] = useState<string>('');

  const validatePhoneNumber = (phone: string): string | null => {
    if (!phone) return '请输入手机号';
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(phone)) return '手机号格式不正确';
    return null;
  };

  const validateVerificationCode = (code: string): string | null => {
    if (!code) return '请输入验证码';
    return null;
  };

  const isFormCompleted = (): boolean => {
    return (
      !validatePhoneNumber(phoneNumber) &&
      !validateVerificationCode(verificationCode)
    );
  };

  const checkAgreement = (): boolean => {
    if (!isAgreed) {
      showToastMessage({
        msg: '请先阅读并同意用户协议和隐私协议',
        duration: 2000,
      });
      return false;
    }
    return true;
  };

  const handleSmsLogin = async () => {
    if (!checkAgreement()) {
      return;
    }

    const phoneErrorMsg = validatePhoneNumber(phoneNumber);
    const codeErrorMsg = validateVerificationCode(verificationCode);

    setPhoneError(phoneErrorMsg || '');
    setVerificationError(codeErrorMsg || '');

    if (phoneErrorMsg || codeErrorMsg) {
      return;
    }

    try {
      const loginData: smsLoginRequest = {
        phone: phoneNumber,
        code: verificationCode,
        smsType: 'login',
      };

      const response = await smsLogin(loginData);

      if (response.code === 200 && response.data) {
        const { SDKAppID, userSig } = genTestUserSig(phoneNumber);
        const chatData: LoginInfo = {
          SDKAppID,
          userID: phoneNumber,
          userSig,
          appKey: APPKey,
        };

        LoginChat(chatData, () => {
          navigation.navigate('Home');
        });
      } else {
        showToastMessage({
          msg: response.message || '登录失败',
          duration: 2000,
        });
      }
    } catch (error: any) {
      showToastMessage({
        msg: '登录失败，请重试',
        duration: 2000,
      });
    }
  };

  const onGetVerificationCode = async () => {
    const phoneErrorMsg = validatePhoneNumber(phoneNumber);
    if (phoneErrorMsg) {
      setPhoneError(phoneErrorMsg);
      return;
    }

    try {
      const requestData: sendSmsCodeRequest = {
        phone: phoneNumber,
        type: 'login',
      };

      await sendSmsCode(requestData);
      setCountdown(60);
      showToastMessage({
        msg: '验证码已发送',
        duration: 2000,
      });
    } catch (error: any) {
      showToastMessage({
        msg: '验证码发送失败，请重试',
        duration: 2000,
      });
    }
  };

  const onThirdPartyLogin = async (type: 'wechat' | 'apple') => {
    if (!checkAgreement()) {
      return;
    }

    if (type === 'wechat') {
      await handleWeChatLogin();
    } else if (type === 'apple') {
      handleAppleLogin();
    }
  };

  const handleWeChatLogin = async () => {
    try {
      showToastMessage({
        msg: '正在启动微信登录...',
        duration: 1000,
      });

      // 使用完整的微信登录流程
      const result = await wechatThirdLogin();

      if (result.success) {
        showToastMessage({
          msg: '微信登录成功',
          duration: 2000,
        });

        // 检查用户是否需要绑定手机号
        if (result.user && checkUserPhoneBinding(result.user)) {
          // 用户已绑定手机号，直接跳转到主页面
          console.log('用户已绑定手机号，跳转到主页面');
          // TODO: 跳转到主页面
          // navigation.navigate('Home');
        } else {
          // 用户未绑定手机号，跳转到绑定手机号页面
          console.log('用户未绑定手机号，跳转到绑定页面');
          // TODO: 跳转到绑定手机号页面
          // navigation.navigate('BindMobile');
        }
      } else {
        showToastMessage({
          msg: result.message || '微信登录失败，请重试',
          duration: 2000,
        });
      }
    } catch (error: any) {
      console.error('微信登录错误:', error);
      showToastMessage({
        msg: '微信登录失败，请重试',
        duration: 2000,
      });
    }
  };

  const handleAppleLogin = () => {
    showToastMessage({
      msg: 'Apple登录功能开发中...',
      duration: 2000,
    });
  };

  const openUserAgreement = () => {};

  const openUserPrivacy = () => {};

  const onPasswordLogin = () => {
    if (!checkAgreement()) {
      return;
    }

    navigation.navigate('PasswordLogin');
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    setIsPageShow(isFocused);
  }, [isFocused]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  return (
    isPageShow && (
      <View style={styles.loginContainer}>
        <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.contentContainer}
        >
          {/* 标题 */}
          <Text style={styles.title}>登录</Text>

          {/* 手机号输入 */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>手机号</Text>
            <View
              style={[
                styles.inputWrapper,
                phoneError && styles.inputWrapperError,
              ]}
            >
              <TextInput
                value={phoneNumber}
                style={styles.textInput}
                maxLength={11}
                placeholder="请输入手机号"
                placeholderTextColor="#BBBBBB"
                keyboardType="phone-pad"
                onChangeText={text => {
                  setPhoneNumber(text);
                  if (phoneError) {
                    const errorMsg = validatePhoneNumber(text);
                    setPhoneError(errorMsg || '');
                  }
                }}
                onBlur={() => {
                  const errorMsg = validatePhoneNumber(phoneNumber);
                  setPhoneError(errorMsg || '');
                }}
              />
            </View>
            {phoneError ? (
              <Text style={styles.errorText}>{phoneError}</Text>
            ) : null}
          </View>

          {/* 验证码输入 */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>验证码</Text>
            <View
              style={[
                styles.verificationInputWrapper,
                verificationError && styles.verificationInputWrapperError,
              ]}
            >
              <TextInput
                value={verificationCode}
                style={styles.verificationTextInput}
                maxLength={4}
                placeholder="请输入验证码"
                placeholderTextColor="#BBBBBB"
                keyboardType="number-pad"
                onChangeText={text => {
                  setVerificationCode(text);
                  if (verificationError) {
                    const errorMsg = validateVerificationCode(text);
                    setVerificationError(errorMsg || '');
                  }
                }}
                onBlur={() => {
                  const errorMsg = validateVerificationCode(verificationCode);
                  setVerificationError(errorMsg || '');
                }}
              />
              <TouchableOpacity
                onPress={onGetVerificationCode}
                disabled={countdown > 0}
              >
                <Text
                  style={[
                    styles.verificationText,
                    countdown > 0 && styles.verificationTextDisabled,
                  ]}
                >
                  {countdown > 0 ? `${countdown}s` : '获取验证码'}
                </Text>
              </TouchableOpacity>
            </View>
            {verificationError ? (
              <Text style={styles.errorText}>{verificationError}</Text>
            ) : null}
          </View>

          {/* 登录按钮 */}
          <TouchableOpacity
            style={[
              styles.loginButton,
              isFormCompleted() && styles.loginButtonActive,
            ]}
            onPress={handleSmsLogin}
            disabled={!isFormCompleted()}
          >
            <Text style={styles.loginButtonText}>登录</Text>
          </TouchableOpacity>

          {/* 用户协议 */}
          <View style={styles.agreementContainer}>
            <CustomCheckBox
              value={isAgreed}
              onValueChange={setIsAgreed}
              style={styles.checkbox}
            />
            <Text style={styles.agreementText}>
              我已阅读并同意{' '}
              <Text style={styles.linkText} onPress={openUserAgreement}>
                用户协议
              </Text>{' '}
              和{' '}
              <Text style={styles.linkText} onPress={openUserPrivacy}>
                隐私协议
              </Text>
            </Text>
          </View>

          {/* 分割线 */}
          <View style={styles.divider} />

          {/* 其他登录方式 */}
          <View style={styles.thirdPartyContainer}>
            <Text style={styles.thirdPartyTitle}>使用其他方式登录</Text>

            {/* 第三方登录按钮 */}
            <View style={styles.thirdPartyButtons}>
              {/* Apple 登录 - 只在 iOS 系统显示，且放在第一位 */}
              {Platform.OS === 'ios' && (
                <TouchableOpacity
                  style={styles.thirdPartyButton}
                  onPress={() => onThirdPartyLogin('apple')}
                >
                  <Image
                    source={require('../../static/apple.png')}
                    style={styles.thirdPartyIconImage}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              )}

              {/* 密码登录 */}
              <TouchableOpacity
                style={styles.thirdPartyButton}
                onPress={onPasswordLogin}
              >
                <Image
                  source={require('../../static/pwd.png')}
                  style={styles.thirdPartyIconImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>

              {/* 微信登录 */}
              <TouchableOpacity
                style={styles.thirdPartyButton}
                onPress={() => onThirdPartyLogin('wechat')}
              >
                <Image
                  source={require('../../static/wechat.png')}
                  style={styles.thirdPartyIconImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>

        {/* Toast提示 */}
        <ToastContainer />
      </View>
    )
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.grey[900],
    textAlign: 'center',
    marginVertical: 24,
  },
  inputContainer: {
    marginTop: 16,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.grey[900],
    marginBottom: 8,
  },
  inputWrapper: {
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  inputWrapperError: {
    borderColor: '#FF0000',
  },
  textInput: {
    fontSize: 16,
    color: '#000000',
  },
  verificationInputWrapper: {
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  verificationInputWrapperError: {
    borderColor: '#FF0000',
  },
  verificationTextInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
  verificationText: {
    color: themeColors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  verificationTextDisabled: {
    color: colors.grey[500],
  },
  errorText: {
    color: themeColors.error,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  loginButton: {
    backgroundColor: colors.grey[300],
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonActive: {
    backgroundColor: themeColors.primary,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  agreementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 4,
  },
  checkbox: {
    marginRight: 8,
  },
  customCheckbox: {
    width: 17,
    height: 17,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  customCheckboxChecked: {
    borderColor: themeColors.primary,
  },
  checkmarkImage: {
    width: 11,
    height: 11,
  },
  agreementText: {
    fontSize: 14,
    color: colors.grey[400],
    flex: 1,
  },
  linkText: {
    color: themeColors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.grey[200],
    marginVertical: 16,
  },
  thirdPartyContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  thirdPartyTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.grey[900],
    marginBottom: 30,
  },
  thirdPartyButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },
  thirdPartyButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.grey[50],
    justifyContent: 'center',
    alignItems: 'center',
  },
  thirdPartyIconImage: {
    width: 24,
    height: 24,
  },
});
