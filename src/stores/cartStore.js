import { defineStore } from "pinia";
import { computed, ref } from "vue";


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

    //删除购物车
    const delCart = (skuId) => {
        // 思路：
      // 1. 找到要删除项的下标值 - splice
      const idx = cartList.value.findIndex((item) => skuId === item.skuId)
      cartList.value.splice(idx, 1)
    }

    const allCount = computed(() => 
        cartList.value.reduce((pre, cur) => pre + cur.count, 0)
  )
    const allPrice = computed(() => 
        cartList.value.reduce((pre, cur) => pre + cur.count * cur.price, 0)
    )
    return {
        cartList,
        addCart,
        delCart,
        allCount,
        allPrice
    }
},{
    persist: true,
})