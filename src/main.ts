import { createApp } from 'vue';
import App from './App.vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import router from './router';
import { createPinia } from 'pinia';

// latex
// @ts-ignore
import MathJax, { initMathJax, renderByMathjax } from "mathjax-vue3";
function onMathJaxReady() {
    const el = document.getElementById("elementId");
    renderByMathjax(el);
}

initMathJax({}, onMathJaxReady);

const app = createApp(App);
const pinia = createPinia();

// @ts-ignore
app.use(Antd).use(router).use(pinia).use(MathJax).mount('#app');
