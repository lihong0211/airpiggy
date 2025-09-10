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
import { themeColors } from '../../themes/colors';

interface GuideInfoProps {
  navigation: any;
}

export const GuideInfo: React.FC<GuideInfoProps> = ({ navigation }) => {
  const [selectedGender, setSelectedGender] = useState<number>(1);

  const genderList = [
    {
      icon: '👨', // 使用emoji代替SVG
      label: '男声',
      value: 1,
    },
    {
      icon: '👩', // 使用emoji代替SVG
      label: '女声',
      value: 2,
    },
  ];

  const handlePickGender = (value: number) => {
    setSelectedGender(value);
  };

  const handleNext = async () => {
    try {
      // 这里调用API更新用户性别设置
      console.log('更新性别设置:', selectedGender);

      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 500));

      Alert.alert('设置成功', '语音性别设置已保存', [
        {
          text: '确定',
          onPress: () => navigation.navigate('Home'),
        },
      ]);
    } catch (error) {
      Alert.alert('设置失败', '请稍后再试');
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
        <Text style={styles.title}>语音设置</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.mainTitle}>选择语音声音性别</Text>
          <Text style={styles.subTitle}>
            基于你的选择，更精准的为你匹配声音
          </Text>
        </View>

        <View style={styles.genderList}>
          {genderList.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.genderItem,
                selectedGender === item.value && styles.genderItemSelected,
              ]}
              onPress={() => handlePickGender(item.value)}
            >
              <Text style={styles.genderIcon}>{item.icon}</Text>
              <Text style={styles.genderLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>下一步</Text>
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
  titleContainer: {
    paddingTop: 24,
    paddingBottom: 20,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#000000',
    marginBottom: 12,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#666666',
    lineHeight: 20,
  },
  genderList: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  genderItem: {
    width: 120,
    height: 120,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 60,
    padding: 4,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  genderItemSelected: {
    borderColor: themeColors.primary,
  },
  genderIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  genderLabel: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  nextButton: {
    backgroundColor: themeColors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default GuideInfo;
