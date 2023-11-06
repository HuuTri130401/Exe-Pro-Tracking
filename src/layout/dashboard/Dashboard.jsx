import React, { memo } from 'react'
import Breadcrumb from '../../components/breadcrumb/Breadcrumb'
import Menu from '../../components/menu/Menu'
import Sidebar from '../../components/sidebar/Sidebar'
import EditDrawer from '../edit-drawer/EditDrawer'

const Dashboard = ({ Component, title }) => {
  return (
    <>
      <Sidebar />
      <Menu />
      <div className='content'>
        <Breadcrumb title={title} />
        <Component />
      </div>
      <EditDrawer />
    </>
  )
}

export default memo(Dashboard);
