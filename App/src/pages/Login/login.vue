<template>
  <view class="px-n12 py-n8">
    <view class="color-grey-900 text-28 my-24 weight-900">登录</view>
    <view class="text-14 weight-700 mb-8">手机号</view>
    <app-input
      type="mobile"
      v-model="form.mobile"
      :maxLength="11"
      :inspector="inspector.mobile"
    >
    </app-input>

    <view class="mt-16 text-14 weight-700 mb-8">验证码</view>
    <app-input
      type="captcha"
      v-model="form.password"
      :inspector="inspector.password"
      :maxLength="4"
      @confirm="smsLogin"
      :captcha="{
        type: 'resetPassword',
        mobile: form.mobile,
      }"
    >
    </app-input>

    <button
      block
      style="
        background-color: var(--color-primary-600);
        border-radius: 24rpx;
        color: #fff;
        border: none;
      "
      :disabled="!formCompleted"
      class="weight-700 mt-16"
      @click="smsLogin"
    >
      登录
    </button>
    <view class="mt-16 flex-row align-center">
      <checkbox-group @change="handleAgreeChange">
        <label>
          <checkbox
            :value="true"
            :checked="false"
            style="transform: scale(0.8)"
            color="var(--color-primary-600)"
          >
          </checkbox>
          <text class="text-14 color-grey-400">
            <text>我已阅读并同意</text>
            <text class="color-grey-900 mx-4" @click.stop="openUserAgreement"
              >用户协议</text
            >
            <text> 和 </text>
            <text class="color-grey-900 mx-4" @click.stop="openUserPrivacy"
              >隐私协议</text
            >
          </text>
        </label>
      </checkbox-group>
    </view>

    <view class="fulled bg-grey-200 my-n16" style="height: 1px"></view>

    <!-- #ifdef MP-WEIXIN -->
    <view class="text-14 weight-700" style="margin-bottom: 30px"
      >使用其他方式登录</view
    >
    <view>
      <view
        style="
          position: relative;
          background-color: var(--color-grey-50);
          color: var(--color-grey-900);
          border-radius: 24rpx;
          border-color: transparent;
        "
        class="mt-16 pl-n8 py-10 flex-row-center-start text-14"
        @click="passwordLogin"
      >
        <uni-icons
          custom-prefix="iconfont"
          type="icon-pwd"
          size="22"
          color="var(--color-primary-600)"
        ></uni-icons>
        <text class="ml-4">账号密码登录</text>
      </view>
      <view
        block
        style="
          position: relative;
          background-color: var(--color-grey-50);
          color: var(--color-grey-900);
          border-radius: 24rpx;
          border-color: transparent;
        "
        class="mt-16 pl-n8 py-10 flex-row-center-start text-14"
      >
        <uni-icons
          custom-prefix="iconfont"
          type="icon-weixin"
          size="22"
          color="var(--color-primary-600)"
        ></uni-icons>
        <text class="ml-4">一键登录</text>

        <button
          class="absolute"
          open-type="getPhoneNumber"
          style="top: 0; bottom: 0; right: 0; left: 0; opacity: 0"
          @getphonenumber="onPhoneNumberLogin"
        >
          一键登录
        </button>
      </view>
    </view>
    <!-- #endif -->

    <!-- #ifdef APP -->
    <view class="text-14 weight-700" style="margin-bottom: 30px"
      >使用其他三方登录</view
    >
    <view class="flex-row flex-row-center-center">
      <view
        style="
          width: 40px;
          height: 40px;
          background-color: var(--color-grey-50);
          color: var(--color-grey-900);
          border-radius: 24rpx;
          border-color: transparent;
          margin-right: 30px;
        "
        class="flex-row-center-center text-14 mr-10"
        @click="passwordLogin"
      >
        <uni-icons
          custom-prefix="iconfont"
          type="icon-pwd"
          size="32"
          color="var(--color-primary-600)"
        ></uni-icons>
      </view>

      <view
        v-if="installedWechat"
        style="
          width: 40px;
          height: 40px;
          background-color: var(--color-grey-50);
          color: var(--color-grey-900);
          border-radius: 24rpx;
          border-color: transparent;
          margin-right: 30px;
        "
        class="flex-row-center-center text-14 mr-10"
        @click="thirdLogin('weixin')"
      >
        <uni-icons
          custom-prefix="iconfont"
          type="icon-weixin"
          size="32"
          color="var(--color-primary-600)"
        ></uni-icons>
      </view>
      <view
        v-if="isIOS"
        style="
          width: 40px;
          height: 40px;
          background-color: var(--color-grey-50);
          color: var(--color-grey-900);
          border-radius: 24rpx;
          border-color: transparent;
          margin-right: 30px;
        "
        class="flex-row-center-center text-14"
        @click="thirdLogin('apple')"
      >
        <uni-icons
          custom-prefix="iconfont"
          type="icon-apple-fill"
          size="32"
          color="var(--color-primary-600)"
        ></uni-icons>
      </view>
    </view>
    <!-- #endif -->
  </view>
