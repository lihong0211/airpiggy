import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { update as updateProfile, detail as getProfileDetail } from '../api/api';

interface UserInfo {
  userId: string;
  nickname: string;
  avatarUrl: string;
  phone: string;
  gender: number;
  qrCodeUrl: string;
}

interface UserStore {
  user: UserInfo | null;
  updateUserInfo: (updates: Partial<UserInfo>) => void;
  fetchUserInfo: (forceRefresh?: boolean) => Promise<void>;
  clearUserInfo: () => void;
  isLoading: boolean;
}

const defaultUser: UserInfo = {
  userId: '1962350063745744898',
  nickname: '用户',
  avatarUrl: '',
  phone: '',
  gender: 0,
  qrCodeUrl: '',
};

let userState: UserInfo = defaultUser;
let listeners: Array<() => void> = [];
let isLoadingState = false;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5分钟缓存
const USER_INFO_STORAGE_KEY = 'userInfo_v1';

const notifyListeners = () => {
  listeners.forEach(listener => listener());
};

export const useUserStore = (): UserStore => {
  const [user, setUser] = useState<UserInfo>(userState);
  const [isLoading, setIsLoading] = useState<boolean>(isLoadingState);

  useEffect(() => {
    const listener = () => {
      setUser({ ...userState });
      setIsLoading(isLoadingState);
    };
    
    listeners.push(listener);
    
    // 应用启动时尝试从本地存储加载用户信息
    loadUserInfoFromStorage();
    
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }, []);

  // 从本地存储加载用户信息
  const loadUserInfoFromStorage = async () => {
    try {
      const storedUserInfo = await AsyncStorage.getItem(USER_INFO_STORAGE_KEY);
      if (storedUserInfo) {
        const parsed = JSON.parse(storedUserInfo);
        userState = { ...userState, ...parsed };
        notifyListeners();
        console.log('📱 从本地存储加载用户信息');
      }
    } catch (error) {
      console.log('❌ 从本地存储加载用户信息失败:', error);
    }
  };

  // 保存用户信息到本地存储
  const saveUserInfoToStorage = async (userInfo: UserInfo) => {
    try {
      await AsyncStorage.setItem(USER_INFO_STORAGE_KEY, JSON.stringify(userInfo));
    } catch (error) {
      console.log('❌ 保存用户信息到本地存储失败:', error);
    }
  };

  const updateUserInfo = (updates: Partial<UserInfo>) => {
    userState = { ...userState, ...updates };
    // 保存到本地存储
    saveUserInfoToStorage(userState);
    notifyListeners();
  };

  const fetchUserInfo = async (forceRefresh = false) => {
    const now = Date.now();
    
    // 检查是否需要刷新（强制刷新 或 缓存过期 或 没有用户信息）
    const shouldRefresh = forceRefresh || 
                         (now - lastFetchTime > CACHE_DURATION) || 
                         !userState.nickname || 
                         userState.nickname === '用户';

    if (!shouldRefresh) {
      console.log('📦 使用缓存的用户信息');
      return;
    }

    // 防止重复请求
    if (isLoadingState) {
      console.log('⏳ 用户信息正在加载中...');
      return;
    }

    try {
      isLoadingState = true;
      notifyListeners();
      
      const response = await getProfileDetail();
      
      if (response.data) {
        const { nickname, avatarUrl, userId, phone, gender, qrCodeUrl } = response.data;
        
        const userInfo = {
          userId: userId?.toString() || '1962350063745744898',
          nickname: nickname || '用户',
          avatarUrl: avatarUrl || '',
          phone: phone || '',
          gender: gender || 0,
          qrCodeUrl: qrCodeUrl || '',
        };
        
        lastFetchTime = now;
        console.log('✅ 用户信息已更新:', { nickname: userInfo.nickname, hasAvatar: !!userInfo.avatarUrl });
        updateUserInfo(userInfo);
      } else {
        console.log('⚠️ API 响应中没有 data 字段');
      }
    } catch (error) {
      console.log('❌ 获取用户信息失败:', error);
    } finally {
      isLoadingState = false;
      notifyListeners();
    }
  };

  const clearUserInfo = () => {
    userState = defaultUser;
    lastFetchTime = 0;
    AsyncStorage.removeItem(USER_INFO_STORAGE_KEY);
    notifyListeners();
  };

  return {
    user,
    updateUserInfo,
    fetchUserInfo,
    clearUserInfo,
    isLoading,
  };
};

// 导出默认用户信息，用于初始化
export const getUserInfo = () => userState;
