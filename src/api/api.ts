/**
 * API 客户端
 * 基于 OpenAPI 规范自动生成
 */

import request from './request';
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
export async function updateChatGroup(data: updateChatGroupRequest): Promise<updateChatGroupResponse> {
  const res = await request.post(`/airpig/api/groups/update`, data);
  return res.data;
}

/**
 * 退出群组
 * 当前用户退出指定群组
 */
export async function quitGroup(groupId: string): Promise<quitGroupResponse> {
  const res = await request.post(`/airpig/api/groups/quit/${groupId}`);
  return res.data;
}

/**
 * 移除群成员
 * 从指定群组移除成员（仅群主可操作）
 */
export async function removeGroupMembers(data: removeGroupMembersRequest): Promise<removeGroupMembersResponse> {
  const res = await request.post(`/airpig/api/groups/members/remove`, data);
  return res.data;
}

/**
 * 添加群成员
 * 向指定群组添加成员（仅群主可操作）
 */
export async function addGroupMembers(data: addGroupMembersRequest): Promise<addGroupMembersResponse> {
  const res = await request.post(`/airpig/api/groups/members/add`, data);
  return res.data;
}

/**
 * 删除群组
 * 删除指定的群组（仅群主可操作）
 */
export async function deleteChatGroup(groupId: string): Promise<deleteChatGroupResponse> {
  const res = await request.post(`/airpig/api/groups/delete/${groupId}`);
  return res.data;
}

/**
 * 创建群组
 * 创建新的聊天群组
 */
export async function createChatGroup(data: createChatGroupRequest): Promise<createChatGroupResponse> {
  const res = await request.post(`/airpig/api/groups/create`, data);
  return res.data;
}

/**
 * 搜索群组列表
 * 搜索群组列表
 */
export async function searchGroupList(params: searchGroupListRequest): Promise<searchGroupListResponse> {
  const res = await request.get(`/airpig/api/groups/search`, { params });
  return res.data;
}

/**
 * 获取群成员列表
 * 分页获取指定群组的成员列表
 */
export async function getGroupMemberList(params: getGroupMemberListRequest): Promise<getGroupMemberListResponse> {
  const res = await request.get(`/airpig/api/groups/members/list`, { params });
  return res.data;
}

/**
 * 获取群组列表
 * 分页获取当前用户所在的群组列表
 */
export async function getChatGroupList(params: getChatGroupListRequest): Promise<getChatGroupListResponse> {
  const res = await request.get(`/airpig/api/groups/list`, { params });
  return res.data;
}

/**
 * 获取群组详情
 * 获取指定群组的详细信息
 */
export async function getChatGroupDetail(groupId: string): Promise<getChatGroupDetailResponse> {
  const res = await request.get(`/airpig/api/groups/detail/${groupId}`);
  return res.data;
}

/**
 * 删除好友
 * 删除指定好友关系
 */
export async function deleteFriend(friendUserId: string): Promise<deleteFriendResponse> {
  const res = await request.post(`/airpig/api/friends/${friendUserId}`);
  return res.data;
}

/**
 * 处理好友请求
 * 接受或拒绝好友请求
 */
export async function handleFriendRequest(data: handleFriendRequestRequest): Promise<handleFriendRequestResponse> {
  const res = await request.post(`/airpig/api/friends/requests/handle`, data);
  return res.data;
}

/**
 * 发送好友请求
 * 向指定用户发送好友请求
 */
export async function sendFriendRequest(data: sendFriendRequestRequest): Promise<sendFriendRequestResponse> {
  const res = await request.post(`/airpig/api/friends/request/send`, data);
  return res.data;
}

/**
 * 修改好友备注
 * 修改指定好友的备注名
 */
export async function updateFriendRemark(data: updateFriendRemarkRequest): Promise<updateFriendRemarkResponse> {
  const res = await request.post(`/airpig/api/friends/remark`, data);
  return res.data;
}

/**
 * 搜索用户
 * 通过关键词搜索用户，用于添加好友
 */
export async function searchUsers(params: searchUsersRequest): Promise<searchUsersResponse> {
  const res = await request.get(`/airpig/api/friends/search`, { params });
  return res.data;
}

/**
 * 获取好友请求列表
 * 分页获取当前用户的好友请求列表
 */
export async function getFriendRequestList(params: getFriendRequestListRequest): Promise<getFriendRequestListResponse> {
  const res = await request.get(`/airpig/api/friends/request/list`, { params });
  return res.data;
}

/**
 * 获取好友列表
 * 分页获取当前用户的好友列表
 */
