/**
 * API 类型定义
 * 基于 OpenAPI 规范自动生成
 */

export interface WechatPhoneForm {
  /** 微信小程序获取手机号临时凭证 */
  code: string;
}

export interface ResultMapStringString {
  code: number;
  message: string;
  data: object;
  total: number;
}

export interface WechatMiniLoginForm {
  /** 微信小程序临时登录凭证 */
  code: string;
  /** 获取手机号的code */
  phoneCode: string;
  /** 昵称 */
  nickname?: string;
  /** 头像URL */
  avatarUrl?: string;
  /** 性别：0未知，1男，2女 */
  gender?: number;
}

export interface ResultUserLoginDTO {
  code: number;
  message: string;
  data: UserLoginDTO;
  total: number;
}

export interface UserLoginDTO {
  /** 用户ID */
  userId: string;
  /** 用户名 */
  username: string;
  /** 昵称 */
  nickname: string;
  /** 头像URL */
  avatarUrl: string;
  /** 手机号 */
  phone: string;
  /** 性别：0未知，1男，2女 */
  gender: number;
  /** 登录令牌 */
  token: string;
  /** 签名 */
  userSig: string;
  /** sdkAppId */
  sdkAppId: number;
  /** 是否白名单用户 */
  isWhiteUser: boolean;
  isOfficialAccount: boolean;
}

export interface ChatGroupUpdateForm {
  /** 群组ID */
  groupId: number;
  /** 群组名称 */
  groupName?: string;
  /** 群头像URL */
  avatarUrl?: string;
  /** 群公告 */
  announcement?: string;
}

export interface ChatGroupDTO {
  /** 群组ID */
  id: number;
  /** 群组IMID */
  imGroupId: string;
  /** 群组名称 */
  groupName: string;
  /** 群头像URL */
  avatarUrl: string;
  /** 创建人ID */
  creatorId: number;
  /** 创建人昵称 */
  creatorNickname: string;
  /** 群公告 */
  announcement: string;
  /** 成员数量 */
  memberCount: number;
  /** 当前用户在群中的角色 */
  userRole: string;
  /** 创建时间 */
  createdAt: string;
}

export interface ResultChatGroupDTO {
  code: number;
  message: string;
  data: ChatGroupDTO;
  total: number;
}

export interface ResultVoid {
  code: number;
  message: string;
  data: object;
  total: number;
}

export interface ChatGroupMemberRemoveForm {
  /** 群组ID */
  groupId: number;
  /** 成员ID列表 */
  memberIds: number[];
}

export interface ChatGroupMemberAddForm {
  /** 群组ID */
  groupId: number;
  /** 成员ID列表 */
  memberIds: number[];
}

export interface ChatGroupCreateForm {
  /** 群组名称 */
  groupName: string;
  /** 群头像URL */
  avatarUrl?: string;
  /** 群公告 */
  announcement?: string;
  /** 初始成员ID列表 */
  memberIds?: number[];
}

export interface FriendRequestHandleForm {
  /** 好友请求ID */
  requestId: number;
  /** 处理结果：1-接受，2-拒绝 */
  action: number;
}

export interface FriendRequestForm {
  /** 接收者用户ID */
  toUserId: number;
  /** 请求备注 */
  remark?: string;
}

export interface FriendRemarkForm {
  /** 好友用户ID */
  friendUserId: number;
  /** 新备注名 */
  remark: string;
}

export interface ResultTencentImUserDTO {
  code: number;
  message: string;
  data: TencentImUserDTO;
  total: number;
}

export interface TencentImUserDTO {
  /** 用户ID */
  userId: number;
  /** 用户签名 */
  userSig: string;
  /** 昵称 */
  nickname: string;
  /** 头像URL */
  avatarUrl: string;
}

export interface GroupMessageQuery {
  /** 群组ID */
  groupID: string;
  /** 序列号 */
  sequence?: number;
  /** 条数 */
  count?: number;
}

export interface GroupMessage {
  /** 消息ID */
  id: string;
  /** 群组ID */
  groupId: string;
  /** 发送方用户ID */
  fromAccount: string;
  /** 消息内容 */
  msgBody: string;
  /** 翻译后的内容 */
  translatedContent: string;
  /** 解析后的消息内容对象 */
  parsedContent: object;
  /** 消息类型 */
  msgType: string;
  /** 消息序列号 */
  msgSeq: number;
  /** 消息随机数 */
  msgRandom: number;
  /** 消息时间戳 */
  msgTime: number;
  /** 消息发送时间 */
  sendTime: string;
  /** 消息云自定义数据 */
  cloudCustomData: string;
  /** 消息离线推送信息 */
  offlinePushInfo: object;
  /** 群消息接收者列表 */
  groupMemberAccounts: string[];
  /** 删除状态，0-未删除，1-已删除 */
  deleteStatus: number;
  /** 创建时间 */
  createTime: string;
  /** 更新时间 */
  updateTime: string;
}

export interface ResultListGroupMessage {
  code: number;
  message: string;
  data: any[];
  total: number;
}

