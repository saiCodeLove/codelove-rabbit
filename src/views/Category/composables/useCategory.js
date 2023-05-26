import { getTopCategoryAPI } from "@/apis/category";
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { onBeforeRouteUpdate } from "vue-router";
export function useCategory(){
    const route = useRoute();
    const categoryData = ref({});
    const getTopCategoryData = async (id = route.params.id) => {
      const res = await getTopCategoryAPI(id);
      categoryData.value = res.result;
    };
    onMounted(() => getTopCategoryData());
    // 目标：路由参数变化的时候 可以把分类接口数据接口重新发送
    onBeforeRouteUpdate((to) => {
      // console.log(to);
      // 存在的问题：使用最新的路由参数请求获取最新的分类数据
      getTopCategoryData(to.params.id);
    });
    return {
      categoryData
    };
}

