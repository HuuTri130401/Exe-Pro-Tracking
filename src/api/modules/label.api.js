import { privateClient } from "../clients/private.client";

const taskApi = {
    getLabelsOfProject: (projectId) => {
        return privateClient.get(`Labels/GetAllOData?ProjectId=${projectId}`);
    },
    addNewLabelToProject: (newLabel) => {
        return privateClient.post(`Labels/Post`, newLabel);
    }
}

export default taskApi;
