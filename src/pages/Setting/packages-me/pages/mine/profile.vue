<template>
  <view class="profile">
    <uni-list>
      <uni-list-item showArrow title="账号" :rightText="maskedPhone" />
      <uni-list-item
        showArrow
        title="昵称"
        clickable
        :rightText="useUserStore.user.nickname"
        @click="handleToNickname"
      />
      <uni-list-item showArrow clickable @click="handleToAvatar" title="头像">
        <template #footer>
          <Avatar
            useSkeletonAnimation
            :url="useUserStore.user.avatarUrl"
            size="30px"
          />
        </template>
      </uni-list-item>
      <uni-list-item
        showArrow
        title="用户ID"
        :rightText="useUserStore.user.userId"
        clickable
        @click="handleCopy"
      />
      <uni-list-item
        showArrow
        title="二维码名片"
        clickable
        @click="handleToQRCode"
      />
      <uni-list-item
        showArrow
        title="账号注销"
        clickable
        @click="handleToDeactivateUser"
      />
    </uni-list>
  </view>
</template>

<script setup lang="ts">
import { computed } from "@/TUIKit/adapter-vue";
import { useUserStore } from "@/hooks/useUserStore";
import { appLinks } from "@/navigate";
import { ux } from "@/utils";
import Avatar from "@/TUIKit/components/common/Avatar/index.vue";

// 隐藏手机号中间四位
const maskedPhone = computed(() => {
  const phone = useUserStore.user?.phone;
  if (!phone) return "";
  const phoneStr = String(phone);
  return phoneStr.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
});

const handleCopy = async (key: string) => {
  await uni.setClipboardData({ data: useUserStore.user?.userId ?? "" });
  ux.tips("复制成功");
};

const handleToNickname = () => {
  appLinks.nickname.navigate({});
};

const handleToAvatar = () => {
  appLinks.avatar.navigate({});
};

const handleToQRCode = () => {
  appLinks.qrCode.navigate({});
};

const handleToDeactivateUser = () => {
  appLinks.deactivateUser.navigate({});
};
</script>

<style lang="scss" scoped>
.avatar-item {
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
}
</style>

<style lang="scss">
.profile {
  .uni-list-item__content {
    justify-content: center;
  }
}
</style>
