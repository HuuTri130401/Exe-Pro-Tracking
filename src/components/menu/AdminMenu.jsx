import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { MdCreate, MdDashboard, MdEqualizer, MdErrorOutline, MdOutlineLocalShipping, MdTask, MdViewInAr } from 'react-icons/md';
import { userLocalStorage } from '../../utils/config';
function AdminMenu() {
    const customerInfor = userLocalStorage.get();
    return (
        <div className='menu'>
            <div className="menu__user">
                <img src={customerInfor.customer.avatar || './img/profile.png'} alt="avatar" />
                <div className="menu__user-info">
                    <div className='framework'>{'ADMIN'}</div>
                    <div className='project'>ProTracking</div>
                </div>
            </div>

            <NavLink to='/adminManagePackages' className='menu__item'>
                <MdTask className='menu__item-icon' />
                <span>Manage User Packages</span>
            </NavLink>

            <NavLink to='/adminManageUsers' className='menu__item'>
                <MdCreate className='menu__item-icon' />
                <span>Manage Users</span>
            </NavLink>

            <hr></hr>

        </div>
    )
}

export default AdminMenu;
