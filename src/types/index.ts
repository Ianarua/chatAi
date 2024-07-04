import { UploadProps } from 'ant-design-vue';

type messageContent = {
    type: 0 | 1 | 2,   // 0 文本, 1 markdown, 2
    text: string
}

export interface Message {
    // id: number;
    // sender: string;
    type: 0 | 1;    // 0 user, 1 ai
    content: messageContent
    file?: UploadProps['fileList'];
    requireWrite: boolean
}

export interface Conversation {
    id: number;
    messages: Message[];
}

export interface HistoryItem {
    id: number;
    title: string;
}
