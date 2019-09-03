import BaseApi from "./baseApi.js";

class CategoriesApi extends BaseApi {
    getResourceName() {
        return 'categories';
    }
}

const categoriesApi = new CategoriesApi();
export default categoriesApi;