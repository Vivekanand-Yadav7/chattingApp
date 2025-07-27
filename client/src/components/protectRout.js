import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loggedInUser } from "../apiCalls/user";
import { showLoad } from "../redux/slices/loader";
import { hideLoad } from "../redux/slices/loader";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setUser } from "../redux/slices/user";
import { getAllUsers } from "../apiCalls/user";
import { setAllUsers } from "../redux/slices/allUsers";
import { getAllChats } from "../apiCalls/chat";
import { setChat } from "../redux/slices/chat";
function ProtectRout({ children }) {
  const user = useSelector(state=>state.userReducer);
  //const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function getLoggedInUser() {
     try {
      dispatch(showLoad());
      const result = await loggedInUser();
      dispatch(hideLoad());
      if(result.success){
      dispatch(setUser(result.data));
    }
     } catch (error) {
      dispatch(hideLoad());
      return error
     }
  }
  async function getAllUserFromDb() {
     try {
      dispatch(showLoad());
      const result = await getAllUsers();
      dispatch(hideLoad());
      if(result.success){
      dispatch(setAllUsers(result.data));
    }
     } catch (error) {
      dispatch(hideLoad());
      return error
     }
  }
  async function getAllChatsFromDb() {
      try {
        const result = await getAllChats();
        dispatch(setChat(result.data));
      } catch (error) {
        return error
      }
  }
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getLoggedInUser();
      getAllUserFromDb();
      getAllChatsFromDb();
    }
    else{
        navigate('/login');
    }
  }, []);
  
  // This is what actually gets rendered
  return localStorage.getItem('token') ? (
    <div>
      {children}
      </div>  // or just {children} if you don't need the div
  ) : null;  // or <LoadingSpinner /> if you want to show something while redirecting
}

export default ProtectRout;