export interface C2CMessageQuery {
  /** 接收方用户ID */
  peerAccount: string;
  /** 消息索引键 */
  messageKey: string;
  /** 上次消息时间戳 */
  lastMessageTime: number;
  /** 请求消息数量 */
  count: number;
}

export interface C2CMessage {
  /** 消息ID */
  id: string;
  /** 发送方用户ID */
  fromAccount: string;
  /** 接收方用户ID */
  toAccount: string;
  /** 消息内容 */
  msgBody: string;
  /** 消息类型 */
  msgType: string;
  /** 消息序列号 */
  msgSeq: number;
  /** 消息随机数 */
  msgRandom: number;
  /** 消息时间戳 */
  msgTime: number;
  /** 消息发送时间 */
  sendTime: string;
  /** 消息云自定义数据 */
  cloudCustomData: string;
  /** 消息离线推送信息 */
  offlinePushInfo: object;
  /** 删除状态，0-未删除，1-已删除 */
  deleteStatus: number;
  /** 创建时间 */
  createTime: string;
  /** 更新时间 */
  updateTime: string;
}

export interface ResultListC2CMessage {
  code: number;
  message: string;
  data: any[];
  total: number;
}

export interface ChatGroupMemberQuery {
  /** 群组ID */
  groupId: number;
  /** 成员昵称关键词 */
  keyword: string;
  /** 页码 */
  pageNum: number;
  /** 每页数量 */
  pageSize: number;
}

export interface ChatGroupMemberDTO {
  /** 成员ID */
  id: number;
  /** 群组ID */
  groupId: number;
  /** 用户ID */
  userId: number;
  /** 用户名 */
  username: string;
  /** 用户昵称 */
  nickname: string;
  /** 群内昵称 */
  nicknameInGroup: string;
  /** 头像URL */
  avatarUrl: string;
  /** 角色 */
  role: string;
  /** 加入时间 */
  joinTime: string;
  /** 状态：1在群，2离群 */
  status: number;
}

export interface ResultListChatGroupMemberDTO {
  code: number;
  message: string;
  data: any[];
  total: number;
}

export interface ChatGroupQuery {
  /** 群组名称关键词 */
  keyword: string;
  /** 页码 */
  pageNum: number;
  /** 每页数量 */
  pageSize: number;
}

export interface ResultListChatGroupDTO {
  code: number;
  message: string;
  data: any[];
  total: number;
}

export interface UserSearchQuery {
  /** 关键词（用户名/昵称/手机号） */
  keyword: string;
  /** 页码 */
  pageNum: number;
  /** 每页数量 */
  pageSize: number;
}

export interface ResultListUserSearchDTO {
  code: number;
  message: string;
  data: any[];
  total: number;
}

export interface UserSearchDTO {
  /** 用户ID */
  id: number;
  /** 用户名 */
  username: string;
  /** 昵称 */
  nickname: string;
  /** 头像URL */
  avatarUrl: string;
  /** 性别：0未知，1男，2女 */
  gender: number;
  /** 是否已是好友 */
  isFriend: boolean;
}

export interface FriendRequestQuery {
  /** 用户ID */
  userId: number;
  /** 请求状态：0-待处理，1-已接受，2-已拒绝 */
  status: number;
  /** 页码 */
  pageNum: number;
  /** 每页数量 */
  pageSize: number;
}

export interface FriendRequestDTO {
  /** 请求ID */
  id: number;
  /** 发送者用户ID */
  fromUserId: number;
  /** 发送者用户名 */
  fromUsername: string;
  /** 发送者昵称 */
  fromNickname: string;
  /** 发送者头像URL */
  fromAvatarUrl: string;
  /** 请求状态：0-待处理，1-已接受，2-已拒绝 */
  status: number;
  /** 请求备注 */
  remark: string;
  /** 请求时间 */
  requestTime: string;
}

export interface ResultListFriendRequestDTO {
  code: number;
  message: string;
  data: any[];
  total: number;
}

export interface FriendQuery {
  /** 用户ID */
  userId: number;
  /** 好友昵称关键词 */
  keyword: string;
  /** 页码 */
  pageNum: number;
  /** 每页数量 */
  pageSize: number;
}

export interface FriendDTO {
  /** 好友关系ID */
  id: number;
  /** 用户ID */
  userId: number;
  /** 用户名 */
  username: string;
  /** 昵称 */
  nickname: string;
  /** 头像URL */
  avatarUrl: string;
  /** 性别：0未知，1男，2女 */
  gender: number;
  /** 备注名 */
  remark: string;
  /** 在线状态 */
  status: string;
  /** 成为好友的时间 */
  createdAt: string;
}

export interface ResultListFriendDTO {
  code: number;
  message: string;
  data: any[];
  total: number;
}

export interface ChatContent {
  text: string;
}

export interface ChatElement {
  type: string;
  content: object;
}

export interface ChatUserInfo {
  role: number;
  userID: string;
}

export interface GroupChatData {
  actionStatus: string;
  complete: number;
  errorCode: number;
  errorInfo: string;
  groupID: string;
  messageList: any[];
  nextSequence: number;
}

