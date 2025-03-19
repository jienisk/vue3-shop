import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useUserStore } from "./userStore";
import { insertCartAPI, findNewCartListAPI, delCartAPI } from "@/apis/cart";


export const useCartStore = defineStore('cart',() =>{
  const userStore = useUserStore()
  const isLogin = computed(() => userStore.userInfo.token)
    const cartList = ref([])
    //获取最新购物车列表
    const updateNewCartList = async () => {
      const res = await findNewCartListAPI()
      cartList.value = res.result
    }
    const addCart =async (goods) => {
      const { skuId, count } = goods
      if(isLogin.value){
        // 登录状态下，将商品添加到购物车
        await insertCartAPI({skuId,count})
        updateNewCartList()
      }else{
        // 未登录状态下，将商品添加到本地存储
        const item = cartList.value.find((item) => goods.skuId === item.skuId)
    if (item) {
      // 找到了
      item.count++
    } else {
      // 没找到
      cartList.value.push(goods)
    }
      }
    
    }

    //删除购物车
    const delCart =async (skuId) => {
      if(isLogin.value){
        // 登录状态下，删除购物车
        await delCartAPI([skuId])
        updateNewCartList()
      }else{
          // 思路：
      // 1. 找到要删除项的下标值 - splice
      const idx = cartList.value.findIndex((item) => skuId === item.skuId)
      cartList.value.splice(idx, 1)
      }
      
    }

    const singleCheck = (skuId,selected) => {
      const item = cartList.value.find((item)=> item.skuId === skuId)
      item.selected = selected
    }

    const allCount = computed(() => 
        cartList.value.reduce((pre, cur) => pre + cur.count, 0)
  )
    const allPrice = computed(() => 
        cartList.value.reduce((pre, cur) => pre + cur.count * cur.price, 0)
    )

    const isAll = computed(() => cartList.value.every((item) => item.selected)) 

    const allCheck = (selected) => {
      cartList.value.forEach(item => item.selected = selected)
    }

    const selectCount = computed(() => cartList.value.filter(item => item.selected).reduce((pre, cur) => pre + cur.count, 0))

    const selectPrice = computed(() => cartList.value.filter(item => item.selected).reduce((pre, cur) => pre + cur.count * cur.price, 0))

    return {
        cartList,
        addCart,
        delCart,
        allCount,
        allPrice,
        singleCheck,
        isAll,
        allCheck,
        selectCount,
        selectPrice
    }
},{
    persist: true,
})