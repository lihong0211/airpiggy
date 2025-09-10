/**
 * API Hooks
 * 基于 OpenAPI 规范自动生成
 */

import { useRequest } from 'ahooks';
import * as api from './api';
import type { 
  updateChatGroupRequest,
  updateChatGroupResponse,
  quitGroupResponse,
  removeGroupMembersRequest,
  removeGroupMembersResponse,
  addGroupMembersRequest,
  addGroupMembersResponse,
  deleteChatGroupResponse,
  createChatGroupRequest,
  createChatGroupResponse,
  searchGroupListRequest,
  searchGroupListResponse,
  getGroupMemberListRequest,
  getGroupMemberListResponse,
  getChatGroupListRequest,
  getChatGroupListResponse,
  getChatGroupDetailResponse,
  deleteFriendResponse,
  handleFriendRequestRequest,
  handleFriendRequestResponse,
  sendFriendRequestRequest,
  sendFriendRequestResponse,
  updateFriendRemarkRequest,
  updateFriendRemarkResponse,
  searchUsersRequest,
  searchUsersResponse,
  getFriendRequestListRequest,
  getFriendRequestListResponse,
  getFriendListRequest,
  getFriendListResponse,
  uploadFileRequest,
  uploadFileResponse,
  handleUnifiedCallbackRequest,
  handleUnifiedCallbackQueryParams,
  handleUnifiedCallbackResponse,
  queryGroupMessagesRequest,
  queryGroupMessagesResponse,
  queryC2CMessagesRequest,
  queryC2CMessagesResponse,
  convertTextToSpeechRequest,
  convertTextToSpeechResponse,
  convertTextToSpeechAsyncRequest,
  convertTextToSpeechAsyncResponse,
  generateUniqueIdResponse,
  generateUniqueIdWithPrefixResponse,
  listVersionsRequest,
  listVersionsResponse,
  translateRequest,
  translateResponse,
  setUserConfigRequest,
  setUserConfigResponse,
  getUserConfigsResponse,
  getUserConfigRequest,
  getUserConfigResponse,
  deleteUserConfigRequest,
  deleteUserConfigResponse,
  setC2CConfigRequest,
  setC2CConfigResponse,
  getAllC2CConfigsResponse,
  getC2CConfigResponse,
  deleteC2CConfigResponse,
  setGroupConfigRequest,
  setGroupConfigResponse,
  getGroupAllConfigsResponse,
  getGroupConfigResponse,
  deleteGroupConfigResponse,
  getAllSystemConfigsResponse,
  loginRequest,
  loginResponse,
  smsLoginRequest,
  smsLoginResponse,
  sendSmsCodeRequest,
  sendSmsCodeResponse,
  logoutResponse,
  WechatLoginRequest,
  WechatLoginResponse,
  deactivateAccountResponse,
  getPhoneNumberRequest,
  getPhoneNumberResponse,
  login_2Request,
  login_2Response,
  loginOutResponse,
  getUserSigResponse,
  code2userRequest,
  code2userResponse,
  updateRequest,
  updateResponse,
  updatePhoneRequest,
  updatePhoneResponse,
  bindPhoneRequest,
  bindPhoneResponse,
  detailResponse,
  login_3Request,
  login_3Response,
  getAllLanguagesResponse,
  checkStatusResponse,
  exportChatStatisticsRequest,
  exportChatStatisticsResponse,
  CreateReportRequest,
  CreateReportResponse,
  checkVersionRequest,
  checkVersionResponse,
  getJsConfigRequest,
  getJsConfigResponse,
  useInvitationRequest,
  useInvitationResponse,
  getInvitationResponse,
  refundPaymentRequest,
  refundPaymentResponse,
  createPaymentRequest,
  createPaymentResponse,
  cancelPaymentResponse,
  wechatPayCallbackRequest,
  wechatPayCallbackResponse,
  applePayCallbackRequest,
  applePayCallbackResponse,
  alipayCallbackResponse,
  alipayReturnResponse,
  getPaymentRecordsRequest,
  getPaymentRecordsResponse,
  queryPaymentResponse,
  getUserInvitationRequest,
  getUserInvitationResponse,
  addUserVocabularyRequest,
  addUserVocabularyResponse,
  searchUserVocabularyRequest,
  searchUserVocabularyResponse,
  verifyServerRequest,
  verifyServerResponse,
  handleWechatEventRequest,
  handleWechatEventResponse,
  queryUserOnlineStatusRequest,
  queryUserOnlineStatusResponse,
  queryUserOnlineStatusPostRequest,
  queryUserOnlineStatusPostResponse,
  addVocabularyRequest,
  addVocabularyResponse,
  swipeVocabularyRequest,
  swipeVocabularyResponse,
  aIAnalysisRequest,
  aIAnalysisResponse,
  getAllVocabularyRequest,
  getAllVocabularyResponse
} from './types';

