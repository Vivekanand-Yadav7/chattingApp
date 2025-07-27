import SearchBar from "./searchBar";
import { useState } from "react";
import UserList from "./userList";
export default function SideBar({socket}){
   const [searchKey, setSearchKey] = useState('');
    return(
       <div className="app-sidebar">
        <SearchBar
        searchKey = {searchKey}
        setSearchKey = {setSearchKey}
        />
        <UserList searchKey = {searchKey}
        socket={socket}/>
</div>

    );
}