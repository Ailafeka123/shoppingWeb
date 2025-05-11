import React,{useEffect, useState} from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, firestore } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import hidden from '../../assets/resource/eye-off.svg'
import view from '../../assets/resource/eye.svg'
import '../../style/LoginRegister/Login.scss'
const Login  = () =>{
    //帳號密碼種類
    const [register,setRegister] = useState(false)
    const [loginAccount,setLoginAccount] = useState("");
    const [loginPassword,setLoginPassword] = useState("");
    const [passwordEyes, setPasswordEyes] = useState(false);
    const [pushing,setPushing] = useState(false);
    //錯誤訊息
    const [accountError,setAccountError] = useState('');
    const [passwordError,setPasswordError] = useState('');
    const [loginError,setLoginError] = useState('')
    //轉跳
    const navigate = useNavigate();

    //同步參數
    const AccountChange = (e) =>{
        setLoginError("")
        setLoginAccount(e.target.value); 
    }
    //確認信箱
    const checkEmail  =  (text) =>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);
    //確認英文字母
    const hasEnglish = (text) => /[a-zA-Z]/.test(text);
    
    //確認帳號
    const checkAccount =() =>{
        if(!loginAccount){
            setAccountError('帳號不得為空')
            return false;
        }
        if (!checkEmail(loginAccount)){
            setAccountError("帳號請輸入信箱")
            return false;
        }
        if (/[^A-Za-z0-9@.]/.test(loginAccount)) {
            setAccountError("帳號請勿輸入英文 數字 @之外的符號");
            return false;
        }
        setAccountError('')
        return true;
    }

    //密碼眼睛
    const passwordEyeClick = () =>{
        setPasswordEyes(!passwordEyes);
    }

    //同步密碼
    const passwordChange = (e) =>{
        setLoginPassword(e.target.value);
        setLoginError("")
        if(e.target.value.length > 20 || e.target.value.length < 8){
            setPasswordError("密碼請輸入8-20個字")
        }else{
            setPasswordError('')
        }
    }
    //確認密碼
    const checkPassword =() =>{
        if(!loginPassword){
            setPasswordError('密碼不得為空');
            return false;
        }
        if(!hasEnglish(loginPassword)){
            setPasswordError('密碼至少要有一個英文字母');
            return false;
        }
        if(loginPassword.length < 8 || loginPassword.length > 20){
            setPasswordError('密碼請輸入8~20個字')
            return false;
        }
        if (/[^A-Za-z0-9@]/.test(loginPassword)) {
            setPasswordError("密碼請勿輸入英文 數字 @之外的符號(如果是複製可能含有空白)");
            return false;
        }
        setPasswordError('');
        return true;
    }
    //切換註冊
    const RegisterActive = (e) => {
        setRegister(e);
    }

    //進行註冊或登入
    const submitCheck = (e,loginAccount,loginPassword) =>{
        e.preventDefault();
        if(!checkPassword() || !checkAccount()){
            return;
        }
        //避免重複觸發
        if(pushing){
            return;
        }  
        setPushing(true);
        
        if(register){
            registerUser(loginAccount,loginPassword);

        }else{
            LoginButton(loginAccount,loginPassword);
        }
    }
    //登入
    async function LoginButton(loginAccount,loginPassword){
        try {
            const userCredential = await signInWithEmailAndPassword(auth, loginAccount, loginPassword);
            navigate("/")
            } 
        catch (error) {
            if(error.message === "Firebase: Error (auth/missing-password)."){
                setLoginError("請輸入密碼")
            }else{
                setLoginError('帳號密碼錯誤')
            }
            setPushing(false);
        console.error("登入失敗", error.message);
        }
    }
    //註冊
    async function registerUser(loginAccount, loginPassword){
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, loginAccount, loginPassword);
          let user = userCredential.user;
          await setDoc (doc(firestore,"users",user.uid),{
            email:user.email,
            name: user.email,
            createdAt: new Date(),
            role:"shopper"
          });
          navigate("/")
        } catch (error) {
            if(error.message ==="Firebase: Error (auth/email-already-in-use)."){
                setLoginError('帳號已被註冊')
            }
            setPushing(false)
          console.error("註冊失敗:", error.message);
        }
      };
    useEffect(()=>{
        const LoginTextDiv = document.getElementById("LoginTextDiv");
        const LoginFrom = document.getElementById("LoginFrom")
        if(!register){
            setTimeout(()=>{
                LoginTextDiv.classList.remove("registerTextDiv");
                LoginFrom.classList.remove("registerLoginFrom");
            },1)
        }else{  
            setTimeout(()=>{
                LoginTextDiv.classList.add("registerTextDiv");
                LoginFrom.classList.add("registerLoginFrom");
            },1)
        }
        
    },[register])  
    
    return(
        <div id="LoginFromDiv" className="LoginFromDiv">
            <div id="LoginTextDiv" className="LoginTextDiv">
                <h2>歡迎使用本購物網站</h2>
                <h3>目前正在優化中</h3>
            </div>
            <form id='LoginFrom' className="LoginFrom"  onSubmit={(e)=>{e.preventDefault()}}>
                    <img src="selficon3.svg"></img>
                    <h2>{register?"歡迎新用戶":"歡迎回來"}</h2>
                    <div id='LoginAndRegister' className="LoginAndRegister">
                        <h2 className={register?"formDiv":"formDiv formActvie"} onClick={()=>RegisterActive(false)}>登入</h2>
                        <h2 className={register?"formDiv formActvie":"formDiv"} onClick={()=>RegisterActive(true)}>註冊</h2>
                    </div>
                    <div id="LoginAccount" className="inputDiv">
                        <input name="Login" type="email" placeholder="" autoComplete="email"  id="Login"
                        onChange={e => {AccountChange(e)}} ></input>
                        <label htmlFor="Login">帳號</label>
                    </div>
                    <div className="errorDiv" style={{display:accountError?"block":"none"}}>{accountError? accountError:""}</div>
                    <div id="LoginPassword" className="inputDiv">
                        <input type={passwordEyes? "text": "password"}placeholder=" " autoComplete="new-password" id="password"  onChange={e => {
                            e.preventDefault
                            passwordChange(e)}}></input>
                        <label className="passwordLabel" htmlFor="password">密碼</label>
                        <button onClick={passwordEyeClick}
                        type="button"
                        onMouseLeave={e=>{setPasswordEyes(false)}}
                        className="eyesClass"><img src={passwordEyes?view:hidden}></img></button>
                    </div>  
                    <div className="errorDiv"style={{display:passwordError?"block":"none"}}>{passwordError? passwordError:""}</div>
                    <div className="errorDiv" style={{display:loginError?"block":"none"}}>
                        {loginError?loginError:''}
                    </div>
                    <div className="forgetPassword"><Link to='/forget'>忘記密碼</Link></div>
                    <div>
                        <button type="submit" className="subButton" onClick={(e)=>{submitCheck(e,loginAccount,loginPassword)}}
                            >{register? "註冊":"登入"}</button>
                    </div>
            </form>
        </div>
        
    )
}
export default Login;