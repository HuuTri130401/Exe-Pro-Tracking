import { Avatar, Tooltip } from 'antd';
import React, { memo } from 'react';
import { AiFillCheckSquare } from 'react-icons/ai';
import { BsFillBookmarkCheckFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { colorPriority, priorityLabels } from '../../utils/config';
import { getTaskDetailThunk } from '../../redux/thunk/taskThunk';
import { getLabelsOfProject } from "../../redux/thunk/labelThunk";
import { openModal } from '../../redux/slice/drawerSlice';
import { useParams } from 'react-router';

const Card = ({ task, provider }) => {
    const dispatch = useDispatch();
    const param = useParams();
    const { assigness, priorityTask, title, id, projectId } = task; //Id is statusId

    return (
        <div className="cards"
            ref={provider.innerRef}
            {...provider.draggableProps}
            {...provider.dragHandleProps}
            onClick={() => {
                dispatch(getTaskDetailThunk({ projectId: projectId, todoId: id })).then(() => {
                    dispatch(getLabelsOfProject(projectId)).then(() => {
                        dispatch(openModal());
                    });
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
                    <span style={{ fontSize: "17px", color: colorPriority[task?.priority] }} className="priority">
                        {/* <img src={priorityIcons[task?.iconPriority]} alt={`${priorityLabels[task?.iconPriority]}`} className="priority-icon" /> */}
                        {priorityLabels[task?.priority]}
                    </span>
                </Tooltip>
            </div>
        </div>
    )
}

export default memo(Card)
