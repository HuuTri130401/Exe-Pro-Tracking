import { Avatar, Button } from 'antd';
import React, { useRef, useState } from 'react';
import InputForm from '../input/InputForm';
import { useDispatch } from 'react-redux';
import { deleteCommentThunk, editCommentThunk } from '../../redux/thunk/commentThunk';
import { userLocalStorage } from '../../utils/config';

const CommentItem = ({ comment }) => {
    const [visible, setVisible] = useState(false);
    const inputRef = useRef(null);
    const dispatch = useDispatch();
    const userId = userLocalStorage.get().id;
    const { user } = comment;
    return (
        <div className="comment-item">
            <div className="d-flex flex-wrap align-items-center">
                <Avatar src={user.avatar} className='me-2' size={40} />
                <div className='w-75'>
                    <p className='mb-0'>{user.name}</p>
                    {
                        !visible ? <p className='m-0'>
                            {comment.contentComment}
                        </p> : <>
                            <InputForm placeholder='Comment here...' className='w-50' value={comment.contentComment} inputRef={inputRef} />
                            <Button type='primary' className='ms-2' onClick={() => {
                                if (inputRef.current.value !== '' || inputRef.current.value !== comment.contentComment) {
                                    dispatch(editCommentThunk({ id: comment.id, contentComment: inputRef.current.value }))
                                }
                                setVisible(false);
                            }}>Send</Button>
                        </>
                    }
                    {
                        userId === user.userId ? <div>
                            <Button type='link' className='p-0' style={{ color: '#929398' }} onClick={() => { setVisible(true) }}>Edit</Button>
                            •
                            <Button type='link' className='p-0' style={{ color: '#929398' }} onClick={() => dispatch(deleteCommentThunk({ deleteComment: comment.id, taskId: comment.taskId }))}>Delete</Button>
                        </div> : ''
                    }
                </div>
            </div>
        </div>
    )
}

export default CommentItem