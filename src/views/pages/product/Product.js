import { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { productActions } from '../../../actions/product.actions'
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb } from '../../component/Breadcrumb'
import { SuggestProduct } from '../../component/SuggestProduct'
import { ProductBrief } from './component/ProductBrief'
import { ProductDetailInfo } from './component/ProductDetailInfo'
import './Product.scss'
import { useParams } from 'react-router-dom'


const dataBread = [
    {
        name: 'Rượu',
        link: '/san-pham'
    },
    {
        name: 'Rượu vang pháp',
        link: '/chi-tiet-san-pham/:1'
    }]
function Product() {
    const dispatch = useDispatch();
    const params = useParams();
    const productID = params.id;
    const product = useSelector(state => state.productReducer.product) || {}
    console.log("product: ", product);
    const isLoading = useSelector(state => state.productReducer.isLoading)

    useEffect(() => {
        dispatch(productActions.getOne(productID));
    }, [productID])

    return (
        isLoading ? <h1 style={{marginTop: "12rem"}}>Loading.......</h1>:
        Object.keys(product).length === 0 ? <h1 style={{marginTop: "12rem"}}>Loading.......</h1>:
        <Container className='product-wrapper'>
            <Breadcrumb data={dataBread} />
            <ProductBrief product={product} />
            <div className='detail-banner'>
                <h1>ĐẶC TRƯNG</h1>
            </div>
            {product.productType !== 'accessary' ?
                <ProductDetailInfo product={product} /> :
                <Container className='accessory-detail'>
                    <h5>Mô tả: </h5>
                    <p>{product.aboutProduct}</p>
                </Container>}
            <div className='suggest-product'>
                <SuggestProduct />
            </div>
        </Container>
    )
}
export default Product 