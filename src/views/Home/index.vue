<template>
    <div class="content">
        <div class="inner">
            <span class="colortxt">下方输入开启新轮对话吧</span>
        </div>
        <div class="chat-input-outer">
            <div class="chat-input">
                <ChatInput :isFinish="isFinish" @submitChat="submit"/>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import ChatInput from '@/components/ChatInput/index.vue';
import { Message } from '@/types';
import { useRouter } from 'vue-router';
import { useConversationStore, useHistoryStore } from '@/store/index.ts';
import { ref } from 'vue';


const router = useRouter();
const historyStore = useHistoryStore();
const conversationStore = useConversationStore();


const isFinish = ref(true);

// 新增聊天
const submit = (chatFormData: Message) => {
    const lastId = historyStore.getLeastId;
    // 添加进历史记录
    historyStore.addHistory(chatFormData.content.text);
    // 修改active历史记录为新添加的
    historyStore.activeHistoryId = lastId + 1;
    // 添加进聊天
    conversationStore.addConversation(chatFormData);
    // 修改为不可发送
    isFinish.value = false;
    // 跳转
    router.push({ name: 'chat', params: { id: lastId + 1 } });
};

</script>

<style scoped>
.content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(243, 245, 250);
}

.inner {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 90%;
}

.colortxt {
    font-size: 60px;
    background: linear-gradient(to right, red, blue);
    background-clip: text;
    color: transparent;
    margin-bottom: 200px;
}

.chat-input-outer {
    width: calc(50% + 56px);
}

.chat-input {
    width: 100%;
    margin-bottom: 50px;
}
</style>
