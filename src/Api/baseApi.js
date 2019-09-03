import AppConstants from "../appConstants.js";
import fetchClient from "./fetchClient.js";

export default class BaseApi {
  getResourceName() {
    throw new Error("Please implement this method!!!");
  }

  getAll(params) {
    const url = `${AppConstants.API_URL}/${this.getResourceName()}`;
    return fetchClient.get(url, params);
  }

  getById(productId) {
    const url = `${
      AppConstants.API_URL
    }/${this.getResourceName()}/${productId}`;
    return fetchClient.get(url);
  }

  add(product) {
    const url = `${AppConstants.API_URL}/${this.getResourceName()}`;
    return fetchClient.post(url, product);
  }

  update(product) {
    const url = `${AppConstants.API_URL}/${this.getResourceName()}/${
      product.id
    }`;
    return fetchClient.patch(url, product);
  }

  remove(productId) {
    const url = `${
      AppConstants.API_URL
    }/${this.getResourceName()}/${productId}`;
    return fetchClient.delete(url);
  }
}
