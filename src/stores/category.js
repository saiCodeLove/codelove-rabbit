import { ref, onMounted } from "vue";
import { defineStore } from "pinia";
import {getCategoryAPI} from '@/apis/layout'

export const useCategoryStore = defineStore("category", () => {
  //   stata 导航列表数据管理
    const categoryList = ref([]);
    // actions  获取导航数据的方法
    const getCategory = async () => {
      const res = await getCategoryAPI();
      console.log(res);
      categoryList.value = res.result;
    };
    
  return { categoryList, getCategory };
});
