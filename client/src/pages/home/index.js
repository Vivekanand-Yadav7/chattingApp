import { useSelector } from "react-redux";
import ChatArea from "./components/chatArea";
import Header from "./components/header";
import SideBar from "./components/sideBar";
import { io } from "socket.io-client";
import { useEffect } from "react";
const socket = io('http://localhost:5000/');
function Home(){
    
    const currChat = useSelector(state=>state.currChatReducer);
    const logInUser = useSelector(state=>state.userReducer);
    useEffect(()=>{
       if(logInUser){
        socket.emit('joinRoom', logInUser._id);
       }
    }, [logInUser]);
    return (
      <div className="home-page">
        <Header/>
    <div className="main-content">
         <SideBar socket={socket}/>
         {currChat && <ChatArea socket = {socket}/>}
    </div>
</div>
    );
}
export default Home;