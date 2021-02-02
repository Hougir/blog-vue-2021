import request from '@/utils/request'
const apiUrl = '/api'
export function getBlogById(id) {
    return request({
        url: apiUrl+'/articles/getBlogById?id=' + id,
        method: 'get',
    })
}
export function save(id,title,content,banner,isTop,isHot,published,summary) {
    return request({
        url: apiUrl+'/articles/save',
        method: 'post',
        data: {
            id: id,
            title: title,
            content: content,
            banner: banner,
            isTop: isTop,
            isHot: isHot,
            published: published,
            summary: summary
        }
    })
}

export function delById(id) {
    return request({
        url: apiUrl+`/articles/delById/` + id,
        method: 'delete',
    })
}
