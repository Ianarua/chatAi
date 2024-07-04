<template>
    <div class="app-container">
        <History :id="historyId" @changeId="changeId"/>
        <div class="chat">
            <RouterView></RouterView>
        </div>
    </div>
</template>

<script setup lang="ts">
import History from '@/components/History/index.vue';
import {  onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useHistoryStore } from '@/store';

const historyStore = useHistoryStore()
const router = useRouter();
const route = useRoute();

const historyId = ref(0);

// 点击记录调用的函数
const changeId = (id: number) => {
    historyId.value = id;
    historyStore.activeHistoryId = id;
    router.push({ name: 'chat', params: { id: historyId.value } })
};

onMounted(() => {
    // 防止获取不到route.params
    setTimeout(() => {
        historyId.value = Number(route.params.id);
    }, 2000);
    // nextTick(() => {
    // });
});
</script>

<style>
* {
    margin: 0;
    padding: 0;
    text-decoration: none;
    list-style: none;
    overflow-x: hidden;
    overflow-y: hidden;
}

.app-container {
    width: 100vw;
    height: 100vh;
    display: flex;
}

.chat {
    flex: 1
}
</style>
