<template>
    <div class="content">
        <div class="header">
            <span style="font-size: 24px; font-weight: bold">历史会话</span>
        </div>
        <ul>
            <li :class="['item']">
                <a-button type="text" class="btn newBtn" @click="openNewChat" :icon="h(PlusSquareOutlined)">开启新轮对话</a-button>
            </li>
            <li
                v-for="item of historyStore.historyData"
                :key="item.id"
                :class="['item', {'item-active': isActive(item.id)}]"
            >
                <a-button type="text" class="btn" @click="handleChangeId(item)">{{ item.title }}</a-button>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { HistoryItem } from '@/types';
import { useHistoryStore } from '@/store';
import { useRouter } from 'vue-router';
import { h } from 'vue';
import { PlusSquareOutlined } from '@ant-design/icons-vue';

const historyStore = useHistoryStore();
const emit = defineEmits(['changeId']);
const router = useRouter();

const handleChangeId = (item: HistoryItem) => {
    emit('changeId', item.id);
};

const isActive = (id: number) => {
    return id === historyStore.activeHistoryId;
};

const openNewChat = () => {
    historyStore.activeHistoryId = 0;
    router.push({ name: 'home' });
};

</script>

<style scoped>
.content {
    width: 260px;
    background-color: #f9f9f9;
    padding: 0 12px;
    box-shadow: rgb(243, 245, 250) 1.95px 1.95px 2.6px;
}

.header {
    width: 100%;
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.item {
    height: 46px;
    border-radius: 18px;
    overflow: hidden;
}

.item-active {
    background-color: #ececec;
}

.btn {
    width: 100%;
    height: 100%;
    font-size: 16px;
    padding: 0 8px;
}

.newBtn {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