/**
 * 更新群组信息
 * 更新群组的名称、头像或公告等信息
 */
export const useUpdateChatGroup = () => {
  return useRequest<updateChatGroupResponse, [updateChatGroupRequest]>(api.updateChatGroup, {
    manual: true,
  });
};

/**
 * 退出群组
 * 当前用户退出指定群组
 */
export const useQuitGroup = () => {
  return useRequest<quitGroupResponse, [string]>(api.quitGroup, {
    manual: true,
  });
};

/**
 * 移除群成员
 * 从指定群组移除成员（仅群主可操作）
 */
export const useRemoveGroupMembers = () => {
  return useRequest<removeGroupMembersResponse, [removeGroupMembersRequest]>(api.removeGroupMembers, {
    manual: true,
  });
};

/**
 * 添加群成员
 * 向指定群组添加成员（仅群主可操作）
 */
export const useAddGroupMembers = () => {
  return useRequest<addGroupMembersResponse, [addGroupMembersRequest]>(api.addGroupMembers, {
    manual: true,
  });
};

/**
 * 删除群组
 * 删除指定的群组（仅群主可操作）
 */
export const useDeleteChatGroup = () => {
  return useRequest<deleteChatGroupResponse, [string]>(api.deleteChatGroup, {
    manual: true,
  });
};

/**
 * 创建群组
 * 创建新的聊天群组
 */
export const useCreateChatGroup = () => {
  return useRequest<createChatGroupResponse, [createChatGroupRequest]>(api.createChatGroup, {
    manual: true,
  });
};

/**
 * 搜索群组列表
 * 搜索群组列表
 */
export const useSearchGroupList = () => {
  return useRequest<searchGroupListResponse, [searchGroupListRequest]>(api.searchGroupList, {
    manual: true,
  });
};

/**
 * 获取群成员列表
 * 分页获取指定群组的成员列表
 */
export const useGetGroupMemberList = () => {
  return useRequest<getGroupMemberListResponse, [getGroupMemberListRequest]>(api.getGroupMemberList, {
    manual: true,
  });
};

/**
 * 获取群组列表
 * 分页获取当前用户所在的群组列表
 */
export const useGetChatGroupList = () => {
  return useRequest<getChatGroupListResponse, [getChatGroupListRequest]>(api.getChatGroupList, {
    manual: true,
  });
};

/**
 * 获取群组详情
 * 获取指定群组的详细信息
 */
export const useGetChatGroupDetail = () => {
  return useRequest<getChatGroupDetailResponse, [string]>(api.getChatGroupDetail, {
    manual: true,
  });
};

/**
 * 删除好友
 * 删除指定好友关系
 */
export const useDeleteFriend = () => {
  return useRequest<deleteFriendResponse, [string]>(api.deleteFriend, {
    manual: true,
  });
};

/**
 * 处理好友请求
 * 接受或拒绝好友请求
 */
export const useHandleFriendRequest = () => {
  return useRequest<handleFriendRequestResponse, [handleFriendRequestRequest]>(api.handleFriendRequest, {
    manual: true,
  });
};

/**
 * 发送好友请求
 * 向指定用户发送好友请求
 */
export const useSendFriendRequest = () => {
  return useRequest<sendFriendRequestResponse, [sendFriendRequestRequest]>(api.sendFriendRequest, {
    manual: true,
  });
};

/**
 * 修改好友备注
 * 修改指定好友的备注名
 */
export const useUpdateFriendRemark = () => {
  return useRequest<updateFriendRemarkResponse, [updateFriendRemarkRequest]>(api.updateFriendRemark, {
    manual: true,
  });
};

/**
 * 搜索用户
 * 通过关键词搜索用户，用于添加好友
 */
export const useSearchUsers = () => {
  return useRequest<searchUsersResponse, [searchUsersRequest]>(api.searchUsers, {
    manual: true,
  });
};

