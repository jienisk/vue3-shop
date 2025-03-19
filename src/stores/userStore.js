import { ref } from 'vue'
import { defineStore } from 'pinia'
import { loginAPI } from '@/apis/user'
import { useCartStore } from './cartStore'
import { mergeCartAPI } from '@/apis/cart'

export const useUserStore = defineStore('user', () => {
    const cartStore = useCartStore()
    const userInfo = ref({})
    const getUserInfo = async(account, password) => {
        const res = await loginAPI({account,password})
        userInfo.value = res.result
        mergeCartAPI(cartStore.cartList.map(item => ({skuId: item.skuId, count: item.count, selected: item.selected})))
        cartStore.updateNewCartList()
    }
    const clearUserInfo = () => {
        userInfo.value = {}
        cartStore.clearCart()
    }
    return{
        userInfo,
        getUserInfo,
        clearUserInfo
    }
},{
    persist: true
})