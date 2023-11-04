import React from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import ListTask from '../list-task/ListTask'
import { updateStatusTaskThunk } from '../../redux/thunk/taskThunk'

const DragDrop = ({ projectDetail }) => {
    const dispatch = useDispatch();

    const handleDrag = (result) => {
        let { projectId, id} = JSON.parse(result.draggableId);

        let { source, destination } = result;
        if (!destination) {
            return;
        } else if (source.index === destination.index && source.droppableId === destination.droppableId) {
            return;
        }
        
        dispatch(updateStatusTaskThunk({
            id,
            labelId: destination.droppableId, 
            projectId
        }))
    }

    const renderTaskList = () => {
        const project = projectDetail.projectById;
        // Tạo danh sách các trạng thái duy nhất
        const uniqueStatuses = [...new Set(project?.todos?.map((task) => task.status))];
        return uniqueStatuses.map((status, index) => {
          // Lọc danh sách công việc theo trạng thái
          const filteredTasks = project.todos.filter((task) => task.status === status);
          return (
            <Droppable key={status} droppableId={status}>
              {(provider, snapshot) => {
                return <ListTask key={index} taskList={{ status }} provider={provider} project={project} filteredTasks={filteredTasks} />;
              }}
            </Droppable>
          );
        });
      };
      
    return (
        <div className="list__board">
            <DragDropContext onDragEnd={handleDrag}>
                {renderTaskList()}
            </DragDropContext>
        </div>
    )
}

export default DragDrop;