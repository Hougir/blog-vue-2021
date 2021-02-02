import request from '@/utils/request'
const apiUrl = '/api'
export function fetchList(data) {
    return request({
        url: apiUrl+'/post/list',
        method: 'post',
        data
    })
}

export function fetchFocus() {
    return request({
        url: apiUrl+'/focus/list',
        method: 'get',
        params: {}
    })
}
