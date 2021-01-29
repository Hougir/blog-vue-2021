import request from '@/utils/request'
const apiUrl = '/api'
export function getLoginInfo() {
    return request({
        url: apiUrl + `/admin/user/getMemberInfo`,
        method: 'get'
    })
}

export function logout() {
    return request({
        url: apiUrl + `/admin/user/logout`,
        method: 'get'
    })
}
