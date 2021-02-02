import request from '@/utils/request'

const mockUrl = '/mock';

/*export function fetchFocus() {
    return request({
        url: mockUrl+'/focus/list',
        method: 'get',
        params: {}
    })
}*/

export function fetchCategory() {
    return request({
        url: mockUrl+'/category',
        method: 'get',
        params: {}
    })
}

export function fetchFriend() {
    return request({
        url: mockUrl+'/friend',
        method: 'get',
        params: {}
    })
}

export function fetchSocial() {
    return request({
        url: mockUrl+'/social',
        method: 'get',
        params: {}
    });
}

export function fetchSiteInfo() {
    return request({
        url: mockUrl+'/site',
        method: 'get',
        params: {}
    })
}

export function fetchComment() {
    return request({
        url: mockUrl+'/comment',
        method: 'get',
        params: {}
    })
}
