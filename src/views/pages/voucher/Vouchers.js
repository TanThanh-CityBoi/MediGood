import { Banner } from "../../component/BannerProduct";
import { Container } from "react-bootstrap";
import { SuggestProduct } from "../../component/SuggestProduct";
import { VoucherList } from "./component/VoucherList";
import { OnSaleProducts } from "./component/OnSaleProduct";
import "./Vouchers.scss";
import { useDispatch, useSelector } from "react-redux";
import { bannerActions } from "../../../actions";
import SliderComponent from "../../component/SliderComponent/SliderComponent";
import { useEffect } from "react";

function Blogs() {
  const dispatch = useDispatch();
  const banners = useSelector((state) => state.bannerReducer.banners);
  useEffect(() => {
    if (banners.length === 0) dispatch(bannerActions.getAll());
  }, []);

  return (
    <Container className="vouchers-wrapper">
      {banners.length > 0 && banners[4].slides.length > 0 ? (
        <SliderComponent slides={banners[1].slides} />
      ) : (
        <Banner url="https://res.cloudinary.com/tanthanh0805/image/upload/v1645178807/LuxyWine/Banner_fxehr3.png" />
      )}
      <VoucherList />
      <OnSaleProducts />
      <SuggestProduct />
    </Container>
  );
}
export default Blogs;
