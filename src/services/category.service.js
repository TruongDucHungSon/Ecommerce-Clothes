import { http } from "../api/http";

export const category = {
  getCategories: () =>
    http.request({
      method: "GET",
      url: "category",
    }),
};
