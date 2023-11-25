import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import ListTask from '../list-task/ListTask';
import { updateStatusTaskThunk } from '../../redux/thunk/taskThunk';

const DragDrop = ({ projectDetail }) => {
  const dispatch = useDispatch();
  const handleDrag = (result) => {
    const { projectId, id } = JSON.parse(result.draggableId);
    const { source, destination } = result;

    if (!destination) {
      return;
    } else if (source.index === destination.index && source.droppableId === destination.droppableId) {
      return;
    }

    dispatch(updateStatusTaskThunk({
      taskId: id,
      statusId: destination.droppableId,
      projectId,
    }));
  };

  const renderTaskList = () => {
    const project = projectDetail.projectById;
    const initialStatuses = ['Backlog', 'Selected for Development', 'In Progress', 'Testing', 'Done'];

    if (project && project.todos) {
      return initialStatuses.map((status, index) => {
        const filteredTasks = project.todos.filter((task) => task.status === status);
        return (
          <Droppable key={status} droppableId={status}>
            {(provider, snapshot) => {
              return <ListTask key={index} taskList={{ status }} provider={provider} project={project} filteredTasks={filteredTasks} />;
            }}
          </Droppable>
        );
      });
    } else {
      return null; // or handle the case where project or project.todos is not available
    }
  };

  return (
    <div className="list__board">
      <DragDropContext onDragEnd={handleDrag}>
        {renderTaskList()}
      </DragDropContext>
    </div>
  );
};

export default DragDrop;
