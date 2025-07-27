import { useSelector } from "react-redux";
import { createNewChat } from "../../../apiCalls/chat";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { hideLoad, showLoad } from "../../../redux/slices/loader";
import { setChat } from "../../../redux/slices/chat";
import { setCurrChat } from "../../../redux/slices/currChat";
import moment from "moment";
import { useEffect } from "react";
import store from "../../../redux/store";
export default function UserList({searchKey, socket}){
    const currUser = useSelector(state=>state.userReducer);
    const allChat = useSelector(state => state.chatReducer);
    const allUsers = useSelector(state=>state.allUsersReducer);
    const currChat = useSelector(state=>state.currChatReducer);
    const dispatch = useDispatch();
const startNewChat = async(currId)=>{
  try {
      dispatch(showLoad());
      const result = await createNewChat([currUser._id, currId]);
       dispatch(hideLoad());
       if(result.success){
        toast.success(result.message);
        const newChat = result.data;
        const newAllChat = [...allChat, newChat];
        dispatch(setChat(newAllChat))
        dispatch(setCurrChat(newChat));
       }
  } catch (error) {
    dispatch(hideLoad());
    return error;
  }
}

const openChat =(userId)=>{
  try {
     const chat =  allChat.find(u=> (u.members.map(m=>m._id).includes(userId)) && (u.members.map(m=>m._id).includes(currUser._id)));
     if(chat)
      dispatch(setCurrChat(chat));
  } catch (error) {
    return error
  }
}
function isSelected(user){
  if(currChat){
    return currChat.members.map(m=>m._id).includes(user._id);
  }
  return false;
}

function displayLastMessage(userId){
  const chat = allChat.find(chat=>chat.members.map(m=>m._id).includes(userId));
  if(!chat || !chat.lastMessage || !chat.lastMessage.text){
    return "";
  }
  else{
    const prefix = chat?.lastMessage?.sender === currUser._id ? "you: " : "";
    return prefix + chat?.lastMessage?.text?.substring(0,25);
  }
}

function formatFullName(person) {
  if (!person || !person.firstName || !person.lastName) {
    return ''; // or throw error, or return default value
  }

  const capitalize = (str) => 
    str.trim().charAt(0).toUpperCase() + str.trim().slice(1).toLowerCase();

  return `${capitalize(person.firstName)} ${capitalize(person.lastName)}`;
}

function lastMsgTime(userId){
     const chat = allChat.find(chat=>chat.members.map(m=>m._id).includes(userId));
  if(!chat || !chat.lastMessage || !chat.lastMessage.text){
    return "";
  }
  else{
    return moment(chat?.lastMessage?.createdAt).format('hh:mm A');
  }
}

function displayUnreadMessageCount(userId){
  const chat = allChat.find(chat=>chat.members.map(m=>m._id).includes(userId));
  if(chat && chat.unreadMessageCount > 0  && chat.lastMessage?.sender !== currUser?._id){
    return <div className="unread-message-count">{chat.unreadMessageCount}</div>;
  }
  return "";
}
function findData(){
   if(searchKey === ''){
    return allChat;
   }
   else{
    return(
      allUsers.filter(element=>{(element.firstName?.toLowerCase().includes(searchKey?.toLowerCase())
         || element.lastName?.toLowerCase().includes(searchKey?.toLowerCase()))})
        )
   }
}

useEffect(() => {
  const handleReceiveMessage = (message) => {
    const allChat = store.getState().chatReducer;
    const currChat = store.getState().currChatReducer
    
    if (currChat?._id !== message.chatId) {
      dispatch(setChat(
        allChat.map(chat => 
          chat._id === message.chatId
            ? {
                ...chat,
                unreadMessageCount: (chat.unreadMessageCount || 0) + 1,
                lastMessage: message
              }
            : chat
        )
      ));
    }
  };

  socket.on('receiveMessage', handleReceiveMessage);

  // Cleanup function
  return () => {
    socket.off('receiveMessage', handleReceiveMessage);
  };
}, [dispatch]); // Add any other dependencies that might change
    return allUsers
    .filter(element=>
         ((element.firstName?.toLowerCase().includes(searchKey?.toLowerCase())
         || element.lastName?.toLowerCase().includes(searchKey?.toLowerCase())) && searchKey)
         || (allChat.some(chat=>chat.members.map(m=>m._id).includes(element._id)))
    )
    .map(element=>{
           return(
     <div className="user-search-filter" onClick={()=>openChat(element._id)} key={element._id}>
   <div className= {isSelected(element) ?"selected-user" : "filtered-user"}>
       <div className="filter-user-display" >
           {/* <!-- <img src={user.profilePic} alt="Profile Pic" class="user-profile-image"> --> */}
           <div className={isSelected(element)? "user-profile-image" : "user-default-profile-pic"}>
              {element.firstName.charAt(0).toUpperCase() + element.lastName.charAt(0).toUpperCase()}
           </div>
           <div className="filter-user-details">
               <div className="user-display-name">
                {formatFullName(element)}</div>
                   <div className="user-display-email">{displayLastMessage(element._id) || element.email}</div>
               </div>
               <div>
                  {displayUnreadMessageCount(element._id)}
                  <div style={{fontSize: '1.5vh'}}>{lastMsgTime(element._id)}</div>
                </div>
                  { !(allChat?.find(user=>  user.members?.map(m=>m._id).includes(element._id))) &&
                  (<div className="user-start-chat">
                    <button className="user-start-chat-btn"   onClick={ ()=>startNewChat(element._id)}>Start Chat</button>
                    </div>)}
               
           </div>
       </div>                        
   </div>

    );
    })
   
}