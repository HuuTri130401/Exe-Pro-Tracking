import { Avatar, Button, Popconfirm, Popover, Space, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { MdEdit, MdOutlineDelete } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import SearchUserProject from '../../components/search/SearchUserProject'
import { openDrawer } from '../../redux/slice/drawerSlice'
import { editProject } from '../../redux/slice/projectSlice'
import { assignUserProjectThunk, deleteProjectThunk, getAllProjectThunk, removeUserFromProject } from '../../redux/thunk/projectThunk'
import { getUserThunk } from '../../redux/thunk/userThunk'
const ProjectManagement = () => {
    const { projects } = useSelector(state => state.projectSlice);
    const { userSearch } = useSelector(state => state.userSlice);
    const dispatch = useDispatch();
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});

    useEffect(() => {
        dispatch(getAllProjectThunk());
    }, []);


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


    const data = projects?.map((item) => {
        return { text: item.projectName, value: item.projectName }
    });

    const column = [
        {
            title: 'Project ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (item2, item1) => {
                return item2.id - item1.id;
            },
            sortDirections: ['descend'],
        },
        {
            title: 'Project name',
            dataIndex: 'projectName',
            key: 'projectName',
            filterSearch: true,
            filteredValue: filteredInfo.projectName || null,
            filters: projects?.map((item) => {
                return { text: item.projectName, value: item.projectName }
            }),
            onFilter: (value, record) => record.projectName.startsWith(value),
            render: (text, record, index) => {
                return <Link to={`/board/${record.id}`}> {text}</Link>
            },
            sorter: (item2, item1) => {
                let projectName1 = item1.projectName?.trim().toLowerCase();
                let projectName2 = item2.projectName?.trim().toLowerCase();
                if (projectName2 < projectName1) {
                    return -1;
                }
                return 1;
            },
        },
        {
            title: 'Category',
            dataIndex: 'categoryName',
            key: 'categoryName',
            sorter: (item2, item1) => {
                let categoryName1 = item1.categoryName?.trim().toLowerCase();
                let categoryName2 = item2.categoryName?.trim().toLowerCase();
                if (categoryName2 < categoryName1) {
                    return -1;
                }
                return 1;
            },
        },
        {
            title: 'Creator',
            key: 'creator',
            render: (text, record, index) => {
                return <Tag color="green">{record.creator?.name}</Tag>
            },
            sorter: (item2, item1) => {
                let creator1 = item1.creator?.name.trim().toLowerCase();
                let creator2 = item2.creator?.name.trim().toLowerCase();
                if (creator2 < creator1) {
                    return -1;
                }
                return 1;
            },

        },
        {
            title: 'Members',
            key: 'members',
            render: (text, record, index) => {
                return <div>
                    {record.members?.slice(0, 3).map((member, index) => {
                        return (
                            <Popover key={index} placement="top" content={() => {
                                return <div style={{ overflowY: 'auto', maxHeight: '300px' }} >
                                    <table className="table">
                                        <tbody>
                                            {record.members?.map((item, index) => {
                                                return <tr key={index}>
                                                    <td>{item.name}</td>
                                                    <td>
                                                        <Button className="ms-1 text-white" type="danger" size="small" style={{ background: 'red', borderRadius: '50%' }}
                                                            onClick={() => dispatch(removeUserFromProject({ userId: item.userId, projectId: record.id }))}>
                                                            X
                                                        </Button>
                                                    </td>
                                                </tr>
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            }}>
                                <Avatar key={index} src={member.avatar} />
                            </Popover>
                        )
                    })}

                    {record.members?.length > 3 ? <Avatar>...</Avatar> : ''}

                    <Popover placement="rightTop" title={"Add member"} content={() => {
                        return <SearchUserProject data={userSearch}
                            onSelect={(value, option) => {
                                dispatch(assignUserProjectThunk({
                                    "projectId": record.id,
                                    "userId": value * 1
                                }))
                            }}
                            onSearch={(value) => dispatch(getUserThunk(value))}
                        />
                    }} trigger="click">
                        <Button style={{ width: '30px', height: '30px', padding: 0, borderRadius: '50%' }}>+</Button>
                    </Popover>
                </div>
            }

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
                            dispatch(editProject(record));
                        }}>
                        <MdEdit style={{ fontSize: 18 }} />
                    </span>
                </div>
                <div>
                    <span>
                        <Popconfirm
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
                        </Popconfirm>
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
            <Table pagination={{ showSizeChanger: false, pageSize: 6 }} columns={column} size='large' rowKey={"id"} dataSource={projects} onChange={handleChange} />
        </div>
    )
}

export default ProjectManagement;