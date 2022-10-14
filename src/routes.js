import React from "react";

const Homepage = React.lazy(() => import("./views/pages/home/Home"));
const Products = React.lazy(() => import("./views/pages/products/Products"));
const Accessories = React.lazy(() =>
  import("./views/pages/accessories/Accessories")
);
const Product = React.lazy(() => import("./views/pages/product/Product"));
const Cart = React.lazy(() => import("./views/pages/cart/Cart"));
const Payment = React.lazy(() => import("./views/pages/payment/Payment"));
const Profile = React.lazy(() => import("./views/pages/profile/Profile"));
const Receipt = React.lazy(() => import("./views/pages/receipt/Receipt"));
const Blogs = React.lazy(() => import("./views/pages/blog/Blogs"));
const Blog = React.lazy(() => import("./views/pages/blog/Blog"));

const Dashboard = React.lazy(() =>
  import("./views/pages/manager/page/dashboard/Dashboard")
);
const ProductList = React.lazy(() =>
  import("./views/pages/manager/page/product/list/ProductList")
);
const NewProduct = React.lazy(() =>
  import("./views/pages/manager/page/product/new/NewProduct")
);
const EditProduct = React.lazy(() =>
  import("./views/pages/manager/page/product/edit/EditProduct")
);
const ProductDetail = React.lazy(() =>
  import("./views/pages/manager/page/product/detail/ProductDetail")
);

const ReceiptList = React.lazy(() =>
  import("./views/pages/manager/page/receipt/list/ReceiptList")
);
const NewReceipt = React.lazy(() =>
  import("./views/pages/manager/page/receipt/new/NewReceipt")
);
const EditReceipt = React.lazy(() =>
  import("./views/pages/manager/page/receipt/edit/EditReceipt")
);
const ReceiptDetail = React.lazy(() =>
  import("./views/pages/manager/page/receipt/detail/ReceiptDetail")
);

const VoucherList = React.lazy(() =>
  import("./views/pages/manager/page/voucher/list/VoucherList")
);
const NewVoucher = React.lazy(() =>
  import("./views/pages/manager/page/voucher/new/NewVoucher")
);
const EditVoucher = React.lazy(() =>
  import("./views/pages/manager/page/voucher/edit/EditVoucher")
);
const VoucherDetail = React.lazy(() =>
  import("./views/pages/manager/page/voucher/detail/VoucherDetail")
);

const UserList = React.lazy(() =>
  import("./views/pages/manager/page/user/list/UserList.js")
);
const NewUser = React.lazy(() =>
  import("./views/pages/manager/page/user/new/NewUser.js")
);
const EditUser = React.lazy(() =>
  import("./views/pages/manager/page/user/edit/EditUser.js")
);
const UserDetail = React.lazy(() =>
  import("./views/pages/manager/page/user/detail/UserDetail.js")
);

const NewsList = React.lazy(() =>
  import("./views/pages/manager/page/news/list/NewsList")
);
const NewNews = React.lazy(() =>
  import("./views/pages/manager/page/news/new/NewNews")
);
const EditNews = React.lazy(() =>
  import("./views/pages/manager/page/news/edit/EditNews")
);
const NewsDetail = React.lazy(() =>
  import("./views/pages/manager/page/news/detail/NewsDetail")
);

const BannerList = React.lazy(() =>
  import("./views/pages/manager/page/banner/list/BannerList.js")
);
const EditBanner = React.lazy(() =>
  import("./views/pages/manager/page/banner/edit/EditBanner")
);

const Search = React.lazy(() => import("./views/pages/search/Search"));
const OrderLookup = React.lazy(() =>
  import("./views/pages/orderLookup/orderLookup")
);

const publicRoute = [];

