import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {createRouter,createWebHistory} from "vue-router";
import Home from './views/Home.vue'
import Login from './views/Login.vue'


//定义一些路由，每个路由都需要映射到一个组件
const routes = [
    {path:'/',component:Home},
    {path:'/login',component: Login}
]

//创建路由实例并传递‘routes’配置
const router = createRouter({
    // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history:createWebHistory(),
    routes
})

const app =createApp(App)
//创建并挂载根实例
app.use(router)
app.mount('#app')
