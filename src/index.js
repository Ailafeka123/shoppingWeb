import React,{useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import { HashRouter, Routes, Route} from 'react-router-dom';

import { LoginContext } from './context/LoginContext';
import { RoleContext } from './context/RoleContext';
import { auth,firestore } from './component/firebase';
import { onAuthStateChanged } from "firebase/auth";
import { doc,getDoc } from 'firebase/firestore';

import SelectMode from './component/IndexComponent/SelectMode.jsx';
import Menu from './component/MenuComponent/Menu';
import IndexPage from './page/IndexPage';
import Footer from './component/FooterComponent/Footer';
const LoginPage = React.lazy(()=>import("./page/LoginPage"));
const ForgetPage = React.lazy(()=>import("./page/ForgetPage"));
const DatabasePage = React.lazy(()=>import("./page/DatabasePage"));
const SearchPage = React.lazy(()=> import("./page/SearchPage"));
const ProductionPage = React.lazy(()=> import("./page/ProductionPage"));
const CarPage = React.lazy(()=>import('./page/CarPage'));
const CreditsPage = React.lazy(()=>import('./page/CreditsPage'));




import './index.scss'

const App = () => {
  const [LoginState,setLoginState] = useState();
  const [role,setRole] = useState("guest");

  //讀取firestore帳號資料
  const GetUserData = async(uid) =>{
    const userdata = (await getDoc(doc(firestore,"users",uid))).data();
    setRole(userdata.role)
  }
  //從auth確認帳號 並啟動firebase讀取資料
  useEffect(() =>{
    onAuthStateChanged(auth, (user) => {
      setLoginState(user)
      if (user) { 
        GetUserData(user.uid);
      } else {
        setRole("guest")
      }
    });
  },[LoginState])
  return(
      <HashRouter >
        <SelectMode/>
        <LoginContext.Provider value={{
          LoginState:LoginState
        }}>
          <RoleContext.Provider value={{
            Role:role,
            setRole:setRole
          }}>
            
            <header id='header' className='header'>
              <Menu/>
            </header>
            <main className="mainContain">
              <Routes>
                  <Route path='/' element={<IndexPage/>} />
                  <Route path='/Login' element={<LoginPage/>} />
                  <Route path='/Database' element={<DatabasePage/>} />
                  <Route path='/forget' element={<ForgetPage/>} />
                  <Route path='/Search' element={<SearchPage/>}/>
                  <Route path='/Production' element={<ProductionPage/>}/>
                  <Route path='/car'element={<CarPage/>}/>
                  <Route path='/Credits'element={<CreditsPage/>}></Route>
              </Routes>
            </main>
          </RoleContext.Provider>
        </LoginContext.Provider>
        <Footer/>
        
      </HashRouter>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(
    <App/>
);

