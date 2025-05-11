import React,{useContext,useState,useRef}from "react";
import { LoginContext } from "../../context/LoginContext";
import { RoleContext } from "../../context/RoleContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {sendEmailVerification} from "firebase/auth";
import DatabaseDelete from "../firebaseComponent/databaseComponent/DatabaseDelete";
import FireStoreDelete from "../firebaseComponent/firestoreComponent/FirestoreDelete";
import { EmailAuthProvider,reauthenticateWithCredential } from "firebase/auth";
import Alter from "../EasyAlterComponent.js/Alter";
import '../../style/LoginRegister/SignOut.scss'
const SignOut = () => {
  const LoginState = useContext(LoginContext);
  const Role = useContext(RoleContext);
  const [rePassword,setRePassword] = useState("");
  const [alertMessage,setAlertMessage] = useState("");
  const checkRef = useRef(null);
  const deleteEnd = useRef(true);
  const navigate = useNavigate();
    //登出轉跳功能
    const signOutUser = () =>{
        auth.signOut().then(() => {
            Role.setRole("guest")
            navigate("/");
          }).catch((error) => {
            console.error("登出錯誤", error.message);
          });
    }
    //認證再次請求功能
    const sendVerificationEmail = async () => {
      if (auth.currentUser) {
        try {
          await sendEmailVerification(auth.currentUser);
          alert("認證信件已寄出，請前往信箱認證")
        } catch (error) {
          console.error("發送驗證信失敗:", error.message);
        }
      } else {
        console.log("使用者未登入");
      }
    };
    //二階段認證
    const ReLogin = async(password) =>{
      const user = auth.currentUser;
      if (!user || !user.email) {
        console.error("未登入或 email 為空");
        return;
      }
      try {
        const credential = EmailAuthProvider.credential(user.email, password);
        await reauthenticateWithCredential(user, credential);
        checkRef.current?.(true);

      } catch (e) {
        console.error("刪除帳號失敗：", e.code, e.message);
        checkRef.current?.(false);
        
      }finally {
        checkRef.current = null;
      }
    }

    const ReLoginPrimise = async() =>{
      return new Promise((resolve)=>{
        checkRef.current = resolve;
      })
    }


    const deleteAccount = async() =>{
      if(auth.currentUser){
        let check = confirm("請問是否確定要刪除帳號\n確定後將完全刪除");
        if(auth.currentUser.uid === "EE4hxSeds7eu0JUrvTWSEhAJtTI3"){
          alert("很抱歉，本帳號是測試用帳號，不予許刪除")
          return;
        }
        const ReLoginDiv = document.getElementById("ReLoginDiv");
        try{
          if(check){
            ReLoginDiv.style.display="flex";
            deleteEnd.current = false;
            while(!deleteEnd.current){
              const checkRelogin = await ReLoginPrimise();
              if(checkRelogin){
                setAlertMessage("執行中")
                ReLoginDiv.style.display="none";
                deleteEnd.current = true;
                await DatabaseDelete("users",LoginState?.LoginState.uid);
                await FireStoreDelete("users",LoginState?.LoginState.uid);
                const user = auth.currentUser;
                await user.delete();
                setAlertMessage("刪除完畢")
                // signOutUser();
              }else{
                if(!deleteEnd.current){
                  setAlertMessage("密碼錯誤")
                }
                  setRePassword("");
              }
            }
          }
        }catch(e){
          console.error(e);
        }
      }else{
        console.log("還沒登入")
      }
    }
    return(
        <article className="SignOutDiv">
            <h1>個人頁面</h1>

            {LoginState?.LoginState?.emailVerified? 
            <div className="AccountDetailDiv">
              <p>歡迎{`${LoginState?.LoginState?.email}`}</p>
              <p>帳號已認證</p>
            </div>
            :
            <div className="AccountDetailDiv">
              <p>歡迎{`${LoginState?.LoginState?.email}`}</p>  
              <p>尚未認證信箱</p>
              <p>請前往認證信箱</p>
              <button onClick={() => {sendVerificationEmail()}}>傳送認證信件</button>
            </div>}

            <div className="deleteOrSignOutDiv">
              <button onClick={()=>{deleteAccount()}}>刪除帳號</button>
              <button onClick={() => {signOutUser()}}>登出</button>
            </div>

            <div id="ReLoginDiv" className="ReLoginDiv" style={{display:"none"}}>
                <p>請再輸入密碼:</p>
                <input type="text" onChange={(e)=>{setRePassword(e.target.value);}} value={rePassword}></input>
                <div className="ReLoginButtonDiv">
                  <button type="button" onClick={(e)=>{ReLogin(rePassword)}}>確定</button>
                  <button type="button" onClick={(e)=>{
                    const ReLoginDiv = document.getElementById("ReLoginDiv");
                    ReLoginDiv.style.display="none";
                    deleteEnd.current = true;
                    checkRef.current?.(false);
                    checkRef.current = null;
                  }}>取消</button>
                </div>
            </div>

            <Alter data={alertMessage} onClick={(e)=>{setAlertMessage("")}}/>
        </article>
    )
}

  export  default SignOut;