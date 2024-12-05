import axios from 'axios';
import toast from 'react-hot-toast';
import {create} from 'zustand';


export const useAuthGlobalState= create((set) => ({
    user:null,
    isUserSignUp:false,
    signup:async(privateInfo) => {
        set({isUserSignUp:true})
        try {
            const response = await axios.post("/api/v1/auth/signup",privateInfo);
            console.log(response)
            set({user:response.data.user, isUserSignUp:false})
            toast.success("Signup Successfully");
        } catch (error) {
            toast.error(error.response.data.message)
            set({isUserSignUp:false, user:null});            
        }
    },
    login:async() => {},
    logout:async() => {},
    authChecking:async() => {}

}))