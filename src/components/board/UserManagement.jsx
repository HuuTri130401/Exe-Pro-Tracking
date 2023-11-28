import React, { memo } from "react";
import { useEffect, useState } from "react";
import { Popconfirm, Drawer, Table, Button, Modal, Form, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { MdOutlineDelete } from "react-icons/md";
import { getProjectParticipantsThunk, removeProjectParticipantThunk, addProjectParticipantThunk } from "../../redux/thunk/projectThunk";
import { getUserByEmailThunk } from "../../redux/thunk/userThunk";
import { openNotification } from "../notification/notification";

const UserManagement = ({ isOpenUserManagement, setIsOpenUserManagement }) => {
    const dispatch = useDispatch();
    const [isOpenAddProjectParticipant, setIsOpenAddProjectParticipant] = useState(false);
    const [emailNotFound, setEmailNotFound] = useState(false);
    const [userAlreadyInProject, setUserAlreadyInProject] = useState(false);
    const [addingParticipant, setAddingParticipant] = useState(false);

    const { projectDetail } = useSelector((state) => state.projectSlice);
    const { projectParticipants } = useSelector((state) => state.projectSlice);
    const { isProjectLeader } = useSelector((state) => state.projectSlice);

    // Get project participants
    const getProjectParticipants = () => {
        if (isOpenUserManagement === true) {
            dispatch(getProjectParticipantsThunk(projectDetail?.projectById?.id))
                .then((response) => {
                    if (response.type == getProjectParticipantsThunk.rejected) {
                        openNotification('error', 'Get project participants failed', response.error.message);
                    }
                });
        }
    };

    useEffect(() => {
        getProjectParticipants();
    }, [dispatch, isOpenUserManagement]);

    // Add project participant
    const handleCloseAddProjectParticipant = () => {
        setIsOpenAddProjectParticipant(false);
        setEmailNotFound(false);
        setUserAlreadyInProject(false);
        setAddingParticipant(false);
    };

    const isUserInProject = (id) => {
        let isExist = false;
        projectParticipants?.forEach((participant) => {
            if (participant.customer.id == id) {
                isExist = true;
            }
        });
        return isExist;
    };

    const handleAddProjectParticipant = () => {
        const email = document.querySelector('input[name="email"]').value;
        setAddingParticipant(true);

        dispatch(getUserByEmailThunk(email))
            .then((response) => {
                if (response.type == getUserByEmailThunk.rejected) {
                    setEmailNotFound(true);
                    setAddingParticipant(false);
                    return;
                }

                if (response.type == getUserByEmailThunk.fulfilled) {
                    if (isUserInProject(response.payload.id)) {
                        setUserAlreadyInProject(true);
                        setAddingParticipant(false);
                        return;
                    }

                    dispatch(addProjectParticipantThunk({
                        "projectId": projectDetail.projectById.id,
                        "customerId": response.payload.id,
                        "isLeader": false
                    }))
                        .then((response) => {
                            handleCloseAddProjectParticipant();
                            if (response.type == addProjectParticipantThunk.fulfilled) {
                                openNotification('success', 'Add participant success', response.message);
                                getProjectParticipants();
                            }
                            if (response.type == addProjectParticipantThunk.rejected) {
                                openNotification('error', 'Add participant failed', response.error.message);
                            }
                            setAddingParticipant(false);
                        });
                }
            });
    };

    // Remove project participant
    const handleRemoveParticipant = (id) => {
        dispatch(removeProjectParticipantThunk(id))
            .then((response) => {
                if (response.type == removeProjectParticipantThunk.fulfilled) {
                    openNotification('success', 'Remove participant success', response.message);
                    getProjectParticipants();
                }
                if (response.type == removeProjectParticipantThunk.rejected) {
                    openNotification('error', 'Remove participant failed', response.error.message);
                }
            });
    };

    // Table column of project participants
    const column = [
        {
            title: 'ID',
            key: 'id',
            render: (text, record, index) => index + 1
        },
        {
            title: 'Username',
            key: 'username',
            render: (text, record, index) => record.customer.username
        },
        {
            title: 'Email',
            key: 'email',
            render: (text, record, index) => record.customer.email
        },
        {
            title: 'Phone',
            key: 'phone',
            render: (text, record, index) => record.customer.phone
        },
        {
            title: 'Role',
            key: 'role',
            render: (text, record, index) => <div>
                {record.isLeader ? <span>Leader</span> : <span>Member</span>}
            </div>
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'id',
            render: (text, record, index) => {
                return <div style={{ display: 'flex' }}>
                    <div>
                        <Popconfirm
                            title="Are you sure to delete this user?"
                            onConfirm={() => {
                                handleRemoveParticipant(record.id);
                            }}
                            okText="Yes"
                            cancelText="No"
                            disabled={!isProjectLeader || record.isLeader}
                        >
                            <button
                                className="bg-danger text-white ml-2"
                                style={{ padding: 6, borderRadius: '3px', paddingBottom: 8, cursor: 'pointer' }}
                                disabled={!isProjectLeader || record.isLeader}
                            >
                                <MdOutlineDelete style={{ fontSize: 18 }} />
                            </button>
                        </Popconfirm>
                    </div>
                </div>
            }
        },
    ];

    return (
        <div>
            <Drawer
                title="User Management"
                placement="right"
                size={'large'}
                closable={false}
                destroyOnClose={true}
                onClose={() => { setIsOpenUserManagement(false) }}
                open={isOpenUserManagement}
            >
                {/* Add project participant */}
                <div>
                    <Button
                        type="primary"
                        onClick={() => { setIsOpenAddProjectParticipant(true) }}
                        disabled={!isProjectLeader}
                        style={{ marginBottom: 16 }}>
                        Invite People to Project
                    </Button>

                    <Modal
                        title={<div style={{ fontSize: '25px' }}>Add People to Project</div>}
                        open={isOpenAddProjectParticipant}
                        onOk={handleAddProjectParticipant}
                        okText="Add"
                        onCancel={handleCloseAddProjectParticipant}
                        confirmLoading={addingParticipant}
                    >
                        <Form
                            layout="vertical"
                        >
                            <Form.Item label="Email to Invite:">
                                <Input
                                    status={emailNotFound ? 'error' : 'validating'}
                                    placeholder="Enter email"
                                    type="email"
                                    name="email"
                                    onChange={() => { setEmailNotFound(false); setUserAlreadyInProject(false); }}
                                />
                                {emailNotFound && <span style={{ color: 'red' }}>Email not found</span>}
                                {userAlreadyInProject && <span style={{ color: 'red' }}>User already in project</span>}
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>

                {/* Table of project participants */}
                <Table columns={column} dataSource={projectParticipants ?? []} />
            </Drawer>
        </div>
    )
};

export default memo(UserManagement);
