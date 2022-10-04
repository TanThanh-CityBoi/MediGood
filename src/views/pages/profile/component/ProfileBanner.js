import { UploadModal } from './UploadModal'
import { useNavigate } from 'react-router-dom'
import { Avatar } from '@mui/material'
import { BiEditAlt } from 'react-icons/bi'
import { BsCartCheck } from "react-icons/bs"
import './ProfileBanner.scss'
import { useSelector } from 'react-redux'

function ProfileBanner() {
    const navigate = useNavigate();
    const UserInfo = useSelector(state => state.userReducer.logedUser) || {};
    return (

        <div className='profile-banner'>
            <div className='profile-banner__row'>
                <div className='banner-col_left'>
                    <div className="avatar-group">
                        <Avatar
                            alt="Remy Sharp"
                            src={UserInfo?.avatar}
                            sx={{ width: 200, height: 200 }}
                        />
                        <UploadModal avatar={UserInfo?.avatar}></UploadModal>
                    </div>
                </div>
                <div xs={12} md={9} className='banner-col_right'>
                    <div className='name-group'>
                        <div>
                            <h1>{UserInfo?.name}</h1>
                            <h2>{UserInfo?.email}</h2>
                            <h2>Điểm tiêu dùng: <b>500</b></h2>
                        </div>
                    </div>
                    <div className='btn-group'>
                        <div>
                            <button className='btn-user__cart' onClick={() => navigate('/gio-hang')}>
                                <BsCartCheck />
                                Giỏ hàng
                            </button>
                            <button className='btn-edit__profile'>
                                <BiEditAlt />
                                Đổi mật khẩu
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export { ProfileBanner }