export async function getFriendList(params: getFriendListRequest): Promise<getFriendListResponse> {
  const res = await request.get(`/airpig/api/friends/list`, { params });
  return res.data;
}

/**
 * 单文件上传
 * 单文件上传
 */
export async function uploadFile(data: uploadFileRequest): Promise<uploadFileResponse> {
  const res = await request.post(`/airpig/api/file/upload`, data);
  return res.data;
}

/**
 * 统一回调接口
 * 处理所有腾讯IM回调请求的单一入口，采用异步处理方式
 */
export async function handleUnifiedCallback(data: handleUnifiedCallbackRequest, params: handleUnifiedCallbackQueryParams): Promise<handleUnifiedCallbackResponse> {
  const res = await request.post(`/airpig/api/callback/tencent/im`, data, { params });
  return res.data;
}

/**
 * 查询群聊历史消息
 * 根据条件查询群聊历史消息，包含消息已读状态和已读人数
 */
export async function queryGroupMessages(params: queryGroupMessagesRequest): Promise<queryGroupMessagesResponse> {
  const res = await request.get(`/airpig/api/im/messages/group`, { params });
  return res.data;
}

/**
 * 查询单聊历史消息
 * 根据条件查询单聊历史消息，包含消息已读状态
 */
export async function queryC2CMessages(params: queryC2CMessagesRequest): Promise<queryC2CMessagesResponse> {
  const res = await request.get(`/airpig/api/im/messages/c2c`, { params });
  return res.data;
}

/**
 * 文字转音频文件url（同步方式）
 * 
 */
export async function convertTextToSpeech(data: convertTextToSpeechRequest): Promise<convertTextToSpeechResponse> {
  const res = await request.post(`/airpig/api/tts/convert`, data);
  return res.data;
}

/**
 * 文字转音频文件url（异步方式）
 * 
 */
export async function convertTextToSpeechAsync(data: convertTextToSpeechAsyncRequest): Promise<convertTextToSpeechAsyncResponse> {
  const res = await request.post(`/airpig/api/tts/convert/async`, data);
  return res.data;
}

/**
 * 生成唯一ID
 * 
 */
export async function generateUniqueId(): Promise<generateUniqueIdResponse> {
  const res = await request.get(`/airpig/api/uniqueId/generate`);
  return res.data;
}

/**
 * 生成指定前缀的唯一ID
 * 
 */
export async function generateUniqueIdWithPrefix(prefix: string): Promise<generateUniqueIdWithPrefixResponse> {
  const res = await request.get(`/airpig/api/uniqueId/generate/${prefix}`);
  return res.data;
}

/**
 * 获取版本信息列表
 * 
 */
export async function listVersions(params: listVersionsRequest): Promise<listVersionsResponse> {
  const res = await request.get(`/airpig/api/version/get`, { params });
  return res.data;
}

/**
 * 翻译
 * 对原文进行翻译
 */
export async function translate(data: translateRequest): Promise<translateResponse> {
  const res = await request.post(`/airpig/api/translate`, data);
  return res.data;
}

/**
 * 设置用户配置
 * 
 */
export async function setUserConfig(data: setUserConfigRequest): Promise<setUserConfigResponse> {
  const res = await request.post(`/airpig/api/user/config/set`, data);
  return res.data;
}

/**
 * 获取用户所有配置
 * 
 */
export async function getUserConfigs(): Promise<getUserConfigsResponse> {
  const res = await request.get(`/airpig/api/user/config/list`);
  return res.data;
}

/**
 * 获取用户指定配置
 * 
 */
export async function getUserConfig(params: getUserConfigRequest): Promise<getUserConfigResponse> {
  const res = await request.get(`/airpig/api/user/config/get`, { params });
  return res.data;
}

/**
 * 删除用户配置
 * 
 */
export async function deleteUserConfig(params: deleteUserConfigRequest): Promise<deleteUserConfigResponse> {
  const res = await request.delete(`/airpig/api/user/config/delete`, { params });
  return res.data;
}

/**
 * 设置用户对用户配置
 * 
 */
export async function setC2CConfig(data: setC2CConfigRequest): Promise<setC2CConfigResponse> {
  const res = await request.post(`/airpig/api/c2c/config/set`, data);
  return res.data;
}

/**
 * 获取用户对用户所有配置
 * 
 */
export async function getAllC2CConfigs(toUserId: string): Promise<getAllC2CConfigsResponse> {
  const res = await request.get(`/airpig/api/c2c/config/${toUserId}`);
  return res.data;
}

/**
 * 获取用户对用户配置
 * 
 */
