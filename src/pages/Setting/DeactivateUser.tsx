import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  ScrollView,
} from 'react-native';
import { themeColors } from '../../themes/colors';

interface DeactivateUserProps {
  navigation: any;
}

export const DeactivateUser: React.FC<DeactivateUserProps> = ({
  navigation,
}) => {
  const tipsList = [
    {
      title: '永久注销，无法登录',
      items: [
        '账号一旦注销，会解绑Apple ID、微信、电话号码，无法在登录被注销的账号',
      ],
    },
    {
      title: '产品数据将无法找回',
      items: [
        '账号一旦注销，所有与该账号相关的产品数据将被永久删除，无法找回（聊天记录、好友列表）',
      ],
    },
    {
      title: '注销后所有设备会被登出',
      items: ['账号一旦注销，所有与该账号关联的设备将被强制登出。'],
    },
  ];

  const handleBack = () => {
    navigation.goBack();
  };

  const cancelUser = () => {
    Alert.alert('确认注销', '您确定要注销账号吗？注销后将无法恢复所有数据。', [
      { text: '取消', style: 'cancel' },
      {
        text: '确认注销',
        style: 'destructive',
        onPress: () => {
          // 这里调用注销API
          console.log('执行账号注销');
          Alert.alert('注销成功', '账号已注销', [
            {
              text: '确定',
              onPress: () => {
                // 跳转到登录页面
                navigation.navigate('Login');
              },
            },
          ]);
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>← 返回</Text>
        </TouchableOpacity>
        <Text style={styles.title}>账号注销</Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.warningContainer}>
          <Text style={styles.warningTitle}>账号注销的注意事项</Text>

          <Text style={styles.warningText}>
            在你注销账号前，请先仔细阅读以下信息，以保证你清楚账号注销带来的后果
          </Text>

          {tipsList.map((tip, index) => (
            <View key={index} style={styles.tipContainer}>
              <Text style={styles.tipTitle}>{tip.title}</Text>
              {tip.items.map((item, idx) => (
                <Text key={idx} style={styles.tipItem}>
                  {item}
                </Text>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.backButtonStyle} onPress={handleBack}>
          <Text style={styles.backButtonTextStyle}>返回</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={cancelUser}>
          <Text style={styles.cancelButtonText}>
            已清楚并同意上述内容，确认注销账号
          </Text>
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
    paddingHorizontal: 16,
  },
  warningContainer: {
    paddingTop: 24,
    paddingBottom: 20,
  },
  warningTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 24,
  },
  warningText: {
    fontSize: 14,
    color: '#000000',
    lineHeight: 20,
    marginBottom: 24,
  },
  tipContainer: {
    marginBottom: 16,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
    lineHeight: 20,
  },
  tipItem: {
    fontSize: 12,
    color: '#666666',
    lineHeight: 16,
    marginBottom: 4,
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  backButtonStyle: {
    backgroundColor: themeColors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  backButtonTextStyle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  cancelButton: {
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: themeColors.error,
    textAlign: 'center',
  },
});

export default DeactivateUser;
