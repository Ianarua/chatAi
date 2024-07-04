import { defineStore } from 'pinia';
import { Conversation, HistoryItem, Message } from '@/types';

interface IHistoryState {
    historyData: HistoryItem[];
    activeHistoryId: number;
}

interface IConversationState {
    conversationData: Conversation[];
}

export const useHistoryStore = defineStore('history', {
    state: (): IHistoryState => ({
        historyData: [
            {
                id: 1,
                title: 'markdown语法',
            },
            {
                id: 2,
                title: 'LaTex语法',
            }
        ],
        activeHistoryId: 0
    }),
    actions: {
        addHistory (title: string) {
            const history = {
                id: this.getLeastId + 1,
                title
            };
            this.historyData.push(history);
        }
    },
    getters: {
        getLeastId: (state) => {
            return state.historyData.at(-1)!.id;
        }
    }
});

export const useConversationStore = defineStore('conversation', {
    state: (): IConversationState => ({
        conversationData: [
            {
                id: 1,
                messages: [
                    {
                        type: 0,
                        content: {
                            type: 0,
                            text: '来一个markdown示例'
                        },
                        requireWrite: false
                    },
                    {
                        type: 1,
                        content: {
                            type: 1,
                            text: markdownStr,
                        },
                        requireWrite: false
                    },
                ],
            },
            {
                id: 2,
                messages: [
                    {
                        type: 0,
                        content: {
                            type: 0,
                            text: '来一个latex实例'
                        },
                        requireWrite: false
                    },
                    {
                        type: 1,
                        content: {
                            type: 2,
                            text: laTeXStrArr
                        },
                        requireWrite: false
                    },
                ],
            },
        ]
    }),
    actions: {
        // 新建对话
        addConversation (message: Message) {
            this.conversationData.push({
                id: this.getLeastId + 1,
                messages: [
                    {
                        type: 0,
                        content: {
                            type: message.content.type,
                            text: message.content.text
                        },
                        file: message.file || [],
                        requireWrite: false
                    },
                    {
                        type: 1,
                        content: {
                            type: 0,
                            text: generateRandomSentence()
                        },
                        requireWrite: true
                    }
                ]
            });
        },
        // 对话中增加聊天
        addMessage (conversationId: number, message: Message) {
            this.conversationData.forEach(item => {
                if (item.id === conversationId) {
                    item.messages.push({
                        type: 0,
                        content: {
                            type: message.content.type,
                            text: message.content.text
                        },
                        file: message.file || [],
                        requireWrite: false
                    });
                    // TODO 先随机生成一段
                    item.messages.push({
                        type: 1,
                        content: {
                            type: 0,
                            text: generateRandomSentence()
                        },
                        requireWrite: true
                    });
                }
            });
        },
        changeWriteStatus (conversationId: number) {
            this.conversationData.forEach(item => {
                if (item.id === conversationId) {
                    item.messages.forEach(item => {
                        item.requireWrite = false;
                    });
                }
            });
        }
    },
    getters: {
        getLeastId: (state) => {
            return state.conversationData.at(-1)!.id;
        }
    }
});

function generateRandomSentence () {
    // 定义一些常用的单词和短语
    const subjects = ['小狗', '小猫', '大象', '长颈鹿'];
    const actions = ['正在', '快速地', '悄悄地', '兴奋地'];
    const locations = ['公园', '森林', '草原', '河边'];
    const objects = ['玩耍', '吃草', '奔跑', '游泳'];

    // 随机选择每个部分
    const subject = subjects[Math.floor(Math.random() * subjects.length)];
    const action = actions[Math.floor(Math.random() * actions.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const object = objects[Math.floor(Math.random() * objects.length)];

    // 组合成一句话
    return `${ subject }${ action }在${ location }${ object }。`;
}


const markdownStr: string = `
# dataURL和base64

dataURL = data:[<mediatype>][;base64],<data>

- mediatype：是个 MIME 类型的字符串，例如 'image/jpeg' 表示 JPEG 图像文件。如果被省略，则默认值为 text/plain;charset=US-ASCII。
- ;base64：若非文本可以选择这个作为标记
- data：base64编码或者动态js等

### 图片转dataURL并回显实例

index.html：

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<input type="file"/>
<img alt="" id="preview" src=""/>
<script src="./index.js"></script>
</body>
</html>
\`\`\`

index.js：

\`\`\`javascript
const inp = document.querySelector("input");
const preview = document.querySelector("#preview")
inp.onchange = function () {
    const reader = new FileReader();
    reader.readAsDataURL(this.files[0]);
    reader.onload = function (e) {
        preview.src = e.target.result
        console.log(e.target.result.split(","))
    }
}
\`\`\`
`;

const laTeXStrArr = '\[ f(x) = \\int_{-\\infty}^{\\infty} e^{-2 \\pi i \\xi x} \\hat{f}(\\xi) d\\xi \] ';



