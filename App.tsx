import React, { useEffect } from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { TUITranslateService } from '@tencentcloud/chat-uikit-engine';

import { UIKitProvider } from '@tencentcloud/chat-uikit-react-native';

import { Login as LoginScreen } from './src/pages/Login/index.tsx';
import { PasswordLogin as PasswordLoginScreen } from './src/pages/Login/PasswordLogin';
import { Language as LanguageScreen } from './src/pages/Language';
import { Home as HomeScreen } from './src/pages/Home';
import { About as AboutScreen } from './src/pages/About';
import { ChatScreen, ChatSettingScreen } from './src/pages/UIKitScreen';

// Setting related pages
import { Setting as SettingScreen } from './src/pages/Setting';
import About from './src/pages/Setting/About';
import AvatarPage from './src/pages/Setting/Avatar';
import Nickname from './src/pages/Setting/Nickname';
import QRCode from './src/pages/Setting/QRCode';
import PermissionManage from './src/pages/Setting/PermissionManage';
import DeactivateUser from './src/pages/Setting/DeactivateUser';
import Profile from './src/pages/Setting/Profile';
import Report from './src/pages/Setting/Report';
import GuideInfo from './src/pages/Setting/GuideInfo';
import Translate from './src/pages/Setting/Translate';
import Relation from './src/pages/Relation';

import appResources from './i18n';
import uikitResources from '@tencentcloud/chat-uikit-react-native/i18n';

import { LoginUsingStorageInfo } from './initApp/index';
import { StyleSheet } from 'react-native';

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();
  const navigationRef = useNavigationContainerRef();
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
    });
  }, [navigationRef]);

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
              <Stack.Screen
                name="About"
                component={AboutScreen}
                options={{
                  headerShown: true,
                  headerTitleAlign: 'center',
                }}
              />
              {/* Setting related screens */}
              <Stack.Screen name="Setting" component={SettingScreen} />
              <Stack.Screen name="SettingAbout" component={About} />
              <Stack.Screen name="Avatar" component={AvatarPage} />
              <Stack.Screen name="Nickname" component={Nickname} />
              <Stack.Screen name="QRCode" component={QRCode} />
              <Stack.Screen
                name="PermissionManage"
                component={PermissionManage}
              />
              <Stack.Screen name="DeactivateUser" component={DeactivateUser} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="Report" component={Report} />
              <Stack.Screen name="GuideInfo" component={GuideInfo} />
              <Stack.Screen name="Translate" component={Translate} />
              <Stack.Screen name="Relation" component={Relation} />
            </Stack.Navigator>
          </SafeAreaView>
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
