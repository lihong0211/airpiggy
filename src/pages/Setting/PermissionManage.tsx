import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
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
  openSettings,
} from 'react-native-permissions';
import { themeColors } from '../../themes/colors';
import { BackHeader } from '../../components/BackHeader';

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
  // 定义权限配置（不放在state中，避免依赖问题）
  const permissionConfigs: PermissionItem[] = [
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
          : Platform.OS === 'android' && Platform.Version >= 33
          ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
          : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      status: '未检查',
    },
    { title: '通知', permission: null, status: '未检查' },
  ];

  const [permissions, setPermissions] = useState<PermissionItem[]>(permissionConfigs);

  const checkAllPermissions = useCallback(async () => {
    try {
      const updatedPermissions = await Promise.all(
        permissionConfigs.map(async item => {
          if (item.permission) {
            try {
              const result = await check(item.permission);
              return {
                ...item,
                status: getStatusText(result),
              };
            } catch (error) {
              console.log(`检查${item.title}权限失败:`, error);
              return {
                ...item,
                status: '检查失败',
              };
            }
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
    } catch (error) {
      console.log('检查权限失败:', error);
    }
  }, []); // 移除permissions依赖，使用permissionConfigs

  useEffect(() => {
    checkAllPermissions();
  }, [checkAllPermissions]);

  // 添加页面焦点时刷新权限状态
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      checkAllPermissions();
    });

    return unsubscribe;
  }, [navigation, checkAllPermissions]);

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
      case RESULTS.LIMITED:
        return '受限授权';
      default:
        return '未检查';
    }
  };

  const handlePermissionPress = async (item: PermissionItem) => {
    if (item.permission) {
      try {
        const result = await check(item.permission);

        if (result === RESULTS.GRANTED) {
          Alert.alert('提示', `${item.title}权限已授权`);
          return;
        }

        if (result === RESULTS.DENIED) {
          try {
            const requestResult = await request(item.permission);
            const updatedPermissions = permissions.map(p =>
              p.title === item.title
                ? { ...p, status: getStatusText(requestResult) }
                : p,
            );
            setPermissions(updatedPermissions);
            
            // 根据结果给出反馈
            if (requestResult === RESULTS.GRANTED) {
              Alert.alert('成功', `${item.title}权限已授权`);
            } else if (requestResult === RESULTS.BLOCKED) {
              Alert.alert(
                '权限被永久拒绝',
                `${item.title}权限被永久拒绝，请在系统设置中手动开启`,
                [
                  { text: '取消', style: 'cancel' },
                  { text: '重新检查', onPress: () => recheckPermission(item) },
                  { text: '去设置', onPress: () => openAppSettings() },
                ],
              );
            } else if (requestResult === RESULTS.DENIED) {
              Alert.alert('提示', `${item.title}权限被拒绝，您可以稍后重新尝试`);
            }
            return;
          } catch (requestError) {
            console.log(`请求${item.title}权限失败:`, requestError);
            Alert.alert('错误', `请求${item.title}权限失败，请稍后重试`);
            return;
          }
        }

        if (result === RESULTS.BLOCKED) {
          const isHuawei = Platform.OS === 'android' && 
            ((Platform.constants as any)?.Brand?.toLowerCase().includes('huawei') || 
             (Platform.constants as any)?.Manufacturer?.toLowerCase().includes('huawei'));
          
          const steps = isHuawei 
            ? `华为手机操作步骤：\n1. 点击"去设置"按钮\n2. 找到"权限管理"\n3. 点击"${item.title}"\n4. 选择"允许"\n5. 返回应用后点击"重新检查"`
            : `操作步骤：\n1. 点击"去设置"按钮\n2. 找到"权限管理"或"应用权限"\n3. 开启${item.title}权限\n4. 返回应用后点击"重新检查"`;
          
          Alert.alert(
            '权限被永久拒绝',
            `${item.title}权限已被永久拒绝，需要在系统设置中手动开启。\n\n${steps}`,
            [
              { text: '取消', style: 'cancel' },
              { text: '重新检查', onPress: () => recheckPermission(item) },
              { text: '去设置', onPress: () => openAppSettings() },
            ],
          );
          return;
        }

        if (result === RESULTS.UNAVAILABLE) {
          Alert.alert('提示', `${item.title}权限在当前设备上不可用`);
          return;
        }

        if (result === RESULTS.LIMITED) {
          Alert.alert('提示', `${item.title}权限已受限授权`);
          return;
        }

      } catch (error) {
        console.log(`处理${item.title}权限失败:`, error);
        Alert.alert('错误', `处理${item.title}权限时出错，请稍后重试`);
      }
    } else {
      // 通知权限处理
      Alert.alert('通知权限', '请在系统设置中管理通知权限', [
        { text: '取消', style: 'cancel' },
        { text: '去设置', onPress: () => openAppSettings() },
      ]);
    }
  };

  // 重新检查单个权限
  const recheckPermission = async (item: PermissionItem) => {
    if (item.permission) {
      try {
        const result = await check(item.permission);
        const updatedPermissions = permissions.map(p =>
          p.title === item.title
            ? { ...p, status: getStatusText(result) }
            : p,
        );
        setPermissions(updatedPermissions);

        if (result === RESULTS.GRANTED) {
          Alert.alert('成功', `${item.title}权限已成功开启！`);
        } else if (result === RESULTS.BLOCKED) {
          Alert.alert('提示', `${item.title}权限仍然被拒绝，请确认在系统设置中已开启权限`);
        } else {
          Alert.alert('提示', `${item.title}权限状态：${getStatusText(result)}`);
        }
      } catch (error) {
        console.log(`重新检查${item.title}权限失败:`, error);
        Alert.alert('错误', `重新检查${item.title}权限失败`);
      }
    }
  };

  const openAppSettings = async () => {
    try {
      // 使用 react-native-permissions 的 openSettings 方法
      // 这个方法会直接跳转到应用的权限设置页面
      await openSettings();
    } catch (error) {
      console.log('使用 openSettings 失败，尝试其他方式:', error);
      
      if (Platform.OS === 'ios') {
        try {
          await Linking.openURL('app-settings:');
        } catch (iosError) {
          console.log('iOS跳转设置失败:', iosError);
          Alert.alert('提示', '无法打开设置页面，请手动前往：设置 → Airpiggy → 权限');
        }
      } else {
        // Android 备用方案
        const isHuawei = (Platform.constants as any)?.Brand?.toLowerCase().includes('huawei') || 
                        (Platform.constants as any)?.Manufacturer?.toLowerCase().includes('huawei');
        
        if (isHuawei) {
          // 华为手机特殊处理
          try {
            // 尝试跳转到华为的权限管理页面
            const packageName = 'com.aa5p.airpiggyapp';
            await Linking.openURL(`huawei://com.huawei.permissionmanager/appPermissionInfoActivity?package=${packageName}`);
          } catch (huaweiError) {
            console.log('华为权限管理跳转失败:', huaweiError);
            try {
              await Linking.openSettings();
            } catch (settingsError) {
              console.log('跳转到通用设置失败:', settingsError);
              Alert.alert(
                '华为手机权限设置', 
                '请手动前往：设置 → 应用和服务 → 应用管理 → Airpiggy → 权限\n\n或者：\n设置 → 隐私和安全 → 权限管理 → 选择具体权限'
              );
            }
          }
        } else {
          // 其他Android手机
          try {
            await Linking.openSettings();
          } catch (androidError) {
            console.log('Android跳转设置失败:', androidError);
            Alert.alert('提示', '无法打开设置页面，请手动前往：设置 → 应用 → Airpiggy → 权限');
          }
        }
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader title="权限设置" />

      {/* Content */}
      <View style={styles.content}>
        {/* 刷新按钮 */}
        <TouchableOpacity 
          style={styles.refreshButton} 
          onPress={checkAllPermissions}
        >
          <Text style={styles.refreshButtonText}>刷新权限状态</Text>
        </TouchableOpacity>
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
                  item.status === '已授权' || item.status === '受限授权'
                    ? styles.permissionStatusGranted
                    : item.status === '已拒绝' || item.status === '检查失败'
                    ? styles.permissionStatusBlocked
                    : styles.permissionStatusDenied,
                ]}
              >
                {item.status}
              </Text>
              <Text style={styles.arrow}>›</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* 权限说明 */}
        <View style={styles.tipContainer}>
          <Text style={styles.tipText}>
            • 权限被拒绝后，需要在系统设置中手动开启{'\n'}
            • 点击对应权限项可以重新请求或跳转到设置{'\n'}
            • 华为手机：设置中找到"权限管理"，然后选择具体权限{'\n'}
            • 其他手机：设置中找到"应用权限"或"权限管理"{'\n'}
            • 某些权限对于应用功能是必需的
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.background.secondary,
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },
  refreshButton: {
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: themeColors.primary,
    borderRadius: 8,
    alignItems: 'center',
  },
  refreshButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  permissionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
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
    justifyContent: 'center',
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
  permissionStatusBlocked: {
    color: '#FF6B6B',
  },
  arrow: {
    fontSize: 22,
    color: '#888888',
    lineHeight: 24,
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
