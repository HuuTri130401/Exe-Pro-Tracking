import { privateClient } from "../clients/private.client";

const taskApi = {
    getTaskDetail: (taskDetail) => {
        return privateClient.get(`Todos/GetAllByFilter?projectId=${taskDetail.projectId}&todoId=${taskDetail.todoId}`);
    },
    updateTask: (taskUpdate) => {
        return privateClient.put(`Todos/Update/${taskUpdate.id}`, taskUpdate);
    },
    updateStatus: (taskUpdate) => {
        return privateClient.put(`Todos/UpdateTodoStatusByTodoId?todoId=${taskUpdate.taskId}&status=${taskUpdate.statusId}`);
    },
    assignUserTask: (user) => {
        return privateClient.post(`Project/assignUserTask`, user);
    },
    createTask: (newTask) => {
        return privateClient.post(`Todos/Post`, newTask);
    },
    removeTask:(taskId)=>{
        return privateClient.delete(`/Todos/Delete=${taskId}`);
    }
}

export default taskApi;
