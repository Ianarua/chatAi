<template>
    <div style="position: relative; width: 100%;">
        <a-upload
            v-model:file-list="fileList"
            :customRequest="customRequest"
            @change="handleChange"
            list-type="picture"
            class="upload-list-inline"
            @preview="handlePreview"
            :max-count="4"
        >
            <a-button
                :disabled="fileList!.length >= 4 || !isFinish"
                type="text"
                shape="circle"
                :icon="h(UploadOutlined)"
                class="upload-btn"
            />
        </a-upload>

        <a-modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage"/>
        </a-modal>
        <a-form
            class="input-content"
            :model="chatFormData"
            name="basic"
            autocomplete="off"
        >
            <a-form-item
                name="content"
            >
                <a-input v-model:value="chatFormData.content.text" placeholder="发送消息吧" @pressEnter="submit">
                    <template #suffix>
                        <a-button
                            :disabled="chatFormData.content.text.trim().length === 0 || !isFinish"
                            type="text"
                            shape="circle"
                            :icon="h(SendOutlined)"
                            @click="submit"
                        />
                    </template>
                </a-input>
            </a-form-item>
        </a-form>
    </div>

</template>

<script setup lang="ts">
import { h, reactive, ref, toRef, watch } from 'vue';
import { SendOutlined, UploadOutlined } from '@ant-design/icons-vue';
import { Message } from '@/types';
import type { UploadChangeParam, UploadProps } from 'ant-design-vue';
import { message } from 'ant-design-vue';

const props = defineProps({
    isFinish: {
        type: Boolean,
        default: true // 设置默认值为 true
    }
});
const emit = defineEmits(['submitChat']);

// 文件列表
const fileList = ref<UploadProps['fileList']>([]);

const chatFormData = reactive<Message>({
    type: 0,
    content: {
        type: 0,
        text: ''
    },
    file: [],
    requireWrite: false
});

// 手动上传
const customRequest = async (e: any) => {
    // TODO 这里模拟了接口请求
    console.log(e);
    let percent = 0;
    const interval = setInterval(() => {
        percent += 10;
        // TODO 模拟进度
        e.onProgress({ percent });

        if (percent >= 100) {
            e.onSuccess();
            clearInterval(interval);
        }
    }, 100);
};


// 上传文件触发事件
const handleChange = (info: UploadChangeParam) => {
    if (info.file.status !== 'uploading') {
        // console.log(info.file, info.fileList);
        console.log('上传中');
    }
    if (info.file.status === 'done') {
        message.success(`${ info.file.name } 上传成功`);
    } else if (info.file.status === 'error') {
        message.error(`${ info.file.name } 上传失败`);
    }
};

// 获取base64用作预览
const getBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
};

// 预览
const previewVisible = ref(false);
const previewImage = ref('');
const previewTitle = ref('');
// @ts-ignore
const handlePreview = async (file: UploadProps['fileList'][number]) => {
    if (!file.url && !file.preview) {
        file.preview = (await getBase64(file.originFileObj)) as string;
    }
    previewImage.value = file.url || file.preview;
    previewVisible.value = true;
    previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
};

// 关闭弹窗
const handleCancel = () => {
    previewVisible.value = false;
    previewTitle.value = '';
};


const isFinish = toRef(props, 'isFinish');

const submit = () => {
    if (chatFormData.content.text.trim() !== '') {
        console.log('submitChat', chatFormData);
        emit('submitChat', chatFormData);
        chatFormData.content.text = '';
        fileList.value = [];
    } else {
        console.log('空的');
    }
};

// 监听fileList和chatFormData同步
watch(
    () => fileList.value,
    () => {
        chatFormData.file = fileList.value;
    }
);

</script>

<style scoped>
.input-content {
    width: 100%;
    height: 52px;
}

.ant-form-item {
    width: 100%;
    height: 100%;
}

.ant-form-item:deep(.ant-form-item-row) {
    width: 100%;
    height: 100%;
}

.ant-form-item:deep(.ant-form-item-control-input) {
    width: 100%;
    height: 100%;
}

.ant-form-item:deep(.ant-form-item-control-input-content) {
    width: 100%;
    height: 100%;
}

.ant-form-item:deep(.ant-input-affix-wrapper) {
    width: 100%;
    height: 100%;
}

.ant-form-item:deep(.ant-upload-wrapper) {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 0;
}

/*.ant-form-item:deep(.ant-upload-list) {*/
/*    display: none;*/
/*}*/

/*.input {*/
/*    width: 100%;*/
/*    height: 100%;*/
/*    background-color: #f4f4f4;*/
/*}*/

/* 上传文件列表样式 */
.upload-list-inline :deep(.ant-upload-list-item) {
    /*float: left;*/
    width: 200px;
    margin-right: 8px;
}

.upload-list-inline:deep(.ant-upload-list) {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
}

.upload-list-inline:deep(.ant-upload-list-item-name) {
    width: 40%;
}

/* 按钮绝对单位到特定位置 */
.upload-btn {
    position: absolute;
    bottom: 10px;
    right: 50px;
    z-index: 99;
}
</style>
