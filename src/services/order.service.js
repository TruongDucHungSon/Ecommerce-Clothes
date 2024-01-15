import { http } from "../api/http";

export const order = {
  getOrders: () =>
    http.request({
      method: "GET",
      url: "order",
    }),
  deleteOrder: (id) =>
    http.request({
      method: "DELETE",
      url: `order/${id}`,
    }),
};
