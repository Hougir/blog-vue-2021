import request from '@/utils/request'
const apiUrl = '/api'
export function getLoginInfo(token) {
    return request({
        url: apiUrl + `/admin/user/getMemberInfo/` + token,
        method: 'get'
    })
}

export function logout(token) {
    return request({
        url: apiUrl + `/admin/user/logout/` + token,
        method: 'get'
    })
}

export function login(username,password,smsCode,phone) {
    return request({
        url: apiUrl + `/admin/user/login`,
        method: 'post',
        data: {
            username: username,
            password: password,
            smsCode: smsCode,
            phone: phone
        }
    })
}
export function sendSms(phone) {
    return request({
        url: apiUrl + `/login/sendSms/` + phone,
        method: 'get'
    })
}
