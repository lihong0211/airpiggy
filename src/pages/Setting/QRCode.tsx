import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  Image,
  Clipboard,
} from 'react-native';
import { Avatar } from '@tencentcloud/chat-uikit-react-native';
import { themeColors } from '../../themes/colors';
import BackHeader from '../../components/BackHeader';
import { useUserStore } from '../../hooks/useUserStore';
import { showToastMessage } from '../../components/Toast';

const copyIcon = require('../../static/copy.png');

interface QRCodeProps {
  navigation: any;
}


export const QRCode: React.FC<QRCodeProps> = ({ navigation }) => {
  const { user, fetchUserInfo, isLoading } = useUserStore();

  useEffect(() => {
    // 组件加载时获取最新用户信息
    fetchUserInfo();
  }, []);

  const handleCopy = async (key: string) => {
    console.log('点击复制:', key); // 添加调试日志
    let data = '';
    if (key === 'userId') {
      data = user?.userId || '';
    } else if (key === 'nickname') {
      data = user?.nickname || '';
    }

    console.log('要复制的数据:', data); // 添加调试日志
    
    try {
      Clipboard.setString(data);
      showToastMessage({ msg: '复制成功' });
      console.log('复制成功'); // 添加调试日志
    } catch (error) {
      console.log('复制失败:', error); // 添加调试日志
      showToastMessage({ msg: '复制失败' });
    }
  };

  const shareQRCode = () => {
    Alert.alert('分享二维码', '选择分享方式', [
      { text: '取消', style: 'cancel' },
      { text: '保存到相册', onPress: () => console.log('保存到相册') },
      { text: '分享给好友', onPress: () => console.log('分享给好友') },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader statusBarBackgroundColor="#fff" backgroundColor="#fff"/>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.container}>
          {/* User Info */}
          <View style={styles.userInfo}>
            <Avatar size={50} radius={5} uri={user?.avatarUrl || ''} />
            <View style={styles.userDetails}>
              <TouchableOpacity
                style={styles.nicknameContainer}
                onPress={() => handleCopy('nickname')}
              >
                <Text style={styles.nickname}>{user?.nickname || '用户'}</Text>
                <Image source={copyIcon} style={styles.copyIcon} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.userIdContainer}
                onPress={() => handleCopy('userId')}
              >
                <Text style={styles.userId}>ID: {user?.userId || ''}</Text>
                <Image source={copyIcon} style={styles.copyIcon} />
              </TouchableOpacity>
            </View>
          </View>

          {/* QR Code */}
          <View style={styles.qrCodeContainer}>
            <View style={styles.qrCode}>
              {user?.qrCodeUrl ? (
                <Image
                  source={{ uri: user.qrCodeUrl }}
                  style={styles.qrCodeImage}
                  resizeMode="contain"
                />
              ) : (
                <View style={styles.qrCodePlaceholder}>
                  <Text style={styles.qrCodePlaceholderText}>二维码</Text>
                </View>
              )}
            </View>
            <Text style={styles.tips}>扫一扫上面的二维码图案，加我为好友</Text>
          </View>

          {/* Share Button */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.shareButton} onPress={shareQRCode}>
              <Text style={styles.shareButtonText}>分享给好友</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: themeColors.primary,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  userDetails: {
    marginLeft: 10,
  },
  nicknameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  nickname: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  userIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userId: {
    fontSize: 14,
    color: '#999999',
  },
  copyIcon: {
    width: 20,
    height: 20,
    marginLeft: 5,
    tintColor: '#999999', // 设置图标颜色
    transform: 'translate(-1px,1px)',
  },
  qrCodeContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  qrCode: {
    width: 260,
    height: 260,
    borderWidth: 1, // 稍微增加边框宽度
    borderColor: '#BBBBBB', // 使用更深的边框颜色
    borderRadius: 8, // 稍微增加圆角半径
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden', // 确保内容不会超出边框
    // 添加阴影效果，使边框更清晰
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08, // 降低阴影透明度，使颜色更浅
    shadowRadius: 6, // 增加阴影半径，使范围更宽
    elevation: 2, // 稍微降低Android阴影强度
  },
  qrCodeImage: {
    width: '100%',
    height: '100%',
  },
  qrCodePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  qrCodePlaceholderText: {
    fontSize: 16,
    color: '#999999',
  },
  tips: {
    fontSize: 12,
    color: '#999999',
    marginTop: 30,
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
  },
  shareButton: {
    width: 150,
    height: 40,
    borderWidth: 1,
    borderColor: themeColors.primary,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  shareButtonText: {
    fontSize: 16,
    color: themeColors.primary,
    fontWeight: '500',
  },
});

export default QRCode;
