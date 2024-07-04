<template>
    <div class="chat-container">
        <div class="chat-container-inner">
            <div class="message-div" ref="messageDivRef">
                <MessageComponent
                    v-for="(message, index) of messagesData"
                    :type="message.type"
                    :content="message.content.text"
                    :messageType="message.content.type"
                    :file="message.file || []"
                    :requireWrite="message.requireWrite"
                    :key="key + index"
                    @finishCB="finishCB"
                />
            </div>
            <div class="chat-input">
                <ChatInput :isFinish="isFinish" @submitChat="submit"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue';

import { useConversationStore } from '@/store/index.ts';
import { useRoute } from 'vue-router';
import { Message } from '@/types';
import MessageComponent from '@/components/MessageComponent/index.vue';
import ChatInput from '@/components/ChatInput/index.vue';

interface IProps {
    id: string;
}

const props = defineProps<IProps>();
// 重新渲染内容
const key = ref(0);
const conversationStore = useConversationStore();
const route = useRoute();

const messagesData = ref<Message[]>([]);
const conversationId = ref(Number(route.params.id));

// 滚动到最下
const messageDivRef = ref(null);

// 滚动到最底部函数
const scrollToBottom = () => {
    if (messageDivRef.value) {
        let element = messageDivRef.value;
        // @ts-ignore
        element.scrollTop = element.scrollHeight;
    }
};

// 新增聊天
const submit = (chatFormData: Message) => {
    // 增加聊天记录
    conversationStore.addMessage(conversationId.value, chatFormData);
    // 修改为不可发送
    isFinish.value = false;
    // 提交后滚动到底部，在滚动前确保新message已经渲染到页面上
    nextTick(() => {
        scrollToBottom();
    });
};

// 跳转时候调用,拿到当前记录
const updateConversation = () => {
    // 清空旧的聊天数据
    messagesData.value = [];
    key.value = key.value + Math.random() * 10;
    conversationStore.conversationData.forEach(item => {
        if (item.id === conversationId.value) {
            messagesData.value = item.messages;
            console.log('aaaaa',messagesData.value);
        }
    });
    // console.log('历史记录---', messagesData.value);
};

// 说完话的回调函数
const isFinish = ref(true);
const finishCB = (state: boolean) => {
    isFinish.value = state;
    conversationStore.changeWriteStatus(conversationId.value);
};

watch(
    () => props.id,
    () => {
        conversationId.value = Number(props.id);
        updateConversation();
    }
);

onMounted(() => {
    // 先拿到当前聊天的历史记录
    updateConversation();
});


</script>

<style scoped>
.chat-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(243, 245, 250);
}

.chat-container-inner {
    /* 两边头像宽度 */
    width: calc(50% + 56px);
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.message-div {
    width: 80%;
    /*min-height: 90%;*/
    /*max-height: 90%;*/
    flex: 1;
    padding-top: 56px;
    padding-bottom: 40px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
}


.chat-input {
    width: 100%;
    margin-bottom: 50px;
}
</style>
