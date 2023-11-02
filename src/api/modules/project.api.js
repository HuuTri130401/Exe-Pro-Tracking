import { privateClient } from "../clients/private.client";
import { publicClient } from "../clients/public.client";

const projectApi = {
    getAllProject:(createdBy)=>{
        return privateClient.get(`/Projects/GetAllOData?createdBy=${createdBy}`);
    },
    getProjectDetail:(projectId)=>{
        return  privateClient.get(`Projects/GetProjectByIdWithTodoAndParticipant?id=${projectId}`);
    },
    assignUserProject:(userProject)=>{
        return privateClient.post('Project/assignUserProject',userProject);
    },
    removeUserFromProject:(userProject)=>{
        return privateClient.post('Project/removeUserFromProject',userProject);
    },
    deleteProject:(projectId)=>{
        return privateClient.delete(`Project/deleteProject?projectId=${projectId}`);
    },
    updateProject:(project)=>{
        return privateClient.put(`Project/updateProject?projectId=${project.id}`,project);
    },
    createProject:(newProject)=>{
        return privateClient.post('Project/createProjectAuthorize',newProject);
    }
}

export default projectApi;