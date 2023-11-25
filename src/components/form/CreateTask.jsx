import { Button, Input, Select } from 'antd';
import { useFormik } from 'formik';
import React, { memo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputForm from '../input/InputForm';
import SearchUserTask from '../search/SearchUserTask';

import * as Yup from 'yup';
import TimeTracking from '../time-tracking/TimeTracking';
import EditorMCE from '../editor-mce/EditorMCE';
import { createTaskTaskThunk } from '../../redux/thunk/taskThunk';
import { closeDrawer } from '../../redux/slice/drawerSlice';
import { userLocalStorage } from '../../utils/config';
import { useNavigate } from 'react-router-dom';

const CreateTask = () => {

  const dispatch = useDispatch();
  const { projectDetail } = useSelector(state => state.projectSlice);
  const customerInfor = userLocalStorage.get();
  const navigate = useNavigate();
  const priorityMapping = {
    "1": 1, // Ánh xạ chuỗi "1" thành số 1
    "2": 2, // Ánh xạ chuỗi "2" thành số 2
    "3": 3, // Ánh xạ chuỗi "1" thành số 1
    "4": 4, // Ánh xạ chuỗi "2" thành số 2
    "5": 5, // Ánh xạ chuỗi "1" thành số 1
  };
  const { values, errors, setFieldValue, handleChange, handleSubmit } = useFormik({
    enableReinitialize: true,
    initialValues: {
      projectId: projectDetail?.projectById?.id,
      title: '',
      status: '',
      createdBy: customerInfor.customer.id,
      priority: ''
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required('Tên task không được trống'),
    }),
    onSubmit: values => {
      values = {
        ...values,
        labelId: 0,
        startDate: new Date().toISOString(),
        dueDate: new Date().toISOString(),
        reportTo: 0,
        assignee: 0,
        iconPriority: ""
      }
      dispatch(createTaskTaskThunk({ ...values }));
    },
  });
  return (
    <form className='row g-3'>

      <div className="col-md-6">
        <label className="form-label">Project Name</label>
        <Input disabled name='projectId' value={projectDetail?.projectById?.title} type="text" />
      </div>

      <div className="col-md-12 col-lg-6">
        <p className='mb-2'>Created By</p>
        <Input disabled name='createdBy' value={customerInfor.customer.username} type="text" />
      </div>

      <div className="col-md-6">
        <label className="form-label">Task Title</label>
        <InputForm name='title' onChange={handleChange} value={values.title} type="text" className="form-control" />
        <span className='text-danger'>{errors.title}</span>
      </div>

      <div className="col-12">
        <div className="row">

          <div className="col-md-12 col-lg-6">
            <p className='mb-2'>Status</p>
            <Select
              style={{ width: '100%' }}
              name='status'
              onChange={(value) => setFieldValue('status', value)}
              options={[
                { value: 'Backlog', label: 'Backlog' },
                { value: 'Selected for Development', label: 'Selected for Development' },
                { value: 'In Progress', label: 'In Progress' },
                { value: 'Doing', label: 'Doing' },
                { value: 'Done', label: 'Done' },
              ]}
            />
            <span className='text-danger'>{errors.status}</span>
          </div>


        </div>
      </div>

      <div className="col-12">
        <div className="col-md-6">
          <label className="form-label">Priority</label>
          <Select
            style={{ width: '100%' }}
            name='priority'
            onChange={(value) => setFieldValue('priority', priorityMapping[value])}
            options={[
              { value: '1', label: 'Very Low' },
              { value: '2', label: 'Low' },
              { value: '3', label: 'Medium' },
              { value: '4', label: 'High' },
              { value: '5', label: 'Critical' },
            ]}
          />
          <span className='text-danger'>{errors.priority}</span>
        </div>
      </div>

      <div className="col-12">
        <Button type='primary' className='me-2' onClick={() => handleSubmit()}>Create Task</Button>
        <Button type='default' onClick={() => closeDrawer(false)}>Cancel</Button>
      </div>
    </form>
  );
};

export default memo(CreateTask);
