import { axiosInstance } from "./index";
export const getAllChats= async()=>{
    try {
        const result = await axiosInstance.get('/api/chat/get-all-chats');
        return result.data;
    } catch (error) {
        return error;
    }
}

export const createNewChat = async(members)=>{
    try {
        const result = await axiosInstance.post("/api/chat/create-new-chat", {members});
        return result.data;
    } catch (error) {
        return error
    }
}