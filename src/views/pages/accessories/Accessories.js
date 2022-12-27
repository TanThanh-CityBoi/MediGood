import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Banner } from "../../component/BannerProduct";
import { SuggestProduct } from "../../component/SuggestProduct";
import { AccessoryList } from "./component/AccessoryList";
import "./Accessories.scss";
import { useDispatch, useSelector } from "react-redux";
import { bannerActions } from "../../../actions";
import SliderComponent from "../../component/SliderComponent/SliderComponent";

const SpecialProducts = () => {
  const banners = useSelector((state) => state.bannerReducer.banners) || [];
  const dispatch = useDispatch();
  useEffect(() => {
    if (banners.length === 0) {
      dispatch(bannerActions.getAll());
    }
  }, []);

  const [currentTab, setCurrentTab] = useState(1);
  return (
    <Container className="products-wrapper">
      {banners.length > 0 && banners[3].slides.length > 0 ? (
        <SliderComponent slides={banners[3].slides} />
      ) : (
        <Banner url="https://res.cloudinary.com/tanthanh0805/image/upload/v1645178807/LuxyWine/Banner_fxehr3.png" />
      )}
      <div className="special-product-head">
        <h1>Phụ kiện dành cho rượu vang</h1>
      </div>

      <AccessoryList />

      <div className="suggest-product">
        <SuggestProduct />
      </div>
    </Container>
  );
};

export default SpecialProducts;
