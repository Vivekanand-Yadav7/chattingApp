import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./slices/loader"
import userReducer from "./slices/user";
import chatReducer from './slices/chat'
import allUsersReducer  from "./slices/allUsers";
import currChatReducer from "./slices/currChat";
const store = configureStore({
    reducer:{loaderReducer : loaderReducer,
             userReducer: userReducer,
             allUsersReducer: allUsersReducer,
             chatReducer: chatReducer,
             currChatReducer: currChatReducer
            }
})

export default store