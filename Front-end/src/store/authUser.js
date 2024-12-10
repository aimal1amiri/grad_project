import axios from 'axios';
import toast from 'react-hot-toast';
import {create} from 'zustand';


export const useAuthGlobalState= create((set) => ({
    user:null,
    isUserSignUp:false,
    isCheckingAuth:true,
    signup:async(credentials) => {
        set({isUserSignUp:true})
        //console.log(credentials)
        try {
            const response = await axios.post("/api/v1/auth/signup",credentials);
            //console.log(response)

            set({user:response.data.user, isUserSignUp:false})
            toast.success("Signup Successfully");
        } catch (error) {
            toast.error(error.response.data.message || "An error occured")
            set({isUserSignUp:false, user:null});            
        }
    },
    login:async() => {},
    logout:async() => {},
    authChecking:async() => {
        set({isCheckingAuth:true});
        try {
            const response = await axios.get("/api/v1/auth/authenticationCheck")
            set({user:response.data.user, isCheckingAuth:false});
            
        } catch (error) {
            set({isCheckingAuth:false, user:null});
            

        }
    }

}))