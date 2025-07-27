import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import {createMessage, getAllMessage, clearUnreadMessage} from "../../../apiCalls/message";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showLoad, hideLoad } from "../../../redux/slices/loader";
import moment from "moment";
import store from "../../../redux/store";
import { setChat } from "../../../redux/slices/chat";
export default function ChatArea({socket}){
  const dispatch = useDispatch();
  const [allMessage, setAllMessage] = useState([]);
  const [newMessage, setNewMessage] = useState('');
   const currChat = useSelector(state=>state.currChatReducer);
   const logInUser = useSelector(state=>state.userReducer)
   const chatList = useSelector(state=>state.chatReducer);
   const chatUser = currChat?.members?.find(u=>u._id !== logInUser._id);

   const sendMessage = async()=>{
    try {
      const message = {
         chatId: currChat._id,
         sender: logInUser._id,
         text : newMessage
      }
    socket.emit('sendMessage', {
        ...message,
        members: currChat.members.map(m=>m._id),
        read: false,
        createdAt: moment().format('YYYY-MM-DD hh:mm:ss')
    })
     
      
      const result = await createMessage(message);
      
      if(result.success){
        setNewMessage('');
      }
    } catch (error) {
      
      toast.error(error.message);
    }
   }

   const handleGetAllMessage= async()=>{
    try {
       const result = await getAllMessage(currChat._id);
       if(result.success){
        setAllMessage(result.data);
       }
    } catch (error) {
      toast.error(error.message);
    }
   }
  const timeNow = (timestamp)=>{
    const now = moment();
    const diff = now.diff(moment(timestamp), 'days');
    if(diff < 1){
      return `today ${moment(timestamp).format('hh:mm A')}`;
    }
    else if(diff === 1){
      return `yesterday ${moment(timestamp).format('hh:mm A')}`;
    }
    else{
      return moment(timestamp).format('MMM D, hh:mm A');
    }
  }

  const clearUnreadMessageFromDb = async()=>{
      try {
            if(currChat?.members){
        // socket.emit('clear-unread-message', {
        //     chatId: currChat._id,
        //     members:  currChat.members.map(m=>m._id),
        // })
            }  
        const result = await clearUnreadMessage(currChat._id);
        if(result.success){
          chatList.map(chat=>{
            if(chat._id === currChat._id)
              return result.data;
            return chat;
          })
        }
      } catch (error) {
        return error;
      }
  }

   useEffect(()=>{
      handleGetAllMessage();
      if(currChat.lastMEssage?.sender !== logInUser._id){
      clearUnreadMessageFromDb();
      }
      socket.on('receiveMessage',(message)=>{
        const instantChat = store.getState().currChatReducer;
        if(instantChat._id === message.chatId){
        setAllMessage(prevmsg=>[...prevmsg, message]);
        }
        // if(instantChat._id === message.chatId && message.sender !== logInUser._id){
        //     clearUnreadMessageFromDb();
        // }
      })
      // socket.on('unread-message-cleard', (data)=>{
      //   const instantChat = store.getState().currChatReducer;
      //   const chatList = store.getState().chatReducer;
      //   const updatedChat = chatList.map(chat=>{
      //     if(chat._id === data.chatId){
      //       return{...chat, unreadMessageCount: 0};
      //       return chat;
      //     }
      //   })
      //   dispatch(setChat(updatedChat));
      //    setAllMessage(prevMsg=>{
      //  return  prevMsg.map(
      //   msg=>{
      //     return{...msg,
      //       read: true,
      //     }
      //   }
      //  )
      // })
      // })
     
   },[currChat]);
   useEffect(()=>{
       const msgArea = document.getElementById('main-chat-area');
       msgArea.scrollTop = msgArea.scrollHeight;
   },[allMessage])
   return (
   <>
    {currChat && <div class="app-chat-area">
  <div class="app-chat-area-header">
      {chatUser.firstName + ' ' + chatUser.lastName}
  </div>
  <div className="main-chat-area" id="main-chat-area">
    {allMessage.map(msg=>{
      const isSender = msg.sender === logInUser._id;
      return(  <div class="message-container" style={isSender? {justifyContent: "end"} : {justifyContent: "start"}}>
        <div>
        <div className={isSender ? "send-message" : "received-message"}>{msg.text}</div>
        <div className="message-timestamp" style={!isSender ? {float: "left"} : {float: "right"}}>{timeNow(msg.createdAt)}
          {isSender && msg.read && <i className="fa fa-check-circle" aria-hidden="true" style={{color: "red"}}></i>}
        </div>
        </div>
    </div>)
    })}
     
  </div>
   <div className="send-message-div">
    <input type="text" 
    className="send-message-input" 
    placeholder="Type a message" 
    value={newMessage}
    onChange={(e)=>{setNewMessage(e.target.value)}}
    />
    <button 
    onClick={sendMessage}
    className="fa fa-paper-plane send-message-btn" aria-hidden="true"></button>
</div>
</div>}
   </>)
}