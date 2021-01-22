import request from '@/utils/request.js'

export function blogList() {
    //alert(6666)
    return request({
        url: '/blog/list',
        method: 'post'
    })
}
