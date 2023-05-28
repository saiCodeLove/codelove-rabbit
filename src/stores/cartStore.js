// 封装购物车模块
import { ref } from "vue";
import { defineStore } from "pinia";

export const useCartStore = defineStore(
  "cart",
  () => {
    //   state -cartList
    const cartList = ref([]);
    // actions  -addCart
    const addCart = (goods) => {
      // 添加购物车操作
      console.log("@@@", goods);
      // 已经添加过 -  count + 1
      // 没有添加过 -  直接push
      // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到 找到了就是添加过
      const item = cartList.value.find((item) => goods.skuId === item.skuId);
      if (item) {
        // 找到了
        item.count++;
      } else {
        // 没找到
        cartList.value.push(goods);
      }
    };
    // 删除购物车
    const delCart = (skuId) => {
      // 思路：
      // 1. 找到要删除项的下标值 - splice
      // 2. 使用数组的过滤方法 - filter
      const idx = cartList.value.findIndex((item) => skuId === item.skuId);
      cartList.value.splice(idx, 1);
    };
    return { cartList, addCart,delCart };
  },
  {
    persist: true,
  }
);
