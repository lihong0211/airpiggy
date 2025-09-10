import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Clipboard,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import { StoreName, TUIStore } from '@tencentcloud/chat-uikit-engine';

import type { IRouterParams } from '../../../interface';
import { LogoutChat } from '../../../initApp';

import { Avatar } from '@tencentcloud/chat-uikit-react-native';
import { themeColors } from '../../themes/colors';

const rightArrow = require('../../../assets/right_arrow.png');
const qrCodeIcon = require('../../static/qrcode.png');

interface IConfig {
  name: string;
  value?: string;
  key?: string;
  route?: string;
}

export const Setting = ({ navigation }: IRouterParams) => {
  const [profile, setProfile] = useState<Record<string, any>>({});
  const [configList, setConfigList] = useState<IConfig[]>([]);
  const [isPageShow, setIsPageShow] = useState<boolean>(true);

  const isFocused = useIsFocused();

  const onPress = () => {
    LogoutChat(() => {
      navigation.navigate('Login');
    });
  };

  const onUserProfile = (userProfile: Record<string, any>) => {
    setProfile(userProfile);
  };

  const onPressSetting = (item: IConfig) => {
    switch (item.name) {
      case '账号':
        // 显示账号信息
        Alert.alert('账号信息', '当前账号：138****1234');
        break;
      case '昵称':
        // 跳转到昵称编辑页面
        navigation.navigate('Nickname');
        break;
      case '头像':
        // 跳转到头像编辑页面
        navigation.navigate('Avatar');
        break;
      case '用户ID':
        // 复制用户ID
        copyUserId();
        break;
      case '二维码名片':
        // 跳转到二维码页面
        navigation.navigate('QRCode');
        break;
      case '模式':
        // 跳转到语言设置页面
        navigation.navigate('Language');
        break;
      case '加我为好友时':
        // 跳转到好友验证设置页面
        console.log('跳转到好友验证设置');
        break;
      case '翻译设置':
        // 跳转到翻译设置页面
        navigation.navigate('Translate');
        break;
      case '权限设置':
        // 跳转到权限管理页面
        navigation.navigate('PermissionManage');
        break;
      case '分享给朋友':
        // 分享功能
        console.log('分享给朋友');
        break;
      case '关于空气小猪':
        // 跳转到关于页面
        navigation.navigate('SettingAbout');
        break;
      case '账号注销':
        // 跳转到账号注销页面
        navigation.navigate('DeactivateUser');
        break;
      default:
        break;
    }
  };

  const onPressProfile = () => {
    // 跳转到个人资料页面
    navigation.navigate('Profile');
  };

  const onPressQRCode = () => {
    // 跳转到二维码页面
    navigation.navigate('QRCode');
  };

  const copyUserId = async () => {
    try {
      // 复制用户ID到剪贴板
      const userId = profile.userID || '1962350063745744898';
      Clipboard.setString(userId);
      Alert.alert('提示', '用户ID已复制到剪贴板');
    } catch (error) {
      console.error('复制失败:', error);
      Alert.alert('错误', '复制失败');
    }
  };

  useEffect(() => {
    TUIStore.watch(StoreName.USER, {
      userProfile: onUserProfile,
    });
    return () => {
      TUIStore.unwatch(StoreName.USER, {
        userProfile: onUserProfile,
      });
    };
  }, []);

  useEffect(() => {
    setConfigList([
      {
        name: '账号',
        value: '138****1234', // 隐藏手机号中间四位
      },
      {
        name: '昵称',
        value: profile.nick || 'cdut007',
      },
      {
        name: '头像',
      },
      {
        name: '用户ID',
        value: profile.userID || '1962350063745744898',
      },
      {
        name: '二维码名片',
      },
      {
        name: '模式',
        value: '外语模式',
      },
      {
        name: '加我为好友时',
        value: '同意任何用户加好友',
      },
      {
        name: '翻译设置',
      },
      {
        name: '权限设置',
      },
      {
        name: '分享给朋友',
      },
      {
        name: '关于空气小猪',
        value: 'V1.2.0',
      },
      {
        name: '账号注销',
      },
    ]);
    setIsPageShow(isFocused);
  }, [isFocused, profile]);

  return (
    isPageShow && (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="transparent" translucent />
        <Text style={styles.title}>我的</Text>
        <TouchableOpacity
          style={styles.profileContainer}
          onPress={onPressProfile}
        >
          <Avatar size={66} radius={33} uri={profile.avatar} />
          <View style={styles.profile}>
            <Text style={styles.nick} ellipsizeMode="tail" numberOfLines={1}>
              {profile.nick || 'cdut007'}
            </Text>
            <TouchableOpacity onPress={copyUserId}>
              <Text style={styles.text} numberOfLines={1}>
                {`用户ID:${profile.userID || '1962350063745744898'}`}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.profileActions}>
            <TouchableOpacity
              style={styles.qrCodeButton}
              onPress={onPressQRCode}
            >
              <Image source={qrCodeIcon} style={styles.qrCodeIcon} />
            </TouchableOpacity>
            <Image source={rightArrow} style={styles.arrowIcon} />
          </View>
        </TouchableOpacity>
        <View style={styles.settingContainer}>
          {configList.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.settingItem}
              activeOpacity={1}
              onPress={() => {
                onPressSetting(item);
              }}
            >
              <Text style={styles.label} ellipsizeMode="tail" numberOfLines={1}>
                {item.name}
              </Text>
              <View style={styles.content}>
                {item.name === '头像' ? (
                  <Avatar size={30} radius={15} uri={profile.avatar} />
                ) : (
                  <Text
                    style={styles.value}
                    ellipsizeMode="tail"
                    numberOfLines={1}
                  >
                    {item.value}
                  </Text>
                )}
                <Image style={styles.icon} source={rightArrow} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.footerContainer}>
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>退出登录</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: '#FFFFFF',
  },
  title: {
    paddingTop: 2,
    paddingBottom: 15,
    paddingHorizontal: 16,
    fontSize: 34,
    lineHeight: 42,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
  },
  profileContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  profile: {
    flex: 1,
    marginLeft: 12,
  },
  nick: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 4,
  },
  text: {
    color: '#999999',
    fontSize: 14,
    lineHeight: 18,
  },
  profileActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  qrCodeButton: {
    padding: 4,
  },
  qrCodeIcon: {
    width: 20,
    height: 20,
  },
  arrowIcon: {
    width: 15,
    height: 15,
  },
  settingContainer: {
    flexShrink: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  settingItem: {
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F0F0F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    color: '#333333',
    fontSize: 16,
    lineHeight: 22,
    flex: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
  },
  value: {
    color: '#666666',
    fontSize: 16,
    lineHeight: 22,
    marginRight: 8,
  },
  icon: {
    width: 15,
    height: 15,
  },
  footerContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#FFF4E5',
  },
  buttonText: {
    color: themeColors.primary,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
  },
});
