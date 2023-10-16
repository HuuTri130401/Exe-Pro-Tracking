import { privateClient } from "../clients/private.client";

const taskApi = {
    getTaskDetail: (taskId) => {
        return privateClient.get(`Project/getTaskDetail?taskId=${taskId}`);
    },
    updateTask: (taskUpdate) => {
        return privateClient.post(`Project/updateTask`, taskUpdate);
    },
    updateStatus: (taskUpdate) => {
        return privateClient.put(`Project/updateStatus`, taskUpdate);
    },
    assignUserTask: (user) => {
        return privateClient.post(`Project/assignUserTask`, user);
    },
    createTask: (newTask) => {
        return privateClient.post('Project/createTask', newTask);
    },
    removeTask:(taskId)=>{
        return privateClient.delete(`Project/removeTask?taskId=${taskId}`);
    }
}

export default taskApi;