import axios from "axios";
import { md5 } from "js-md5";

const timestamp = new Date().toISOString().split("T")[0].replace(/-/g, "");
const authString = `Valantis_${timestamp}`;
const authHeaderValue = md5(authString);
const instance = axios.create({
  baseURL: "http://api.valantis.store:40000",
  headers: {
    "X-Auth": authHeaderValue,
  },
});

export const productsApi = {
  getIds({ offset, limit }: { offset?: number; limit?: number }) {
    if (offset && limit) {
      return instance.post("", {
        action: "get_ids",
        params: { offset, limit },
      });
    } else {
      return instance.post("", {
        action: "get_ids",
        params: {},
      });
    }
  },
  getItems(id: string[]) {
    return instance.post("", {
      action: "get_items",
      params: { ids: id },
    });
  },
  getfields(field: string, offset: number, limit: number) {
    return instance.post("", {
      action: "get_fields",
      params: { field, offset, limit },
    });
  },
  filter(price = 17500.0) {
    return instance.post("/", { action: "filter", params: { price } });
  },
};
