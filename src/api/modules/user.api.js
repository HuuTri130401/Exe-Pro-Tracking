import { privateClient } from "../clients/private.client";
import { publicClient } from "../clients/public.client";

const userApi = {
    login:(user)=>{
        return publicClient.post('/Login',user);
    },
    register:(newUser)=>{
        return publicClient.post('/Register',newUser);
    },
    getAllUser:()=>{
        return privateClient.get('/Customer/GetAll');
    },
}

export default userApi;
