import React, { useState } from 'react';
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

interface QRCodeProps {
  navigation: any;
}

export const QRCode: React.FC<QRCodeProps> = ({ navigation }) => {
  const [userProfile] = useState({
    nickname: 'cdut007',
    userId: '1962350063745744898',
    avatarUrl: '',
    qrCodeUrl: '', // 这里应该是实际的二维码图片URL
  });

  const handleCopy = async (key: string) => {
    let data = '';
    if (key === 'userId') {
      data = userProfile.userId;
    } else if (key === 'nickname') {
      data = userProfile.nickname;
    }

    try {
      Clipboard.setString(data);
      Alert.alert('提示', '复制成功');
    } catch (error) {
      Alert.alert('错误', '复制失败');
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
      <StatusBar backgroundColor="transparent" translucent />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← 返回</Text>
        </TouchableOpacity>
        <Text style={styles.title}>二维码名片</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.container}>
          {/* User Info */}
          <View style={styles.userInfo}>
            <Avatar size={50} radius={25} uri={userProfile.avatarUrl} />
            <View style={styles.userDetails}>
              <TouchableOpacity
                style={styles.nicknameContainer}
                onPress={() => handleCopy('nickname')}
              >
                <Text style={styles.nickname}>{userProfile.nickname}</Text>
                <Text style={styles.copyIcon}>📋</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.userIdContainer}
                onPress={() => handleCopy('userId')}
              >
                <Text style={styles.userId}>ID: {userProfile.userId}</Text>
                <Text style={styles.copyIcon}>📋</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* QR Code */}
          <View style={styles.qrCodeContainer}>
            <View style={styles.qrCode}>
              {userProfile.qrCodeUrl ? (
                <Image
                  source={{ uri: userProfile.qrCodeUrl }}
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
    fontSize: 12,
    marginLeft: 5,
  },
  qrCodeContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  qrCode: {
    width: 260,
    height: 260,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
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
