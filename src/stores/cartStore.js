// 封装购物车模块
import { computed, ref } from "vue";
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
    // 单选功能
    const singleCheck = (skuId, selected) => {
      // 通过skuId找到要修改的那一项 然后把它的selected修改为传过来的selected
      const item = cartList.value.find((item) => item.skuId === skuId);
      item.selected = selected;
    };
    // 全选功能
    const allCheck = (selected) => {
      // 把cartList中的每一项selected都设置为当前的全选框状态
      cartList.value.forEach((item) => (item.selected = selected));
    };
    // 计算属性
    // 总的数量 所有count之和
    const allCount = computed(() =>
      cartList.value.reduce((a, b) => a + b.count, 0)
    );
    // 总的价格 所有的count*price之和
    const allPrice = computed(() =>
      cartList.value.reduce((a, b) => a + b.count * b.price, 0)
    );
    // 已选择数量
    const selectedCount = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((a, b) => a + b.count, 0)
    );
    // 已选择数量的总价格
    const selectedPrice = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((a, b) => a + b.count * b.price, 0)
    );
    // 单选框都选中时 全选框也会选中
    const isAll = computed(() => cartList.value.every((item) => item.selected));
    return {
      cartList,
      addCart,
      delCart,
      allCount,
      allPrice,
      selectedCount,
      selectedPrice,
      singleCheck,
      isAll,
      allCheck,
    };
  },
  {
    persist: true,
  }
);
