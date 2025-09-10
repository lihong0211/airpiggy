<template>
    <div class="wrapper" v-if="message">
        <div class="content">
            <div class="title">举报用户</div>
            <div class="avater"><image :src="message.avatar" /></div>
        </div>
        <div class="content">
            <div class="title">举报内容</div>
            <div class="text">{{getMessageContent().displayText}}</div>
        </div>
        <div class="report-content">
            <div class="title">举报理由</div>
            <div class="text"><textarea v-model="reportContent" placeholder="填写举报理由"></textarea></div>
        </div>
        <div class="buttons">
            <button @click="handleSubmit" class="primary">提交</button>
        </div>
        
    </div>
</template>
<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app';
import { TUIStore } from '@/@tencentcloud/chat-uikit-engine/index.js';
import { ref } from '@/TUIKit/adapter-vue';
import { IMessageModel } from '@/@tencentcloud/chat-uikit-engine/index.js';
import { report, ReportParams } from '@/service/index';

const message = ref<IMessageModel|null>(null);
const reportContent = ref<string>('');

onLoad((e) => {
    message.value = TUIStore.getMessageModel(e.messageID);
});

const imageUrl = (message:IMessageModel) => {
    let result = {};
    message.payload.imageInfoArray.forEach((image) => {
        if (image.sizeType === 3) {
            result = {
                url: image.url
            };
        }
    });
    return result;
}
const getMessageContent = () => {
    switch (message.value.type) {
        case 'TIMTextElem':
            return {
                type: 1,
                content: message.value.payload.text,
                displayText: message.value.payload.text
            }
        case 'TIMImageElem':
            return {
                type: 2,
                content: imageUrl(message.value).url,
                displayText: '图片'
            }
        case 'TIMSoundElem':
            return {
                type: 3,
                content: message.value.payload.url,
                displayText: '音频'
            };
        case 'TIMVideoFileElem':
            return {
                type: 4,
                content: message.value.payload.videoUrl,
                displayText: '视频'
            };
    }
    return {}
}
const handleSubmit = () => {
    let messageContent = getMessageContent();
    const reportData:ReportParams = {
        messageContent: messageContent.content,
        messageCreateTime: String(message.value.time * 1000),
        messageId: message.value.ID,
        reportedUserId: message.value.from,
        reportReason: reportContent.value,
        type: messageContent.type
    }
    report(reportData).then(() => {
        uni.showToast({
            title: '举报成功',
            icon: 'success',
            duration: 1000
        });
        setTimeout(() => {
            uni.navigateBack();
        }, 2000)
    }).catch((error) => {
        console.error('举报失败:', error);
        uni.showToast({
            title: '举报失败，请稍后再试',
            icon: 'none',
            duration: 1000
        });
    });
}
</script>
<style scoped>
.wrapper {
    width: 100%;
    height: 100%;
    background: #f8f8f8;
}
.content {
    padding: 15px;
    background: #fff;
    margin: 10px auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.report-content {
    padding: 15px;
    background: #fff;
    margin: 10px auto;
}
.content .text {
    margin-left: 15px;
}
.content .title {
    min-width: 80px;
}
.report-content textarea {
    width: calc(100% - 20px);
    margin-top: 10px;
    height: 100px;
    border-radius: 5px;
    border: 1px solid #ccc;
    padding: 10px;
    resize: none;
    font-size: 14px;
    line-height: 1.5;
    color: #333;
}
.buttons {
    margin: 20px 15px;
}
.buttons .primary {
    background-color: var(--color-primary-600);
    color: #fff;
    border: none;
    cursor: pointer;
}
.buttons .primary:hover {
    transition: background-color 0.3s ease;
}
.avater {
    width: 40px;
    height: 40px;
    border-radius: 5px;
    overflow: hidden;
}
.avater image {
    width: 100%;
    height: 100%;
}
</style>