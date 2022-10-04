import config from "./api/config";
import { options, handleResponse } from "../helpers";
import ajaxHelper from "./api";

export const newsServices = {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
  deleteMany,
};

function getAll(params = {}) {
  return handleResponse(
    ajaxHelper.get(config.URL_NEWS + `/list`, params, options())
  );
}

function getOne(id) {
  return handleResponse(
    ajaxHelper.get(config.URL_NEWS + `/${id}`, {}, options())
  );
}

function create(news) {
  return handleResponse(
    ajaxHelper.post(config.URL_NEWS + `/new`, news, options())
  );
}

function update(news) {
  return handleResponse(
    ajaxHelper.put(config.URL_NEWS + `/${news._id}`, news, options())
  );
}

function deleteOne(id) {
  return handleResponse(
    ajaxHelper.delete(config.URL_NEWS + `/${id}`, options())
  );
}

function deleteMany(newsIds) {
  return handleResponse(
    ajaxHelper.deleteMany(config.URL_NEWS, newsIds, options())
  );
}
