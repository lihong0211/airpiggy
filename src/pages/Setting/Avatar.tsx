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
} from 'react-native';
import {
  launchImageLibrary,
  launchCamera,
  ImagePickerResponse,
  MediaType,
} from 'react-native-image-picker';
import { Avatar } from '@tencentcloud/chat-uikit-react-native';
import { themeColors } from '../../themes/colors';
import { useUserStore } from '../../hooks/useUserStore';

interface AvatarProps {
  navigation: any;
}

export const AvatarPage: React.FC<AvatarProps> = ({ navigation }) => {
  const { user } = useUserStore();
  const [avatarUrl, setAvatarUrl] = useState<string>(user?.avatarUrl || '');

  // 当用户信息更新时，同步头像URL
  React.useEffect(() => {
    if (user?.avatarUrl) {
      console.log('📷 用户头像URL:', user.avatarUrl);
      setAvatarUrl(user.avatarUrl);
    }
  }, [user?.avatarUrl]);

  const handleUpdateAvatar = () => {
    Alert.alert('选择头像', '请选择获取头像的方式', [
      { text: '取消', style: 'cancel' },
      { text: '拍照', onPress: () => openCamera() },
      { text: '从相册选择', onPress: () => openImageLibrary() },
    ]);
  };

  const openCamera = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, (response: ImagePickerResponse) => {
      if (response.didCancel || response.errorMessage) {
        return;
      }
      if (response.assets && response.assets[0]) {
        const imageUri = response.assets[0].uri;
        if (imageUri) {
          setAvatarUrl(imageUri);
          // 这里可以调用API上传图片并更新用户头像
          console.log('选择的图片:', imageUri);
        }
      }
    });
  };

  const openImageLibrary = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel || response.errorMessage) {
        return;
      }
      if (response.assets && response.assets[0]) {
        const imageUri = response.assets[0].uri;
        if (imageUri) {
          setAvatarUrl(imageUri);
          // 这里可以调用API上传图片并更新用户头像
          console.log('选择的图片:', imageUri);
        }
      }
    });
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
        <Text style={styles.title}>头像</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          <Avatar size={300} radius={150} uri={avatarUrl} />
        </View>

        <TouchableOpacity
          style={styles.updateButton}
          onPress={handleUpdateAvatar}
        >
          <Text style={styles.updateButtonText}>更换头像</Text>
        </TouchableOpacity>
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
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 50,
  },
  updateButton: {
    width: 150,
    height: 40,
    borderWidth: 1,
    borderColor: themeColors.primary,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  updateButtonText: {
    fontSize: 16,
    color: themeColors.primary,
    fontWeight: '500',
  },
});

export default AvatarPage;
