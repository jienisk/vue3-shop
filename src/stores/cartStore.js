import { defineStore } from "pinia";
import { ref } from "vue";


export const useCartStore = defineStore('cart',() =>{
    const cartList = ref([])
    const addCart = (goods) => {
    const item = cartList.value.find((item) => goods.skuId === item.skuId)
    if (item) {
      // 找到了
      item.count++
    } else {
      // 没找到
      cartList.value.push(goods)
    }
    }
    return {
        cartList,
        addCart
    }
},{
    persist: true,
})