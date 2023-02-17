import {defineStore} from "pinia";
import {login, user} from '@/api/auth'

//定义state中的数据类型
export interface IUserState {
    token:string,
    username:string,
    avatar_url:string,
    permissions:string[],
    info:any
}

export const useUserStore = defineStore({
    id:'app-user',
    state:():IUserState=>({
        token: localStorage.getItem("token") || "", // 在页面刷新时已经保留token
        username: "",
        avatar_url: "",
        permissions: [],
        info: {},
    }),
    getters:{//取状态值
        getToken():string{
            return this.token;
        },
        getAvatar():string{
            return this.avatar_url
        },
        getUserName():string{
            return this.username
        },
        getPermissions():string[]{
            return this.permissions
        }
    },
    actions:{ //给状态设置值
        setToken(token:string) {
            localStorage.setItem('token',token);
            this.token = token
        },
        setAvatar(avatar_url:string){
            this.avatar_url = avatar_url
        },
        setUserInfo(info:object) {
            this.info = info
        },
        setUserName(username:string){
            this.username = username
        },
        setPermissions(permissions:string[]){
            this.permissions = permissions
        },
        //异步登录的方法
        async login(userInfo:object) {
            //try 语句使你能够测试代码块中的错误。
            //
            // catch 语句允许你处理错误。
            try{
                const response:any = await login(userInfo);
                if (response.access_token) {
                    this.setToken(response.access_token)
                    // 登录之后，token已经拿到了，然后getUser获取调用,
                    return await this.getUser();
                }
            }catch (error){
                console.log(error)
            }
        },
        async getUser(){
            // await useUserStore.getUser()
            try {
                const response:any = await user();
                this.setUserInfo(response);
                this.setAvatar(response.avatar_url);
                this.setUserName(response.name)
                return response
            }catch (error){

            }
        }
    }
})