</template>

<script setup lang="ts">
import AppInput from "@/components/app-input/app-input.vue";
import {
  isEnableGMS,
  isInstalledWechat,
  pingURL,
  ux,
  verify,
  isIOS,
} from "@/utils/index";
import { computed, reactive, ref, onMounted } from "@/TUIKit/adapter-vue";
import {
  getUserProfile,
  loginWithSms,
  loginWithWeixin,
  loginWithApple,
  getUserInfo,
  loginWithMiniCode,
} from "@/service/index";
import { setLogin } from "@/hooks/useUserStore";
import { loginChat } from "@/loginChat";
import { UserInfo } from "@/service/types/user";
import Link from "@/utils/link";
import { appLinks } from "@/navigate";

type loginForm = {
  mobile: string;
  password: string;
};
const systemInfo = uni.getSystemInfoSync();

const installedWechat = isInstalledWechat(false);

const form = reactive<loginForm>({
  mobile: "",
  password: "",
});
const isAgreed = ref(false);
const inspector = {
  mobile: (value: string) => {
    if (!value) return "请输入手机号";
    if (!verify.isMobile(value)) return "手机号格式不正确";
  },
  password: (value: string) => {
    if (!value) return "请输入验证码";
  },
};
const formCompleted = computed(() => {
  return !inspector.mobile(form.mobile) && !inspector.password(form.password);
});
const handleAgreeChange = (e: { detail: { value: boolean[] } }) => {
  isAgreed.value = e.detail.value.length > 0;
};

const checkAgree = () => {
  if (!isAgreed.value) {
    ux.tips("请先阅读并同意用户协议和隐私协议", "none");
    return false;
  }

  return true;
};

const smsLogin = async () => {
  if (!formCompleted.value) return;
  if (!checkAgree()) {
    return;
  }

  try {
    uni.showLoading();
    const res = await loginWithSms({
      phone: form.mobile,
      code: form.password,
    });

    setLogin(res.token, null);
    const userInfo = await getUserProfile();
    setLogin(res.token, userInfo);

    await loginChat(res);
    appLinks.index.navigate({});
  } catch (error: any) {
    ux.tips(error.message, "none");
  } finally {
    uni.hideLoading();
  }
};

const thirdLogin = async (provider: "weixin" | "apple") => {
  if (provider === "weixin" && !isInstalledWechat()) return;
  try {
    if (!checkAgree()) {
      return;
    }
    uni.showLoading();
    const res = await uni.login({
      //@ts-ignore
      provider,
      onlyAuthorize: true,
    });
    let serverRes: UserInfo | null = null;
    let provider_id: string | null = null;
    let nickname: string | undefined = undefined;
    let auth_data: any | undefined = undefined;

    if (provider === "weixin") {
      provider_id = res.code;
      serverRes = await loginWithWeixin({ code: provider_id });
    } else if (provider === "apple") {
      const appleInfo = res.appleInfo;
      const { familyName, giveName } = res.appleInfo!.fullName;
      nickname = familyName + giveName;

      if (!appleInfo) {
        return;
      }

      serverRes = await loginWithApple({
        identityToken: appleInfo.identityToken ?? "",
        nickname: nickname || "",
        email: (appleInfo as any).email ?? "",
      });
    }
    if (!serverRes) return;
    setLogin(serverRes.token, null);
    const userInfo = await getUserProfile();

    if (serverRes.phone) {
      setLogin(serverRes.token, userInfo);
      await loginChat(serverRes);
      ux.router("/pages/index/index", "load");
    } else {
      appLinks.bindMobile.navigate({});
    }
  } catch (error: any) {
    console.error(error);
    uni.showToast({
      title: error.message || JSON.stringify(error),
      icon: "none",
    });
  } finally {
    uni.hideLoading();
  }
};

const passwordLogin = () => {
  if (!checkAgree()) {
    return;
  }

  appLinks.passwordLogin.navigate({});
};

const onPhoneNumberLogin = async (e: any) => {
  if (!e.detail.code) {
    uni.showToast({
      title: "手机号授权失败",
      icon: "none",
    });
    return;
  }

  try {
    uni.showLoading();
    const { code } = await uni.login();

    const serverRes = await loginWithMiniCode({
      code,
      phoneCode: e.detail.code,
    });

    setLogin(serverRes.token, null);
    const userInfo = await getUserProfile();
    setLogin(serverRes.token, userInfo);

    await loginChat(serverRes);

    appLinks.index.navigate({});
  } catch (error: any) {
    uni.showToast({
      title: error.message,
      icon: "none",
    });
  } finally {
    uni.hideLoading();
  }
};

const openUserAgreement = () => ux.openWebview(Link.agreement.url);

const openUserPrivacy = () => ux.openWebview(Link.privacy.url);
</script>

<style lang="scss" scoped>
.third-login-icon {
  width: 48rpx;
  height: 48rpx;
}
</style>
