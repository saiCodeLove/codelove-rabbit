import request from '@/utils/http'

export const getTopCategoryAPI = (id)=>{
    return request({
      url: "/category",
      params:{
        id
      }
    });
}