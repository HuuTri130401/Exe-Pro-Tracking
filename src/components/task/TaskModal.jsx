import React, { memo, useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { DatePicker, Modal, Select, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/slice/drawerSlice';
import { updateTask, updateOriginalTaskDetail } from '../../redux/slice/taskSlice';
import { updateTaskThunk, removeTaskThunk } from '../../redux/thunk/taskThunk';
import { getProjectDetailThunk } from '../../redux/thunk/projectThunk';
import TaskTitle from './TaskTitle';
import TaskDescription from './TaskDescription';
import { openNotification } from '../notification/notification';
import { priorityLabels, userLocalStorage } from '../../utils/config';
import { addNewLabelToProjectThunk, getLabelsOfProject } from '../../redux/thunk/labelThunk';
import { updateLabels } from '../../redux/slice/labelSlice';
import { PlusOutlined } from '@ant-design/icons';
import InputForm from '../input/InputForm';

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

  const [isAddNewLabel, setIsAddNewLabel] = useState(false);
  const newLabelRef = useRef(null);

  const { newLabelLoading } = useSelector(state => state.labelSlice);
  const { labelsMapper } = useSelector(state => state.labelSlice);
  const { projectDetail } = useSelector(state => state.projectSlice);
  const { taskDetail, originalTaskDetail } = useSelector(state => state.taskSlice);
  const { isOpenModal } = useSelector(state => state.drawerSlice);

  const dispatch = useDispatch();

  const closeModalAndReset = () => {
    dispatch(updateLabels({}));
    dispatch(updateTask({}))
    dispatch(getProjectDetailThunk(taskDetail?.projectId));
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
            openNotification('success', 'Successful', 'Update task successfully');
            postSuccessChange();
          }
          if (response.type == updateTaskThunk.rejected) {
            openNotification('error', 'Error', response.payload);
          }
        });
    }
  };

  const handleDelete = () => {
    Modal.confirm({
      title: 'Are you sure delete this task?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        dispatch(removeTaskThunk(taskDetail?.id))
          .then((response) => {
            if (response.type == removeTaskThunk.fulfilled) {
              openNotification('success', 'Successful', 'Delete task successfully');
              closeModalAndReset();
            }
            if (response.type == removeTaskThunk.rejected) {
              openNotification('error', 'Error', response.payload);
            }
          });
      },
    });
  };

  return (
    <Modal
      title="Task Detail"
      centered
      destroyOnClose={true}
      open={isOpenModal}
      closable={false}
      onCancel={closeModalAndReset}
      width={1200}
      footer={[
        <Button
          key="Delete"
          type="primary"
          danger
          onClick={handleDelete}
          disabled={userLocalStorage.get()?.customer?.id !== projectDetail?.projectById?.createdBy}
          style={{ float: 'left' }}>
          Delete
        </Button>,
        <Button key="Cancel" onClick={closeModalAndReset}>
          Cancel
        </Button>,
        <Button key="Save" type="primary" onClick={handleChange}>
          Save
        </Button>,
      ]}
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
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Select
                  showSearch
                  filterOption={(input, option) => option.label?.toLowerCase().indexOf(input?.toLowerCase()) >= 0}
                  name='labels'
                  className='w-100'
                  defaultValue={labelsMapper[taskDetail?.labelId]}
                  onChange={(value) => setTaskDetail({ ...taskDetail, labelId: parseInt(Object.keys(labelsMapper).find(key => labelsMapper[key] === value)) })}
                  options={Object.values(labelsMapper).map((label) => ({ value: label, label: label }))}
                />
                <Button type="primary" shape="square" icon={<PlusOutlined />} onClick={() => setIsAddNewLabel(true)}/>
                <Modal
                  title="Add new label"
                  open={isAddNewLabel}
                  centered
                  confirmLoading={newLabelLoading}
                  onOk={() => {
                    const isExist = () => {
                      var isExist = false;
                      Object.values(labelsMapper).forEach((label) => {
                        if (label?.toLowerCase() === newLabelRef.current.value.toLowerCase()) {
                          isExist = true;
                        }
                      });
                      return isExist;
                    }
                    if (newLabelRef.current.value === '' || isExist()) {
                      openNotification('error', 'Error', 'Label name is empty or already exists');
                      return;
                    }
                    dispatch(addNewLabelToProjectThunk({ title: newLabelRef.current.value, projectId: taskDetail?.projectId }))
                      .then((response) => {
                        if (response.type == addNewLabelToProjectThunk.fulfilled) {
                          openNotification('success', 'Successful', 'Add new label successfully');
                          dispatch(getLabelsOfProject(taskDetail?.projectId));
                          setIsAddNewLabel(false);
                        }
                        if (response.type == addNewLabelToProjectThunk.rejected) {
                          openNotification('error', 'Error', response.payload);
                        }
                      });
                  }}
                  onCancel={() => setIsAddNewLabel(false)}
                >
                  <InputForm name='label' value='' inputRef={newLabelRef} />
                </Modal>
              </div>

              <p>Assignees</p>
              <Select
                showSearch
                filterOption={(input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0}
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
