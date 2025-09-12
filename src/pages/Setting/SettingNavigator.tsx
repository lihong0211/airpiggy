import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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

const Stack = createNativeStackNavigator();

export const SettingNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
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
      <Stack.Screen name="Report" component={Report} />
      <Stack.Screen name="GuideInfo" component={GuideInfo} />
      <Stack.Screen name="DeactivateUser" component={DeactivateUser} />
    </Stack.Navigator>
  );
};

export default SettingNavigator;
