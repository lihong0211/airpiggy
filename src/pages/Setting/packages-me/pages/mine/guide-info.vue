<template>
  <view class="px-n12 py-n8">
    <view>
      <view class="color-grey-900 text-28 my-24 weight-900">选择语音声音性别</view>
      <view class="mt-n12 mb-8 text-14 line-7 weight-700 color-grey-900"
        >基于你的选择，更精准的为你匹配声音</view
      >
    </view>

    <view class="gender-list">
      <view
        v-for="(item, index) in genderList"
        :key="index"
        class="gender-item"
        :class="[{ 'gender-item-selected': item.value === gender }]"
        @click="handlePickGender(item.value)"
      >
        <image :src="item.icon" alt="" mode="aspectFit" />
        <view>{{ item.label }}</view>
      </view>
    </view>

    <button
      style="
        background-color: var(--color-primary-600);
        border-radius: 24rpx;
        color: #fff;
        border: none;
      "
      block
      class="weight-700 mt-16"
      @click="handleNext"
    >
      下一步
    </button>
  </view>
</template>

<script setup lang="ts">
import { ref } from "@/TUIKit/adapter-vue";
import { updateUserInfo } from "@/hooks/useUserStore";

import * as api from "@/service/index";
import { appLinks } from "@/navigate";

const genderList = [
  {
    icon: "../../assets/svg/male.svg",
    label: "男声",
    value: 1,
  },
  {
    icon: "../../assets/svg/female.svg",
    label: "女声",
    value: 2,
  },
];
const gender = ref(1);

const handlePickGender = (value: number) => {
  gender.value = value;
};

const handleNext = async () => {
  await api.updateUserInfo({
    gender: gender.value,
  });

  updateUserInfo({
    gender: gender.value,
  });
  appLinks.index.navigate({})
};
</script>

<style lang="less" scoped>
.gender-list {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px 0 200px;
}

.gender-item {
  width: 120px;
  height: 120px;
  border: 1px solid transparent;
  border-radius: 100%;
  padding: 4px;
  margin: 0 20px;
  text-align: center;
  image {
    width: 100%;
    height: 100%;
    margin-bottom: 15px;
  }
}

.gender-item-selected {
  border-color: var(--color-primary-600);
}
</style>
