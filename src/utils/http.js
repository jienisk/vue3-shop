import axios from 'axios'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'

const httpInstance = axios.create({
    baseURL:'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout:5000
})

// 请求拦截器
httpInstance.interceptors.request.use(config => {
    // 在发送请求之前做一些处理
    return config
}, e => Promise.reject(e))

// 响应拦截器   
httpInstance.interceptors.response.use(res => res.data, e => {
    ElMessage({
        type: 'warining',
        message: e.response.data.message
    })
    return Promise.reject(e)
})

export default httpInstance