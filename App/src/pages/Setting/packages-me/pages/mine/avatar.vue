<template>
  <view class="avatar-page">
    <Avatar
      useSkeletonAnimation
      :url="useUserStore.user.avatarUrl"
      size="300px"
    />

    <view
      style="
        width: 150px;
        text-align: center;
        border: 1px solid var(--color-primary-600);
        border-radius: 40px;
        line-height: 40px;
        color: var(--color-primary-600);
        margin-top: 50px;
      "
      @click="handleUpdateAvatar"
    >
      更换头像
    </view>

    <qf-image-cropper
      v-if="chooseImageUrl"
      :src="chooseImageUrl"
      :width="500"
      :height="500"
      @crop="handleCrop"
    >
    </qf-image-cropper>
  </view>
</template>

<script setup lang="ts">
import * as api from "@/service/user";
import { ref } from "@/TUIKit/adapter-vue";
import { updateUserInfo, useUserStore } from "@/hooks/useUserStore";
import { confirmCameraAccess } from "@/utils/permission";
import QfImageCropper from "../../components/qf-image-cropper/qf-image-cropper.vue";
import Avatar from '@/TUIKit/components/common/Avatar/index.vue';

const chooseImageUrl = ref("");
const handleUpdateAvatar = async () => {
  const result = await confirmCameraAccess();
  if (!result) {
    return;
  }
  uni.chooseImage({
    count: 1,
    sizeType: ["compressed"],
    sourceType: ["album", "camera"],
    success: async function (res) {
      chooseImageUrl.value = res.tempFilePaths[0];
    },
  });
};

const handleCrop = async (e: { tempFilePath: string }) => {
  try {
    const result = await api.uploadFile(e.tempFilePath);
    await api.updateUserInfo({
      avatarUrl: result,
    });
    updateUserInfo({
      avatarUrl: result,
    });
    chooseImageUrl.value = "";
  } catch (error) {}
};
</script>

<style lang="less" scoped>
.avatar-page {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.user-avatar {
  width: 300px;
  height: 300px;
  border-radius: 8px;
  will-change: transform;
}
</style>
