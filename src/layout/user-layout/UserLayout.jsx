import React from 'react';
import { Col, Row } from 'antd';
import { IMAGE_BASE_PATH } from '../../utils/config';

const UserLayout = ({ Component }) => {
  return (
    <Row className='user'>
      <Col lg={12} className='user__left'>
        <img src={IMAGE_BASE_PATH + "logo_protracking.png"} alt="Logo ProTracking" />
      </Col>
      <Col md={24} lg={12} className='user__right'>
        <Component/>
      </Col>
    </Row>
  )
}

export default UserLayout;
