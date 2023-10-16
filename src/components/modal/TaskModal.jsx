import { Button, Input, Modal, Popover, Tag } from 'antd';
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

const TaskModal = () => {
    const { taskType, status, priority } = useSelector(state => state.optionSlice);
    const { projectDetail } = useSelector(state => state.projectSlice);
    const { taskDetail } = useSelector(state => state.taskSlice);
    const { isOpenModal } = useSelector(state => state.drawerSlice);
    const inputRef = useRef(null);
    const editorRef = useRef(null);
    const dispatch = useDispatch();

    

    const handleChange = (e) => {
        const { name, value } = e.target
        dispatch(updateTaskThunk({ ...taskDetail, [name]: value }));
    };
    const renderEditTaskName = () => {
        return <div style={{ display: 'flex' }}>
            <InputForm inputRef={inputRef} name='taskName' value={taskDetail.taskName} />
            <Button className='ms-2' type="primary" onClick={() => {
                const { name, value } = inputRef.current;
                dispatch(updateTaskThunk({ ...taskDetail, [name]: value }));
            }}>Submit</Button>
        </div>
    }
    const renderEditDescription = () => {
        return <>
            <EditorMCE
                description={taskDetail.description}
                editorRef={editorRef}
                name='description'
            />
            <div className='mce-btns' >
                <Button type="primary" onClick={() => {
                    dispatch(updateTaskThunk({ ...taskDetail, description: editorRef.current.currentContent }))
                }}>Save</Button>
                <Button onClick={() => { }}>Cancel</Button>
            </div>
        </>
    }

    const data = projectDetail?.members?.filter(member => {
        let index = taskDetail.assigness?.findIndex(user => user.id === member.userId);
        if (index !== -1) {
            return false;
        }
        return true;
    })

    const select = (valueSelect, option) => {
        if (valueSelect === '0') {
            return;
        }
        let userSelected = projectDetail?.members?.find(mem => mem.userId === Number(valueSelect));
        userSelected = { ...userSelected, id: userSelected.userId };
        const listUserAsign = [...taskDetail.assigness, userSelected].map(user => user.id)
        dispatch(updateTaskThunk({ ...taskDetail, listUserAsign }))
        valueSelect = null
    }

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
                <div className="task-header mt-3">
                    <Select name='typeId' value={taskDetail.typeId} data={taskType} keys='taskType' handleChange={handleChange} />
                    <h5 style={{ fontSize: 15, margin: 0 }}>TASK-{taskDetail.taskId}</h5>
                    <div className='task-header__report'>
                        <div className='task-header__report-item'>
                            <FiSend />
                            <span> Give feedback</span>
                        </div>
                        <div className='task-header__report-item'>
                            <FiLink />
                            <span> Copy link</span>
                        </div>
                        <div style={{ cursor: 'pointer' }} onClick={() => dispatch(removeTaskThunk({ taskId: taskDetail.taskId, projectId: projectDetail.id }))}>
                            <FiTrash2 />
                            <span> Delete</span>
                        </div>
                    </div>
                </div>
                <div className="container-fluid mt-3">
                    <div className="row">
                        <div className="col-8">
                            <div>
                                {renderEditTaskName()}
                            </div>
                            <div className="mt-3">
                                <p>Description</p>
                                {renderEditDescription()}
                            </div>
                            <div className="comment mt-3">
                                <p>Comment</p>
                                <Comment taskId={taskDetail.taskId} />
                            </div>
                        </div>
                        <div className="col-4">
                            <p>STATUS</p>
                            <div>
                                <Select name='statusId'
                                    className='w-100'
                                    handleChange={handleChange}
                                    keys='statusName'
                                    data={status}
                                    value={taskDetail.statusId} />
                            </div>
                            <p>Assignees</p>
                            <div>
                                {taskDetail.assigness?.map((user, index) => {
                                    const isLongTag = user.name.length > 10;
                                    return (
                                        <Tag className="mt-2 d-inline-flex align-items-center" key={index}>
                                            <span>
                                                {isLongTag ? `${user.name.slice(0, 10)}...` : user.name}
                                            </span>
                                            <FaTimes className="ml-2" style={{ cursor: 'pointer' }} onClick={() => {
                                                let userUpdate = taskDetail.assigness.filter(us => us.id !== user.id).map(user => user.id)
                                                dispatch(updateTaskThunk({ ...taskDetail, listUserAsign: userUpdate }))
                                            }} />
                                        </Tag>
                                    );
                                })}
                                <Popover placement="topLeft" title={"Add Member"}
                                    content={<SearchUserTask data={data} onSelect={select} />} trigger='click'>
                                    <Tag className="site-tag-plus mt-2" style={{ cursor: 'pointer' }}>
                                        <span style={{ color: "#0052CC" }}>
                                            <i className="fa fa-plus" /> ADD MORE
                                        </span>
                                    </Tag>
                                </Popover>
                            </div>
                            <p>Priority</p>
                            <Select name='priorityId' data={priority} keys='priority' value={taskDetail?.priorityId} handleChange={handleChange} />
                            <p>Original estimate (hours)</p>
                            <Input name='originalEstimate' maxLength={3} className='w-100' value={taskDetail?.originalEstimate} onChange={handleChange} />
                            <p>Time tracking</p>
                            <TimeTracking timeTrackingSpent={taskDetail.timeTrackingSpent} timeTrackingRemaining={taskDetail?.timeTrackingRemaining} handleChange={handleChange} />
                            <hr />
                            <div style={{ color: '#929398' }}>Create at a hours ago</div>
                            <div style={{ color: '#929398' }}>Update at a few seconds ago</div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal >
    )
}

export default memo(TaskModal);