import config from "./api/config";
import { options, handleResponse } from "../helpers";
import ajaxHelper from "./api";

export const voucherServices = {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
  deleteMany,
  check,
};

function getAll(params = {}) {
  return handleResponse(
    ajaxHelper.get(config.URL_VOUCHER + `/list`, params, options())
  );
}

function getOne(id) {
  return handleResponse(
    ajaxHelper.get(config.URL_VOUCHER + `/${id}`, {}, options())
  );
}

function create(voucher) {
  return handleResponse(
    ajaxHelper.post(config.URL_VOUCHER + `/new`, voucher, options())
  );
}

function check(code, { totalPrice, productCount }) {
  return handleResponse(
    ajaxHelper.post(
      config.URL_VOUCHER + `/check/${code}`,
      { totalPrice, productCount },
      options()
    )
  );
}

function update(voucher) {
  return handleResponse(
    ajaxHelper.put(config.URL_VOUCHER + `/${voucher._id}`, voucher, options())
  );
}

function deleteOne(id) {
  return handleResponse(
    ajaxHelper.delete(config.URL_VOUCHER + `/${id}`, options())
  );
}

function deleteMany(voucherIds) {
  return handleResponse(
    ajaxHelper.deleteMany(config.URL_VOUCHER, voucherIds, options())
  );
}
