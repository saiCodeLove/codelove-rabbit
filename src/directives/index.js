import { useIntersectionObserver } from "@vueuse/core";

export const directivePlugin = {
  install(app) {
    // 使用app实现懒加载指令逻辑
    // 定义全局指令
    app.directive("img-lazy", {
      mounted(el, binding) {
        // console.log(el, binding.value);
        const {stop} = useIntersectionObserver(el, ([{ isIntersecting }]) => {
          console.log(isIntersecting);
          if (isIntersecting) {
            // 进入视口区域
            el.src = binding.value;
            stop()
          }
        });
      },
    });
  },
};
