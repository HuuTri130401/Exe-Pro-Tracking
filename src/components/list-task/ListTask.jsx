import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import Card from '../card/Card'

const ListTask = ({ taskList, provider, project, filteredTasks}) => {
  
  const renderTask = () => {
    return filteredTasks.map((task, index) => {
      return (
        <Draggable
          key={task.id.toString()}
          index={index}
          draggableId={JSON.stringify({
            projectId: task.projectId,
            id: task.id,
          })}
        >
          {(provider, snapshot) => {
            return <Card task={task} provider={provider} />;
          }}
        </Draggable>
      );
    });
  };
  
  
    // const renderTask = () => {
    //     return project?.todos?.map((task, index) => {
    //         return <Draggable
    //             key={task.id.toString()}
    //             index={index}
    //             draggableId={JSON.stringify({
    //                 projectId: task.projectId,
    //                 id: task.id,
    //             })}>
    //             {(provider,snapshot) => {
    //                 return <Card task={task} provider={provider} />
    //             }}
    //         </Draggable>
    //     })
    // }

    return (
        <div className="list__board-item">
            <div className="list__board-item-header">
                {taskList.status}
            </div>
            <div
                ref={provider.innerRef}
                {...provider.droppableProps}
                className="list__board-group">
                {renderTask()}
                {provider.placeholder}
            </div>
        </div>
    )
}

export default ListTask;