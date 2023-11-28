import React, { useRef, memo } from 'react';
import { Button } from 'antd';
import InputForm from '../input/InputForm';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../redux/slice/drawerSlice';
import { updateTaskThunk, getTaskDetailThunk } from '../../redux/thunk/taskThunk';
import { openNotification } from '../notification/notification';
import { set } from 'lodash';

const TaskTitle = ({ taskDetail, setTaskDetail }) => {
    const dispatch = useDispatch();
    const inputRef = useRef(null);

    return (
        <div style={{ display: 'flex' }}>
            <InputForm
                inputRef={inputRef} name='title' value={taskDetail?.title || ''}
                onChange={(e) => {
                    setTaskDetail({ ...taskDetail, title: e.target.value });
                }} />
        </div>
    );
}

export default memo(TaskTitle);
