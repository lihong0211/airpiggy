import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { themeColors } from '../../themes/colors';

interface NicknameProps {
  navigation: any;
}

export const Nickname: React.FC<NicknameProps> = ({ navigation }) => {
  const [nickname, setNickname] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // 系统保留字列表
  const SYSTEM_KEYWORDS = ['admin', 'system', 'root', 'administrator'];

  useEffect(() => {
    // 这里可以从用户store或props中获取当前昵称
    setNickname('cdut007'); // 默认值
  }, []);

  const handleSubmit = async () => {
    if (!nickname.trim()) {
      Alert.alert('提示', '请输入你的昵称');
      return;
    }

    if (SYSTEM_KEYWORDS.includes(nickname.toLowerCase())) {
      Alert.alert('提示', '昵称不能包含系统保留字');
      return;
    }

    try {
      setLoading(true);

      // 这里调用API更新用户昵称
      console.log('更新昵称:', nickname);

      // 模拟API调用
      await new Promise<void>(resolve => setTimeout(resolve, 1000));

      Alert.alert('成功', '昵称更新成功', [
        {
          text: '确定',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error: any) {
      Alert.alert('错误', error.message || '更新失败');
    } finally {
      setLoading(false);
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
          <Text style={styles.backButtonText}>取消</Text>
        </TouchableOpacity>
        <Text style={styles.title}>昵称</Text>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color={themeColors.primary} />
          ) : (
            <Text style={styles.saveButtonText}>保存</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={nickname}
            onChangeText={setNickname}
            placeholder="请输入你的昵称"
            placeholderTextColor="#999999"
            autoFocus
            maxLength={20}
            returnKeyType="done"
            onSubmitEditing={handleSubmit}
          />
        </View>

        <Text style={styles.tipText}>
          昵称长度为1-20个字符，不能包含系统保留字
        </Text>
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    paddingVertical: 8,
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
  saveButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  saveButtonText: {
    fontSize: 16,
    color: themeColors.primary,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000000',
    backgroundColor: '#FFFFFF',
  },
  tipText: {
    fontSize: 12,
    color: '#999999',
    marginTop: 8,
    lineHeight: 16,
  },
});

export default Nickname;
