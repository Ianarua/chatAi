import request from '@/utils/request.ts';

function getHistory () {
    return request({
        url: '/getHistory',
        method: 'get'
    });
}

export {
    getHistory
};
