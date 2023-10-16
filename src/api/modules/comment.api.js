import { privateClient } from "../clients/private.client";
import { publicClient } from "../clients/public.client";

const commentApi = {
    getAllComment: (taskId) => {
        return publicClient.get(`Comment/getAll?taskId=${taskId}`);
    },
    insertComment: (newComment) => {
        return privateClient.post('Comment/insertComment', newComment);
    },
    updateComment: ({ id, contentComment }) => {
        return privateClient.put(`Comment/updateComment?id=${id}&contentComment=${contentComment}`);
    },
    deleteComment: (deleteComment) => {
        return privateClient.delete(`Comment/deleteComment?idComment=${deleteComment}`);
    }
}

export default commentApi;