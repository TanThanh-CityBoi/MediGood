import config from "./api/config";
import { options, handleResponse } from "../helpers";
import { cookiesUtil } from "../utilities";
import ajaxHelper from "./api";

export const usersServices = {
  login,
  logout,
  getAll,
  getOne,
  getCurrent,
  deleteOne,
  deleteMany,
  register,
  update,
  create,
  addToCart,
  editCart,
  getProductsInCart,
  getUserReceipt,
};

function login(email, password) {
  return handleResponse(
    ajaxHelper.post(config.URL_LOGIN, { email, password }, options())
  );
}

function logout() {
  cookiesUtil.remove("THIS IS USER IDENTIFY KEY");
  return true;
}

function getAll(params = {}) {
  return handleResponse(
    ajaxHelper.get(config.URL_USER + "/list", params, options())
  );
}

function getOne(id) {
  return handleResponse(
    ajaxHelper.get(config.URL_USER + `/${id}`, {}, options())
  );
}

function getCurrent() {
  return handleResponse(
    ajaxHelper.get(config.URL_USER + `/getCurrentUser`, {}, options())
  );
}

function register(user) {
  return handleResponse(ajaxHelper.post(config.URL_REGISTER, user, options()));
}

function create(user) {
  return handleResponse(
    ajaxHelper.post(config.URL_USER + `/new`, user, options())
  );
}

function update(user) {
  return handleResponse(
    ajaxHelper.put(config.URL_USER + `/${user._id}`, user, options())
  );
}

function deleteOne(id) {
  return handleResponse(
    ajaxHelper.delete(config.URL_USER + `/${id}`, options())
  );
}

function deleteMany(userIds) {
  return handleResponse(
    ajaxHelper.deleteMany(config.URL_USER, userIds, options())
  );
}

function addToCart(value) {
  return handleResponse(
    ajaxHelper.post(config.URL_USER + '/addItemToCart', value, options())
  );
}

function editCart(value) {
  return handleResponse(
    ajaxHelper.post(config.URL_USER + '/editCart', value, options())
  );
}

function getProductsInCart(cart) {
  return handleResponse(
    ajaxHelper.post(config.URL_PRODUCT + '/getProductsInCart', { cart }, options())
  );
}

function getUserReceipt(params = {}) {
  return handleResponse(
    ajaxHelper.get(config.URL_RECEIPT + '/getUserReceipt', {}, options())
  );
}