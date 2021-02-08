import axios from 'axios'
import store from '@/store'
import cookie from 'js-cookie'

// create an axios instance // 创建axios实例
const service = axios.create({
    baseURL: process.env.BASE_API,
    timeout: 20000 // request timeout
})



// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent

        // if (store.getters.token) {
        //     config.headers['X-Token'] = getToken()
        // }
        if (localStorage.getItem('token')) {
            config.headers['token'] = localStorage.getItem('token');
        }
        /*if (cookie.get('token')) {
            config.headers['token'] = cookie.get('token');
        }*/
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        const res = response.data
        // store.commit('SET_LOADING',false);

        // if the custom code is not 20000, it is judged as an error.
        if (res.code !== 20000) {
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res
        }
    },
    error => {
        console.log('err' + error) // for debug
        if (error.response) {
            console.log('在respone拦截器检查到错误：')
            switch (error.response.status) {
                case 204:
                    error.response.data.error = '204:No Content（没有内容）'
                    break
                case 401:
                    // 可能是token过期，清除它
                    localStorage.removeItem('token')
                    location.reload() // 刷新页面，触发路由守卫
                    error.response.data.error = '401:Unauthorized（未经授权）'
                    break
                case 403:
                    error.response.data.error = '403:Forbidden（被禁止的）'
                    localStorage.removeItem('token')
                    location.reload() // 刷新页面，触发路由守卫
                    break
                case 500:
                    error.response.data.error = '500:服务器内部错误'
                    break
                default:
                    return error
            }
            return Promise.reject(error.response.data.error)
        }
    }
)

export default service
