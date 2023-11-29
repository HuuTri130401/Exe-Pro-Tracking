import { Button, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userLocalStorage } from "../../utils/config";
import { updateTransactionBakingStatus } from '../../redux/slice/transactionSlice';
import { getAllTransactionThunk, updateTransactionThunk } from '../../redux/thunk/transactionThunk'
import { openNotification } from '../../components/notification/notification';

const AdminTransaction = () => {

    const dispatch = useDispatch();
    const { transactions } = useSelector(state => state.transactionSlice);

    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const creatorId = userLocalStorage.get();

    useEffect(() => {
        dispatch(getAllTransactionThunk());
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
    const handleConfirmBanking = (id, isBanking) => {
        dispatch(updateTransactionThunk({ id: id, isBanking: !isBanking }))
            .then((response) => {
                if (response.type == updateTransactionThunk.fulfilled) {
                    openNotification('success', 'Update Successful', response.message);
                    dispatch(updateTransactionBakingStatus({ id, isBanking: !isBanking }));
                }
                if (response.type == updateTransactionThunk.rejected) {
                    openNotification('error', 'Update Fail', response.error.message);
                }
            });
    };

    const column = [
        {
            title: 'ID',
            key: 'id',
            dataIndex: 'id'
        },
        {
            title: 'Customer Email',
            key: 'customerEmail',
            dataIndex: 'customerEmail'
        },
        {
            title: 'Account Type',
            key: 'accountTypeName',
            dataIndex: 'accountTypeName'
        },
        {
            title: 'Payment Method',
            key: 'paymentMethod',
            dataIndex: 'paymentMethod'
        },
        {
            title: 'PaymentDate',
            key: 'paymentDate',
            dataIndex: 'paymentDate'
        },
        {
            title: 'StartDate',
            key: 'startDate',
            dataIndex: 'startDate'
        },
        {
            title: 'EndDate',
            key: 'endDate',
            dataIndex: 'endDate'
        },
        {
            title: 'Confirm Banking',
            key: 'isBanking',
            dataIndex: 'isBanking',
            render: (text, record, index) => {
                const color = record.isBanking ? 'green' : 'red';
                const display = record.isBanking ? 'True' : 'False';

                return <div>
                    <Tag color={color}>
                        <Button
                            type="text"
                            disabled={record.isBanking}
                            onClick={() => {
                                handleConfirmBanking(record.id, record.isBanking);
                            }}>
                            {display}
                        </Button>
                    </Tag>
                </div>
            }
        },
    ]

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h6 className='mb-3'>Transactions Management</h6>
            </div>
            <Table
                pagination={{ showSizeChanger: false, pageSize: 10 }}
                columns={column}
                size='large' rowKey={"id"}
                dataSource={Array.isArray(transactions) ? transactions : []}
                onChange={handleChange}
            />
        </div>
    )
}

export default AdminTransaction;
