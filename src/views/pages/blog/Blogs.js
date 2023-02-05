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
  }, []);
  return (
    <Container className="blogs-wrapper">
      {banners.length > 0 && banners[1].slides.length > 0 ? (
        <SliderComponent slides={banners[1].slides} />
      ) : (
        <Banner url="https://cdn-images.zety.com/pages/pharmacist_cover_letter_example_4.jpg" />
      )}
      <BlogList />
    </Container>
  );
}
export default Blogs;
