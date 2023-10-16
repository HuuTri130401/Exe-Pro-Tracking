import { privateClient } from "../clients/private.client";
import { publicClient } from "../clients/public.client";

const userApi = {
    login:(user)=>{
        return publicClient.post('/Users/signin',user);
    },
    getUser:(keyword)=>{
        return privateClient.get(`Users/getUser?keyword=${keyword}`);
    },
    register:(newUser)=>{
        return publicClient.post('/Users/signup',newUser); 
    }
}

export default userApi;