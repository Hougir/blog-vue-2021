import request from '@/utils/request'
const apiUrl = '/api'
export function fetchList(data) {
    return request({
        url: apiUrl+'/post/list',
        method: 'post',
        data
    })
}
