import axios from 'axios';
// @ts-ignore
import Mock from '@/mock/mockData.ts';


// 创建 axios 实例
const request = axios.create({
    baseURL: '/',
    timeout: 5000,
});

// 请求拦截器
request.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        console.error('Request error:', error);
        return Promise.reject(error);
    },
);

// 响应拦截器
request.interceptors.response.use(
    response => {
        console.log('---------', response);
        const res = response.data;
        if (res.code !== 200) {
            console.error('Response error:', res.message || 'Error');
            return Promise.reject(new Error(res.message || 'Error'));
        } else {
            return res;
        }
    },
    error => {
        console.error('Response error:', error);
        return Promise.reject(error);
    },
);

export default request;
