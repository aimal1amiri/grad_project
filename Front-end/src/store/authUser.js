import axios from 'axios';
import toast from 'react-hot-toast';
import {create} from 'zustand';


export const useAuthGlobalState= create((set) => ({
    user:null,
    isUserSignUp:false,
    isCheckingAuth:true,
    isLogOut:false,
    isLogIn:false,
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
    login:async(credentials) => {
        set({isLogIn:true});
        try {
            const response= await axios.post("/api/v1/auth/login",credentials);
            set({user:response.data.user, isLogIn:false});
            
        } catch (error) {
            set({isLogIn:false, user:null});
            toast.error(error.response.data.message)
            
        }
    },
    logout:async() => {
        set({isLogOut:true});
        try {
            await axios.post("/api/v1/auth/logout");
            set({user:null, isLogOut:false});
        } catch (error) {
            set({isLogOut:false});
            toast.error(error.response.data.message);
        }
    },
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