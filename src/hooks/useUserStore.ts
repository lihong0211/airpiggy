import { useState, useEffect } from 'react';
import { update as updateProfile, detail as getProfileDetail } from '../api/api';

interface UserInfo {
  userId: string;
  nickname: string;
  avatarUrl: string;
  phone: string;
  gender: number;
}

interface UserStore {
  user: UserInfo | null;
  updateUserInfo: (updates: Partial<UserInfo>) => void;
  fetchUserInfo: () => Promise<void>;
}

const defaultUser: UserInfo = {
  userId: '1962350063745744898',
  nickname: '用户',
  avatarUrl: '',
  phone: '',
  gender: 0,
};

let userState: UserInfo = defaultUser;
let listeners: Array<() => void> = [];

const notifyListeners = () => {
  listeners.forEach(listener => listener());
};

export const useUserStore = (): UserStore => {
  const [user, setUser] = useState<UserInfo>(userState);

  useEffect(() => {
    const listener = () => {
      setUser({ ...userState });
    };
    
    listeners.push(listener);
    
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }, []);

  const updateUserInfo = (updates: Partial<UserInfo>) => {
    userState = { ...userState, ...updates };
    notifyListeners();
  };

  const fetchUserInfo = async () => {
    try {
      const response = await getProfileDetail();
      if (response.data) {
        const { nickname, avatarUrl, userId, phone, gender } = response.data;
        updateUserInfo({
          userId: userId?.toString() || '1962350063745744898',
          nickname: nickname || '用户',
          avatarUrl: avatarUrl || '',
          phone: phone || '',
          gender: gender || 0,
        });
      }
    } catch (error) {
      console.log('Error fetching user info:', error);
    }
  };

  return {
    user,
    updateUserInfo,
    fetchUserInfo,
  };
};

// 导出默认用户信息，用于初始化
export const getUserInfo = () => userState;
