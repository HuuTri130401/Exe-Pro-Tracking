import { Avatar, Button } from 'antd';
import React, { memo, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCommentThunk, insertCommentThunk } from '../../redux/thunk/commentThunk';
import { userLocalStorage } from '../../utils/config';
import InputForm from '../input/InputForm';
import CommentItem from './CommentItem';

const Comment = ({ taskId }) => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const { listComments } = useSelector(state => state.commentSlice);
  const avatar = userLocalStorage?.get().avatar;
  useEffect(() => {
    if (taskId) {
      dispatch(getAllCommentThunk(taskId))
    }
  }, [taskId, dispatch])
  const renderComments = () => {
    return listComments?.map((comment, index) => (
      <CommentItem key={index} comment={comment} />
    ))
  }
  return (
    <>
      <div className="d-flex flex-wrap align-items-center">
        <Avatar src={avatar ? avatar : ''} className='me-2' size={40} />
        <InputForm placeholder='Comment here...' className='w-50' inputRef={inputRef} />
        <Button type='primary' className='ms-2' onClick={() => {
          if (inputRef.current.value !== '') {
            dispatch(insertCommentThunk({ taskId, contentComment: inputRef.current.value }))
          }
        }}>Send</Button>
      </div>
      <div className="mt-2" style={{
        overflowY: 'auto',
        height: 200
      }}>
        {renderComments()}
      </div>
    </>
  )
}

export default memo(Comment);