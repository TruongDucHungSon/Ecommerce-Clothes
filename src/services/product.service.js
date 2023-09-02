import { http } from "../api/http";

export const product = {
  getProducts: (params) =>
    http.request({
      method: "GET",
      url: "product",
      params: {
        ...params,
      },
    }),
  getProductsByCategory: (id) =>
    http.request({
      method: "GET",
      url: `product/category/${id}`,
    }),
  getProductDetail: (id) =>
    http.request({
      method: "GET",
      url: `product/${id}`,
    }),
};
