import BaseApi from "./baseApi.js";

class ProductApi extends BaseApi {
  getResourceName() {
    return "products";
  }
}

const productApi = new ProductApi();
export default productApi;
