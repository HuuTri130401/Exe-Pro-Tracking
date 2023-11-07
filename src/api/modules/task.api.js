import { privateClient } from "../clients/private.client";

const taskApi = {
    getTaskDetail: (projectId) => {
        return privateClient.get(`Todos/GetAllOData?ProjectId==${projectId}`);
    },
    updateTask: (taskUpdate) => {
        return privateClient.post(`Project/updateTask`, taskUpdate);
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