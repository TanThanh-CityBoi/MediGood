import config from "./api/config";
import { options, handleResponse } from "../helpers";
import ajaxHelper from "./api";

export const productServices = {
  getAll,
  getList,
  getListRecommendProduct,
  getListAccessary,
  getOne,
  create,
  update,
  deleteOne,
  deleteMany,
};

function getAll(params = {}) {
  return handleResponse(
    ajaxHelper.get(config.URL_PRODUCT + `/list`, params, options())
  );
}

function getList(params) {
  return handleResponse(
    ajaxHelper.get(config.URL_PRODUCT + `/list`, params, options())
  );
}
function getListRecommendProduct(params = {}) {
  return handleResponse(
    ajaxHelper.get(config.URL_PRODUCT + `/get-recommend-product`, params, options())
  );
}

function getListAccessary(params = {}) {
  return handleResponse(
    ajaxHelper.get(config.URL_PRODUCT + `/listAccessary`, params, options())
  );
}

function getOne(id) {
  return handleResponse(
    ajaxHelper.get(config.URL_PRODUCT + `/${id}`, {}, options())
  );
}

function create(product) {
  return handleResponse(
    ajaxHelper.post(config.URL_PRODUCT + `/new`, product, options())
  );
}

function update(product) {
  return handleResponse(
    ajaxHelper.put(config.URL_PRODUCT + `/${product._id}`, product, options())
  );
}

function deleteOne(id) {
  return handleResponse(
    ajaxHelper.delete(config.URL_PRODUCT + `/${id}`, options())
  );
}

function deleteMany(productIds) {
  return handleResponse(
    ajaxHelper.deleteMany(config.URL_PRODUCT, productIds, options())
  );
}
