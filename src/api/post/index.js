import request from '@/utils/request'
const apiUrl = '/api'
export function fetchList(params) {
    return request({
        url: apiUrl+'/post/list',
        method: 'get',
        params: params
    })
}
