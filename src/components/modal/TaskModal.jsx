import { Button, DatePicker, Input, Modal, Popover, Tag } from 'antd';
import React, { memo, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import { FiLink, FiSend, FiTrash2 } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/slice/drawerSlice';
import { removeTaskThunk, updateTaskThunk } from '../../redux/thunk/taskThunk';
import Comment from '../comment/Comment';
import EditorMCE from '../editor-mce/EditorMCE';
import InputForm from '../input/InputForm';
import SearchUserTask from '../search/SearchUserTask';
import Select from '../select/Select';
import TimeTracking from '../time-tracking/TimeTracking';
import { format } from 'date-fns';
import moment from 'moment';
import { createTheme } from '@mui/material/styles'
import { useEffect } from 'react';
import { useState } from 'react';

const TaskModal = () => {
  const { taskType, status, priority } = useSelector(state => state.optionSlice);
  const { projectDetail } = useSelector(state => state.projectSlice);
  const { taskDetail, taskDetailModal } = useSelector(state => state.taskSlice);
  const { isOpenModal } = useSelector(state => state.drawerSlice);
  const inputRef = useRef(null);
  const editorRef = useRef(null);
  const dispatch = useDispatch();
  const formattedStartDate = moment(
    new Date(taskDetailModal[0]?.startDate),
    'dd-MM-yyyy HH:mm'
  );
  const formattedEndDate = moment(
    new Date(taskDetailModal[0]?.endDate),
    'dd-MM-yyyy HH:mm'
  );

  const [taskStatusOptions, setTaskStatusOptions] = useState([]);
  const [priorityOptions, setPriorityOptions] = useState([]);

  useEffect(() => {
    const apiResponse = [
      { value: 'Done', label: 'Done' },
      { value: 'Testing', label: 'Testing' },
      { value: 'In Progress', label: 'In Progress' },
      { value: 'Selected for Development', label: 'Selected for Development' },
      { value: 'Backlog', label: 'Backlog' },
    ];
    
    setTaskStatusOptions(apiResponse);
  }, []);

  useEffect(() => {
    const apiResponse = [
        { value: '1', label: 'Very Low' },
        { value: '2', label: 'Low' },
        { value: '3', label: 'Medium' },
        { value: '4', label: 'High' },
        { value: '5', label: 'Critical' },
    ];
    
    setPriorityOptions(apiResponse);
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateTaskThunk({ ...taskDetailModal, [name]: value }));
  };

  const renderEditTaskName = () => {
    console.log("Redux state: ", taskDetailModal[0]); 
    return (
        <div style={{ display: 'flex' }}>
            <InputForm inputRef={inputRef} name='title' value={taskDetailModal[0]?.title || ''} />
            <Button className='ms-2' type="primary" onClick={() => {
                const { name, value } = inputRef.current;
                dispatch(updateTaskThunk({ ...taskDetailModal[0].id, [name]: value }));
            }}>Submit</Button>
        </div>
    );
}

  const renderEditDescription = () => {
    return (
      <>
        <div className='mce-btns'>
          <Button type="primary" onClick={() => {
            dispatch(updateTaskThunk({ ...taskDetailModal, description: editorRef.current.currentContent }));
          }}>Save</Button>
          <Button onClick={() => { }}>Cancel</Button>
        </div>
      </>
    );
  };

  const select = (valueSelect, option) => {
    if (valueSelect === '0') {
      return;
    }
    valueSelect = null;
  };
  console.log("Status from API:", taskDetailModal[0]?.status);

  return (
    <Modal
      title="Task Detail"
      centered
      destroyOnClose={true}
      open={isOpenModal}
      closable={false}
      onOk={() => dispatch(closeModal())}
      onCancel={() => dispatch(closeModal())}
      width={1000}
    >
      <div className="task">
        <div className="container-fluid mt-3">
          <div className="row">
            <div className="col-8">
              <div>
                {renderEditTaskName()}
              </div>
              <div className="comment mt-3">
                <p>Comment</p>
                <Comment taskId={taskDetailModal[0]?.id} />
              </div>
            </div>

            <div className="col-4">
              <p>STATUS</p>
              <div>
                <Select
                name='status'
                className='w-100'
                value={taskDetailModal[0]?.status}
                handleChange={(value) => handleChange('status', value)}
                keys='value' 
                data={taskStatusOptions}
                />
            </div>
              <p>Assignees</p>

              <p>Priority</p>
              <Select
                name='priority'
                className='w-100'
                value={taskDetailModal[0]?.priority}
                handleChange={(value) => handleChange('priority', value)}
                keys='value' 
                data={priorityOptions}
                />

            <p>Start Date</p>
              <DatePicker
                showTime
                // onChange={handleChangeStartDate}
                value={formattedStartDate}
              />
            <p>End Date</p>
              <DatePicker
                showTime
                // onChange={handleChangeEndDate}
                value={formattedEndDate}
              />
              <hr />
              <div style={{ color: '#929398' }}>Create at a hours ago</div>
              <div style={{ color: '#929398' }}>Update at a few seconds ago</div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default memo(TaskModal);