export interface GroupHistoryMessage {
  msgId: string;
  checkResult: number;
  clientTime: number;
  cloudCustomData: string;
  elements: any[];
  event: number;
  from: string;
  groupProfile: GroupProfile;
  messageFromAccountExtraInformation: MessageExtraInfo;
  messageRemindType: number;
  msgPlaceHolder: number;
  nick: string;
  to: string;
  toAccountType: number;
  isPlaceMessage: number;
  isSupportExtension: number;
  messageVersion: number;
  priority: number;
  random: number;
  sequence: number;
  time: number;
  tinyID: string;
  toGroupID: string;
  uinExtInfo: ChatUserInfo;
  isRead: boolean;
  readNum: number;
  unreadNum: number;
}

export interface GroupProfile {
  avatar: string;
  from: string;
  to: string;
  nick: string;
  msgPlaceHolder: string;
  fromAccountType: number;
  toAccountType: number;
  groupCode: number;
  groupID: string;
  groupName: string;
  groupType: string;
  hugeGroupFlag: number;
  messageRemindType: number;
  messageFromAccountExtraInformation: ChatUserInfo;
}

export interface MessageExtraInfo {
  role: number;
  userID: string;
}

export interface ResultGroupChatData {
  code: number;
  message: string;
  data: GroupChatData;
  total: number;
}

export interface MessageControlInfo {
  excludedFromLastMessage: number;
  excludedFromUnreadCount: number;
  noMuteNotifications: number;
}

export interface ResultSingleChatData {
  code: number;
  message: string;
  data: SingleChatData;
  total: number;
}

export interface SingleChatData {
  actionStatus: string;
  complete: number;
  errorCode: number;
  errorInfo: string;
  lastMessageTime: number;
  maxCnt: number;
  messageKey: number;
  messageList: any[];
}

export interface SingleChatMessage {
  msgId: string;
  checkResult: number;
  clientTime: number;
  elements: any[];
  from: string;
  messageControlInfo: MessageControlInfo;
  messageVersion: number;
  msgFlagBits: number;
  needReadReceipt: number;
  random: number;
  readReceiptSentByPeer: number;
  sequence: number;
  time: number;
  tinyID: string;
  to: string;
  cloudCustomData: string;
  isRead: boolean;
  supportExtension: boolean;
}

export interface MyProfileForm {
  /** 昵称 */
  nickname: string;
  /** 头像URL */
  avatarUrl: string;
  /** 性别：0未知，1男，2女 */
  gender: number;
}

export interface MyProfileDTO {
  userId: number;
  /** 昵称 */
  nickname: string;
  /** 头像URL */
  avatarUrl: string;
  /** 二维码url˚ */
  qrCodeUrl: string;
  /** 性别：0未知，1男，2女 */
  gender: number;
  /** 手机号 */
  phone: string;
}

export interface ResultMyProfileDTO {
  code: number;
  message: string;
  data: MyProfileDTO;
  total: number;
}

export interface ResultString {
  code: number;
  message: string;
  data: string;
  total: number;
}

export interface ResultWordDictionaryDTO {
  code: number;
  message: string;
  data: WordDictionaryDTO;
  total: number;
}

export interface WordDefinitionDTO {
  /** 定义 */
  definition: string;
  /** 中文翻译 */
  translationZh: string;
  /** 例句列表 */
  examples: string[];
}

export interface WordDictionaryDTO {
  /** ID */
  id: string;
  /** 词汇 */
  word: string;
  /** 语言代码 */
  language: string;
  /** 音标 */
  phonetic: string;
  /** 标签列表 */
  tags: string[];
  /** 词汇定义列表 */
  definitions: any[];
  /** 创建时间 */
  createdAt: string;
  /** 更新时间 */
  updatedAt: string;
}

export interface UserConfigForm {
  configKey: string;
  configValue: string;
  description?: string;
}

export interface ResultBoolean {
  code: number;
  message: string;
  data: boolean;
  total: number;
}

export interface MessageContext {
  /** 消息ID */
  messageId: string;
  /** 消息类型：single(单聊)/group(群聊) */
  messageType: string;
  /** 消息内容 */
  content: string;
  /** 发送者ID */
  senderId: string;
  /** 发送时间 */
  sendTime: string;
}

export interface ResultWordContextsDTO {
  code: number;
  message: string;
  data: WordContextsDTO;
  total: number;
}

export interface WordContextsDTO {
  /** 词汇 */
  word: string;
  /** 相关聊天记录上下文 */
  contexts: any[];
}

export interface FrequentWordHistoryQuery {
  /** 开始日期，格式：yyyy-MM-dd */
  startDate: string;
  /** 结束日期，格式：yyyy-MM-dd */
  endDate: string;
  /** 页码，从1开始 */
  pageNum: number;
  /** 每页记录数 */
  pageSize: number;
}

export interface FrequentWordDTO {
  /** ID */
  id: string;
  /** 词典ID */
  dictionaryId: string;
  /** 词汇 */
  word: string;
  /** 语言代码 */
  language: string;
  /** 出现频率 */
  frequency: number;
  /** 记录日期，格式：yyyy-MM-dd */
  recordDate: string;
  /** 创建时间 */
  createdAt: string;
}

