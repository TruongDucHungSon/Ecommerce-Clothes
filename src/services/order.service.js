import { http } from "../api/http";

export const order = {
  getOrders: () =>
    http.request({
      method: "GET",
      url: "oder",
    }),
  deleteOrder: (id) =>
    http.request({
      method: "DELETE",
      url: `oder/${id}`,
    }),
};
