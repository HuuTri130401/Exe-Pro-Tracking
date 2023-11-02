import parser from 'html-react-parser';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DragDrop from '../../components/drag-drop/DragDrop';
import Filter from '../../components/filter/Filter';
import { getProjectDetailThunk } from '../../redux/thunk/projectThunk';
import { isEmpty } from 'lodash';
import TaskModal from '../../components/modal/TaskModal';

const Board = (props) => {
    const param = useParams();
    console.log('param is: ' + param);
    const { projectDetail } = useSelector(state => state.projectSlice);
    console.log('projectDetail is: ' + projectDetail)
    const dispatch = useDispatch();
    useEffect(() => {
        console.log(' vào useEffect');
        dispatch(getProjectDetailThunk(param.id));
        console.log(param.id + ' param');
        console.log(' done useEffect');
    }, [])

    return (
        <div className="mt-3 h-100">
            <div>
                <h6 className='mb-3'>Project name: {(`${projectDetail?.projectById.title}`)}</h6>
                <section className='mb-3'>
                    <span>Description: {(`${projectDetail?.projectById. description}`)}</span>
                </section>
            </div>
            <Filter projectDetail={projectDetail} />
            <DragDrop projectDetail={projectDetail} />
            <TaskModal />
        </div>
    )
}

export default Board