<template>
  <view class="permission-manage">
    <uni-list>
      <uni-list-item
        title="麦克风"
        clickable
        showArrow
        @click="switchPushPermissions"
        :rightText="microphoneStatus ? '已授权' : '前往设置'"
      />
      <uni-list-item
        title="相机"
        clickable
        showArrow
        @click="switchPushPermissions"
        :rightText="cameraStatus ? '已授权' : '前往设置'"
      />
      <uni-list-item
        title="相册"
        clickable
        showArrow
        @click="switchPushPermissions"
        :rightText="albumStatus ? '已授权' : '前往设置'"
      />
      <!-- #ifdef APP-PLUS || H5 -->
      <uni-list-item
        title="通知"
        clickable
        showArrow
        @click="switchPushPermissions"
        :rightText="isNotificationOn ? '已授权' : '前往设置'"
      />
      <!-- #endif -->
    </uni-list>
  </view>
</template>

<script setup lang="ts">
import { ref } from "@/TUIKit/adapter-vue";
import { onShow } from "@dcloudio/uni-app";

const microphoneStatus = ref<boolean>(false); // 麦克风
const cameraStatus = ref<boolean>(false); // 相机
const albumStatus = ref<boolean>(false); // 相册
const isNotificationOn = ref<boolean>(false); // 消息推送

onShow(() => {
  checkNotificationStatus();
});

// 判断通知权限是否开启
function checkNotificationStatus() {
  /* #ifdef APP-PLUS || APP-HARMONY */
  const {
    notificationAuthorized,
    microphoneAuthorized,
    cameraAuthorized,
    albumAuthorized,
  } = uni.getAppAuthorizeSetting();
  isNotificationOn.value = notificationAuthorized === "authorized";
  microphoneStatus.value = microphoneAuthorized === "authorized";
  cameraStatus.value = cameraAuthorized === "authorized";
  // #ifdef APP-PLUS
  if (uni.getSystemInfoSync().platform === "android") {
    // Android系统使用plus.android.requestPermissions来检查相册权限
    const permissions = ["android.permission.READ_EXTERNAL_STORAGE"];
    // Android 13及以上版本使用新的媒体权限
    const systemInfo = uni.getSystemInfoSync();
    const androidVersion = Number.parseInt(
      systemInfo?.system?.split(" ")?.[1] || "0",
      10
    );
    if (androidVersion >= 33) {
      permissions.push("android.permission.READ_MEDIA_IMAGES");
      permissions.push("android.permission.READ_MEDIA_VIDEO");
    }
    plus.android.requestPermissions(
      permissions,
      (resultObj) => {
        // 检查是否所有请求的权限都已授权
        albumStatus.value = resultObj.granted.length === permissions.length;
      },
      (_error) => {
        albumStatus.value = false;
      }
    );
  } else {
    // iOS系统使用uni.getAppAuthorizeSetting
    albumStatus.value = albumAuthorized === "authorized";
  }
  // #endif
  /* #endif */

  /* #ifdef MP-WEIXIN */
  // @ts-ignore
  wx.getSetting({
    success(res: any) {
      microphoneStatus.value = !!res.authSetting["scope.record"];
      cameraStatus.value = !!res.authSetting["scope.camera"];
      albumStatus.value = !!res.authSetting["scope.writePhotosAlbum"];
      // 小程序端一般不做通知授权管理
      isNotificationOn.value = false;
    },
  });
  /* #endif */
}

// 前往系统设置页面开启或关闭权限（多端兼容）
function switchPushPermissions() {
  /* #ifdef APP-PLUS */
  uni.openAppAuthorizeSetting({});
  /* #endif */

  /* #ifdef MP-WEIXIN */
  // @ts-ignore
  wx.openSetting({});
  /* #endif */
}
</script>

<style lang="scss">

</style>
