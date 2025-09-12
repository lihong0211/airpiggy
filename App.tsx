import React, { useEffect } from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { TUITranslateService } from '@tencentcloud/chat-uikit-engine';

import { UIKitProvider } from '@tencentcloud/chat-uikit-react-native';

import { Login as LoginScreen } from './src/pages/Login/index';
import { PasswordLogin as PasswordLoginScreen } from './src/pages/Login/PasswordLogin';
import { Language as LanguageScreen } from './src/pages/Language';
import { Home as HomeScreen } from './src/pages/Home';
import { ChatScreen, ChatSettingScreen } from './src/pages/UIKitScreen';

// Setting related pages
import Relation from './src/pages/Relation';

import appResources from './i18n';
import uikitResources from '@tencentcloud/chat-uikit-react-native/i18n';

import { LoginUsingStorageInfo } from './initApp/index';
import { StyleSheet } from 'react-native';
import { useUserStore } from './src/hooks/useUserStore';
import { ToastContainer } from './src/components/Toast';

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();
  const navigationRef = useNavigationContainerRef();
  const { fetchUserInfo } = useUserStore();
  // Init localization
  TUITranslateService.provideLanguages({
    'en-US': {
      ...appResources['en-US'],
      ...uikitResources['en-US'],
    },
    'zh-CN': {
      ...appResources['zh-CN'],
      ...uikitResources['zh-CN'],
    },
  });

  TUITranslateService.useI18n('en-US');

  useEffect(() => {
    LoginUsingStorageInfo(() => {
      navigationRef.current?.navigate('Home' as never);
      // 登录成功后获取用户信息
      fetchUserInfo();
    });
  }, [navigationRef]); // 移除 fetchUserInfo 依赖，避免无限循环

  return (
    <SafeAreaProvider>
      <UIKitProvider value={{ language: 'en-US' }}>
        <NavigationContainer ref={navigationRef}>
          <SafeAreaView
            style={styles.safeArea}
            edges={['top', 'bottom', 'left', 'right']}
          >
            <Stack.Navigator
              initialRouteName="Login"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen
                name="PasswordLogin"
                component={PasswordLoginScreen}
              />
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Chat" component={ChatScreen} />
              <Stack.Screen name="ChatSetting" component={ChatSettingScreen} />
              <Stack.Screen
                name="Language"
                component={LanguageScreen}
                options={{
                  headerShown: true,
                  headerTitleAlign: 'center',
                }}
              />
              <Stack.Screen name="Relation" component={Relation} />
            </Stack.Navigator>
          </SafeAreaView>
          {/* Toast容器 - 需要放在SafeAreaView外面以确保全屏显示 */}
          <ToastContainer />
        </NavigationContainer>
      </UIKitProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default App;
