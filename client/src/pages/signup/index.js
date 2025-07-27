import React from "react";
import { handleSignUp } from "../../apiCalls/auth";
import { Link } from "react-router-dom";
import {toast} from "react-hot-toast";
import { showLoad } from "../../redux/slices/loader";
import { hideLoad } from "../../redux/slices/loader";
import { useDispatch } from "react-redux";
function Signup(){
    const [user, setUser] = React.useState({
            firstName: '',
            lastName: '',
            email:'',
            password: ''
        });
        const dispatch = useDispatch();
        async function handleSubmit(e){
            e.preventDefault();
            try {
                dispatch(showLoad());
                const response = await handleSignUp(user);
                dispatch(hideLoad());
                if(response.success){
                    toast.success(response.message)
                }
                else{
                    toast.error(response.message)
                }
            } catch (error) {
                dispatch(hideLoad());
                toast.error(error.message)
            }
        }
    return (
        
         <div className="container">
           <div className="container-back-img"></div>
           <div className="container-back-color"></div>
           <div className="card">
            <div className="card_title">
               <h1>Create account</h1>
            </div>
            <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="column">
                <input type="text" placeholder="First name" value={user.firstName} 
                onChange={(e)=>setUser({...user,firstName: e.target.value})}/>
                <input type="text" placeholder="Last name" value={user.lastName}
                onChange={(e)=>setUser({...user,lastName: e.target.value})}/>
                </div>
                <input type="email" placeholder="Email" value={user.email}
                onChange={(e)=>setUser({...user, email: e.target.value})}/>
                <input type="password" placeholder="Password" value={user.password}
                onChange={(e)=>setUser({...user, password: e.target.value})}/>
                <button>Sign up</button>
            </form>
            </div>
            <div className="card_terms">
                <span>Alredy have an account
                      <Link to="/login">Login here</Link>
                </span>
            </div>
           </div>
        </div>
    );
}
export default Signup