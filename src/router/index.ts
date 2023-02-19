// import {createRouter,createWebHistory} from "vue-router";




// 将路由配置抽取过来
import {createRouter,createWebHistory,RouteRecordRaw} from "vue-router";
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import index from '@/views/login/index.vue'
import dashboard from "@/router/modules/dashboard";
// import Dashboard from '@/views/dashboard/Dashboard.vue'

const modules: any = import.meta.glob("./modules/**/*.ts", {eager: true});
const routeModuleList: RouteRecordRaw[] = [];

Object.keys(modules).forEach((key) => {
    const mod = modules[key].default || {};
    const modList = Array.isArray(mod) ? [...mod] : [mod];
    routeModuleList.push(...modList);
});
console.log(routeModuleList)

//定义一些路由，每个路由都需要映射到一个组件
const routes = [
    {path:'/',component:Home},
    {path:'/login',name:'login',component: Login},
    {path:'/index',component:index},
    // {path:'/dashboard',name:'dashboard',component:Dashboard},

]

const baseRoutes = [...routes,...routeModuleList]

//创建路由实例并传递‘routes’配置
const router = createRouter({
    // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history:createWebHistory(),
    routes:baseRoutes
})


//配置前置守卫
router.beforeEach((to,from,next)=>{
    if (to.name != 'index') {
        //如果不是登录页面，判断是否登录
        if(!localStorage.getItem('token')){
            next({
                path:'/index'
            })
        }
    }
    next()
})

export default router
export {routeModuleList}