export interface FrequentWordHistoryDTO {
  /** 日期范围 */
  dateRange: string;
  /** 高频词汇列表 */
  frequentWords: any[];
  /** 总记录数 */
  total: number;
}

export interface ResultFrequentWordHistoryDTO {
  code: number;
  message: string;
  data: FrequentWordHistoryDTO;
  total: number;
}

export interface ResultListFrequentWordDTO {
  code: number;
  message: string;
  data: any[];
  total: number;
}

export interface ResultListUserConfigDTO {
  code: number;
  message: string;
  data: any[];
  total: number;
}

export interface UserConfigDTO {
  /** 配置ID */
  id: number;
  /** 配置键 */
  configKey: string;
  /** 配置值 */
  configValue: string;
  /** 配置描述 */
  description: string;
}

export interface TextToSpeechForm {
  text: string;
  gender: number;
  code: string;
  md5: string;
}

export interface DictionaryForm {
}

export interface ExampleDTO {
  english: string;
  chinese: string;
}

export interface PhraseDTO {
  phrase: string;
  meaning: string;
}

export interface ResultListWordCardDTO {
  code: number;
  message: string;
  data: any[];
  total: number;
}

export interface SimilarWordDTO {
  word: string;
  meaning: string;
}

export interface WordCardDTO {
  /** 用户词汇ID */
  userVocabularyId: number;
  /** 词典ID */
  vocabularyId: number;
  /** 单词/词搭原文 */
  word: string;
  /** 翻译 */
  translate: string;
  /** 用户稳定度值 */
  stability: number;
  /** 用户状态：陌生 / 较悉 / 掌握 */
  status: string;
  /** 用户单词记忆面积用于排序 */
  memoryArea: number;
  /** 最后练习时间 */
  lastPracticeTime: string;
  contextJson: ContextJson;
  /** 是否有父级单词 */
  hasParent: boolean;
}

export interface ModifyTagForm {
  /** 单词ID */
  wordId: number;
  /** 单词标签 */
  tag: number;
}

export interface DeleteWordFrom {
  /** 单词ID */
  wordId: number;
}

export interface UserCorpusForm {
  /** 单词ID */
  wordId: number;
  /** 语言 */
  language: string;
  /** 单词 */
  word: string;
  /** 中文语料 */
  chineseText: string;
  /** 原文语料 */
  originalText: string;
}

export interface QueryWordForm {
  /** 单词 */
  word: string;
}

export interface QueryWordDTO {
  wordId: number;
  word: string;
  audioUrl: string;
  americanPhonetic: string;
  definition: string;
  examples: any[];
  phrases: any[];
  similarWords: any[];
}

export interface ResultQueryWordDTO {
  code: number;
  message: string;
  data: QueryWordDTO;
  total: number;
}

export interface WordQuery {
  /** 单词 */
  word: string;
}

export interface TranslateForm {
  /** 原文语言代码，如 zh=中文，english=英文，ja=日文，fr=法文，de=德文，es=西班牙语，it=意大利文，ru=俄文，pt=葡萄牙文，ar=阿拉伯文 */
  sourceLanguage: string;
  /** 目标语言代码，如 zh=中文，english=英文，ja=日文，fr=法文，de=德文，es=西班牙语，it=意大利文，ru=俄文，pt=葡萄牙文，ar=阿拉伯文 */
  targetLanguage: string;
  /** 文本 */
  text: string;
}

export interface ResultTranslateDTO {
  code: number;
  message: string;
  data: TranslateDTO;
  total: number;
}

export interface TranslateDTO {
  /** 原文语言代码，如 zh=中文，english=英文，ja=日文，fr=法文，de=德文，es=西班牙语，it=意大利文，ru=俄文，pt=葡萄牙文，ar=阿拉伯文 */
  sourceLanguage: string;
  /** 目标语言代码，如 zh=中文，english=英文，ja=日文，fr=法文，de=德文，es=西班牙语，it=意大利文，ru=俄文，pt=葡萄牙文，ar=阿拉伯文 */
  targetLanguage: string;
  /** 原文 */
  originalSentence: string;
  /** 译文 */
  translateSentence: string;
}

export interface ExampleUserDTO {
  originalText: string;
  chineseText: string;
  markStatus: number;
}

