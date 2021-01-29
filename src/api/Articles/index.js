import request from '@/utils/request'
const apiUrl = '/api'
export function getBlogById(id) {
    return request({
        url: apiUrl+'/articles/getBlogById?id=' + id,
        method: 'get',
    })
}
