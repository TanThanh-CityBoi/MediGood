import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ProductComponent } from "./product-component/ProductComponent";
import React, { Component } from "react";
import Slider from "react-slick";
import './SliderProduct.scss'
import { Container } from "react-bootstrap";

export default class SliderProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        var settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 3,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1380,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true,

                    }
                },
                {
                    breakpoint: 1120,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true,

                    }
                },
                {
                    breakpoint: 950,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    }
                },
                {
                    breakpoint: 560,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };
        return (
            <Container className="slider-product-wrapper">
                <Slider {...settings} className='slider-product-element'>
                    {this.props.products.map((product, key) => (
                        <div key={key} className='slider-item'>
                            <ProductComponent product={product} />
                        </div>
                    ))}
                </Slider>


                
            </Container>
        );
    }
}