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
import type { IRouterParams } from '../../../interface';
import { LogoutChat } from '../../../initApp';
import { useUserStore } from '../../hooks/useUserStore';
import { Avatar } from '@tencentcloud/chat-uikit-react-native';
import { themeColors } from '../../themes/colors';
import { ModeModal } from './ModeModal';
import { FriendModal } from './FriendModal';

const rightArrow = require('../../../assets/right_arrow.png');
const qrCodeIcon = require('../../static/qrcode.png');

interface IConfig {
  name: string;
  value?: string;
  key?: string;
  route?: string;
}

export const Setting = ({ navigation }: IRouterParams) => {
  const { user, updateUserInfo, fetchUserInfo } = useUserStore();
  const [configList, setConfigList] = useState<IConfig[]>([]);
  const [isPageShow, setIsPageShow] = useState<boolean>(true);
  const [modeModalVisible, setModeModalVisible] = useState<boolean>(false);
  const [currentMode, setCurrentMode] = useState<string>('foreign'); // 'foreign' 或 'normal'
  const [friendModalVisible, setFriendModalVisible] = useState<boolean>(false);
  const [friendSetting, setFriendSetting] = useState<string>('accept_all'); // 'accept_all', 'need_verify', 'reject_all'

  const isFocused = useIsFocused();

  const onPress = () => {
    LogoutChat(() => {
      navigation.navigate('Login');
    });
  };

  // 从服务器获取用户资料
  const loadUserInfo = async () => {
    try {
      await fetchUserInfo();
    } catch (error) {
      console.log('Error loading user info:', error);
    }
  };

  const onPressSetting = (item: IConfig) => {
    switch (item.name) {
      case '模式':
        // 显示模式选择弹窗
        setModeModalVisible(true);
        break;
      case '加我为好友时':
        // 显示好友验证设置弹窗
        setFriendModalVisible(true);
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
      default:
        break;
    }
  };

  const onPressProfile = () => {
    navigation.navigate('UserProfile');
  };

  const onPressQRCode = () => {
    // 跳转到二维码页面
    navigation.navigate('QRCode');
  };

  const copyUserId = async () => {
    try {
      // 复制用户ID到剪贴板
      const userId = user?.userId || '1962350063745744898';
      Clipboard.setString(userId);
      Alert.alert('提示', '用户ID已复制到剪贴板');
    } catch (error) {
      console.error('复制失败:', error);
      Alert.alert('错误', '复制失败');
    }
  };

  const handleModeChange = (mode: string) => {
    setCurrentMode(mode);
  };

  const getModeDisplayText = () => {
    return currentMode === 'foreign' ? '外语模式' : '普通模式';
  };

  const handleFriendSettingChange = (setting: string) => {
    setFriendSetting(setting);
  };

  const getFriendSettingDisplayText = (setting?: string) => {
    const currentSetting = setting || friendSetting;
    switch (currentSetting) {
      case 'accept_all':
        return '同意任何用户加好友';
      case 'need_verify':
        return '需要验证';
      case 'reject_all':
        return '拒绝任何人加好友';
      default:
        return '同意任何用户加好友';
    }
  };

  useEffect(() => {
    // 从服务器获取用户资料
    loadUserInfo();
  }, []);

  useEffect(() => {
    setConfigList([
      {
        name: '模式',
        value: getModeDisplayText(),
      },
      {
        name: '加我为好友时',
        value: getFriendSettingDisplayText(),
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
    ]);
    setIsPageShow(isFocused);
  }, [isFocused, user, currentMode, friendSetting]);

  return (
    isPageShow && (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
        <TouchableOpacity
          style={styles.profileContainer}
          onPress={onPressProfile}
        >
          <Avatar 
            size={66} 
            radius={4} 
            uri={user?.avatarUrl && user.avatarUrl.trim() !== '' ? user.avatarUrl : undefined} 
          />
          <View style={styles.profile}>
            <Text style={styles.nick} ellipsizeMode="tail" numberOfLines={1}>
              {user?.nickname && user.nickname.trim() !== '' ? user.nickname : '用户'}
            </Text>
            <TouchableOpacity onPress={copyUserId}>
              <Text style={styles.text} numberOfLines={1}>
                {`用户ID:${user?.userId || '1962350063745744898'}`}
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
                  <Avatar size={30} radius={15} uri={user?.avatarUrl} />
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
        
        {/* 模式选择弹窗 */}
        <ModeModal
          visible={modeModalVisible}
          onClose={() => setModeModalVisible(false)}
          currentMode={currentMode}
          onModeChange={handleModeChange}
        />
        
        {/* 好友验证设置弹窗 */}
        <FriendModal
          visible={friendModalVisible}
          onClose={() => setFriendModalVisible(false)}
          currentSetting={friendSetting}
          onSettingChange={handleFriendSettingChange}
        />
      </SafeAreaView>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.background.secondary,
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
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 10
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
    paddingBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  settingItem: {
    paddingVertical: 16,
    paddingHorizontal: 16,
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
    paddingBottom: 100,
    backgroundColor: '#FFFFFF',
    flex: 1,
    justifyContent: 'flex-start',
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: themeColors.background.disabled,
  },
  buttonText: {
    color: themeColors.primary,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
  },
});
