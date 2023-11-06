import { Avatar, Button, Popconfirm, Popover, Space, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { MdEdit, MdOutlineDelete } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { assignUserProjectThunk, deleteProjectThunk, getAllProjectThunk, removeUserFromProject } from '../../redux/thunk/projectThunk'
import { openDrawer } from '../../redux/slice/drawerSlice'
import { editProject } from '../../redux/slice/projectSlice'
import { userLocalStorage } from "../../utils/config";
import { getAllUserThunk } from '../../redux/thunk/userThunk'
const AdminUsers = () => {

    const { users } = useSelector(state => state.userSlice);
    const dispatch = useDispatch();
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const creatorId = userLocalStorage.get();

    useEffect(() => {
        dispatch(getAllUserThunk());
    }, [dispatch]);

    const handleChange = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };
    const clearFilters = () => {
        setFilteredInfo({});
    };
    const clearAll = () => {
        setFilteredInfo({});
        setSortedInfo({});
    };

    const column = [
        {
            title: 'User ID',
            key: 'id',
            dataIndex: 'id'
        },
        {
            title: 'FirstName',
            key: 'firstName',
            dataIndex: 'firstName'
        },
        {
            title: 'LastName',
            key: 'lastName',
            dataIndex: 'lastName'
        },
        {
            title: 'Email',
            key: 'email',
            dataIndex: 'email'
        },
        {
            title: 'Phone',
            key: 'phone',
            dataIndex: 'phone'
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'id',
            render: (text, record, index) => <div style={{ display: 'flex' }}>
                <div>
                    <span className="bg-primary text-white me-2" style={{ padding: 6, borderRadius: '3px', paddingBottom: 8, cursor: 'pointer' }}
                        onClick={() => {
                            dispatch(openDrawer(false));
                            // dispatch(editUser(record));
                        }}>
                        <MdEdit style={{ fontSize: 18 }} />
                    </span>
                </div>
                <div>
                    <span>
                        {/* <Popconfirm
                            title="Are you sure to delete this project?"
                            onConfirm={() => {
                                dispatch(deleteProjectThunk(record.id))
                            }}
                            okText="Yes"
                            cancelText="No"
                        >
                            <span className="bg-danger text-white ml-2" style={{ padding: 6, borderRadius: '3px', paddingBottom: 8, cursor: 'pointer' }}>
                                <MdOutlineDelete style={{ fontSize: 18 }} />
                            </span>
                        </Popconfirm> */}
                    </span>
                </div>
            </div>
        },
    ]

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h6 className='mb-3'>Project Management</h6>
                <Space style={{ marginBottom: 16 }}>
                    <Button onClick={clearFilters}>Clear filters</Button>
                    <Button onClick={clearAll}>Clear filters and sorters</Button>
                </Space>
            </div>
            <Table pagination={{ showSizeChanger: false, pageSize: 6 }} columns={column} size='large' rowKey={"id"}
            dataSource={Array.isArray(users) ? users : []}
            onChange={handleChange} />
        </div>
    )
}

export default AdminUsers;
