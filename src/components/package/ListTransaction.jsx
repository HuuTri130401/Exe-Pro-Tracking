import React, { useEffect } from "react";
import { Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getTransactionsByUserIdThunk } from "../../redux/thunk/transactionThunk";
import { accountTypeMap } from "../../utils/config";

const ListTransaction = () => {
    const dispatch = useDispatch();

    const { user }  = useSelector(state => state.userSlice);
    const { transactionsHistory } = useSelector(state => state.transactionSlice);

    useEffect(() => {
        dispatch(getTransactionsByUserIdThunk(user.customer.id));
    }, [dispatch]);

    const column = [
        {
            title: 'ID',
            key: 'id',
            dataIndex: 'id'
        },
        {
            title: 'Customer Email',
            key: 'customerEmail',
            render: (text, record) => {
                return <span>{user.customer.email}</span>
            }
        },
        {
            title: 'Account Type',
            key: 'accountTypeName',
            render: (text, record) => {
                return <span>{accountTypeMap[record.accountTypeId]}</span>
            }
        },
        {
            title: 'Amount',
            key: 'amount',
            dataIndex: 'amount'
        },
        {
            title: 'PaymentDate',
            key: 'paymentDate',
            dataIndex: 'paymentDate'
        },
        {
            title: 'ExpiredDate',
            key: 'endDate',
            dataIndex: 'endDate'
        },
        {
            title: 'Is Accepted',
            key: 'isBanking',
            dataIndex: 'isBanking',
            render: (text, record, index) => {
                const color = record.isBanking ? 'green' : 'red';
                const display = record.isBanking ? 'True' : 'False';

                return <div>
                    <Tag color={color}> {display} </Tag>
                </div>
            }
        }
    ]

    return (
        <div>
            <Table
                pagination={{ showSizeChanger: false, pageSize: 10 }}
                columns={column}
                size='large' rowKey={"id"}
                dataSource={Array.isArray(transactionsHistory) ? transactionsHistory : []}
            />
        </div>
    );
}

export default ListTransaction;
