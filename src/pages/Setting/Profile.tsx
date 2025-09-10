import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { Avatar } from '@tencentcloud/chat-uikit-react-native';
import { themeColors } from '../../themes/colors';

interface ProfileProps {
  navigation: any;
}

export const Profile: React.FC<ProfileProps> = ({ navigation }) => {
  const [userProfile] = useState({
    phone: '13812345678',
    nickname: 'cdut007',
    userId: '1962350063745744898',
    avatarUrl: '',
  });

  // 隐藏手机号中间四位
  const maskedPhone = userProfile.phone.replace(
    /(\d{3})\d{4}(\d{4})/,
    '$1****$2',
  );

  const handleCopy = async () => {
    try {
      // 这里使用React Native的Clipboard
      console.log('复制用户ID:', userProfile.userId);
      Alert.alert('提示', '用户ID已复制到剪贴板');
    } catch (error) {
      Alert.alert('错误', '复制失败');
    }
  };

  const handleToNickname = () => {
    navigation.navigate('Nickname');
  };

  const handleToAvatar = () => {
    navigation.navigate('Avatar');
  };

  const handleToQRCode = () => {
    navigation.navigate('QRCode');
  };

  const handleToDeactivateUser = () => {
    navigation.navigate('DeactivateUser');
  };

  const profileItems = [
    {
      title: '账号',
      value: maskedPhone,
      onPress: () => Alert.alert('账号信息', `当前账号：${maskedPhone}`),
    },
    {
      title: '昵称',
      value: userProfile.nickname,
      onPress: handleToNickname,
    },
    {
      title: '头像',
      value: '',
      onPress: handleToAvatar,
      showAvatar: true,
    },
    {
      title: '用户ID',
      value: userProfile.userId,
      onPress: handleCopy,
    },
    {
      title: '二维码名片',
      value: '',
      onPress: handleToQRCode,
    },
    {
      title: '账号注销',
      value: '',
      onPress: handleToDeactivateUser,
    },
  ];

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
        <Text style={styles.title}>个人资料</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {profileItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.profileItem}
            onPress={item.onPress}
          >
            <Text style={styles.profileTitle}>{item.title}</Text>
            <View style={styles.profileRight}>
              {item.showAvatar ? (
                <Avatar size={30} radius={15} uri={userProfile.avatarUrl} />
              ) : (
                <Text style={styles.profileValue}>{item.value}</Text>
              )}
              <Text style={styles.arrow}>›</Text>
            </View>
          </TouchableOpacity>
        ))}
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
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  profileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F0F0F0',
  },
  profileTitle: {
    fontSize: 16,
    color: '#333333',
  },
  profileRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileValue: {
    fontSize: 16,
    color: '#666666',
    marginRight: 8,
  },
  arrow: {
    fontSize: 18,
    color: '#CCCCCC',
  },
});

export default Profile;
