import { publicClient } from "../clients/public.client";

const optionApi = {
    priority:()=>{
        return publicClient.get('Priority/getAll');
    },
    projectCategory:()=>{
        return publicClient.get('ProjectCategory');
    },
    status:()=>{
        return publicClient.get('Status/getAll');
    },
    taskType:()=>{
        return publicClient.get('TaskType/getAll');
    }
}

export default optionApi;