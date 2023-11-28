import React, { memo, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { DatePicker, Modal, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/slice/drawerSlice';
import { updateTask, updateOriginalTaskDetail } from '../../redux/slice/taskSlice';
import { updateTaskThunk } from '../../redux/thunk/taskThunk';
import { getProjectDetailThunk } from '../../redux/thunk/projectThunk';
import TaskTitle from './TaskTitle';
import TaskDescription from './TaskDescription';
import { openNotification } from '../notification/notification';
import { priorityLabels } from '../../utils/config';
import { updateLabels } from '../../redux/slice/labelSlice';

const TaskModal = () => {
  const taskStatusOptions = [
    { value: 'Done', label: 'Done' },
    { value: 'Testing', label: 'Testing' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Selected for Development', label: 'Selected for Development' },
    { value: 'Backlog', label: 'Backlog' }
  ];

  const priorityOptions = [
    { value: 1, label: 'Very Low' },
    { value: 2, label: 'Low' },
    { value: 3, label: 'Medium' },
    { value: 4, label: 'High' },
    { value: 5, label: 'Critical' },
  ];

  const { RangePicker } = DatePicker;

  const { labelsMapper } = useSelector(state => state.labelSlice);
  const { projectDetail } = useSelector(state => state.projectSlice);
  const { taskDetail, originalTaskDetail } = useSelector(state => state.taskSlice);
  const { isOpenModal } = useSelector(state => state.drawerSlice);

  const dispatch = useDispatch();

  const closeModalAndReset = () => {
    dispatch(updateLabels({}));
    dispatch(updateTask({}))
    dispatch(closeModal());
  };

  const setTaskDetail = (newTaskDetail) => {
    dispatch(updateTask(newTaskDetail));
  };

  const postSuccessChange = () => {
    if (taskDetail?.status !== originalTaskDetail?.status
      || taskDetail?.priority !== originalTaskDetail?.priority) {
      dispatch(getProjectDetailThunk(taskDetail?.projectId));
    }
    dispatch(updateOriginalTaskDetail(taskDetail));
  }

  const handleChange = () => {
    if (taskDetail !== originalTaskDetail) {
      dispatch(updateTaskThunk(taskDetail))
        .then((response) => {
          if (response.type == updateTaskThunk.fulfilled) {
            openNotification('success', 'Success', 'Update task successfully');
            postSuccessChange();
          }
          if (response.type == updateTaskThunk.rejected) {
            openNotification('error', 'Error', response.payload);
          }
        });
    }
  };

  return (
    <Modal
      title="Task Detail"
      centered
      destroyOnClose={true}
      open={isOpenModal}
      closable={false}
      onOk={handleChange}
      okText={"Save"}
      onCancel={closeModalAndReset}
      width={1200}
    >
      <div className="task">
        <div className="container-fluid mt-3">
          <div className="row">
            <div className="col-8">
              <TaskTitle taskDetail={taskDetail} setTaskDetail={setTaskDetail} />
              <div className="description mt-3">
                <p>Description</p>
                <TaskDescription taskDetail={taskDetail} setTaskDetail={setTaskDetail} />
              </div>
              {/* <div className="comment mt-3">
                <p>Comment</p>
                <Comment taskId={taskDetail?.id} />
              </div> */}
            </div>

            <div className="col-4">
              <p>STATUS</p>
              <div>
                <Select
                  name='status'
                  className='w-100'
                  defaultValue={taskDetail?.status}
                  onChange={(value) => setTaskDetail({ ...taskDetail, status: value })}
                  options={taskStatusOptions}
                />
              </div>

              <p>Labels</p>
              <Select
                name='labels'
                className='w-100'
                defaultValue={labelsMapper[taskDetail?.labelId]}
                onChange={(value) => setTaskDetail({ ...taskDetail, labelId: parseInt(Object.keys(labelsMapper).find(key => labelsMapper[key] === value)) })}
                options={Object.values(labelsMapper).map((label) => ({ value: label, label: label }))}
              />

              <p>Assignees</p>
              <Select
                name='assignees'
                className='w-100'
                defaultValue={projectDetail?.projectById?.participants?.find((member) => member.customerId === taskDetail?.assignee)?.email}
                onChange={(value) => setTaskDetail({ ...taskDetail, assignee: value })}
                options={projectDetail?.projectById?.participants?.map((member) => ({ value: member.customerId, label: member.email }))}
              />

              <p>Priority</p>
              <Select
                name='priority'
                className='w-100'
                defaultValue={priorityLabels[taskDetail?.priority]}
                onChange={(value) => setTaskDetail({ ...taskDetail, priority: value })}
                options={priorityOptions}
              />

              <p>Start Date - End Date</p>
              <RangePicker
                showTime
                onOk={(value) => setTaskDetail({ ...taskDetail, startDate: value[0].format("YYYY-MM-DDTHH:mm:ss.SSSSSS"), endDate: value[1].format("YYYY-MM-DDTHH:mm:ss.SSSSSS") })}
                defaultValue={[dayjs(taskDetail?.startDate), dayjs(taskDetail?.endDate)]}
              />
              <hr />
              {/* <div style={{ color: '#929398' }}>Create at a hours ago</div> */}
              {/* <div style={{ color: '#929398' }}>Update at a few seconds ago</div> */}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default memo(TaskModal);
