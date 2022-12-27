import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { newsActions } from '../../../../actions/news.actions'
import { Container } from 'react-bootstrap'
import { BlogCard } from './BlogCard'
import { PaginationCustom } from '../../../component/PaginationCustom'
import './BlogList.scss'

function BlogList(props) {

    const dispatch = useDispatch();
    const news = useSelector(state => state.newsReducer.newsList) || []
    const isLoading = useSelector(state => state.newsReducer.isLoading)
    const [currentPage, setCurrentPage] = useState(1);
    const elementPerPage = 5;
    const [sortNews, setSortNews] = useState("name");
    useEffect(() => {
        dispatch(newsActions.getAll());
    }, [])

    switch (sortNews) {
        case "name":
            news.sort(
                function (a, b) {
                    return a.title.toLowerCase().charCodeAt(0) - b.title.toLowerCase().charCodeAt(0);
                }
            )
            break;
        case "view":
            news.sort(
                function (a, b) {
                    return a.views - b.views;
                }
            )
            break;
        case "newest":
            news.sort(
                function (a, b) {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                }
            )
            break;
        default: break;
    }


    const newsInPage = news.slice((currentPage - 1) * elementPerPage, currentPage * elementPerPage)
    console.log("news: ", news);

    return (
        isLoading ? <h1 style={{ marginTop: "12rem" }}>Loading............</h1> :
            <div className='news-list-wrapper'>
                <div className='news-list-header-wrapper'>
                    <div className='news-list-header'>
                        <div className='news-sort'>
                            <label htmlFor='select-type'>Sấp xếp theo: </label>
                            <select id='select-type' onChange={(e) => { setSortNews(e.target.value); setCurrentPage(1) }}>
                                <option value={'name'}>Tên A-Z</option>
                                <option value={'view'}>Xem nhiều nhất</option>
                                <option value={'newest'}>Mới nhất</option>
                            </select>
                        </div>

                        <div className='result-filter'>
                            <p>Tìm được <b>{news.length}</b> bài viết</p>
                        </div>
                    </div>
                </div>

                {news.length > 0 &&
                    <div className='news-list'>
                        {Array.from({ length: newsInPage.length }).map((_, idx) => (
                            <div key={idx} className="blog-item">
                                <BlogCard style={{marginTop: '24px'}} news={newsInPage[idx]} key={idx} />
                            </div>
                        ))}
                        <div className='news-list-footer'>
                            <PaginationCustom numberOfElement={news.length} elementPerPage={elementPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
                        </div>
                    </div>}

            </div>
    )
}

export { BlogList } 
