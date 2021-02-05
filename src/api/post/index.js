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

export function comment(email,content) {
    return request({
        url: apiUrl+'/about/comment',
        method: 'post',
        data:{
            email: email,
            content: content
        }
    })
}


export function commentList(data) {
    return request({
        url: apiUrl+'/about/commentList',
        method: 'post',
        data
    })
}

export function haveRead(id) {
    return request({
        url: apiUrl+`/about/haveRead/` + id,
        method: 'post',
    })
}
export function delCommentById(id) {
    return request({
        url: apiUrl+`/about/delCommentById/` + id,
        method: 'post',
    })
}
