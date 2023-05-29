import request from "@/utils/http";

export const getCheckoutInfoAPI = () => {
  return request({
    url: "/member/order/pre",
  });
};
