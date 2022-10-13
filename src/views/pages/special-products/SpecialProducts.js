import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { productActions } from "../../../actions/product.actions";
import { Banner } from "../../component/BannerProduct";
import { SpecialProductList } from "./component/SpecialProductList";
import { SuggestProduct } from "../../component/SuggestProduct";
import { GrPrevious, GrNext } from "react-icons/gr";
import "./SpecialProducts.scss";
import { bannerActions } from "../../../actions";
import SliderComponent from "../../component/SliderComponent/SliderComponent";

const filters = [
  {
    name: "Tất cả",
    value: 1,
  },
  {
    name: "Hộp quà",
    value: 2,
  },
  {
    name: "Combo",
    value: 3,
  },
  {
    name: "Khuyến mãi",
    value: 4,
  },
  {
    name: "Sản phẩm mới",
    value: 5,
  },
];
const SpecialProducts = () => {
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState(1);
  const list = useSelector((state) => state.productReducer.products) || [];
  const isLoading = useSelector((state) => state.productReducer.isLoading);
  var products = [];
  const banners = useSelector((state) => state.bannerReducer.banners) || [];

  useEffect(() => {
    dispatch(productActions.getListSpecialProduct());
    if (banners.length === 0) {
      dispatch(bannerActions.getAll());
    }
  }, []);

  if (!isLoading) {
    switch (currentTab) {
      case 1:
        products = [...list];
        break;
      case 2:
        list.forEach((element) => {
          if (element.productType === "gift") products.push(element);
        });
        console.log("filter: ", products);
        break;
      case 3:
        list.forEach((element) => {
          if (element.productType === "combo") products.push(element);
        });
        console.log("filter: ", products);
        break;
      case 4:
        list.forEach((element) => {
          if (element.price < element.originPrice) products.push(element);
        });
        console.log("filter: ", products);
        break;
      case 5:
        list.forEach((element) => {
          if (element.isNewProduct) products.push(element);
        });
        console.log("filter: ", products);
        break;
      default:
        break;
    }
  }

  return (
    <Container className="special-products-wrapper">
      {banners.length > 0 && banners[2].slides.length > 0 ? (
        <SliderComponent slides={banners[2].slides} />
      ) : (
        <Banner url="https://res.cloudinary.com/tanthanh0805/image/upload/v1645178807/LuxyWine/Banner_fxehr3.png" />
      )}
      <div className="special-product-head">
        <h1>Các sản phẩm đặc biệt đến từ LuxyWine</h1>
        <Container className="filter-special-product">
          <GrPrevious style={{ color: "black" }} />
          {filters.map((value, index) => (
            <button
              key={index}
              className={currentTab === index + 1 ? "btn-active" : "btn"}
              onClick={() => setCurrentTab(index + 1)}
            >
              {value.name}
            </button>
          ))}
          <GrNext style={{ color: "black" }} />
        </Container>
      </div>

      <SpecialProductList products={products} currentTab={currentTab} />
      <div className="suggest-product">
        <SuggestProduct />
      </div>
    </Container>
  );
};

export default SpecialProducts;
