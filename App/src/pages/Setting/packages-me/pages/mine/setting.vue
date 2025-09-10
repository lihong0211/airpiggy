<template>
  <div class="container">
    <div v-if="conID" class="content">
      <Avatar useSkeletonAnimation :url="userAvatar" size="40px" />
    </div>
    <ManageLanguage class="content" :type="type" :toUserId="toUserId" />
    <ManageAutoplay class="content" :conversationID="conID" />
    <ManagePlaySpeed class="content" :conversationID="conID" />
    <ManageVoiceGender v-if="type === 'global'" class="content" />
  </div>
</template>
<script lang="ts" setup>
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "@/TUIKit/adapter-vue";
import { TUIStore } from "@/@tencentcloud/chat-uikit-engine/index.js";
import ManageAutoplay from "@/components/conversationSettings/manage-autoplay.vue";
import ManageLanguage from "@/components/conversationSettings/manage-language.vue";
import ManagePlaySpeed from "@/components/conversationSettings/manage-playspeed.vue";
import ManageVoiceGender from "@/components/conversationSettings/manage-voice-gender.vue";
import { generateAvatar } from "@/TUIKit/components/TUIContact/utils";
import Avatar from "@/TUIKit/components/common/Avatar/index.vue";

const userAvatar = ref("");
const toUserId = ref("");
const conID = ref("");
const type = ref<"c2c" | "global">("global");

onLoad((e) => {
  if (!e?.id) {
    return;
  }
  conID.value = e.id;
  type.value = "c2c";
  const conversationMode = TUIStore.getConversationModel(e.id);
  if (conversationMode) {
    toUserId.value = conversationMode.userProfile.userID;
    userAvatar.value = generateAvatar(conversationMode.userProfile);
  }
});
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
  background: #f8f8f8;
}
.content {
  height: 54px;
  width: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 15px;
  background: #fff;
  margin-bottom: 10px;
}
</style>
