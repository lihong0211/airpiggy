<template>
  <view class="px-n12 py-n8">
    <app-input
      type="text"
      v-model="nickname"
      auto-focus
      placeholder="请输入你的昵称"
      @confirm="handleSubmit"
    ></app-input>
  </view>
</template>

<script setup lang="ts">
import { ref } from "@/TUIKit/adapter-vue";
import AppInput from "@/components/app-input/app-input.vue";
import { useUserStore, updateUserInfo } from "@/hooks/useUserStore";
import * as api from "@/service/user";
import { ux } from "@/utils";
import { SYSTEM_KEYWORDS } from "@/constants/configs";

// 定义响应式变量
const nickname = ref(useUserStore.user?.nickname);
const handleSubmit = async () => {
  if (!nickname.value) {
    uni.showToast({
      title: "请输入你的昵称",
      icon: "none",
    });
    return;
  }

  if (SYSTEM_KEYWORDS.includes(nickname.value)) {
    ux.tips("昵称不能包含系统保留字");
    return;
  }
  try {
    uni.showLoading();

    await api.updateUserInfo({
      nickname: nickname.value,
    });
    updateUserInfo({
      nickname: nickname.value,
    });

    ux.router(-1, "back");
  } catch (error: any) {
    uni.showToast({
      title: error.message,
      icon: "none",
    });
  } finally {
    uni.hideLoading();
  }
};
</script>

<style lang="scss" scoped></style>