/**
 * 获取好友请求列表
 * 分页获取当前用户的好友请求列表
 */
export const useGetFriendRequestList = () => {
  return useRequest<getFriendRequestListResponse, [getFriendRequestListRequest]>(api.getFriendRequestList, {
    manual: true,
  });
};

/**
 * 获取好友列表
 * 分页获取当前用户的好友列表
 */
export const useGetFriendList = () => {
  return useRequest<getFriendListResponse, [getFriendListRequest]>(api.getFriendList, {
    manual: true,
  });
};

/**
 * 单文件上传
 * 单文件上传
 */
export const useUploadFile = () => {
  return useRequest<uploadFileResponse, [uploadFileRequest]>(api.uploadFile, {
    manual: true,
  });
};

/**
 * 统一回调接口
 * 处理所有腾讯IM回调请求的单一入口，采用异步处理方式
 */
export const useHandleUnifiedCallback = () => {
  return useRequest<handleUnifiedCallbackResponse, [handleUnifiedCallbackRequest, handleUnifiedCallbackQueryParams]>(api.handleUnifiedCallback, {
    manual: true,
  });
};

/**
 * 查询群聊历史消息
 * 根据条件查询群聊历史消息，包含消息已读状态和已读人数
 */
export const useQueryGroupMessages = () => {
  return useRequest<queryGroupMessagesResponse, [queryGroupMessagesRequest]>(api.queryGroupMessages, {
    manual: true,
  });
};

/**
 * 查询单聊历史消息
 * 根据条件查询单聊历史消息，包含消息已读状态
 */
export const useQueryC2CMessages = () => {
  return useRequest<queryC2CMessagesResponse, [queryC2CMessagesRequest]>(api.queryC2CMessages, {
    manual: true,
  });
};

/**
 * 文字转音频文件url（同步方式）
 * 
 */
export const useConvertTextToSpeech = () => {
  return useRequest<convertTextToSpeechResponse, [convertTextToSpeechRequest]>(api.convertTextToSpeech, {
    manual: true,
  });
};

/**
 * 文字转音频文件url（异步方式）
 * 
 */
export const useConvertTextToSpeechAsync = () => {
  return useRequest<convertTextToSpeechAsyncResponse, [convertTextToSpeechAsyncRequest]>(api.convertTextToSpeechAsync, {
    manual: true,
  });
};

/**
 * 生成唯一ID
 * 
 */
export const useGenerateUniqueId = () => {
  return useRequest<generateUniqueIdResponse, []>(api.generateUniqueId, {
    manual: true,
  });
};

/**
 * 生成指定前缀的唯一ID
 * 
 */
export const useGenerateUniqueIdWithPrefix = () => {
  return useRequest<generateUniqueIdWithPrefixResponse, [string]>(api.generateUniqueIdWithPrefix, {
    manual: true,
  });
};

/**
 * 获取版本信息列表
 * 
 */
export const useListVersions = () => {
  return useRequest<listVersionsResponse, [listVersionsRequest]>(api.listVersions, {
    manual: true,
  });
};

/**
 * 翻译
 * 对原文进行翻译
 */
export const useTranslate = () => {
  return useRequest<translateResponse, [translateRequest]>(api.translate, {
    manual: true,
  });
};

/**
 * 设置用户配置
 * 
 */
export const useSetUserConfig = () => {
  return useRequest<setUserConfigResponse, [setUserConfigRequest]>(api.setUserConfig, {
    manual: true,
  });
};

/**
 * 获取用户所有配置
 * 
 */
export const useGetUserConfigs = () => {
  return useRequest<getUserConfigsResponse, []>(api.getUserConfigs, {
    manual: true,
  });
};

/**
 * 获取用户指定配置
 * 
 */
export const useGetUserConfig = () => {
  return useRequest<getUserConfigResponse, [getUserConfigRequest]>(api.getUserConfig, {
    manual: true,
  });
};

/**
 * 删除用户配置
 * 
 */
export const useDeleteUserConfig = () => {
  return useRequest<deleteUserConfigResponse, [deleteUserConfigRequest]>(api.deleteUserConfig, {
    manual: true,
  });
};

/**
 * 设置用户对用户配置
 * 
 */
export const useSetC2CConfig = () => {
  return useRequest<setC2CConfigResponse, [setC2CConfigRequest]>(api.setC2CConfig, {
    manual: true,
  });
};

