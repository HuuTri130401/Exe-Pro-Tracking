import { Button, Input } from 'antd';
import { useFormik } from 'formik';
import React, { memo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputForm from '../input/InputForm';
import SearchUserTask from '../search/SearchUserTask';
import Select from '../select/Select';
import * as Yup from 'yup';
import TimeTracking from '../time-tracking/TimeTracking';
import EditorMCE from '../editor-mce/EditorMCE';
import { createTaskTaskThunk } from '../../redux/thunk/taskThunk';
import { closeDrawer } from '../../redux/slice/drawerSlice';

const CreateTask = () => {

  const dispatch = useDispatch();
  const { projectDetail } = useSelector(state => state.projectSlice);
  const { status, priority, taskType } = useSelector(state => state.optionSlice);
  const editorRef = useRef(null);
  const { values, errors, setFieldValue, handleChange, handleSubmit } = useFormik({
    enableReinitialize: true,
    initialValues: {
      projectId: projectDetail?.id,
      taskName: '',
      statusId: status[0]?.statusId,
      priorityId: priority[0]?.priorityId,
      typeId: taskType[0]?.id,
      originalEstimate: 0,
      timeTrackingRemaining: '',
      timeTrackingSpent: '',
      listUserAsign: []
    },
    validationSchema: Yup.object().shape({
      taskName: Yup.string().required('Tên project không được trống'),
      originalEstimate: Yup.string().required('Thời gian ước lượng không được trống'),
      timeTrackingRemaining: Yup.string().required('Thời gian còn lại không được trống'),
      timeTrackingSpent: Yup.string().required('Tổng thời gian không được trống'),
    }),
    onSubmit: values => {
      dispatch(createTaskTaskThunk({ ...values, description: editorRef.current.currentContent }));
    },
  });
  return (
    <form className='row g-3'>
      <div className="col-md-6">
        <label className="form-label">Project Name</label>
        <Input disabled name='projectName' value={projectDetail.projectName} type="text" />
      </div>
      <div className="col-md-6">
        <label className="form-label">Task name</label>
        <InputForm name='taskName' onChange={handleChange} value={values.taskName} type="text" className="form-control" />
        <span className='text-danger'>{errors.taskName}</span>
      </div>
      <div className="col-12">
        <div className="row">
          <div className="col-md-12 col-lg-6">
            <p className='mb-2'>Priority</p>
            <Select name='priorityId' className='w-100' handleChange={handleChange} value={values.priorityId * 1} keys='priority' data={priority} />
          </div>
          <div className="col-md-12 col-lg-6">
            <p className='mb-2'>Task type</p>
            <Select name='typeId' className='w-100' handleChange={handleChange} keys='taskType' value={values.typeId * 1} data={taskType} />
          </div>
        </div>
      </div>
      <div className="col-lg-12">
        <p className='mb-2'>Status</p>
        <Select name='statusId' className='w-100' handleChange={handleChange} keys='statusName' data={status} />
      </div>
      <div className="col-md-12 col-lg-6">
        <p>Assignees</p>
        <SearchUserTask mode='multiple' data={projectDetail.members} onChange={(values) => { setFieldValue('listUserAsign', values) }} />
        <hr />
        <p>Original Estimate</p>
        <Input name='originalEstimate' maxLength={3} className='w-100' value={values.originalEstimate * 1} onChange={handleChange} />
        <span className='text-danger'>{errors.originalEstimate}</span>
      </div>
      <div className="col-md-12 col-lg-6">
        <p>Time tracking</p>
        <TimeTracking handleChange={handleChange} timeTrackingRemaining={values.timeTrackingRemaining * 1} timeTrackingSpent={values.timeTrackingSpent * 1} />
        <span className='text-danger'>{errors.timeTrackingSpent}</span>
        <hr />
        <span className='text-danger'>{errors.timeTrackingRemaining}</span>
      </div>
      <div className='col-md-12'>
        <EditorMCE editorRef={editorRef} />
      </div>
      <div className="col-12">
        <Button type='primary' className='me-2' onClick={() => handleSubmit()}>Tạo Task</Button>
        <Button type='default' onClick={() => closeDrawer(false)}>Cancel</Button>
      </div>
    </form>
  );
};

export default memo(CreateTask);