const commonRoute = [
  { path: "/trang-chu", name: "Trang chủ", element: <Homepage /> },
  { path: "/san-pham", name: "Sản phẩm", element: <Products /> },
  { path: "/phu-kien", name: "Phụ kiện", element: <Accessories /> },
  {
    path: "/chi-tiet-san-pham/:id",
    name: "Chi tiết sản phẩm",
    element: <Product />,
  },
  { path: "/gio-hang", name: "Giỏ hàng", element: <Cart /> },
  { path: "/thanh-toan", name: "Thanh toán", element: <Payment /> },
  { path: "/tim-kiem", name: "Thanh toán", element: <Search /> },
  { path: "/tra-cuu-don-hang", name: "Thanh toán", element: <OrderLookup /> },
  { path: "/tin-tuc", name: "Tin tức", element: <Blogs /> },
  { path: "/tin-tuc/:id", name: "Tin tức", element: <Blog /> },
];

const protectedRoute = [
  {
    path: "/thong-tin-tai-khoan",
    name: "Thông tin tài khoản",
    element: <Profile />,
  },
  {
    path: "/chi-tiet-hoa-don/:id",
    name: "Chi tiết hóa đơn",
    element: <Receipt />,
  },
];

const managerRoute = [
  { path: "/quan-ly/dashboard", name: "Dashboard", element: <Dashboard /> },
    ///---------------------------
  { path: "/quan-ly/san-pham", name: "Dashboard", element: <ProductList /> },
  { path: "/quan-ly/san-pham/new", name: "Dashboard", element: <NewProduct /> },
  {
    path: "/quan-ly/san-pham/edit/:id",
    name: "Dashboard",
    element: <EditProduct />,
  },
  {
    path: "/quan-ly/san-pham/:id",
    name: "Dashboard",
    element: <ProductDetail />,
  },
    ///---------------------------
  { path: "/quan-ly/tin-tuc", name: "Dashboard", element: <NewsList /> },
  { path: "/quan-ly/tin-tuc/new", name: "Dashboard", element: <NewNews /> },
  {
    path: "/quan-ly/tin-tuc/edit/:id",
    name: "Dashboard",
    element: <EditNews />,
  },
  { path: "/quan-ly/tin-tuc/:id", name: "Dashboard", element: <NewsDetail /> },
  ///---------------------------
  { path: "/quan-ly/nguoi-dung", name: "Dashboard", element: <UserList /> },
  { path: "/quan-ly/nguoi-dung/new", name: "Dashboard", element: <NewUser /> },
  {
    path: "/quan-ly/nguoi-dung/edit/:id",
    name: "Dashboard",
    element: <EditUser />,
  },
  {
    path: "/quan-ly/nguoi-dung/:id",
    name: "Dashboard",
    element: <UserDetail />,
  },
  ///---------------------------
  { path: "/quan-ly/khuyen-mai", name: "Dashboard", element: <VoucherList /> },
  {
    path: "/quan-ly/khuyen-mai/new",
    name: "Dashboard",
    element: <NewVoucher />,
  },
  {
    path: "/quan-ly/khuyen-mai/edit/:id",
    name: "Dashboard",
    element: <EditVoucher />,
  },
  {
    path: "/quan-ly/khuyen-mai/:id",
    name: "Dashboard",
    element: <VoucherDetail />,
  },

  { path: "/quan-ly/hoa-don", name: "Dashboard", element: <ReceiptList /> },
  { path: "/quan-ly/hoa-don/new", name: "Dashboard", element: <NewReceipt /> },
  {
    path: "/quan-ly/hoa-don/edit/:id",
    name: "Dashboard",
    element: <EditReceipt />,
  },
  {
    path: "/quan-ly/hoa-don/:id",
    name: "Dashboard",
    element: <ReceiptDetail />,
  },

  { path: "/quan-ly/banner", name: "Dashboard", element: <BannerList /> },
  {
    path: "/quan-ly/banner/edit/:id",
    name: "Dashboard",
    element: <EditBanner />,
  },
];

const routes = {
  publicRoute,
  protectedRoute,
  commonRoute,
  managerRoute,
};

export default routes;
