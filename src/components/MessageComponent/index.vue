<template>
    <!-- 用户 -->
    <div v-if="props.type === 0">
        <a-comment class="user message-content">
            <template #avatar>
                <a-avatar :src="avatar" alt="Avatar"/>
            </template>
            <template #content>
                <p class="content-p user-p">
                    {{ content }}
                </p>
                <div class="user-img">
                    <a-image
                        :width="100"
                        v-for="file of props.file"
                        :src="file.thumbUrl"
                        fallback="data:image/png;base64,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"
                    />
                </div>
            </template>
        </a-comment>
<!--        <div class="fileList">-->
<!--            -->
<!--        </div>-->
    </div>
    <!-- ai -->
    <a-comment v-else-if="props.type === 1" class="ai message-content">
        <template #avatar>
            <a-avatar alt="avatar">
                <template #icon>
                    <SmileOutlined/>
                </template>
            </a-avatar>
        </template>
        <template #content>
            <p v-if="messageType === 0" class="content-p">
                {{ currentText }}
            </p>
            <p v-else-if="messageType === 1" class="content-p">
                <Markdown :source="content"/>
            </p>
            <div v-else-if="messageType === 2" class="content-p">
                <MathJax :latex="content" :block="true"/>
            </div>
        </template>
    </a-comment>
</template>

<script setup lang="ts">
import avatar from '@/assets/avatar.png';
import { onMounted, ref } from 'vue';
import { SmileOutlined } from '@ant-design/icons-vue';
// @ts-ignore
import Markdown from 'vue3-markdown-it';
import 'highlight.js/styles/a11y-dark.css';
import { UploadProps } from 'ant-design-vue';

interface IProps {
    type: 0 | 1,    // 0为user，1为ai
    content: string,
    messageType: 0 | 1 | 2, // 0普通，1 markdown, 2
    requireWrite?: boolean,
    file: UploadProps['fileList']   // 没为[],必须传过来
}

const props = defineProps<IProps>();
const emit = defineEmits(['finishCB']);
const currentText = ref(''); // 当前显示的文本

function typeWriter (text: string, index = 0) {
    if (!props.requireWrite) {
        currentText.value = text;
        return;
    }
    if (index < text.length) {
        // 将当前字符添加到 currentText
        currentText.value = currentText.value.slice(0, index) + text.charAt(index);
        currentText.value += '·';
        // 设置定时器，继续添加下一个字符
        setTimeout(() => typeWriter(text, index + 1), 50); // 每100毫秒添加一个字符
    } else {
        // 所有字符都已添加完成，移除小圆点
        currentText.value = currentText.value.replace(/·$/, '');
        emit('finishCB', true);
    }
}

onMounted(() => {
    console.log('props.file', props.file);
    typeWriter(props.content);
});
</script>

<style scoped>
.message-content {
    width: 100%;
    overflow: hidden;
}

.content-p {
    max-width: 100%;
    overflow-x: auto;
    font-size: 16px;
    line-height: 30px;
    background-color: #fff;
    padding: 12px;
    border-radius: 12px;
}

.user-p {
    color: #fff;
    background-color: #2D65F7;
}

.user::v-deep(.ant-comment) {
    width: 100%;
    margin-left: 502px;
}

.user::v-deep(.ant-comment-inner) {
    display: flex;
    flex-direction: row-reverse;
    width: 100%;
}

.user::v-deep(.ant-comment-avatar) {
    margin-left: 12px;
}

.user::v-deep(.ant-comment-content) {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.ai::v-deep(.ant-comment-content) {
    display: flex;
    align-items: center;
}

.user::v-deep(.ant-comment-content-detail) {
    display: flex;
    flex-direction: column;
    /*justify-content: flex-end;*/
    align-items: flex-end;
}

.user::v-deep(.ant-image-img) {
    /*background-color: #000;*/
    overflow: hidden;
    /*width: 100px;*/
}
</style>
