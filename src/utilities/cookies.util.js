import Cookies from "universal-cookie";
export const cookiesUtil = {
  set,
  get,
  remove,
  getCurrentUser,
  setAccessToken,
  getAccessToken,
  setCurrentUser,
  setProductCart,
  getProductCart,
  removeProductCart,
};

const cookies = new Cookies();

function set(key, value) {
  cookies.set(key, value, { path: "/" });
}

function get(key) {
  let value = cookies.get(key);
  if (value) {
    return value;
  }
  return null;
}

function getCurrentUser() {
  return get("_USR__");
}

function setCurrentUser(value) {
  cookies.set("_USR__", value);
}

function remove(key) {
  let value = cookies.get(key);
  if (value) {
    cookies.remove(key);
    return true;
  }
  return false;
}

function setAccessToken(value) {
  cookies.set("_JWT__", value);
}

function getAccessToken() {
  return cookies.get("_JWT__");
}

function setProductCart(value) {
  const current = new Date();
  const nextYear = new Date();

  nextYear.setFullYear(current.getFullYear() + 1);

  cookies.set("_LUXY_WINE_PRODUCT_CART__", value, {
    path: "/",
    expires: nextYear,
  });
}
function getProductCart() {
  return cookies.get("_LUXY_WINE_PRODUCT_CART__");
}
function removeProductCart() {
  return remove("_LUXY_WINE_PRODUCT_CART__");
}
