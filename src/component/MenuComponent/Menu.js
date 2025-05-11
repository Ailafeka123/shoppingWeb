import React,{useState,useContext, useEffect,useRef} from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";
import { RoleContext } from "../../context/RoleContext";
import DatabaseRead from "../firebaseComponent/databaseComponent/DatabaseRead";
import throttle from "lodash.throttle";

import { database } from "../firebase";
import { onValue,ref,off} from "firebase/database";

import iconImg from "../../assets/resource/building-store.svg"
import carImg from "../../assets/resource/garden-cart.svg"
import SearchImg from "../../assets/resource/search.svg"
import UserImg from '../../assets/resource/user.svg'
import LoginImg from '../../assets/resource/Login.svg'
import databaseImg from '../../assets/resource/database.svg'

import '../../style/menu/menu.scss'
const Menu = () => {
    const [collapse,setCollapse] = useState(false);
    const [dataUse,setDataUse] = useState(false);
    //監聽與更新
    const [onvalue,setOnvalue] = useState(false);
    const [dataup,setdataup] = useState(false);
    const userRef = useRef(null);
    const scrollRef = useRef(0);

    const LoginState =  useContext(LoginContext);
    const Role = useContext(RoleContext);
    const [search, setSearch] = useState('')
    const navigate = useNavigate();
    const CollapseOpenClick = () =>{
        setCollapse(!collapse);
    }
    const [CarNumber,setCarNumber] = useState();
    //檢查帳號等級 符合開啟資料庫
    useEffect(()=>{
        if(Role.Role === "auth" || Role.Role === "editor" || Role.Role === "test"){
             setDataUse(true)
        }else{
            setDataUse(false)
        }
    },[Role])
    //讀取購物車
    const readCar = async(path) =>{
        const data = await DatabaseRead(path);
        data?setCarNumber(Object.keys(data).length):setCarNumber(0);
        setdataup(false);
    }
    useEffect(()=>{
        if(LoginState?.LoginState){
            const path = "users/"+LoginState.LoginState.uid;
            if(!onvalue){         
                const Ref = ref(database,path);
                userRef.current = Ref;
                onValue(Ref,(snapshot)=>{
                    const data = snapshot.val();
                    if(data|| data==null){
                        setdataup(true);
                    }
                },(e)=>{
                    console.error("e:",e)
                }
                )
                setOnvalue(true)
            }
        }else{
            if(userRef.current){
                off(userRef.current);
                userRef.current = null;
                setOnvalue(false);
            }
        }
    },[LoginState])
    useEffect(()=>{
        if(dataup){
            const path = "users/"+LoginState.LoginState.uid;
            readCar(path)
        }
    },[dataup])
    //視窗開關
    useEffect(()=>{
        const collapse = document.getElementById("header");
        const handleScroll = throttle(() => {
            const currentScroll = window.scrollY;

            if (currentScroll > scrollRef.current) {
                if(scrollRef.current > 80){
                    collapse.style.transform= "translate(0,-100%)";
                }
            } else if (currentScroll < scrollRef.current) {
                collapse.style.transform= "translate(0,0)";
            }

            scrollRef.current = currentScroll;
        }, 100  );
        window.addEventListener("scroll", handleScroll);
    },[])

    //搜尋傳送
    const SearchClick = () =>{
        let searchKey = search.toLowerCase().trim().split(/\s+/);
        navigate("/search",{state:{search:searchKey}});
    }
    //搜尋帳號
    const ClickCar = () =>{
        if(!LoginState?.LoginState){
            alert("請先登入帳號")
        }
    }
    
    return(
            <nav id='headerNav'className="navClass" onMouseLeave={(e)=>{setCollapse(false)}}>
                <div className="iconDiv">
                    <Link to='/'  id="iconLink"  className="iconA"  href="#">
                        <img src="selficon3.svg" alt="icon"></img>
                    </Link>
                    <div  id="iconButton" className="iconButton" onClick={CollapseOpenClick} >
                        <div className="iconButton1"></div>
                        <div className="iconButton2"></div>
                        <div className="iconButton3"></div>
                    </div>
                </div>
                
                <div className={collapse?" collapse collpaseActive":"collapse "}>
                    <search className="search">
                        <input type="text" id="searchInput" onChange={(e)=>{setSearch(e.target.value)}} onKeyDown={(e)=>{
                            if(e.key == "Enter"){
                                SearchClick()
                                setCollapse(false)
                            }
                        }}></input>
                        <button id="searchButton" onClick={()=>{
                            SearchClick()
                            setCollapse(false)
                        }}>
                            <img src={SearchImg}></img>
                        </button>
                    </search>

                    <ul onClick={(e)=>{setCollapse(false)}}>
                        <li><Link to='/'><img src={iconImg} alt="首頁" className="menuItem"></img><span className="menuText">首頁</span></Link></li>
                        <li onClick={ClickCar}>
                            <Link to={LoginState?.LoginState?"/car":"/login"}>
                                <div className="carDiv">
                                    <img src={carImg}></img>
                                    {LoginState?.LoginState&&<span className="carNumberClass">{CarNumber}</span>}
                                </div>
                                <span className="menuText">購物車</span>
                            </Link>     
                        </li>
                        
                        {dataUse&&<li><Link to='/Database' ><img src={databaseImg} className="menuItem"></img><span className="menuText">資料庫</span></Link></li>}
                        <li><Link to='/Login'><img src={LoginState.LoginState?UserImg:LoginImg}  className="menuItem"></img><span className="menuText">{LoginState.LoginState?'個人資訊':'登入'}</span></Link></li>
                        
                    </ul>
                </div>
                

                
            </nav>
    );
}
export default Menu;