export async function getC2CConfig(toUserId: string, configKey: string): Promise<getC2CConfigResponse> {
  const res = await request.get(`/airpig/api/c2c/config/${toUserId}/${configKey}`);
  return res.data;
}

/**
 * 删除用户对用户配置
 * 
 */
export async function deleteC2CConfig(toUserId: string, configKey: string): Promise<deleteC2CConfigResponse> {
  const res = await request.delete(`/airpig/api/c2c/config/${toUserId}/${configKey}`);
  return res.data;
}

/**
 * 设置群组配置
 * 
 */
export async function setGroupConfig(data: setGroupConfigRequest): Promise<setGroupConfigResponse> {
  const res = await request.post(`/airpig/api/group/config/set`, data);
  return res.data;
}

/**
 * 获取群组所有配置
 * 
 */
export async function getGroupAllConfigs(imGroupId: string): Promise<getGroupAllConfigsResponse> {
  const res = await request.get(`/airpig/api/group/config/${imGroupId}`);
  return res.data;
}

/**
 * 获取群组配置
 * 
 */
export async function getGroupConfig(imGroupId: string, configKey: string): Promise<getGroupConfigResponse> {
  const res = await request.get(`/airpig/api/group/config/${imGroupId}/${configKey}`);
  return res.data;
}

/**
 * 删除群组配置
 * 
 */
export async function deleteGroupConfig(imGroupId: string, configKey: string): Promise<deleteGroupConfigResponse> {
  const res = await request.delete(`/airpig/api/group/config/${imGroupId}/${configKey}`);
  return res.data;
}

/**
 * 获取所有系统配置列表
 * 
 */
export async function getAllSystemConfigs(): Promise<getAllSystemConfigsResponse> {
  const res = await request.get(`/airpig/api/system/config/list`);
  return res.data;
}

/**
 * 微信第三方登录
 * 通过微信授权code登录，成功后返回用户信息和token
 */
export async function wechatLogin(data: loginRequest): Promise<loginResponse> {
  const res = await request.post(`/airpig/api/wechat/auth/login`, data);
  return res.data;
}

/**
 * 短信验证码登录
 * 通过手机号和验证码登录，成功后返回用户信息和token
 */
export async function smsLogin(data: smsLoginRequest): Promise<smsLoginResponse> {
  const res = await request.post(`/airpig/api/user/sms/login`, data);
  return res.data;
}

/**
 * 发送短信验证码
 * 向指定手机号发送验证码，通过type参数区分不同场景
 */
export async function sendSmsCode(data: sendSmsCodeRequest): Promise<sendSmsCodeResponse> {
  const res = await request.post(`/airpig/api/user/sms/code`, data);
  return res.data;
}

/**
 * 退出登录接口
 * 退出登录接口
 */
export async function logout(): Promise<logoutResponse> {
  const res = await request.post(`/airpig/api/user/logout`);
  return res.data;
}

/**
 * 用户名密码登录
 * 通过用户名和密码登录，成功后返回用户信息和token
 */
export async function pwdLogin(data: WechatLoginRequest): Promise<WechatLoginResponse> {
  const res = await request.post(`/airpig/api/user/login`, data);
  return res.data;
}

/**
 * 注销账号
 * 注销当前用户账号，注销后无法再次登录，需要重新注册
 */
export async function deactivateAccount(): Promise<deactivateAccountResponse> {
  const res = await request.post(`/airpig/api/user/deactivate`);
  return res.data;
}

/**
 * 获取微信用户手机号
 * 通过微信小程序获取用户手机号接口返回的code获取手机号
 */
export async function getPhoneNumber(data: getPhoneNumberRequest): Promise<getPhoneNumberResponse> {
  const res = await request.post(`/airpig/api/mini/phone`, data);
  return res.data;
}

/**
 * 微信小程序登录
 * 通过微信小程序code登录，成功后返回用户信息和token
 */
export async function login_2(data: login_2Request): Promise<login_2Response> {
  const res = await request.post(`/airpig/api/mini/login`, data);
  return res.data;
}

/**
 * 退出登录接口
 * 退出登录接口
 */
export async function loginOut(): Promise<loginOutResponse> {
  const res = await request.post(`/airpig/api/mini/login/out`);
  return res.data;
}

/**
 * 获取腾讯IM用户签名
 * 获取腾讯IM用户的UserSig签名信息
 */
export async function getUserSig(): Promise<getUserSigResponse> {
  const res = await request.get(`/airpig/api/mini/im/user/sig`);
  return res.data;
}

/**
 * 通过code 换取用户信息
 * 通过code换取用户信息
 */
