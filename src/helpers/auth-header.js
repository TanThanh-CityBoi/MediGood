import { cookiesUtil } from "../utilities";

export function authHeader() {
  // return authorization header with jwt token
  let accessToken = cookiesUtil.getAccessToken();
  if (accessToken) {
    return { Authorization: "Bearer " + accessToken };
  } else {
    return {};
  }
}

export function options(auth = true) {
  let options = {};
  if (auth) {
    options["headers"] = authHeader();
  }
  return options;
}

export function handleResponse(response) {
  return response.then(
    (text) => {
      return text.data;
    },
    (error) => {
      if (error.response.status === 401) {
      }
      return Promise.reject(error);
    }
  );
}
