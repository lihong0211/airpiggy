import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  Permission,
} from 'react-native-permissions';
import { themeColors } from '../../themes/colors';

interface PermissionManageProps {
  navigation: any;
}

interface PermissionItem {
  title: string;
  permission: Permission | null;
  status: string;
}

export const PermissionManage: React.FC<PermissionManageProps> = ({
  navigation,
}) => {
  const [permissions, setPermissions] = useState<PermissionItem[]>([
    {
      title: '麦克风',
      permission:
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.MICROPHONE
          : PERMISSIONS.ANDROID.RECORD_AUDIO,
      status: '未检查',
    },
    {
      title: '相机',
      permission:
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.CAMERA
          : PERMISSIONS.ANDROID.CAMERA,
      status: '未检查',
    },
    {
      title: '相册',
      permission:
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.PHOTO_LIBRARY
          : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      status: '未检查',
    },
    { title: '通知', permission: null, status: '未检查' },
  ]);

  const checkAllPermissions = useCallback(async () => {
    const updatedPermissions = await Promise.all(
      permissions.map(async item => {
        if (item.permission) {
          const result = await check(item.permission);
          return {
            ...item,
            status: getStatusText(result),
          };
        } else {
          // 通知权限需要特殊处理
          return {
            ...item,
            status: '已授权', // 简化处理
          };
        }
      }),
    );
    setPermissions(updatedPermissions);
  }, [permissions]);

  useEffect(() => {
    checkAllPermissions();
  }, [checkAllPermissions]);

  const getStatusText = (result: string) => {
    switch (result) {
      case RESULTS.GRANTED:
        return '已授权';
      case RESULTS.DENIED:
        return '未授权';
      case RESULTS.BLOCKED:
        return '已拒绝';
      case RESULTS.UNAVAILABLE:
        return '不可用';
      default:
        return '未检查';
    }
  };

  const handlePermissionPress = async (item: PermissionItem) => {
    if (item.permission) {
      const result = await check(item.permission);

      if (result === RESULTS.GRANTED) {
        Alert.alert('提示', `${item.title}权限已授权`);
        return;
      }

      if (result === RESULTS.DENIED) {
        const requestResult = await request(item.permission);
        const updatedPermissions = permissions.map(p =>
          p.title === item.title
            ? { ...p, status: getStatusText(requestResult) }
            : p,
        );
        setPermissions(updatedPermissions);
        return;
      }

      if (result === RESULTS.BLOCKED) {
        Alert.alert(
          '权限被拒绝',
          `${item.title}权限被拒绝，请在系统设置中手动开启`,
          [
            { text: '取消', style: 'cancel' },
            { text: '去设置', onPress: () => openAppSettings() },
          ],
        );
        return;
      }
    } else {
      // 通知权限处理
      Alert.alert('通知权限', '请在系统设置中管理通知权限');
    }
  };

  const openAppSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
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
        <Text style={styles.title}>权限设置</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {permissions.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.permissionItem}
            onPress={() => handlePermissionPress(item)}
          >
            <Text style={styles.permissionTitle}>{item.title}</Text>
            <View style={styles.permissionRight}>
              <Text
                style={[
                  styles.permissionStatus,
                  item.status === '已授权'
                    ? styles.permissionStatusGranted
                    : styles.permissionStatusDenied,
                ]}
              >
                {item.status}
              </Text>
              <Text style={styles.arrow}>›</Text>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.tipContainer}>
          <Text style={styles.tipText}>
            权限用于提供更好的服务体验，您可以在系统设置中随时修改权限设置
          </Text>
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
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  permissionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F0F0F0',
  },
  permissionTitle: {
    fontSize: 16,
    color: '#333333',
  },
  permissionRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  permissionStatus: {
    fontSize: 14,
    marginRight: 8,
  },
  permissionStatusGranted: {
    color: themeColors.primary,
  },
  permissionStatusDenied: {
    color: '#999999',
  },
  arrow: {
    fontSize: 18,
    color: '#CCCCCC',
  },
  tipContainer: {
    marginTop: 30,
    paddingHorizontal: 16,
  },
  tipText: {
    fontSize: 12,
    color: '#999999',
    lineHeight: 18,
    textAlign: 'center',
  },
});

export default PermissionManage;
