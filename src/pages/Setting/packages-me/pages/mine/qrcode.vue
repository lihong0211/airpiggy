<template>
  <div class="root">
    <div class="container">
      <div class="header">
        <Avatar useSkeletonAnimation :url="userProfile.avatarUrl" size="50px" />

        <div class="user-info">
          <div class="nickname" @click="handleCopy('nickname')">
            <span>{{ userProfile.nickname }}</span>
            <image
              src="/static/svg/copy.svg"
              class="copy-btn"
              alt=""
              mode="aspectFit"
            />
          </div>
          <div class="userid" @click="handleCopy('userId')">
            <span>ID: {{ userProfile.userId }}</span>
            <image
              src="/static/svg/copy.svg"
              class="copy-btn"
              alt=""
              mode="aspectFit"
            />
          </div>
        </div>
      </div>
      <div class="content">
        <div class="qrcode">
          <img :src="userProfile.qrCodeUrl" alt="" />
        </div>
        <div class="tips">扫一扫上面的二维码图案，加我为好友</div>
      </div>
      <div class="footer">
        <!-- #ifdef MP-WEIXIN -->
        <button class="footer-button share-button" open-type="share">
          分享给好友
        </button>
        <!-- #endif -->
        <!-- #ifndef MP-WEIXIN -->
        <view class="footer-button copy-button" @click="shareQRCodeToWeixin">
          分享给好友
        </view>
        <!-- #endif -->
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ux } from "@/utils";
import { useUserStore } from "@/hooks/useUserStore";
import {
  shareQRCodeToWeixin,
  weixinMiniProgramShareParams,
} from "@/utils/share";
import { onShareAppMessage } from "@dcloudio/uni-app";
import Avatar from "@/TUIKit/components/common/Avatar/index.vue";

const userProfile = useUserStore.user;

const handleCopy = async (key: string) => {
  let data = "";
  if (key == "userId") {
    data = userProfile?.userId ?? "";
  }

  if (key === "nickname") {
    data = userProfile?.nickname ?? "";
  }

  await uni.setClipboardData({ data });
  ux.tips("复制成功");
};

onShareAppMessage(() => {
  return weixinMiniProgramShareParams;
});
</script>

<style lang="scss" scoped>
.root {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  display: flex;
  flex-direction: column;
  transform: translateY(-50px);
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.user-info {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}

.nickname {
  display: inline-flex;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}

.userid {
  display: inline-flex;
  align-items: center;
  font-size: 14px;
  color: #999;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  .qrcode {
    width: 260px;
    height: 260px;
    overflow: hidden;
    border: 1px solid #ccc;
    border-radius: 6px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .tips {
    margin-top: 30px;
    font-size: 12px;
    color: #999;
  }
}

.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}

.footer-button {
  width: 150px;
  text-align: center;
  border: 1px solid var(--color-primary-600);
  border-radius: 40px;
  line-height: 40px;
  color: var(--color-primary-600);
  background-color: transparent;
}

.copy-btn {
  width: 12px;
  height: 12px;
  margin-left: 3px;
}
</style>
