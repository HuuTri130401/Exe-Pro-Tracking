import { privateClient } from "../clients/private.client";

const projectApi = {
    getAllProject: (createdBy) => {
        return privateClient.get(`/Projects/GetAllOData?createdBy=${createdBy}`);
    },
    getProjectDetail: (projectId) => {
        return privateClient.get(`/Projects/GetProjectByIdWithTodoAndParticipant?id=${projectId}`);
    },
    getProjectParticipants: (projectId) => {
        return privateClient.get(`/ProjectParticipants/GetAllOData?ProjectId=${projectId}`);
    },
    removeProjectParticipant: (projectParticipantId) => {
        return privateClient.delete(`/ProjectParticipants/Delete/${projectParticipantId}`);
    },
    addProjectParticipant: (newProjectParticipant) => {
        return privateClient.post('/ProjectParticipants/Post', newProjectParticipant);
    },
    deleteProject: (projectId) => {
        return privateClient.delete(`Projects/Delete/${projectId}`);
    },
    updateProject: (project) => {
        return privateClient.put('/Projects/Update', project);
    },
    createProject: (newProject) => {
        return privateClient.post('/Projects/Post', newProject);
    }
}

export default projectApi;
