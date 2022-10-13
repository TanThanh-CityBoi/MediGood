
import { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { Banner } from '../../component/BannerProduct'
import { useDispatch, useSelector } from 'react-redux'
import { BlogCard } from './component/BlogCard'
import './Blog.scss'
import { newsActions } from '../../../actions'

function Blog() {

    const news = useSelector(state => state.newsReducer.news) || {}
    const newsList = useSelector(state => state.newsReducer.newsList) || []
    const dispatch = useDispatch();
    const param = useParams();
    const id = param.id;

    useEffect(() => {
        dispatch(newsActions.getOne(id))
        dispatch(newsActions.getAll());
    }, [id])
    const createTime = (new Date(news?.createdAt).getDate() < 10 ? ('0' + new Date(news?.createdAt).getDate()) : new Date(news?.createdAt).getDate())
        + '-' + (((new Date(news?.createdAt).getMonth() + 1) < 10) ? ('0' + (new Date(news?.createdAt).getMonth() + 1)) : (new Date(news?.createdAt).getMonth() + 1))
        + '-' + new Date(news?.createdAt).getFullYear()

    return (
        <Container className='blog-wrapper'>
            <Banner url='https://perdeberg.co.za/wp-content/uploads/2020/09/Perdeberg_landing-new-size-11-scaled.jpg' />
            <Row>
                <Col xs={12} lg={8}>
                    <div className='blog-header'>
                        <p className='create-time'>{createTime}</p>
                        <p className='blog-title'>{news?.title}</p>
                        <p className='blog-description'>{news?.description}</p>
                    </div>

                    <div className='blog-thumnail'>
                        <img src={news?.avtUrl}></img>
                    </div>

                    <div className='blog-content' dangerouslySetInnerHTML={{__html: news?.content}}>

                    </div>
                </Col>

                <Col xs={12} lg={4}>
                    <div className='suggest-news'>
                        <p className='suggest-title'>Bài viết đề xuất</p>
                        {
                            newsList?.length > 0 &&
                            newsList.slice(0, 4).map((val, idx) => (
                                <div className='blog-item' key={idx}>
                                    <BlogCard news={val} />
                                </div>
                            ))
                        }
                    </div>
                </Col>
            </Row>

        </Container>
    )
}

export default Blog