<script setup>
import { onMounted } from "vue";
import LayoutFixed from "@/views/Layout/components/LayoutFixed.vue";
import LayoutNav from "@/views/Layout/components/LayoutNav.vue";
import LayoutHeader from "@/views/Layout/components/LayoutHeader.vue";
import LayoutFooter from "@/views/Layout/components/LayoutFooter.vue";
import { useCategoryStore } from "@/stores/category";
// 触发获取导航列表的action
const CategoryStore = useCategoryStore();
onMounted(() => {
  return CategoryStore.getCategory();
});
</script>

<template>
  <LayoutFixed />
  <LayoutNav />
  <LayoutHeader />
  <RouterView />
  <LayoutFooter />
</template>
