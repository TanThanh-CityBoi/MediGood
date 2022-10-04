import config from "./api/config";
import { options, handleResponse } from "../helpers";
import ajaxHelper from "./api";

export const bannerServices = {
  getAll,
  getOne,
  update,
};

function getAll(params = {}) {
  return handleResponse(
    ajaxHelper.get(config.URL_BANNER + `/list`, params, options())
  );
}

function getOne(id) {
  return handleResponse(
    ajaxHelper.get(config.URL_BANNER + `/${id}`, {}, options())
  );
}

function update(banner) {
  return handleResponse(
    ajaxHelper.put(config.URL_BANNER + `/${banner._id}`, banner, options())
  );
}
