import { axiosInstance } from ".";
export const loggedInUser= async()=>{
    try {
        const result = await axiosInstance.get('api/user/get-login-user');
        return  result.data;
    } catch (error) {
        return error;
    }
}

export const getAllUsers= async()=>{
    try {
        const result = await axiosInstance.get('/api/user/get-all-users');
        return result.data;
    } catch (error) {
        return error;
    }
}