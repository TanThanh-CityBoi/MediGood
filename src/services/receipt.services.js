import config from "./api/config";
import { options, handleResponse } from "../helpers";
import ajaxHelper from "./api";

export const receiptServices = {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
  deleteMany,
};

function getAll(params = {}) {
  return handleResponse(
    ajaxHelper.get(config.URL_RECEIPT + `/list`, params, options())
  );
}

function getOne(id) {
  return handleResponse(
    ajaxHelper.get(config.URL_RECEIPT + `/${id}`, {}, options())
  );
}

function create(receipt) {
  return handleResponse(
    ajaxHelper.post(config.URL_RECEIPT + `/new`, receipt, options())
  );
}

function update(receipt) {
  return handleResponse(
    ajaxHelper.put(config.URL_RECEIPT + `/${receipt._id}`, receipt, options())
  );
}

function deleteOne(id) {
  return handleResponse(
    ajaxHelper.delete(config.URL_RECEIPT + `/${id}`, options())
  );
}

function deleteMany(receiptIds) {
  return handleResponse(
    ajaxHelper.deleteMany(config.URL_RECEIPT, receiptIds, options())
  );
}
