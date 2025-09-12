import { update as updateProfile, detail as getProfileDetail, uploadFile } from '../api/api';

export interface UpdateUserInfoRequest {
  nickname?: string;
  avatarUrl?: string;
  gender?: number;
}

export interface UserInfo {
  userId: string;
  nickname: string;
  avatarUrl: string;
  phone: string;
  gender: number;
}

/**
 * 更新用户信息
 * 与packages-me中的updateUserInfo保持一致
 */
export const updateUserInfo = async (data: UpdateUserInfoRequest) => {
  try {
    const response = await updateProfile({
      nickname: data.nickname || '',
      avatarUrl: data.avatarUrl || '',
      gender: data.gender || 0,
    });
    return response;
  } catch (error) {
    console.error('Error updating user info:', error);
    throw error;
  }
};

/**
 * 获取用户详细信息
 * 与packages-me中的getUserInfo保持一致
 */
export const getUserInfo = async (): Promise<UserInfo> => {
  try {
    const response = await getProfileDetail();
    if (response.data) {
      return {
        userId: response.data.userId?.toString() || '1962350063745744898',
        nickname: response.data.nickname || '用户',
        avatarUrl: response.data.avatarUrl || '',
        phone: response.data.phone || '',
        gender: response.data.gender || 0,
      };
    }
    throw new Error('No user data received');
  } catch (error) {
    console.error('Error getting user info:', error);
    throw error;
  }
};

/**
 * 上传文件
 * 与packages-me中的uploadFile保持一致
 */
export { uploadFile };
