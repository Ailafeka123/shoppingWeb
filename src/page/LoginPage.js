import React,{useContext,useEffect} from "react";
import Login from "../component/LoginRegister/Login";
import SignOut from "../component/LoginRegister/SignOut";
import { LoginContext } from "../context/LoginContext";
const LoginPage = () =>{
    const LoginState = useContext(LoginContext)
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[])
    return(
        <>
            {LoginState.LoginState? <SignOut/> :<Login/>}
        </>
    );
}
export default LoginPage