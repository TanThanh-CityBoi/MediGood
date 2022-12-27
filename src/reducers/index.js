import { combineReducers } from "redux";

import { appReducer } from "./app.reducer";
import { userReducer } from "./user.reducer";
import { foodReducer } from "./food.reducer";
import { productReducer } from "./product.reducer";
import { newsReducer } from "./news.reducer";
import { voucherReducer } from "./voucher.reducer";
import { receiptReducer } from "./receipt.reducer";
import { bannerReducer } from "./banner.reducer";
import { dashboardReducer } from "./dashboard.reducer";
import { toast } from "./toast.reducer";
const rootReducer = combineReducers({
  appReducer, // appReducer
  userReducer,
  foodReducer,
  productReducer,
  newsReducer,
  voucherReducer,
  receiptReducer,
  bannerReducer,
  dashboardReducer,
  toast,
});

export default rootReducer;
