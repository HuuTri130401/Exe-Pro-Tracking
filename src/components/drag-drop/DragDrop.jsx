import React from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import ListTask from '../list-task/ListTask'
import { updateStatusTaskThunk } from '../../redux/thunk/taskThunk'

const DragDrop = ({ projectDetail }) => {
    const dispatch = useDispatch();

    const handleDrag = (result) => {
        let { projectId, taskId } = JSON.parse(result.draggableId);

        let { source, destination } = result;
        if (!destination) {
            return;
        } else if (source.index === destination.index && source.droppableId === destination.droppableId) {
            return;
        }
        
        dispatch(updateStatusTaskThunk({
            taskId,
            id: destination.droppableId, 
            projectId
        }))
    }

    const renderTaskList = () => {
        return projectDetail?.projectById?.todos?.map((taskList, index) => {
            return <Droppable key={index} droppableId={taskList.id}>
                {(provider,snapshot) => {
                    return <ListTask key={index} taskList={taskList} provider={provider} />
                }}
            </Droppable>
        })
    }
    return (
        <div className="list__board">
            <DragDropContext onDragEnd={handleDrag}>
                {renderTaskList()}
            </DragDropContext>
        </div>
    )
}

export default DragDrop;