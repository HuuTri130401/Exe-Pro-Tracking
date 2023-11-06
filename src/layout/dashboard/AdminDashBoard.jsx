import React, { memo, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Breadcrumb from '../../components/breadcrumb/Breadcrumb'
import AdminMenu from '../../components/menu/AdminMenu'
import TaskModal from '../../components/modal/TaskModal'
import Sidebar from '../../components/sidebar/Sidebar'
import { categoryThunk, priorityThunk, statusThunk, taskThunk } from '../../redux/thunk/optionThunk'
import EditDrawer from '../edit-drawer/EditDrawer'

const AdminDashBoard = ({ Component, title }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(priorityThunk());
    // dispatch(categoryThunk());
    // dispatch(statusThunk());
    // dispatch(taskThunk());
  }, [])
  return (
    <>
      <Sidebar />
      <AdminMenu />
      <div className='content'>
        <Breadcrumb title={title} />
        <Component />
      </div>
      <EditDrawer />
    </>
  )
}

export default memo(AdminDashBoard);