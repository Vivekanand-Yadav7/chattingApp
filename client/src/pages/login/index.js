import React from "react";
import { Link } from "react-router-dom";
import { handleLogin } from "../../apiCalls/auth";
import {toast} from "react-hot-toast";
import { showLoad } from "../../redux/slices/loader";
import { hideLoad } from "../../redux/slices/loader";
import { useDispatch } from "react-redux";
function Login(){
      const [user, setUser] = React.useState({
        email: '',
        password: ''
      });
      const dispath = useDispatch();
      async function handleSubmit(e){
        e.preventDefault();
        try {
            dispath(showLoad())
            const result = await handleLogin(user);
            dispath(hideLoad())
            if(result.success){
                toast.success(result.message);
                localStorage.setItem('token', result.token);
                window.location.href = "/";
            }
            else
               toast.error(result.message);
        } catch (error) {
            dispath(hideLoad());
            toast.error(error.message);
        }
      }

    return (
        <div className="container">
        <div className="container-back-img"></div>
        <div className="container-back-color"></div>
        <div className="card">
        <div className="card_title">
            <h1>Login Here</h1>
        </div>
        <div className="form">
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" value={user.email} 
            onChange={(e)=>setUser({...user, email: e.target.value})}/>
            <input type="password" placeholder="Password" value={user.password}
            onChange={(e)=>setUser({...user, password: e.target.value})}/>
            <button>Login</button>
        </form>
        </div>
        <div className="card_terms"> 
            <span>Don't have an account yet?
                <Link to="/signup">Signup Here</Link>
            </span>
        </div>
        </div>
    </div>
    );
}
export default Login