import React,{useState,useEffect} from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../component/firebase";
import '../style/LoginRegister/Forget.scss'
const ForgetPage = () =>{
    const [inputEmail,setInputEmail] = useState("")
    const [message,setMessage] = useState("")
    const EmailChange = (e) =>{
        console.log(e.target.value.replace(/\s+/g, ''))
        setInputEmail(e.target.value.replace(/\s+/g, ''));
    }
    //送出重製密碼
    const submitEmail = (inputEmail) =>{
        sendPasswordResetEmail(auth,inputEmail)
        .then(()=>{
            console.log(`重製密碼已發送`)
            setMessage("如果此信箱已註冊，已將密碼重製信件寄至您的信箱。")
        })
        .catch((e)=>{
            console.error("錯誤",e.message);
            setMessage("請輸入信箱格式")
        })
    }

    useEffect(()=>{
        window.scrollTo(0, 0);
    },[])

    return(
            <div className="forgetDiv">
                <h2>找回密碼</h2>
                <div>
                    <input type="email" placeholder=" " onChange={(e)=>{EmailChange(e)}}></input>
                    <label>信箱</label>
                </div>
                <p>{message}</p>
                <button onClick={()=>{submitEmail(inputEmail)}}>送出</button>
            </div> 
        
    );
}
export default ForgetPage;