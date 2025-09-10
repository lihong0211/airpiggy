import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  TextInput,
  Image,
} from 'react-native';
import { themeColors } from '../../themes/colors';

interface ReportProps {
  navigation: any;
  route?: {
    params?: {
      messageId?: string;
      reportedUserId?: string;
    };
  };
}

export const Report: React.FC<ReportProps> = ({ navigation, route }) => {
  const [reportContent, setReportContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // 模拟消息数据
  const message = {
    avatar: '',
    content: '这是一条被举报的消息内容',
    type: 'text',
  };

  const getMessageContent = () => {
    return {
      type: 1,
      content: message.content,
      displayText: message.content,
    };
  };

  const handleSubmit = async () => {
    if (!reportContent.trim()) {
      Alert.alert('提示', '请填写举报理由');
      return;
    }

    try {
      setLoading(true);

      // 这里调用举报API
      const reportData = {
        messageContent: getMessageContent().content,
        messageCreateTime: String(Date.now()),
        messageId: route?.params?.messageId || 'mock_message_id',
        reportedUserId: route?.params?.reportedUserId || 'mock_user_id',
        reportReason: reportContent,
        type: getMessageContent().type,
      };

      console.log('举报数据:', reportData);

      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));

      Alert.alert('举报成功', '感谢您的举报，我们会尽快处理', [
        {
          text: '确定',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.error('举报失败:', error);
      Alert.alert('举报失败', '请稍后再试');
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
          <Text style={styles.backButtonText}>← 返回</Text>
        </TouchableOpacity>
        <Text style={styles.title}>举报用户</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* 被举报用户信息 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>举报用户</Text>
          <View style={styles.userInfo}>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: message.avatar }}
                style={styles.avatar}
                defaultSource={require('../../static/logo.png')}
              />
            </View>
            <Text style={styles.userName}>用户</Text>
          </View>
        </View>

        {/* 举报内容 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>举报内容</Text>
          <Text style={styles.messageContent}>
            {getMessageContent().displayText}
          </Text>
        </View>

        {/* 举报理由 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>举报理由</Text>
          <TextInput
            style={styles.textArea}
            value={reportContent}
            onChangeText={setReportContent}
            placeholder="请填写举报理由..."
            placeholderTextColor="#999999"
            multiline
            numberOfLines={4}
            maxLength={200}
          />
          <Text style={styles.charCount}>{reportContent.length}/200</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>
            {loading ? '提交中...' : '提交'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
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
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 5,
    overflow: 'hidden',
    marginRight: 15,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  userName: {
    fontSize: 16,
    color: '#333333',
  },
  messageContent: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  textArea: {
    width: '100%',
    height: 100,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 10,
    fontSize: 14,
    color: '#333333',
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'right',
    marginTop: 5,
  },
  footer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  submitButton: {
    backgroundColor: themeColors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
});

export default Report;
