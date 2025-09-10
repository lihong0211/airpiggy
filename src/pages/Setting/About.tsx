import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Linking,
  Alert,
} from 'react-native';
import { themeColors } from '../../themes/colors';

const logoImage = require('../../static/logo_active.png');

interface AboutProps {
  navigation: any;
}

export const About: React.FC<AboutProps> = ({ navigation }) => {
  const appVersion = '1.2.0'; // 这里可以从package.json或其他地方获取版本号

  const linkToProtocolUserService = () => {
    // 跳转到用户协议页面
    console.log('跳转到用户协议');
    Alert.alert('提示', '用户协议页面');
  };

  const linkToProtocolPrivacy = () => {
    // 跳转到隐私政策页面
    console.log('跳转到隐私政策');
    Alert.alert('提示', '隐私政策页面');
  };

  const handleEmailPress = () => {
    const email = 'report@airpiggy.cn';
    const subject = '投诉举报';
    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}`;

    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('错误', '无法打开邮件应用');
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
        <Text style={styles.title}>关于空气小猪</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Logo and App Info */}
        <View style={styles.profileHeader}>
          <Image source={logoImage} style={styles.profileLogo} />
          <Text style={styles.profileName}>空气小猪</Text>
          <Text style={styles.profileVersion}>版本: V {appVersion}</Text>
        </View>

        {/* Settings List */}
        <View style={styles.profileBody}>
          <TouchableOpacity
            style={styles.settingItem}
            onPress={linkToProtocolUserService}
          >
            <Text style={styles.settingLabel}>用户协议</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={linkToProtocolPrivacy}
          >
            <Text style={styles.settingLabel}>隐私政策</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.profileFooter}>
          <View style={styles.footerText}>
            <Text style={styles.footerLabel}>投诉举报 </Text>
            <TouchableOpacity onPress={handleEmailPress}>
              <Text style={styles.emailLink}>report@airpiggy.cn</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.copyright}>Copyright © 2025-现在</Text>
          <Text style={styles.copyright}>
            成都王小周人工智能科技有限公司 版权所有
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
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  profileLogo: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginTop: 6,
  },
  profileVersion: {
    fontSize: 12,
    color: '#999999',
    marginTop: 6,
  },
  profileBody: {
    flex: 1,
    marginTop: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F0F0F0',
  },
  settingLabel: {
    fontSize: 16,
    color: '#333333',
  },
  arrow: {
    fontSize: 18,
    color: '#CCCCCC',
  },
  profileFooter: {
    paddingBottom: 20,
    alignItems: 'center',
  },
  footerText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  footerLabel: {
    fontSize: 12,
    color: '#999999',
  },
  emailLink: {
    fontSize: 12,
    color: '#333333',
    textDecorationLine: 'underline',
  },
  copyright: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'center',
    marginTop: 4,
  },
});

export default About;
