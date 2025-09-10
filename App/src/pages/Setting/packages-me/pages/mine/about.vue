<template>
  <view class="profile">
    <view class="profile-header">
      <image class="profile-logo" src="/static/logo_active.png"></image>
      <text class="profile-name">空气小猪</text>
      <!-- #ifndef MP-WEIXIN -->
      <text class="profile-version">版本: V {{ appVersion }}</text>
      <!-- #endif -->
    </view>
    <view class="profile-body">
      <uni-list>
        <uni-list-item
          showArrow
          title="用户协议"
          clickable
          @click="linkToProtocolUserService"
        />
        <uni-list-item
          showArrow
          title="隐私政策"
          clickable
          @click="linkToProtocolPrivacy"
        />
      </uni-list>
    </view>

    <view class="profile-footer">
      <view class="text-align-center color-grey-400 text-12">
        <span class="mr-10">投诉举报</span
        ><uni-link
          color="#333"
          font-size="20px"
          href="mailto:report@airpiggy.cn"
          text="report@airpiggy.cn"
        ></uni-link>
      </view>
      <view class="mt-8 text-align-center text-12 color-grey-400"
        >Copyright © 2025-现在</view
      >
      <view class="text-align-center text-12 color-grey-400"
        >成都王小周人工智能科技有限公司 版权所有</view
      >
    </view>
  </view>
</template>

<script setup lang="ts">
import { appLinks } from "@/navigate";
import { isWeChat } from "@/TUIKit/utils/env";

const appVersion = uni.getAppBaseInfo().appVersion;

const linkToProtocolUserService = () => {
  appLinks.protocolUserService.navigate({});
};

const linkToProtocolPrivacy = () => {
  appLinks.protocolPrivacy.navigate({});
};
</script>

<style lang="scss">
.profile {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  &-header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px 0;
  }
  &-logo {
    width: 80px;
    height: 80px;
    border-radius: 8px;
  }
  &-name {
    font-size: 16px;
    margin-top: 6px;
  }
  &-version {
    font-size: 12px;
    color: var(--color-grey-400);
    margin-top: 6px;
  }

  &-body {
    flex: 1;
  }

  &-footer {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }
}
</style>