/**
 * 获取用户对用户所有配置
 * 
 */
export const useGetAllC2CConfigs = () => {
  return useRequest<getAllC2CConfigsResponse, [string]>(api.getAllC2CConfigs, {
    manual: true,
  });
};

/**
 * 获取用户对用户配置
 * 
 */
export const useGetC2CConfig = () => {
  return useRequest<getC2CConfigResponse, [string, string]>(api.getC2CConfig, {
    manual: true,
  });
};

/**
 * 删除用户对用户配置
 * 
 */
export const useDeleteC2CConfig = () => {
  return useRequest<deleteC2CConfigResponse, [string, string]>(api.deleteC2CConfig, {
    manual: true,
  });
};

/**
 * 设置群组配置
 * 
 */
export const useSetGroupConfig = () => {
  return useRequest<setGroupConfigResponse, [setGroupConfigRequest]>(api.setGroupConfig, {
    manual: true,
  });
};

/**
 * 获取群组所有配置
 * 
 */
export const useGetGroupAllConfigs = () => {
  return useRequest<getGroupAllConfigsResponse, [string]>(api.getGroupAllConfigs, {
    manual: true,
  });
};

/**
 * 获取群组配置
 * 
 */
export const useGetGroupConfig = () => {
  return useRequest<getGroupConfigResponse, [string, string]>(api.getGroupConfig, {
    manual: true,
  });
};

/**
 * 删除群组配置
 * 
 */
export const useDeleteGroupConfig = () => {
  return useRequest<deleteGroupConfigResponse, [string, string]>(api.deleteGroupConfig, {
    manual: true,
  });
};

/**
 * 获取所有系统配置列表
 * 
 */
export const useGetAllSystemConfigs = () => {
  return useRequest<getAllSystemConfigsResponse, []>(api.getAllSystemConfigs, {
    manual: true,
  });
};

/**
 * 微信第三方登录
 * 通过微信授权code登录，成功后返回用户信息和token
 */
export const useWechatLogin = () => {
  return useRequest<loginResponse, [loginRequest]>(api.wechatLogin, {
    manual: true,
  });
};

/**
 * 短信验证码登录
 * 通过手机号和验证码登录，成功后返回用户信息和token
 */
export const useSmsLogin = () => {
  return useRequest<smsLoginResponse, [smsLoginRequest]>(api.smsLogin, {
    manual: true,
  });
};

/**
 * 发送短信验证码
 * 向指定手机号发送验证码，通过type参数区分不同场景
 */
export const useSendSmsCode = () => {
  return useRequest<sendSmsCodeResponse, [sendSmsCodeRequest]>(api.sendSmsCode, {
    manual: true,
  });
};

/**
 * 退出登录接口
 * 退出登录接口
 */
export const useLogout = () => {
  return useRequest<logoutResponse, []>(api.logout, {
    manual: true,
  });
};

/**
 * 用户名密码登录
 * 通过用户名和密码登录，成功后返回用户信息和token
 */
export const usePwdLogin = () => {
  return useRequest<WechatLoginResponse, [WechatLoginRequest]>(api.pwdLogin, {
    manual: true,
  });
};

/**
 * 注销账号
 * 注销当前用户账号，注销后无法再次登录，需要重新注册
 */
export const useDeactivateAccount = () => {
  return useRequest<deactivateAccountResponse, []>(api.deactivateAccount, {
    manual: true,
  });
};

/**
 * 获取微信用户手机号
 * 通过微信小程序获取用户手机号接口返回的code获取手机号
 */
export const useGetPhoneNumber = () => {
  return useRequest<getPhoneNumberResponse, [getPhoneNumberRequest]>(api.getPhoneNumber, {
    manual: true,
  });
};

/**
 * 微信小程序登录
 * 通过微信小程序code登录，成功后返回用户信息和token
 */
export const useLogin_2 = () => {
  return useRequest<login_2Response, [login_2Request]>(api.login_2, {
    manual: true,
  });
};

/**
 * 退出登录接口
 * 退出登录接口
 */
export const useLoginOut = () => {
  return useRequest<loginOutResponse, []>(api.loginOut, {
    manual: true,
  });
};

/**
 * 获取腾讯IM用户签名
 * 获取腾讯IM用户的UserSig签名信息
 */
