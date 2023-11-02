import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import InputForm from '../../components/input/InputForm';
import { useFormik } from 'formik';
import EditorMCE from '../../components/editor-mce/EditorMCE';
import Select from '../../components/select/Select';
import { Button } from 'antd';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { createProjectThunk } from '../../redux/thunk/projectThunk';
import { useNavigate } from 'react-router-dom';

const CreateProject = () => {

    const { category } = useSelector(state => state.optionSlice);
    const { customer } = useSelector(state => state.userSlice);
    const editorRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { values, errors, handleChange, handleSubmit } = useFormik({
        enableReinitialize: true,
        validationSchema: Yup.object().shape({
            projectName: Yup.string().required('Tên project không được trống'),
        }),
        initialValues: {
            projectName: '',
            createdBy: customer[0]?.id
        },
        onSubmit: values => {
            dispatch(createProjectThunk({ ...values, description: editorRef.current.currentContent })).then(() => {
                navigate('/projects')
            })
        },
    });
    return (
        <form className="container w-75" onSubmit={handleSubmit}>
            <div className="mb-3">
                <p>Project Title</p>
                <InputForm name='title' onChange={handleChange} value={values.title} />
                <span className='text-danger'>{errors.title}</span>
            </div>
            <div className="mb-3">
                <p>Sub Title</p>
                <InputForm name='subTitle' onChange={handleChange} value={values.subTitle} />
                <span className='text-danger'>{errors.subTitle}</span>
            </div>
            <div className="mb-3">
                <p>Description</p>
                <EditorMCE editorRef={editorRef} />
            </div>
            <div className="mb-3">
                <p>Creator Name</p>
                <Select className='w-100' name='createdBy' data={customer} keys='createdBy' value={values.id * 1} handleChange={handleChange} />
            </div>
            <div className="mb-3">
                <Button type='primary' onClick={() => { handleSubmit() }}>Create Project</Button>
            </div>
        </form>
    )
}

export default CreateProject