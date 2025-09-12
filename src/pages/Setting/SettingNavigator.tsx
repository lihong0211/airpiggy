import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Setting } from './index';
import Translate from './Translate';
import PermissionManage from './PermissionManage';
import About from './About';
import AvatarPage from './Avatar';
import Nickname from './Nickname';
import QRCode from './QRCode';
import Profile from './Profile';
import Report from './Report';
import GuideInfo from './GuideInfo';
import DeactivateUser from './DeactivateUser';
import UserAgreement from './UserAgreement';
import PrivacyPolicy from './PrivacyPolicy';
import { themeColors } from '../../themes/colors';

const Stack = createNativeStackNavigator();

// 包装组件，用于控制 tab bar 显示
const SettingStackNavigator = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
      screenListeners={{
        focus: (e) => {
          const routeName = e.target?.split('-')[0]; // 获取路由名称
          console.log('Setting focus on route:', routeName);
          
          // 只有 SettingMain 页面显示 tab，其他所有页面都隐藏
          if (routeName !== 'SettingMain') {
            // 隐藏 tab bar
            const parent = navigation.getParent();
            if (parent && typeof parent.setOptions === 'function') {
              parent.setOptions({
                tabBarStyle: { display: 'none' }
              });
              console.log('Hidden tab bar for route:', routeName);
            }
          }
        },
        blur: (e) => {
          const routeName = e.target?.split('-')[0];
          console.log('Setting blur on route:', routeName);
          
          // 当离开非主页面时，恢复 tab bar（但只有当回到主页面时才真正显示）
          if (routeName !== 'SettingMain') {
            const parent = navigation.getParent();
            if (parent && typeof parent.setOptions === 'function') {
              parent.setOptions({
                tabBarStyle: {
                  paddingTop: 8,
                  paddingBottom: 8,
                  height: 60,
                  backgroundColor: themeColors.background.disabled,
                  borderTopWidth: 0,
                }
              });
              console.log('Restored tab bar after leaving route:', routeName);
            }
          }
        }
      }}
    >
      <Stack.Screen name="SettingMain" component={Setting} />
      <Stack.Screen name="Translate" component={Translate} />
      <Stack.Screen name="PermissionManage" component={PermissionManage} />
      <Stack.Screen name="SettingAbout" component={About} />
      <Stack.Screen name="Avatar" component={AvatarPage} />
      <Stack.Screen name="Nickname" component={Nickname} />
      <Stack.Screen name="QRCode" component={QRCode} />
      <Stack.Screen name="UserProfile" component={Profile} />
      <Stack.Screen name="Report" component={Report as any} />
      <Stack.Screen name="GuideInfo" component={GuideInfo} />
      <Stack.Screen name="DeactivateUser" component={DeactivateUser} />
      <Stack.Screen name="UserAgreement" component={UserAgreement} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    </Stack.Navigator>
  );
};

export const SettingNavigator = () => {
  return <SettingStackNavigator />;
};

export default SettingNavigator;
