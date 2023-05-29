import request from "@/utils/http";

export const getCheckoutInfoAPI = () => {
  return request({
    url: "/member/order/pre",
  });
};

// 创建订单
export const createOrderAPI = (data) => {
  return request({
    url: '/member/order',
    method: 'POST',
    data
  })
}