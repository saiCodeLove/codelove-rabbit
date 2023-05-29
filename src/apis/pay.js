import request from "@/utils/http";

// 加入购物车
export const getOrderAPI = (id) => {
  return request({
    url: `/member/order/${id}`,
  });
};
