import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { LoginChat, LoginInfo } from '../../../initApp';
import { IRouterParams } from '../../../interface';
import { colors, themeColors } from '../../themes/colors';
import { pwdLogin } from '../../api/api';
import type { WechatLoginRequest, WechatLoginResponse } from '../../api/types';
import { ToastContainer } from '../../components/Toast';
import BackHeader from '../../components/BackHeader';

export const PasswordLogin = ({ navigation }: IRouterParams) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [usernameError, setUsernameError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  // 验证用户名
  const validateUsername = (usernameValue: string): string | null => {
    if (!usernameValue) return '请输入账号';
    return null;
  };

  // 验证密码
  const validatePassword = (passwordValue: string): string | null => {
    if (!passwordValue) return '请输入密码';
    return null;
  };

  // 表单完成状态检查
  const isFormCompleted = (): boolean => {
    return !validateUsername(username) && !validatePassword(password);
  };

  // 密码登录处理函数
  const handleLogin = async () => {
    console.log('=== 密码登录按钮被点击 ===');
    console.log('账号:', username);
    console.log('密码:', password);

    // 验证表单
    const usernameErrorMsg = validateUsername(username);
    const passwordErrorMsg = validatePassword(password);

    setUsernameError(usernameErrorMsg || '');
    setPasswordError(passwordErrorMsg || '');

    if (usernameErrorMsg || passwordErrorMsg) {
      console.log('表单验证失败');
      return;
    }

    try {
      console.log('开始密码登录...');

      const loginData: WechatLoginRequest = {
        username,
        password,
      };

      console.log('发送密码登录请求:', loginData);
      const response: WechatLoginResponse = await pwdLogin(loginData);

      if (response.code === 200 && response.data) {
        console.log('密码登录成功:', response.data);

        // 使用返回的用户信息进行聊天登录
        const chatData: LoginInfo = {
          SDKAppID: response.data.sdkAppId,
          userID: response.data.userId,
          userSig: response.data.userSig,
          appKey:
            'CYsCGD6kcNLbkWLQTGuk4qfpiocOuLrxfykDVYxxIc9TxGGPPHdXj3TDRBMDOFI8',
        };

        console.log('准备登录聊天:', chatData);
        LoginChat(chatData, () => {
          console.log('聊天登录成功，跳转到首页');
          navigation.navigate('Home');
        });
      } else {
        console.error('密码登录失败:', response.message);
        // 这里应该显示错误提示
      }
    } catch (error: any) {
      console.error('密码登录异常:', error);
      // 这里应该显示错误提示
    }
  };

  return (
    <View style={styles.container}>
      <BackHeader  title="账号密码登录" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.contentContainer}
      >
        <View style={styles.inputContainer}>
          <Text style={styles.label}>账号</Text>
          <View
            style={[
              styles.inputWrapper,
              usernameError && styles.inputWrapperError,
            ]}
          >
            <TextInput
              value={username}
              style={styles.textInput}
              placeholder="请输入你的账号"
              placeholderTextColor="#BBBBBB"
              autoFocus={true}
              onChangeText={text => {
                setUsername(text);
                if (usernameError) {
                  const errorMsg = validateUsername(text);
                  setUsernameError(errorMsg || '');
                }
              }}
              onBlur={() => {
                const errorMsg = validateUsername(username);
                setUsernameError(errorMsg || '');
              }}
            />
          </View>
          {usernameError ? (
            <Text style={styles.errorText}>{usernameError}</Text>
          ) : null}
        </View>

        {/* 密码输入 */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>密码</Text>
          <View
            style={[
              styles.inputWrapper,
              passwordError && styles.inputWrapperError,
            ]}
          >
            <TextInput
              value={password}
              style={styles.textInput}
              placeholder="请输入你的密码"
              placeholderTextColor="#BBBBBB"
              secureTextEntry={true}
              onChangeText={text => {
                setPassword(text);
                if (passwordError) {
                  const errorMsg = validatePassword(text);
                  setPasswordError(errorMsg || '');
                }
              }}
              onBlur={() => {
                const errorMsg = validatePassword(password);
                setPasswordError(errorMsg || '');
              }}
            />
          </View>
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
        </View>

        {/* 登录按钮 */}
        <TouchableOpacity
          style={[
            styles.loginButton,
            isFormCompleted() && styles.loginButtonActive,
          ]}
          onPress={handleLogin}
          disabled={!isFormCompleted()}
        >
          <Text style={styles.loginButtonText}>登录</Text>
        </TouchableOpacity>

        {/* Toast提示 */}
        <ToastContainer />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  backButtonContainer: {
    marginTop: 12,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 28, // text-28 与 Vue 文件一致
    fontWeight: '700', // weight-900 与 Vue 文件一致
    color: colors.grey[900], // color-grey-900 与 Vue 文件一致
    textAlign: 'center',
  },
  inputContainer: {
    marginTop: 16, // mt-16 与 Vue 文件一致
    marginBottom: 20,
  },
  label: {
    fontSize: 14, // text-14 与 Vue 文件一致
    fontWeight: '700', // weight-700 与 Vue 文件一致
    color: colors.grey[900], // 与 Vue 文件一致
    marginBottom: 8, // mb-8 与 Vue 文件一致
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
    borderColor: themeColors.error,
  },
  textInput: {
    fontSize: 16,
    color: '#000000',
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
    borderRadius: 12, // 24rpx 转换为 12px
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
});
