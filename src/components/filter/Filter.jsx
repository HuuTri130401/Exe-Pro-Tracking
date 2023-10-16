import { Avatar } from 'antd';
import React from 'react';

const Filter = ({ projectDetail }) => {

    const renderAvatar = () => {
        return projectDetail?.members?.map(({ avatar }, index) => {
            return <Avatar src={avatar} key={index} />
        })
    }

    return (
        <div className='header'>
            <div className="info">
                <div className="search-block">
                    <input className="search input-focus" />
                    <i className="fa fa-search" />
                </div>
                <div className='avatar-group'>
                    <Avatar.Group maxCount={4} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                        {renderAvatar()}
                    </Avatar.Group>
                </div>
                <div style={{ marginLeft: 20 }} className="text">Only My Issues</div>
                <div style={{ marginLeft: 20 }} className="text">Recently Updated</div>
            </div>
        </div>

    )
}

export default Filter