import axios from 'axios'

const httpInstance = axios.create({
    baseURL:'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout:5000
})

// 请求拦截器
httpInstance.interceptors.request.use(config => {
    // 在发送请求之前做一些处理
    return config
}, error => {
    // 请求错误时做一些处理
    return Promise.reject(error)
})

// 响应拦截器   
httpInstance.interceptors.response.use(response => {
    // 对响应数据做点什么
    return response
}, error => {
    // 响应错误时做一些处理
    return Promise.reject(error)
})

export default httpInstance