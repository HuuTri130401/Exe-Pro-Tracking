import { Button, Space, Table} from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userLocalStorage } from "../../utils/config";
import { getAllUserThunk } from '../../redux/thunk/userThunk'
import { accountTypeMap } from '../../utils/config';

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
            title: 'ID',
            key: 'id',
            dataIndex: 'id'
        },
        {
            title: 'Username',
            key: 'username',
            dataIndex: 'username'
        },
        {
            title: 'Email',
            key: 'email',
            dataIndex: 'email'
        },
        {
            title: 'Account Type',
            key: 'accountType',
            render: (text, record, index) => accountTypeMap[record.accountTypeId]
        },
        {
            title: 'Phone',
            key: 'phone',
            dataIndex: 'phone'
        }
    ]

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h6 className='mb-3'>Users Management</h6>
                <Space style={{ marginBottom: 16 }}>
                    <Button onClick={clearFilters}>Clear filters</Button>
                    <Button onClick={clearAll}>Clear filters and sorters</Button>
                </Space>
            </div>
            <Table pagination={{ showSizeChanger: false, pageSize: 10 }} columns={column} size='large' rowKey={"id"}
            dataSource={Array.isArray(users) ? users : []}
            onChange={handleChange} />
        </div>
    )
}

export default AdminUsers;
