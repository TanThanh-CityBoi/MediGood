import { useNavigate } from 'react-router-dom'
import { GrView } from 'react-icons/gr'
import './BlogCard.scss'

function BlogCard(props) {
    const navigate = useNavigate();
    const time = (new Date(props.news.createdAt).getDate() < 10 ? ('0' + new Date(props.news.createdAt).getDate()) : new Date(props.news.createdAt).getDate())
        + '.' + (((new Date(props.news.createdAt).getMonth() + 1) < 10) ? ('0' + (new Date(props.news.createdAt).getMonth() + 1)) : (new Date(props.news.createdAt).getMonth() + 1))
        + '.' + new Date(props.news.createdAt).getFullYear()
    return (
        <div className="blog-card">
            <div className="blog-card__thumnail">
                <img src={props.news.avtUrl} style={{ width: "100%" }}></img>
            </div>
            <div className="blog-card__body">
                <div className="blog-card__title">
                    <p>{props.news.title}</p>
                </div>
                <div className="blog-card__createdAt-views">
                    <div>
                        <p>{time}</p>
                    </div>
                    <div>
                        <p>
                            <GrView />
                            {props.news.views}
                        </p>
                    </div>
                </div>
            </div>
            <div className='hover-card' onClick={() => navigate('/tin-tuc/' + props.news._id)}></div>
        </div>
    )
}
export { BlogCard }