export async function code2user(params: code2userRequest): Promise<code2userResponse> {
  const res = await request.get(`/airpig/api/mini/code2user`, { params });
  return res.data;
}

/**
 * 修改个人资料
 * 修改个人资料
 */
export async function update(data: updateRequest): Promise<updateResponse> {
  const res = await request.post(`/airpig/api/my/profile/update`, data);
  return res.data;
}

/**
 * 修改手机号
 * 修改手机号，只需验证新手机号
 */
export async function updatePhone(data: updatePhoneRequest): Promise<updatePhoneResponse> {
  const res = await request.post(`/airpig/api/my/profile/phone/update`, data);
  return res.data;
}

/**
 * 绑定手机号
 * 绑定手机号
 */
export async function bindPhone(data: bindPhoneRequest): Promise<bindPhoneResponse> {
  const res = await request.post(`/airpig/api/my/profile/phone/bind`, data);
  return res.data;
}

/**
 * 查询个人资料
 * 查询个人资料
 */
export async function detail(): Promise<detailResponse> {
  const res = await request.get(`/airpig/api/my/profile/detail`);
  return res.data;
}

/**
 * 苹果第三方登录
 * 通过苹果授权identityToken登录，成功后返回用户信息和token
 */
export async function login_3(data: login_3Request): Promise<login_3Response> {
  const res = await request.post(`/airpig/api/apple/auth/login`, data);
  return res.data;
}

/**
 * 获取所有语言列表
 * 
 */
export async function getAllLanguages(): Promise<getAllLanguagesResponse> {
  const res = await request.get(`/airpig/api/language/list`);
  return res.data;
}

/**
 * 检查导出服务状态
 * 检查聊天统计数据导出服务是否正常运行
 */
export async function checkStatus(): Promise<checkStatusResponse> {
  const res = await request.get(`/api/chat-statistics/status`);
  return res.data;
}

/**
 * 导出聊天统计数据
 * 导出指定日期范围内的聊天统计数据，返回CSV文件
 */
export async function exportChatStatistics(params: exportChatStatisticsRequest): Promise<exportChatStatisticsResponse> {
  const res = await request.get(`/api/chat-statistics/export`, { params });
  return res.data;
}

/**
 * 用户举报
 * 通过CreateReportForm创建用户举报
 */
export async function CreateReport(data: CreateReportRequest): Promise<CreateReportResponse> {
  const res = await request.post(`/airpig/api/user/report`, data);
  return res.data;
}

/**
 * 检查APP版本更新
 * 检查当前APP版本是否需要更新
 */
export async function checkVersion(data: checkVersionRequest): Promise<checkVersionResponse> {
  const res = await request.post(`/airpig/api/app/version/check`, data);
  return res.data;
}

/**
 * 获取微信JS-SDK配置
 * 获取微信JS-SDK配置信息，用于H5页面分享
 */
export async function getJsConfig(params: getJsConfigRequest): Promise<getJsConfigResponse> {
  const res = await request.get(`/airpig/api/wechat/jssdk/js-config`, { params });
  return res.data;
}

/**
 * 使用注册邀请码
 * 
 */
export async function useInvitation(params: useInvitationRequest): Promise<useInvitationResponse> {
  const res = await request.get(`/airpig/api/Invitation/use`, { params });
  return res.data;
}

/**
 * 获取注册邀请码
 * 
 */
export async function getInvitation(): Promise<getInvitationResponse> {
  const res = await request.get(`/airpig/api/Invitation/get`);
  return res.data;
}

/**
 * 申请退款
 * 对已支付订单申请退款，支持全额退款
 */
export async function refundPayment(paymentOrderNo: string, params: refundPaymentRequest): Promise<refundPaymentResponse> {
  const res = await request.post(`/api/payment/refund/${paymentOrderNo}`, { params });
  return res.data;
}

/**
 * 创建支付订单
 * 创建微信、支付宝或苹果支付订单，返回支付参数
 */
export async function createPayment(data: createPaymentRequest): Promise<createPaymentResponse> {
  const res = await request.post(`/api/payment/create`, data);
  return res.data;
}

/**
 * 取消支付订单
 * 取消未支付的订单，关闭第三方支付订单
 */
export async function cancelPayment(paymentOrderNo: string): Promise<cancelPaymentResponse> {
  const res = await request.post(`/api/payment/cancel/${paymentOrderNo}`);
  return res.data;
}

/**
 * 微信支付回调
 * 处理微信的支付结果通知
 */
export async function wechatPayCallback(data: wechatPayCallbackRequest): Promise<wechatPayCallbackResponse> {
  const res = await request.post(`/api/payment/callback/wechat`, data);
  return res.data;
}

