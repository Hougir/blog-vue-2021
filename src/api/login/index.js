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

export function login(username,password,smsCode) {
    return request({
        url: apiUrl + `/admin/user/login`,
        method: 'post',
        data: {
            username: username,
            password: password,
            smsCode: smsCode
        }
    })
}
