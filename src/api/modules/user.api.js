import { privateClient } from "../clients/private.client";
import { publicClient } from "../clients/public.client";

const userApi = {
    login:(user)=>{
        console.log(user + ' Information');
        return publicClient.post('/Login',user);
    },
    register:(newUser)=>{
        return publicClient.post('/Register',newUser); 
    },
    // login:(user)=>{
    //     return publicClient.post('/Users/signin',user);
    // },
    // getUser:(keyword)=>{
    //     return privateClient.get(`Users/getUser?keyword=${keyword}`);
    // },
}

export default userApi;