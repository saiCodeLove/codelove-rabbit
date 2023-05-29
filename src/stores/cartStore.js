// 封装购物车模块
import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useUserStore } from "./user";
import { insertCartAPI, findNewCartListAPI, delCartAPI } from "@/apis/cart";
export const useCartStore = defineStore(
  "cart",
  () => {
    const userStore = useUserStore();
    const isLogin = computed(() => userStore.userInfo.token);
    //   state -cartList
    const cartList = ref([]);
    // 获取最新购物车列表 action
    const updateNewList = async () => {
      const res = await findNewCartListAPI();
      cartList.value = res.result;
    };

    // actions  -addCart
    // 添加购物车
    const addCart = async (goods) => {
      if (isLogin.value) {
        const { skuId, count } = goods;
        // 登录状态加入购物车的逻辑
        await insertCartAPI({
          skuId,
          count,
        });
        updateNewList()
      } else {
        // 非登录状态
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
      }
    };
    // 删除购物车
    const delCart = async (skuId) => {
      if (isLogin.value) {
        // 调用接口实现购物车的删除功能
        await delCartAPI([skuId]);
        updateNewList()
      } else {
        // 思路：
        // 1. 找到要删除项的下标值 - splice
        // 2. 使用数组的过滤方法 - filter
        const idx = cartList.value.findIndex((item) => skuId === item.skuId);
        cartList.value.splice(idx, 1);
      }
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
