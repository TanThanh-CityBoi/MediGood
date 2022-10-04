import { Banner } from "../../component/BannerProduct";
import { Container } from "react-bootstrap";
import { BlogList } from "./component/BlogList";
import { SuggestProduct } from "./../../component/SuggestProduct";
import "./Blogs.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import SliderComponent from "../../component/SliderComponent/SliderComponent";
import { bannerActions } from "../../../actions";

function Blogs() {
  const dispatch = useDispatch();

  const banners = useSelector((state) => state.bannerReducer.banners);
  useEffect(() => {
    if (banners.length === 0) dispatch(bannerActions.getAll());
    // const query = {}
    // dispatch(productActions.getList(query));
  }, []);
  return (
    <Container className="blogs-wrapper">
      {banners.length > 0 && banners[1].slides.length > 0 ? (
        <SliderComponent slides={banners[1].slides} />
      ) : (
        <Banner url="https://res.cloudinary.com/tanthanh0805/image/upload/v1645178807/LuxyWine/Banner_fxehr3.png" />
      )}
      <BlogList />
      <SuggestProduct />
    </Container>
  );
}
export default Blogs;
