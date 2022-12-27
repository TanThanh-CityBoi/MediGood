import config from "./api/config";
import { options, handleResponse } from "../helpers";
import ajaxHelper from "./api";

export const dashboardService = {
  getGeneralReport,
  getTimelyReport,
};

function getGeneralReport() {
  return handleResponse(
    ajaxHelper.get(config.URL_DASHBOARD + `/general`, {}, options())
  );
}

function getTimelyReport(timeRange) {
  console.log({ timeRange });
  return handleResponse(
    ajaxHelper.get(config.URL_DASHBOARD + `/timely`, timeRange, options())
  );
}