export const useGetUserSig = () => {
  return useRequest<getUserSigResponse, []>(api.getUserSig, {
    manual: true,
  });
};

/**
 * 通过code 换取用户信息
 * 通过code换取用户信息
 */
export const useCode2user = () => {
  return useRequest<code2userResponse, [code2userRequest]>(api.code2user, {
    manual: true,
  });
};

/**
 * 修改个人资料
 * 修改个人资料
 */
export const useUpdate = () => {
  return useRequest<updateResponse, [updateRequest]>(api.update, {
    manual: true,
  });
};

/**
 * 修改手机号
 * 修改手机号，只需验证新手机号
 */
export const useUpdatePhone = () => {
  return useRequest<updatePhoneResponse, [updatePhoneRequest]>(api.updatePhone, {
    manual: true,
  });
};

/**
 * 绑定手机号
 * 绑定手机号
 */
export const useBindPhone = () => {
  return useRequest<bindPhoneResponse, [bindPhoneRequest]>(api.bindPhone, {
    manual: true,
  });
};

/**
 * 查询个人资料
 * 查询个人资料
 */
export const useDetail = () => {
  return useRequest<detailResponse, []>(api.detail, {
    manual: true,
  });
};

/**
 * 苹果第三方登录
 * 通过苹果授权identityToken登录，成功后返回用户信息和token
 */
export const useLogin_3 = () => {
  return useRequest<login_3Response, [login_3Request]>(api.login_3, {
    manual: true,
  });
};

/**
 * 获取所有语言列表
 * 
 */
export const useGetAllLanguages = () => {
  return useRequest<getAllLanguagesResponse, []>(api.getAllLanguages, {
    manual: true,
  });
};

/**
 * 检查导出服务状态
 * 检查聊天统计数据导出服务是否正常运行
 */
export const useCheckStatus = () => {
  return useRequest<checkStatusResponse, []>(api.checkStatus, {
    manual: true,
  });
};

/**
 * 导出聊天统计数据
 * 导出指定日期范围内的聊天统计数据，返回CSV文件
 */
export const useExportChatStatistics = () => {
  return useRequest<exportChatStatisticsResponse, [exportChatStatisticsRequest]>(api.exportChatStatistics, {
    manual: true,
  });
};

/**
 * 用户举报
 * 通过CreateReportForm创建用户举报
 */
export const useCreateReport = () => {
  return useRequest<CreateReportResponse, [CreateReportRequest]>(api.CreateReport, {
    manual: true,
  });
};

/**
 * 检查APP版本更新
 * 检查当前APP版本是否需要更新
 */
export const useCheckVersion = () => {
  return useRequest<checkVersionResponse, [checkVersionRequest]>(api.checkVersion, {
    manual: true,
  });
};

/**
 * 获取微信JS-SDK配置
 * 获取微信JS-SDK配置信息，用于H5页面分享
 */
export const useGetJsConfig = () => {
  return useRequest<getJsConfigResponse, [getJsConfigRequest]>(api.getJsConfig, {
    manual: true,
  });
};

/**
 * 使用注册邀请码
 * 
 */
export const useUseInvitation = () => {
  return useRequest<useInvitationResponse, [useInvitationRequest]>(api.useInvitation, {
    manual: true,
  });
};

/**
 * 获取注册邀请码
 * 
 */
export const useGetInvitation = () => {
  return useRequest<getInvitationResponse, []>(api.getInvitation, {
    manual: true,
  });
};

/**
 * 申请退款
 * 对已支付订单申请退款，支持全额退款
 */
export const useRefundPayment = () => {
  return useRequest<refundPaymentResponse, [string, refundPaymentRequest]>(api.refundPayment, {
    manual: true,
  });
};

/**
 * 创建支付订单
 * 创建微信、支付宝或苹果支付订单，返回支付参数
 */
export const useCreatePayment = () => {
  return useRequest<createPaymentResponse, [createPaymentRequest]>(api.createPayment, {
    manual: true,
  });
};

/**
 * 取消支付订单
 * 取消未支付的订单，关闭第三方支付订单
 */
export const useCancelPayment = () => {
  return useRequest<cancelPaymentResponse, [string]>(api.cancelPayment, {
    manual: true,
  });
};

/**
 * 微信支付回调
 * 处理微信的支付结果通知
 */
