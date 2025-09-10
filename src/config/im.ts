// 腾讯云 IM 配置
export const IM_CONFIG = {
  // 请替换为你的腾讯云 IM SDKAppID
  SDKAppID: 1600104086, // 例如: 1234567890
  
  // 请替换为你的腾讯云 IM 密钥
  SECRETKEY: 'c50fe655f74146994e4ebb56aa29b2f1dbe2189deb7f8e28e7a6cd5593ad390c', // 例如: 'your-secret-key-here'
  
  // 用户 ID 前缀，用于生成测试用户
  USER_ID_PREFIX: 'user_',
  
  // 群组 ID 前缀
  GROUP_ID_PREFIX: 'group_',
};

// 腾讯云 IM 事件类型
export const IM_EVENTS = {
  SDK_READY: 'sdkStateReady',
  SDK_NOT_READY: 'sdkStateNotReady',
  SDK_START_CLOSE: 'sdkStateStartClose',
  SDK_CLOSE: 'sdkStateClose',
  SDK_ERROR: 'sdkError',
  
  // 消息相关
  MESSAGE_RECEIVED: 'onMessageReceived',
  MESSAGE_SENT: 'onMessageSent',
  MESSAGE_REVOKED: 'onMessageRevoked',
  
  // 会话相关
  CONVERSATION_LIST_UPDATED: 'onConversationListUpdated',
  TOTAL_UNREAD_MESSAGE_COUNT_UPDATED: 'onTotalUnreadMessageCountUpdated',
  
  // 群组相关
  GROUP_LIST_UPDATED: 'onGroupListUpdated',
  GROUP_ATTRIBUTES_UPDATED: 'onGroupAttributesUpdated',
  
  // 用户相关
  USER_STATUS_UPDATED: 'onUserStatusUpdated',
  USER_INFO_UPDATED: 'onUserInfoUpdated',
};
