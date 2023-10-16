import { Avatar } from 'antd';
import React, { memo } from 'react';
import { AiFillCheckSquare } from 'react-icons/ai';
import { BsFillBookmarkCheckFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { colorPriority } from '../../utils/config';
import { getTaskDetailThunk } from '../../redux/thunk/taskThunk';
import { openModal } from '../../redux/slice/drawerSlice';

const Card = ({ task, provider }) => {
    const dispatch = useDispatch();
    const { assigness, priorityTask, taskName, taskId } = task;
    const renderAvatar = () => {
        return assigness?.map((member, index) => {
            return <Avatar src={member.avatar} key={index} />
        })
    }

    return (
        <div className="cards"
            ref={provider.innerRef}
            {...provider.draggableProps}
            {...provider.dragHandleProps}
            onClick={() => {
                dispatch(getTaskDetailThunk(taskId)).then(() => {
                    dispatch(openModal());
                });
            }}>
            <p style={{ textOverflow: 'ellipsis' }}>{taskName.length > 15 ? taskName.slice(0, 15) + '...' : taskName}</p>
            <div className="cards__user">
                <Avatar.Group maxCount={2} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                    {renderAvatar()}
                </Avatar.Group>
                <div className='cards__user-icons'>
                    <BsFillBookmarkCheckFill className='icon' size={18} color='green' />
                    <AiFillCheckSquare className='icon' size={18} color='darkblue' />
                </div>
                <span style={{ color: `${colorPriority[priorityTask.priorityId - 1].color}` }} className='priority ms-2'>{priorityTask.priority}</span>
            </div>
        </div>
    )
}

export default memo(Card)