<template>
  <view class="px-n12 py-n8">
    <view class="color-grey-900 text-28 my-24 weight-900">账号密码登录</view>
    <view class="mt-n12 mb-8 text-14 line-7 weight-700 color-grey-900"
      >账号</view
    >
    <app-input
      type="mobile"
      v-model="phone"
      auto-focus
      placeholder="请输入你的账号"
    ></app-input>

    <view class="mt-n12 mb-8 text-14 line-7 weight-700 color-grey-900"
      >密码</view
    >
    <app-input
      type="password"
      v-model="password"
      placeholder="请输入你的密码"
    ></app-input>
    <button
      style="
        background-color: var(--color-primary-600);
        border-radius: 24rpx;
        color: #fff;
        border: none;
      "
      block
      class="weight-700 mt-16"
      @click="handleLogin"
    >
      登录
    </button>
  </view>
</template>

<script setup lang="ts">
import { loginChat } from "@/loginChat";
import { getUserProfile, loginWithPassword } from "@/service";
import { ref } from "@/TUIKit/adapter-vue";
import { setLogin } from "@/hooks/useUserStore";
import { ux } from "@/utils";
import { computed } from "vue";
import { appLinks } from "@/navigate";

// 定义响应式变量
const phone = ref("");
const password = ref("");

// 登录处理函数
const handleLogin = async () => {
  if (!phone.value) {
    uni.showToast({
      title: "请输入账号",
      icon: "none",
    });
    return;
  }

  if (!password.value) {
    uni.showToast({
      title: "请输入密码",
      icon: "none",
    });
    return;
  }

  try {
    uni.showLoading();
    const res = await loginWithPassword({
      username: phone.value,
      password: password.value,
    });

    setLogin(res.token, null);
    const userInfo = await getUserProfile();
    setLogin(res.token, userInfo);

    await loginChat(res);
    appLinks.index.navigate({});
  } catch (error: any) {
    uni.showToast({
      title: error.message || JSON.stringify(error),
      icon: "none",
    });
  } finally {
    uni.hideLoading();
  }
};
</script>

<style lang="scss" scoped></style>
