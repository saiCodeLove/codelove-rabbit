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
    return { cartList, addCart };
  },
  {
    persist: true,
  }
);
