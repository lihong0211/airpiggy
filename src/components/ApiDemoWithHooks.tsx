import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {
  useSmsLogin,
  useUpdateChatGroup,
  useGetAllVocabulary,
  useSearchGroupList,
  useCreateChatGroup,
  useGetChatGroupList,
} from '../api/hooks';
import type {
  smsLoginRequest,
  updateChatGroupRequest,
  getAllVocabularyRequest,
  searchGroupListRequest,
  createChatGroupRequest,
} from '../api/types';

export const ApiDemoWithHooks: React.FC = () => {
  // 使用 Hooks
  const {
    run: smsLogin,
    loading: smsLoginLoading,
    data: smsLoginData,
    error: smsLoginError,
  } = useSmsLogin();
  const { run: updateGroup, loading: updateGroupLoading } =
    useUpdateChatGroup();
  const { run: getAllVocab, loading: getAllVocabLoading } =
    useGetAllVocabulary();
  const { run: searchGroups, loading: searchGroupsLoading } =
    useSearchGroupList();
  const { run: createGroup, loading: createGroupLoading } =
    useCreateChatGroup();
  const { run: getGroupList, loading: getGroupListLoading } =
    useGetChatGroupList();

  // 监听成功和错误
  React.useEffect(() => {
    if (smsLoginData) {
      Alert.alert('成功', '短信登录成功');
      console.log('登录响应:', smsLoginData);
    }
  }, [smsLoginData]);

  React.useEffect(() => {
    if (smsLoginError) {
      Alert.alert('错误', `短信登录失败: ${smsLoginError}`);
    }
  }, [smsLoginError]);

  const handleSmsLogin = () => {
    const requestData: smsLoginRequest = {
      phone: '13800138000',
      code: '123456',
      smsType: 'LOGIN',
    };
    smsLogin(requestData);
  };

  const handleUpdateChatGroup = () => {
    const requestData: updateChatGroupRequest = {
      groupId: 123,
      groupName: '测试群组',
      announcement: '这是一个测试群组',
    };
    updateGroup(requestData);
  };

  const handleGetAllVocabulary = () => {
    const requestData: getAllVocabularyRequest = {
      w: 7, // 节奏大师模式
      pageNum: 1,
      pageSize: 10,
    };
    getAllVocab(requestData);
  };

  const handleSearchGroupList = () => {
    const requestData: searchGroupListRequest = {
      keyword: '测试',
    };
    searchGroups(requestData);
  };

  const handleCreateChatGroup = () => {
    const requestData: createChatGroupRequest = {
      groupName: '新测试群组',
      announcement: '这是一个新创建的测试群组',
      memberIds: [1, 2, 3],
    };
    createGroup(requestData);
  };

  const handleGetChatGroupList = () => {
    getGroupList({});
  };

  const isLoading =
    smsLoginLoading ||
    updateGroupLoading ||
    getAllVocabLoading ||
    searchGroupsLoading ||
    createGroupLoading ||
    getGroupListLoading;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>API Hooks 演示</Text>
      <Text style={styles.subtitle}>使用 ahooks 的 useRequest</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, smsLoginLoading && styles.buttonLoading]}
          onPress={handleSmsLogin}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {smsLoginLoading ? '登录中...' : '短信登录'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, updateGroupLoading && styles.buttonLoading]}
          onPress={handleUpdateChatGroup}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {updateGroupLoading ? '更新中...' : '更新群组'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, getAllVocabLoading && styles.buttonLoading]}
          onPress={handleGetAllVocabulary}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {getAllVocabLoading ? '获取中...' : '获取词汇列表'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, searchGroupsLoading && styles.buttonLoading]}
          onPress={handleSearchGroupList}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {searchGroupsLoading ? '搜索中...' : '搜索群组'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, createGroupLoading && styles.buttonLoading]}
          onPress={handleCreateChatGroup}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {createGroupLoading ? '创建中...' : '创建群组'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, getGroupListLoading && styles.buttonLoading]}
          onPress={handleGetChatGroupList}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {getGroupListLoading ? '获取中...' : '获取群组列表'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Hooks 优势:</Text>
        <Text style={styles.infoText}>• 自动加载状态管理</Text>
        <Text style={styles.infoText}>• 内置错误处理</Text>
        <Text style={styles.infoText}>• 支持缓存和重试</Text>
        <Text style={styles.infoText}>• 更简洁的代码</Text>
        <Text style={styles.infoText}>• 更好的 TypeScript 支持</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  buttonContainer: {
    gap: 12,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonLoading: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  infoContainer: {
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
});
