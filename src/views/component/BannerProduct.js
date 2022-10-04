import React from 'react'
import './BannerProduct.scss'

function Banner(props) {
    return (
        <div className='product-banner'>
            <div className='banner-img'>
                <img src={props.url} />
            </div>
        </div>
    )
}
export { Banner }