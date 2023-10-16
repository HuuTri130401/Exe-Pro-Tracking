import React from 'react';
import { Link } from 'react-router-dom';
import Background from '../../assets/page-not-found.svg';

const ErrorPage = () => {
    return (
        <>
            <div className="wrapper" style={{backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0.5)),url(${Background}) `}}>
                <h1>Trang web bạn truy cập không tồn tại</h1>
                <Link to={'/projects'} className="btn">Nhấn để về trang chủ ProTracking</Link>
            </div>
        </>
    )
}

export default ErrorPage