export const useWechatPayCallback = () => {
  return useRequest<wechatPayCallbackResponse, [wechatPayCallbackRequest]>(api.wechatPayCallback, {
    manual: true,
  });
};

/**
 * 苹果支付验证回调
 * 处理苹果内购的验证回调
 */
export const useApplePayCallback = () => {
  return useRequest<applePayCallbackResponse, [applePayCallbackRequest]>(api.applePayCallback, {
    manual: true,
  });
};

/**
 * 支付宝支付回调
 * 处理支付宝的支付结果通知
 */
export const useAlipayCallback = () => {
  return useRequest<alipayCallbackResponse, []>(api.alipayCallback, {
    manual: true,
  });
};

/**
 * 支付宝同步返回
 * 处理支付宝支付完成后的同步跳转
 */
export const useAlipayReturn = () => {
  return useRequest<alipayReturnResponse, []>(api.alipayReturn, {
    manual: true,
  });
};

/**
 * 获取支付记录
 * 分页获取当前用户的支付记录列表
 */
export const useGetPaymentRecords = () => {
  return useRequest<getPaymentRecordsResponse, [getPaymentRecordsRequest]>(api.getPaymentRecords, {
    manual: true,
  });
};

/**
 * 查询支付订单
 * 根据支付订单号查询支付状态和详细信息
 */
export const useQueryPayment = () => {
  return useRequest<queryPaymentResponse, [string]>(api.queryPayment, {
    manual: true,
  });
};

/**
 * 用户获取邀请情况
 * 
 */
export const useGetUserInvitation = () => {
  return useRequest<getUserInvitationResponse, [getUserInvitationRequest]>(api.getUserInvitation, {
    manual: true,
  });
};

/**
 * 用户添加词汇
 * 添加新的词汇到用户词汇表
 */
export const useAddUserVocabulary = () => {
  return useRequest<addUserVocabularyResponse, [addUserVocabularyRequest]>(api.addUserVocabulary, {
    manual: true,
  });
};

/**
 * 搜索词汇
 * 根据关键词搜索用户词汇
 */
export const useSearchUserVocabulary = () => {
  return useRequest<searchUserVocabularyResponse, [searchUserVocabularyRequest]>(api.searchUserVocabulary, {
    manual: true,
  });
};

/**
 * 微信服务器验证
 * 用于验证微信服务器配置的有效性，验证成功返回echostr
 */
export const useVerifyServer = () => {
  return useRequest<verifyServerResponse, [verifyServerRequest]>(api.verifyServer, {
    manual: true,
  });
};

/**
 * 微信事件回调
 * 处理微信推送的用户关注、取消关注等事件回调
 */
export const useHandleWechatEvent = () => {
  return useRequest<handleWechatEventResponse, [handleWechatEventRequest]>(api.handleWechatEvent, {
    manual: true,
  });
};

/**
 * queryUserOnlineStatus
 * 
 */
export const useQueryUserOnlineStatus = () => {
  return useRequest<queryUserOnlineStatusResponse, [queryUserOnlineStatusRequest]>(api.queryUserOnlineStatus, {
    manual: true,
  });
};

/**
 * queryUserOnlineStatusPost
 * 
 */
export const useQueryUserOnlineStatusPost = () => {
  return useRequest<queryUserOnlineStatusPostResponse, [queryUserOnlineStatusPostRequest]>(api.queryUserOnlineStatusPost, {
    manual: true,
  });
};

/**
 * 用户新增词搭
 * 
 */
export const useAddVocabulary = () => {
  return useRequest<addVocabularyResponse, [addVocabularyRequest]>(api.addVocabulary, {
    manual: true,
  });
};

/**
 * 用户刷词卡
 * 
 */
export const useSwipeVocabulary = () => {
  return useRequest<swipeVocabularyResponse, [swipeVocabularyRequest]>(api.swipeVocabulary, {
    manual: true,
  });
};

/**
 * AI分析单词返回完整词汇信息
 * 
 */
export const useAIAnalysis = () => {
  return useRequest<aIAnalysisResponse, [aIAnalysisRequest]>(api.aIAnalysis, {
    manual: true,
  });
};

/**
 * 获取所有词汇列表
 * 
 */
export const useGetAllVocabulary = () => {
  return useRequest<getAllVocabularyResponse, [getAllVocabularyRequest]>(api.getAllVocabulary, {
    manual: true,
  });
};