export interface VersionInfo {
  id: number;
  versionKey: string;
  versionInfo: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface ResultListVersionInfo {
  code: number;
  message: string;
  data: any[];
  total: number;
}

export interface VersionAuditForm {
  /** 版本号 */
  versionKey: string;
  /** 状态码：0=未审核，1=通过，2=拒绝 */
  status: number;
}

export interface UserLoginForm {
  /** 用户名 */
  username: string;
  /** 密码 */
  password: string;
}

export interface SmsLoginForm {
  /** 手机号 */
  phone: string;
  /** 验证码 */
  code: string;
  /** 短信类型 */
  smsType: string;
}

export interface SmsSendForm {
  /** 手机号 */
  phone: string;
  /** 短信类型 */
  type: string;
}

export interface GroupConfigForm {
  /** 腾讯IM群组ID */
  imGroupId: string;
  /** 配置键 */
  configKey: string;
  /** 配置值 */
  configValue?: string;
  /** 配置描述 */
  description?: string;
}

export interface C2CConfigForm {
  /** 目标用户ID */
  toUserId: number;
  /** 配置键 */
  configKey: string;
  /** 配置值 */
  configValue?: string;
  /** 配置描述 */
  description?: string;
}

export interface GroupConfigDTO {
  /** 配置ID */
  id: number;
  /** 配置键 */
  configKey: string;
  /** 配置值 */
  configValue: string;
  /** 群组ID */
  groupId: string;
  /** 腾讯IM群组ID */
  imGroupId: string;
  /** 配置描述 */
  description: string;
}

export interface ResultListGroupConfigDTO {
  code: number;
  message: string;
  data: any[];
  total: number;
}

export interface C2CConfigDTO {
  /** 配置ID */
  id: number;
  /** 配置键 */
  configKey: string;
  /** 配置值 */
  configValue: string;
  /** 源用户ID */
  fromUserId: string;
  /** 目标用户ID */
  toUserId: string;
  /** 配置描述 */
  description: string;
}

export interface ResultListC2CConfigDTO {
  code: number;
  message: string;
  data: any[];
  total: number;
}

export interface PhoneUpdateForm {
  /** 新手机号 */
  phone: string;
  /** 验证码 */
  code: string;
}

export interface PhoneBindForm {
  /** 新手机号 */
  phone: string;
  /** 验证码 */
  code: string;
}

export interface WechatAuthLoginForm {
  /** 微信授权临时登录凭证 */
  code: string;
}

export interface Language {
  id: number;
  code: string;
  name: string;
  translateError: string;
  deleted: number;
  createTime: string;
  updateTime: string;
}

export interface ResultListLanguage {
  code: number;
  message: string;
  data: any[];
  total: number;
}

export interface ResultLanguage {
  code: number;
  message: string;
  data: Language;
  total: number;
}

export interface AppleAuthLoginForm {
  /** 苹果授权身份令牌 */
  identityToken: string;
  /** 昵称 */
  nickname?: string;
  /** 邮箱 */
  email?: string;
}

export interface ChatGroupSearchDTO {
  /** 群组ID */
  id: number;
  /** 群组IMID */
  imGroupId: string;
  /** 群组名称 */
  groupName: string;
  /** 群头像URL */
  avatarUrl: string;
  /** 群公告 */
  announcement: string;
  /** 创建时间 */
  createdAt: string;
}

export interface ResultListChatGroupSearchDTO {
  code: number;
  message: string;
  data: any[];
  total: number;
}

export interface CreateReportForm {
  /** 被举报人ID */
  reportedUserId: string;
  /** 被举报的消息ID */
  messageId: string;
  /** 被举报的消息内容 */
  messageContent: string;
  /** 被举报消息的创建时间，格式：yyyy-MM-dd HH:mm:ss */
  messageCreateTime: number;
  /** 举报原因 */
  reportReason: string;
  /** 类型字段 1为文字，2为图片，3为音频，4为视频 */
  type: number;
}

export interface AppVersionCheckForm {
  /** 平台类型：ios、android、harmony */
  platform: string;
  /** 当前APP版本号 */
  currentVersion: string;
}

export interface AppVersionCheckDTO {
  /** 是否需要更新 */
  needUpdate: boolean;
  /** 是否强制更新（当前版本低于最低版本时） */
  forceUpdate: boolean;
  /** 更新标题 */
  title: string;
  /** 更新内容 */
  updateMessage: string;
  /** 应用商店下载链接 */
  storeUrl: string;
  /** 最新版本号 */
  latestVersion: string;
}

export interface ResultAppVersionCheckDTO {
  code: number;
  message: string;
  data: AppVersionCheckDTO;
  total: number;
}

export interface ResultObject {
  code: number;
  message: string;
  data: object;
  total: number;
}

export interface ResultWechatJsConfigDTO {
  code: number;
  message: string;
  data: WechatJsConfigDTO;
  total: number;
}

export interface WechatJsConfigDTO {
  /** 微信公众号AppId */
  appId: string;
  /** 时间戳 */
  timestamp: number;
  /** 随机字符串 */
  nonceStr: string;
  /** 签名 */
  signature: string;
  /** 当前页面URL */
  url: string;
}

export interface RegisterInvitationDTO {
  /** 主键id */
  id: number;
  /** 邀请码 */
  code: string;
  /** 邀请码类型 */
  type: number;
}

export interface ResultRegisterInvitationDTO {
  code: number;
  message: string;
  data: RegisterInvitationDTO;
  total: number;
}

export interface PaymentCreateForm {
  productId: number;
  amount: number;
  paymentType: string;
  description?: string;
  extraData?: string;
}

export interface PaymentResultDTO {
  paymentOrderNo: string;
  thirdPartyOrderNo: string;
  paymentType: string;
  paymentStatus: string;
  amount: number;
  paidAt: string;
  paymentUrl: string;
  qrCode: string;
  errorMessage: string;
  extraData: string;
}

export interface ResultPaymentResultDTO {
  code: number;
  message: string;
  data: PaymentResultDTO;
  total: number;
}

export interface ApplePaymentVerifyForm {
  receiptData: string;
  productId: string;
  transactionId: string;
  sandbox?: boolean;
}

export interface PaymentRecord {
  id: number;
  paymentOrderNo: string;
  thirdPartyOrderNo: string;
  userId: number;
  productId: number;
  amount: number;
  paymentType: string;
  paymentStatus: string;
  description: string;
  callbackData: string;
  paidAt: string;
  expireAt: string;
  createdAt: string;
  updatedAt: string;
  remark: string;
}

export interface ResultListPaymentRecord {
  code: number;
  message: string;
  data: any[];
  total: number;
}

export interface ResultListSystemConfig {
  code: number;
  message: string;
  data: any[];
  total: number;
}

export interface SystemConfig {
  id: number;
  configKey: string;
  configValue: string;
  createdAt: string;
  updatedAt: string;
  deleted: number;
}

export interface UseInvitationForm {
  /** 邀请码 */
  code: string;
}

export interface GetUseInvitationDTO {
  /** 被邀请用户ID */
  id: number;
  /** 用户头像 */
  avatarUrl: string;
  /** 用户昵称 */
  nickname: string;
}

export interface ResultListGetUseInvitationDTO {
  code: number;
  message: string;
  data: any[];
  total: number;
}

export interface AddUserVocabularyForm {
  /** 上下文JSON */
  contextJson: string;
  /** 译文 */
  translation: string;
  /** 原文 */
  word: string;
  /** 发音音频URL */
  audioUrl?: string;
}

export interface OrderItem {
  column: string;
  asc: boolean;
}

export interface PageUserVocabulary {
  records: any[];
  total: number;
  size: number;
  current: number;
  orders: any[];
  optimizeCountSql: PageUserVocabulary;
  searchCount: PageUserVocabulary;
  optimizeJoinOfCountSql: boolean;
  maxLimit: number;
  countId: string;
  pages: number;
}

export interface ResultPageUserVocabulary {
  code: number;
  message: string;
  data: PageUserVocabulary;
  total: number;
}

export interface UserVocabulary {
  id: number;
  userId: number;
  translation: string;
  word: string;
  audioUrl: string;
  collocations: string;
  grammar: string;
  exampleSentence: string;
  category: string;
  contextJson: string;
  createdAt: string;
}

export interface QueryOnlineStatusRequest {
  userIds: string[];
}

export interface Vocabulary {
  id: number;
  word: string;
  translation: string;
  phonetic: string;
  audioUrl: string;
  grammar: string;
  examples: string;
  createdAt: string;
  parentId: number;
  languageCode: string;
}

export interface WordAnalysisForm {
  /** 用户点击消息中的单词 */
  word: string;
  /** 点击收藏的句子 */
  originalSentence?: string;
  /** 语言代码 */
  languageCode?: string;
}

export interface ExampleSentenceDTO {
  /** 例句 */
  sentence: string;
  /** 翻译 */
  translation: string;
  /** 音频URL */
  audioUrl: string;
}

export interface ResultVocabularyAnalysisDTO {
  code: number;
  message: string;
  data: VocabularyAnalysisDTO;
  total: number;
}

export interface VocabularyAnalysisDTO {
  /** 单词ID */
  id: number;
  /** 单词 */
  word: string;
  /** 翻译 */
  translation: string;
  /** 音标 */
  phonetic: string;
  /** 音频URL */
  audioUrl: string;
  /** 常见词搭 */
  collocations: any[];
  /** 例句 */
  examples: any[];
}

export interface WordAnalysisDTO {
  /** 词搭 */
  word: string;
  /** 翻译 */
  translate: string;
}

export interface Content {
  /** 原文 */
  original: string;
  /** 翻译 */
  translation: string;
  /** 音频URL */
  audioUrl: string;
}

export interface ContextJson {
  previous: Sentence;
  current: Sentence;
  next: Sentence;
}

export interface Sentence {
  /** 消息ID */
  id: string;
  /** 性别 */
  gender: string;
  content: Content;
}

export interface WordMatchForm {
  /** 词搭 */
  word: string;
  /** 翻译 */
  translation: string;
}

export interface WordSelectionForm {
  /** 用户ID */
  userId: number;
  /** 基础单词，比如 translate */
  baseWord: string;
  contextJson: ContextJson;
  /** 用户选择的词搭列表 */
  selectedCollocations: any[];
}

export interface WordCardForm {
  /** 卷王专属(天天复习、冲刺型选手)这个按钮对应的是W=3
节奏大师(每周两三次，稳中求进选手)     这个按钮对应的是W=7
摆烂天尊(半个月两三次，佛系随缘选手)   这个按钮对应的是W=14 */
  w: number;
  /** 页码（从1开始） */
  pageNum: number;
  /** 每页大小 */
  pageSize: number;
}

export interface SwipeWordCardsForm {
  /** 用户单词ID */
  userWordId: number;
  /** 单词学习状态 */
  status: string;
}

export type updateChatGroupRequest = ChatGroupUpdateForm;
export type updateChatGroupResponse = ResultChatGroupDTO;
export type quitGroupResponse = ResultVoid;
export type removeGroupMembersRequest = ChatGroupMemberRemoveForm;
export type removeGroupMembersResponse = ResultVoid;
export type addGroupMembersRequest = ChatGroupMemberAddForm;
export type addGroupMembersResponse = ResultVoid;
export type deleteChatGroupResponse = ResultVoid;
export type createChatGroupRequest = ChatGroupCreateForm;
export type createChatGroupResponse = ResultChatGroupDTO;
export interface searchGroupListRequest {
  keyword: string;
}
export type searchGroupListResponse = ResultListChatGroupSearchDTO;
export interface getGroupMemberListRequest {
  /** 群组ID */
  groupId?: number;
  /** 成员昵称关键词 */
  keyword?: string;
  /** 页码 */
  pageNum?: number;
  /** 每页数量 */
  pageSize?: number;
}
export type getGroupMemberListResponse = ResultListChatGroupMemberDTO;
export interface getChatGroupListRequest {
  /** 群组名称关键词 */
  keyword?: string;
  /** 页码 */
  pageNum?: number;
  /** 每页数量 */
  pageSize?: number;
}
export type getChatGroupListResponse = ResultListChatGroupDTO;
export type getChatGroupDetailResponse = ResultChatGroupDTO;
export type deleteFriendResponse = ResultVoid;
export type handleFriendRequestRequest = FriendRequestHandleForm;
export type handleFriendRequestResponse = ResultVoid;
export type sendFriendRequestRequest = FriendRequestForm;
export type sendFriendRequestResponse = ResultVoid;
export type updateFriendRemarkRequest = FriendRemarkForm;
export type updateFriendRemarkResponse = ResultVoid;
export interface searchUsersRequest {
  /** 关键词（用户名/昵称/手机号） */
  keyword?: string;
  /** 页码 */
  pageNum?: number;
  /** 每页数量 */
  pageSize?: number;
}
export type searchUsersResponse = ResultListUserSearchDTO;
export interface getFriendRequestListRequest {
  /** 用户ID */
  userId?: number;
  /** 请求状态：0-待处理，1-已接受，2-已拒绝 */
  status?: number;
  /** 页码 */
  pageNum?: number;
  /** 每页数量 */
  pageSize?: number;
}
export type getFriendRequestListResponse = ResultListFriendRequestDTO;
export interface getFriendListRequest {
  /** 用户ID */
  userId?: number;
  /** 好友昵称关键词 */
  keyword?: string;
  /** 页码 */
  pageNum?: number;
  /** 每页数量 */
  pageSize?: number;
}
export type getFriendListResponse = ResultListFriendDTO;
export type uploadFileRequest = any;
export type uploadFileResponse = ResultString;
export interface handleUnifiedCallbackQueryParams {
  SdkAppid: number;
  Sign: string;
  RequestTime: number;
}
export type handleUnifiedCallbackRequest = any;
export type handleUnifiedCallbackResponse = ResultVoid;
export interface queryGroupMessagesRequest {
  /** 群组ID */
  groupID: string;
  /** 序列号 */
  sequence?: number;
  /** 条数 */
  count?: number;
}
export type queryGroupMessagesResponse = ResultGroupChatData;
export interface queryC2CMessagesRequest {
  /** 接收方用户ID */
  peerAccount?: string;
  /** 消息索引键 */
  messageKey?: string;
  /** 上次消息时间戳 */
  lastMessageTime?: number;
  /** 请求消息数量 */
  count?: number;
}
export type queryC2CMessagesResponse = ResultSingleChatData;
export type convertTextToSpeechRequest = TextToSpeechForm;
export type convertTextToSpeechResponse = ResultObject;
export type convertTextToSpeechAsyncRequest = TextToSpeechForm;
export type convertTextToSpeechAsyncResponse = ResultObject;
export type generateUniqueIdResponse = ResultString;
export type generateUniqueIdWithPrefixResponse = ResultString;
export interface listVersionsRequest {
  version: string;
}
export type listVersionsResponse = ResultBoolean;
export type translateRequest = TranslateForm;
export type translateResponse = ResultTranslateDTO;
export type setUserConfigRequest = UserConfigForm;
export type setUserConfigResponse = ResultBoolean;
export type getUserConfigsResponse = ResultListUserConfigDTO;
export interface getUserConfigRequest {
  configKey: string;
}
export type getUserConfigResponse = ResultString;
export interface deleteUserConfigRequest {
  configKey: string;
}
export type deleteUserConfigResponse = ResultBoolean;
export type setC2CConfigRequest = C2CConfigForm;
export type setC2CConfigResponse = ResultBoolean;
export type getAllC2CConfigsResponse = ResultListC2CConfigDTO;
export type getC2CConfigResponse = ResultString;
export type deleteC2CConfigResponse = ResultBoolean;
export type setGroupConfigRequest = GroupConfigForm;
export type setGroupConfigResponse = ResultBoolean;
export type getGroupAllConfigsResponse = ResultListGroupConfigDTO;
export type getGroupConfigResponse = ResultString;
export type deleteGroupConfigResponse = ResultBoolean;
export type getAllSystemConfigsResponse = ResultListSystemConfig;
export type loginRequest = WechatAuthLoginForm;
export type loginResponse = ResultUserLoginDTO;
export type smsLoginRequest = SmsLoginForm;
export type smsLoginResponse = ResultUserLoginDTO;
export type sendSmsCodeRequest = SmsSendForm;
export type sendSmsCodeResponse = ResultVoid;
export type logoutResponse = ResultVoid;
export type WechatLoginRequest = UserLoginForm;
export type WechatLoginResponse = ResultUserLoginDTO;
export type deactivateAccountResponse = ResultVoid;
export type getPhoneNumberRequest = WechatPhoneForm;
export type getPhoneNumberResponse = ResultMapStringString;
export type login_2Request = WechatMiniLoginForm;
export type login_2Response = ResultUserLoginDTO;
export type loginOutResponse = ResultVoid;
export type getUserSigResponse = ResultTencentImUserDTO;
export interface code2userRequest {
  code: string;
}
export type code2userResponse = ResultUserLoginDTO;
export type updateRequest = MyProfileForm;
export type updateResponse = ResultVoid;
export type updatePhoneRequest = PhoneUpdateForm;
export type updatePhoneResponse = ResultBoolean;
export type bindPhoneRequest = PhoneBindForm;
export type bindPhoneResponse = ResultUserLoginDTO;
export type detailResponse = ResultMyProfileDTO;
export type login_3Request = AppleAuthLoginForm;
export type login_3Response = ResultUserLoginDTO;
export type getAllLanguagesResponse = ResultListLanguage;
export type checkStatusResponse = ResultString;
export interface exportChatStatisticsRequest {
  /** 开始日期（格式：yyyy-MM-dd） */
  startDate: string;
  /** 结束日期（格式：yyyy-MM-dd） */
  endDate: string;
}
export type exportChatStatisticsResponse = string;
export type CreateReportRequest = CreateReportForm;
export type CreateReportResponse = ResultBoolean;
export type checkVersionRequest = AppVersionCheckForm;
export type checkVersionResponse = ResultAppVersionCheckDTO;
export interface getJsConfigRequest {
  /** 当前页面URL */
  url: string;
}
export type getJsConfigResponse = ResultWechatJsConfigDTO;
export interface useInvitationRequest {
  /** 邀请码 */
  code: string;
}
export type useInvitationResponse = ResultBoolean;
export type getInvitationResponse = ResultRegisterInvitationDTO;
export interface refundPaymentRequest {
  /** 退款原因 */
  reason?: string;
}
export type refundPaymentResponse = ResultBoolean;
export type createPaymentRequest = PaymentCreateForm;
export type createPaymentResponse = ResultPaymentResultDTO;
export type cancelPaymentResponse = ResultBoolean;
export type wechatPayCallbackRequest = any;
export type wechatPayCallbackResponse = string;
export type applePayCallbackRequest = ApplePaymentVerifyForm;
export type applePayCallbackResponse = ResultBoolean;
export type alipayCallbackResponse = string;
export type alipayReturnResponse = string;
export interface getPaymentRecordsRequest {
  /** 页码，从1开始 */
  page?: number;
  /** 每页数量，最大100 */
  size?: number;
}
export type getPaymentRecordsResponse = ResultListPaymentRecord;
export type queryPaymentResponse = ResultPaymentResultDTO;
export interface getUserInvitationRequest {
  pageNum?: number;
  pageSize?: number;
}
export type getUserInvitationResponse = ResultListGetUseInvitationDTO;
export type addUserVocabularyRequest = AddUserVocabularyForm;
export type addUserVocabularyResponse = ResultBoolean;
export interface searchUserVocabularyRequest {
  keyword: string;
  current?: number;
  size?: number;
}
export type searchUserVocabularyResponse = ResultPageUserVocabulary;
export interface verifyServerRequest {
  signature: string;
  timestamp: string;
  nonce: string;
  echostr: string;
}
export type verifyServerResponse = string;
export interface handleWechatEventRequest {
  signature: string;
  timestamp: string;
  nonce: string;
}
export type handleWechatEventResponse = string;
export interface queryUserOnlineStatusRequest {
  userIds: string;
}
export type queryUserOnlineStatusResponse = any;
export type queryUserOnlineStatusPostRequest = QueryOnlineStatusRequest;
export type queryUserOnlineStatusPostResponse = any;
export type addVocabularyRequest = WordSelectionForm;
export type addVocabularyResponse = ResultBoolean;
export type swipeVocabularyRequest = SwipeWordCardsForm;
export type swipeVocabularyResponse = ResultBoolean;
export type aIAnalysisRequest = WordAnalysisForm;
export type aIAnalysisResponse = ResultVocabularyAnalysisDTO;
export interface getAllVocabularyRequest {
  /** 卷王专属(天天复习、冲刺型选手)这个按钮对应的是W=3
节奏大师(每周两三次，稳中求进选手)     这个按钮对应的是W=7
摆烂天尊(半个月两三次，佛系随缘选手)   这个按钮对应的是W=14 */
  w?: number;
  /** 页码（从1开始） */
  pageNum?: number;
  /** 每页大小 */
  pageSize?: number;
}
export type getAllVocabularyResponse = ResultListWordCardDTO;
