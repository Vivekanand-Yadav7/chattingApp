import { axiosInstance } from ".";
export const createMessage = async (message)=>{
    try {
        const result = await axiosInstance.post('/api/message/new-message', message);
        return result.data;
    } catch (error) {
        return error;
    }
}

export const getAllMessage= async(id)=>{
  try {
    const result = await axiosInstance.get(`api/message/get-all-message/${id}`);
    return result.data;
  } catch (error) {
    return error
  }
}

export const clearUnreadMessage= async(chatId)=>{
   try {
      const unreadMessage = axiosInstance.post("/api/chat/clear-unread-message", {chatId});
      return unreadMessage.data;
   } catch (error) {
     return error;
   }
}