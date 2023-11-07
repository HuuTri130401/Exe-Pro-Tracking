import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { Button } from 'antd';
import { FiPackage, FiPaperclip, FiSettings } from 'react-icons/fi';
import { MdCreate, MdDashboard, MdEqualizer, MdErrorOutline, MdOutlineLocalShipping, MdTask, MdViewInAr } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { userLocalStorage } from '../../utils/config';
function Menu() {
    const { projectDetail } = useSelector(state => state.projectSlice);
    const navigate = useNavigate();
    const customerInfor = userLocalStorage.get();

    const user = userLocalStorage.get();
    const isAdmin = user?.customer?.role === 1;

    return (
        <div className='menu'>
            <div className="menu__user">
                <img src={customerInfor.customer.avatar || './img/profile.png'} alt="avatar" />
                <div className="menu__user-info">
                    <div className='framework'>{isAdmin ? "ADMIN" : customerInfor.customer.username}</div>
                    <div className='project'>ProTracking</div>
                </div>
            </div>

            {isAdmin &&
                <>
                    <NavLink to='/adminManageTransactions' className='menu__item'>
                        <MdTask className='menu__item-icon' />
                        <span>Transactions Management</span>
                    </NavLink>
                    <NavLink to='/adminManageUsers' className='menu__item'>
                        <MdCreate className='menu__item-icon' />
                        <span>Users Management</span>
                    </NavLink>
                    <hr></hr>
                </>
            }

            <Button type='link' onClick={() => {
                if (projectDetail?.id) navigate(`/board/${projectDetail?.id}`)
                else navigate('/projects')
            }} className='menu__item'>
                <MdDashboard className='menu__item-icon' />
                <span>ProTracking Board</span>
            </Button>
            <NavLink to='/create' className='menu__item'>
                <MdCreate className='menu__item-icon' />
                <span>Create Projects</span>
            </NavLink>
            <NavLink to='/projects' className='menu__item'>
                <MdTask className='menu__item-icon' />
                <span>Project Management</span>
            </NavLink>
            <hr></hr>

            <NavLink to='/package' className="menu__item">
                <FiPackage className='menu__item-icon' />
                <span>Package Management</span>
            </NavLink>
            <div className="menu__item">
                <MdOutlineLocalShipping className='menu__item-icon' />
                <span>Releases</span>
                <span className='implemente'>Not implemented</span>
            </div>
            <div className="menu__item">
                <MdErrorOutline className='menu__item-icon' />
                <span>Issues and filters</span>
                <span className='implemente'>Not implemented</span>
            </div>
            <div className="menu__item">
                <FiPaperclip className='menu__item-icon' />
                <span>Pages</span>
                <span className='implemente'>Not implemented</span>
            </div>
            <div className="menu__item">
                <MdEqualizer className='menu__item-icon' />
                <span>Reports</span>
                <span className='implemente'>Not implemented</span>
            </div>
            <div className="menu__item">
                <MdViewInAr className='menu__item-icon' />
                <span>Components</span>
                <span className='implemente'>Not implemented</span>
            </div>
        </div >
    )
}

export default Menu;
