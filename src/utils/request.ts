
//1.引入axios依赖包
import axios from "axios";

// 2.axios创建对象
const request = axios.create({
    baseURL:'https://api.shop.eduwork.cn/',
    timeout:8000
})

// 3.定义前置拦截器，请求拦截器，请求发出之前触发的
request.interceptors.request.use((config)=>{
    return config;
},(error)=>{
    //报错的是定义前置拦截器时抛出一个错误信息
    return Promise.reject(error)
})

request.interceptors.response.use((response)=>{
    return response.data
},(error)=>{
    return Promise.reject(error)
})

//抛出对象的信息
export default request