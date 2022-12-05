
// API URL
const URL_MAIN_BE = "http://localhost:5005/";
const URL_SYSTEM_V1 = URL_MAIN_BE + "api";
const URL_AI_CHAT_BOT = "http://localhost:5001";


export default {
  
  //LOGIN
  URL_LOGIN: URL_SYSTEM_V1 + "/auth/login",

  // REGISTER
  URL_REGISTER: URL_SYSTEM_V1 + "/auth/register",

  // USER
  URL_USER: URL_SYSTEM_V1 + "/user",

  // PRODUCT
  URL_PRODUCT: URL_SYSTEM_V1 + "/product",

  // PRODUCT
  URL_RECEIPT: URL_SYSTEM_V1 + "/receipt",

  // PRODUCT
  URL_NEWS: URL_SYSTEM_V1 + "/news",

  // PRODUCT
  URL_VOUCHER: URL_SYSTEM_V1 + "/voucher",

  // Banner
  URL_BANNER: URL_SYSTEM_V1 + "/banner",

  // Dashboard
  URL_DASHBOARD: URL_SYSTEM_V1 + "/dashboard",

  URL_AI_CHAT_BOT,
  URL_MAIN_BE
};
