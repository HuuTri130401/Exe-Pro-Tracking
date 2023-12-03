import { Editor } from '@tinymce/tinymce-react';
import { Button } from 'antd';
import { useFormik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { closeDrawer } from '../../redux/slice/drawerSlice';
import { updateProjectThunk } from '../../redux/thunk/projectThunk';
import Select from '../select/Select';
import { userLocalStorage } from '../../utils/config';

const EditProject = () => {
    const dispatch = useDispatch();
    const customerInfor = userLocalStorage.get();
    const { projectEdit } = useSelector(state => state.projectSlice);
    const { category } = useSelector(state => state.optionSlice);
    const { values, errors, setFieldValue, handleChange, handleSubmit } = useFormik({
        enableReinitialize: true,
        validationSchema: Yup.object().shape({
            title: Yup.string().required('Project title is required'),
            description: Yup.string().required('Description is required')
        }),
        initialValues: {
            id: projectEdit?.id,
            title: projectEdit.title,
            description: projectEdit.description,
            userCreatedName: projectEdit.userCreatedName,
            createdBy: customerInfor.customer.id,
            subTitle: projectEdit.subTitle,

        },
        onSubmit: values => {
            dispatch(updateProjectThunk({ ...values}));
        },
    });
    return (
        <form className='row g-3'>
            <div className="col-md-6">
                <label className="form-label">Project ID</label>
                <input disabled name='id' value={values.id} onChange={handleChange} type="text" className="form-control" />
            </div>
            <div className="col-md-6">
                <label className="form-label">Created By</label>
                <input disabled name='createdBy' value={values.userCreatedName} onChange={handleChange} type="text" className="form-control" />
            </div>

            <div className="col-md-12">
                <label className="form-label">Title Name</label>
                <input type="text" name='title' value={values.title} onChange={handleChange} className="form-control" />
                <div className="text-danger">{errors.title}</div>
            </div>
            <div className="col-md-12">
                <label className="form-label">Sub Title</label>
                <input name='subTitle' type="text" value={values.subTitle} onChange={handleChange} className="form-control" 
                    keys='subTitle' />
            </div>

            <div className='col-md-12'>
                <Editor
                    name="description"
                    apiKey='ho4916u93vf2q68ipmwki5rwpus0urlp12l823orkm245sap'
                    value={values.description}
                    init={{
                        selector: '#editor',
                        height: 300,
                        menubar: false,
                        toolbar: 'undo redo | formatselect | ' +
                            'bold italic backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                    }}
                    onEditorChange={(content, editor) => {
                        setFieldValue('description', content);
                    }}
                />
                <div className='text-danger'>{errors.description}</div>
            </div>

            <div>
                <Button type="primary" onClick={() => {
                    handleSubmit();
                }}>
                    Save
                </Button>
                <Button type="default" className="ms-2"
                    onClick={() => {
                        dispatch(closeDrawer());
                    }}>
                    Cancel
                </Button>
            </div>
        </form>
    );
};

export default EditProject;

