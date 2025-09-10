<template>
  <view class="page px-16">
    <view class="pb-n16 mt-24">
      <view
        class="text-18 color-primary-900 weight-700 mt-16 text-align-center"
      >
        账号注销的注意事项
      </view>

      <view class="mt-24">
        <view class="text-14 color-primary-900 weight-400 mb-8"
          >在你注销账号前，请先仔细阅读以下信息，以保证你清楚账号注销带来的后果</view
        >
        <view v-for="(tip, index) in tipsList" :key="index">
          <view class="text-14 color-primary-900 weight-700 mt-16 mb-16 line-2">
            {{ tip.title }}
          </view>
          <view
            v-for="(item, idx) in tip.items"
            :key="idx"
            class="text-12 color-grey-500 weight-400 mb-8"
          >
            {{ item }}
          </view>
        </view>
      </view>
    </view>
    <view>
      <button
        block
        style="
          background-color: var(--color-primary-600);
          border-radius: 24rpx;
          color: #fff;
          border: none;
        "
        class="weight-700 mt-16"
        @click="handleBack"
      >
        返回
      </button>

      <view
        class="text-14 color-error-600 weight-500 mt-8 text-align-center mt-16"
        @click="cancelUser"
        >已清楚并同意上述内容，确认注销账号
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ux } from "@/utils/index";
import * as userApi from "@/service/user";
import { loginOut } from "@/hooks/useUserStore";
import { appLinks } from "@/navigate";
const tipsList = [
  {
    title: "永久注销，无法登录",
    items: [
      "账号一旦注销，会解绑Apple ID、微信、电话号码，无法在登录被注销的账号",
    ],
  },
  {
    title: "产品数据将无法找回",
    items: [
      "账号一旦注销，所有与该账号相关的产品数据将被永久删除，无法找回（聊天记录、好友列表）",
    ],
  },
  {
    title: "注销后所有设备会被登出",
    items: ["账号一旦注销，所有与该账号关联的设备将被强制登出。"],
  },
];

const cancelUser = async () => {
  try {
    await userApi.deactivateUser();
    loginOut(false);
    appLinks.index.navigate({});
  } catch (e) {
    ux.tips("注销失败，请稍后再试");
  }
};

const handleBack = () => {
  ux.router(1, "back");
};
</script>

<style lang="scss" scoped>
.page {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.mt-32 {
  margin-top: 2rem;
}
.bottombtn {
  height: 48px !important;
  opacity: 1;
  width: 90% !important;
  margin: 0 auto 1rem auto;
}
.modelbtn {
  width: 50%;
}
.failed {
  width: 103px;
  height: 103px;
  margin: 0 auto;
}
.point::before {
  width: 10px;
  height: 10px;
  content: "•";
  position: absolute;
  left: 1.5rem;
}
</style>
