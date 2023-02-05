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
        <Banner url="https://cdn-images.zety.com/pages/pharmacist_cover_letter_example_4.jpg" />
      )}
      <div className="special-product-head">
        <h1>Phụ kiện dành cho rượu vang</h1>
      </div>

      <AccessoryList />

      <div className="suggest-product">
      </div>
    </Container>
  );
};

export default SpecialProducts;
