<template>

    <div class="pt-4">
      <div class="m-0">
        <img style="margin:auto" src="@/assets/images/logo.png" alt="logo">
      </div>
      <n-menu :options="menuOptions"  :value="defaultKey" inverted @update:value="handleUpdateValue" />
    </div>
</template>

<script lang="ts" setup>
 import {ref,onMounted} from "vue";
 import {useRouter,useRoute} from "vue-router";
 import {routeModuleList} from "@/router";
 import {generatorMenu} from "@/utils";
 // import router from "@/router";
 const defaultKey = ref('');
 const router = useRouter()



 onMounted(()=>{
   const route = useRoute()
   //获取当前路由的key
   const routeKey = route.name
   if (typeof routeKey === 'string'){
     defaultKey.value = routeKey
   }
 })
 const menuOptions = generatorMenu(routeModuleList)
 const handleUpdateValue=(key:any) =>{
   console.log('1111');
   defaultKey.value = key;
   router.push({name:key});
 };
</script>

<style scoped>

</style>