/**
 * 苹果支付验证回调
 * 处理苹果内购的验证回调
 */
export async function applePayCallback(data: applePayCallbackRequest): Promise<applePayCallbackResponse> {
  const res = await request.post(`/api/payment/callback/apple`, data);
  return res.data;
}

/**
 * 支付宝支付回调
 * 处理支付宝的支付结果通知
 */
export async function alipayCallback(): Promise<alipayCallbackResponse> {
  const res = await request.post(`/api/payment/callback/alipay`);
  return res.data;
}

/**
 * 支付宝同步返回
 * 处理支付宝支付完成后的同步跳转
 */
export async function alipayReturn(): Promise<alipayReturnResponse> {
  const res = await request.get(`/api/payment/return/alipay`);
  return res.data;
}

/**
 * 获取支付记录
 * 分页获取当前用户的支付记录列表
 */
export async function getPaymentRecords(params: getPaymentRecordsRequest): Promise<getPaymentRecordsResponse> {
  const res = await request.get(`/api/payment/records`, { params });
  return res.data;
}

/**
 * 查询支付订单
 * 根据支付订单号查询支付状态和详细信息
 */
export async function queryPayment(paymentOrderNo: string): Promise<queryPaymentResponse> {
  const res = await request.get(`/api/payment/query/${paymentOrderNo}`);
  return res.data;
}

/**
 * 用户获取邀请情况
 * 
 */
export async function getUserInvitation(params: getUserInvitationRequest): Promise<getUserInvitationResponse> {
  const res = await request.get(`/airpig/api/Invitation/getuse`, { params });
  return res.data;
}

/**
 * 用户添加词汇
 * 添加新的词汇到用户词汇表
 */
export async function addUserVocabulary(data: addUserVocabularyRequest): Promise<addUserVocabularyResponse> {
  const res = await request.post(`/airpig/api/user/vocabulary/add`, data);
  return res.data;
}

/**
 * 搜索词汇
 * 根据关键词搜索用户词汇
 */
export async function searchUserVocabulary(params: searchUserVocabularyRequest): Promise<searchUserVocabularyResponse> {
  const res = await request.get(`/airpig/api/user/vocabulary/search`, { params });
  return res.data;
}

/**
 * 微信服务器验证
 * 用于验证微信服务器配置的有效性，验证成功返回echostr
 */
export async function verifyServer(params: verifyServerRequest): Promise<verifyServerResponse> {
  const res = await request.get(`/api/wechat/mp/airpig/api/mp/callback`, { params });
  return res.data;
}

/**
 * 微信事件回调
 * 处理微信推送的用户关注、取消关注等事件回调
 */
export async function handleWechatEvent(params: handleWechatEventRequest): Promise<handleWechatEventResponse> {
  const res = await request.post(`/api/wechat/mp/airpig/api/mp/callback`, { params });
  return res.data;
}

/**
 * queryUserOnlineStatus
 * 
 */
export async function queryUserOnlineStatus(params: queryUserOnlineStatusRequest): Promise<queryUserOnlineStatusResponse> {
  const res = await request.get(`/airpig/api/api/tencent/im/query-online-status`, { params });
  return res.data;
}

/**
 * queryUserOnlineStatusPost
 * 
 */
export async function queryUserOnlineStatusPost(data: queryUserOnlineStatusPostRequest): Promise<queryUserOnlineStatusPostResponse> {
  const res = await request.post(`/airpig/api/api/tencent/im/query-online-status`, data);
  return res.data;
}

/**
 * 用户新增词搭
 * 
 */
export async function addVocabulary(data: addVocabularyRequest): Promise<addVocabularyResponse> {
  const res = await request.post(`/airpig/api/memo/user/word/match`, data);
  return res.data;
}

/**
 * 用户刷词卡
 * 
 */
export async function swipeVocabulary(data: swipeVocabularyRequest): Promise<swipeVocabularyResponse> {
  const res = await request.post(`/airpig/api/memo/user/swipe`, data);
  return res.data;
}

/**
 * AI分析单词返回完整词汇信息
 * 
 */
export async function aIAnalysis(data: aIAnalysisRequest): Promise<aIAnalysisResponse> {
  const res = await request.post(`/airpig/api/memo/analysis`, data);
  return res.data;
}

/**
 * 获取所有词汇列表
 * 
 */
export async function getAllVocabulary(params: getAllVocabularyRequest): Promise<getAllVocabularyResponse> {
  const res = await request.get(`/airpig/api/memo/memo/list`, { params });
  return res.data;
}

