import "./Product.scss";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ProductBrief } from "./component/ProductBrief";
import { Breadcrumb } from "../../component/Breadcrumb";
import { SuggestProduct } from "../../component/SuggestProduct";
import { productActions } from "../../../actions/product.actions";
import { ProductDetailInfo } from "./component/ProductDetailInfo";
import CircularProgress from '@mui/material/CircularProgress';

const dataBread = [
  {
    name: "Sản phẩm",
    link: "/san-pham",
  },
  {
    name: "Thuốc cảm",
    link: "/chi-tiet-san-pham/:1",
  },
];
function Product() {
  const dispatch = useDispatch();
  const params = useParams();
  const productID = params.id;
  const product = useSelector((state) => state.productReducer.product) || {};
  const isLoading = useSelector((state) => state.productReducer.isLoading);

  useEffect(() => {
    dispatch(productActions.getOne(productID));
  }, [productID]);

  return isLoading ? (
    <div
      style={{
        display: "flex",
        height: "100vh",
        alignIten: "center",
        justifyContent: "center",
      }}
    >
      <h1 style={{ margin: "auto" }}>
        <CircularProgress color="success" />
      </h1>
    </div>
  ) : Object.keys(product).length === 0 ? (
    <div
    style={{
      display: "flex",
      height: "100vh",
      alignIten: "center",
      justifyContent: "center",
    }}
  >
    <h1 style={{ margin: "auto" }}>
      <CircularProgress color="success" />
    </h1>
  </div>
  ) : (
    <Container className="product-wrapper">
      <Breadcrumb data={dataBread} />
      <ProductBrief product={product} />
      <div className="detail-banner">
        <h1>THÔNG TIN SẢN PHẨM</h1>
      </div>
      <ProductDetailInfo product={product} />
      <div className="suggest-product">
        <SuggestProduct productId={productID} />
      </div>
    </Container>
  );
}
export default Product;
