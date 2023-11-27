import { Avatar, Tooltip } from 'antd';
import React, { memo } from 'react';
import { AiFillCheckSquare } from 'react-icons/ai';
import { BsFillBookmarkCheckFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { colorPriority } from '../../utils/config';
import { getTaskDetailModalThunk, getTaskDetailThunk } from '../../redux/thunk/taskThunk';
import { openModal } from '../../redux/slice/drawerSlice';
import { useParams } from 'react-router';

const Card = ({ task, provider }) => {
    const dispatch = useDispatch();
    const param = useParams();
    const { assigness, priorityTask, title, id, projectId } = task; //Id is statusId 

    const priorityIcons = {
        '1': '/path/to/very-low-icon.png',
        '2': '/path/to/low-icon.png',
        '3': '/path/to/medium-icon.png',
        '4': './img/up-arrow.png',
        '5': '/path/to/critical-icon.png',
      };

    const priorityLabels = {
        '1': 'Very Low',
        '2': 'Low',
        '3': 'Medium',
        '4': 'High',
        '5': 'Critical',
      };
    return (
        <div className="cards"
            ref={provider.innerRef}
            {...provider.draggableProps}
            {...provider.dragHandleProps}
            onClick={() => {
                // dispatch(getTaskDetailThunk(id)).then(() => {
                //     dispatch(openModal());
                // });
                dispatch(getTaskDetailModalThunk({projectId: projectId, todoId: id})).then(() => {
                    dispatch(openModal());
                });
            }}>
            <p style={{ textOverflow: 'ellipsis' }}>{title.length > 15 ? title.slice(0, 15) + '...' : title}</p>
            <div className="cards__user">
                <Avatar.Group maxCount={2} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                    {/* {renderAvatar()} */}
                </Avatar.Group>
                <div className='cards__user-icons'>
                    <BsFillBookmarkCheckFill className='icon' size={18} color='green' />
                    <AiFillCheckSquare className='icon' size={18} color='darkblue' />
                </div>
  
                <Tooltip title={`Priority: ${priorityLabels[task?.priority]}`}>
                    <span style={{ color: `${task?.priority}` }} className="priority">
                        {/* <img src={priorityIcons[task?.iconPriority]} alt={`${priorityLabels[task?.iconPriority]}`} className="priority-icon" /> */}
                        {priorityLabels[task?.priority]}
                    </span>
                </Tooltip>
            </div>
        </div>
    )
}

export default memo(Card)