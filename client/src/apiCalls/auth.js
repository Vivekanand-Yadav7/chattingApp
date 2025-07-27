import { axiosInstance } from "./index";

export const handleSignUp= async(user)=>{
    try {
        const result = await axiosInstance.post('/api/auth/signup', user);
        return result.data;
    } catch (error) {
        return error;
    }
}

export const handleLogin = async(user)=>{
    try {
        const result = await axiosInstance.post('/api/auth/login', user);
        return result.data;
    } catch (error) {
        return error;
    }
}