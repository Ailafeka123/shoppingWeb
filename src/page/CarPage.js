import React,{useState,useEffect,useContext,useRef} from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import DatabaseRead from "../component/firebaseComponent/databaseComponent/DatabaseRead";
import DatabaseUpdata from "../component/firebaseComponent/databaseComponent/DatabaseUpdata";
import FireStoreReadAll from "../component/firebaseComponent/firestoreComponent/FireStoreReadAll";
import DatabaseDelete from "../component/firebaseComponent/databaseComponent/DatabaseDelete";
import deleteImg from '../assets/resource/delete.svg'
import '../style/car/car.scss'
const CarPage = () =>{
    const LoginState = useContext(LoginContext);
    //取得ID 數量
    const [carData,setCarData] = useState({});
    //讀取car資料
    const [carList,setCarList] = useState([]);
    //總數量 價格
    const [carTotal, setCarTotal] = useState([0,0]);
    const navigate = useNavigate();
    //設定路徑
    const accountPath = useRef("");
    // 設定預計上傳更新的資料;
    const [updataCar,setUpdataCar] = useState({})
    
    //讀取購物車資料
    const readCar = async(path)=>{
        try{
            const data = await DatabaseRead(path)
            const listArray = {};
            const list = [];
            if(data){
                Object.entries(data).forEach(([index,value])=>{
                    listArray[index] = parseInt(value);
                    list.push(index);
                })
            }
            setCarData(listArray);
            readProduction("production","__name__","in",list);
            window.scrollTo(0, 0);
        }catch(e){
            console.error("錯誤",e)
        }
    }
    //更新購物車數量資料
    const ChangeNumber = (e,type,inputNumber = 1) =>{
        let id = e.currentTarget.closest("div").dataset.productionId;
        let number = carData[id];
        if(inputNumber===""){
            e.target.value = number;
            return
        }
        if(type === "add"){
            if(number >= 100){
                number = 100
            }else{
                number++;
            }
        }else if(type === "substract"){
            if(number <= 1){
                number = 1;
            }else{
                number--
            }
        }else if(type === "input"){
            if(inputNumber > 100){
                number = 100
            }else if(inputNumber <= 1){
                number = 1
            }else{
                number = parseInt(inputNumber)
            }
        }
        setCarData(index=>({
            ...index,
            [id]:number
        }))
        const newPath = accountPath.current+"/"+id
        setUpdataCar(index=>({
            ...index,
            [newPath]:number
        }))
    }
    //抓取firestore資料
    const readProduction = async(path,searchkey,method,search)=>{
        if(search == 0){
            return
        }
        try{
            const data = await FireStoreReadAll(path,searchkey,method,search)
            const ProductionListData = [];
            data.forEach(index=>{
                ProductionListData.push({
                    id:index.id,
                    pic:index.data().pic,
                    name:index.data().name,
                    price:index.data().price,
                })
            })
            setCarList(ProductionListData);
        }catch(e){
            console.error("錯誤:",e)
        }
    }
    //抓到帳號資料後讀取購物車資料
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[])
    //讀取到登入資料後 載入購物車
    useEffect(()=>{
        if(LoginState?.LoginState){
            const path = "users/"+LoginState.LoginState.uid;
            accountPath.current = path;
            readCar(path);
        }
    },[LoginState])

    //轉跳至產品頁面
    const linktoProduction = (id) =>{
        navigate("/Production",{state:{ProductionId:id}})
    }

    //移除清單
    const removeList = (e) =>{
        const searchId = e.currentTarget.closest("div").id;
        const newCarList = carList.filter(index => index.id !== searchId);
        const path = "users/"+LoginState.LoginState.uid;
        DatabaseDelete(path,searchId)
        setCarList(newCarList);
    }
    
    // 載入購物車清單與數量更新之後 整理總數量與總價格 
    useEffect(()=>{
        let number = 0;
        let sumPrice = 0;
        carList.map((index,key)=>{
            number += carData[index.id];
            sumPrice += (index.price * carData[index.id]);
        })
        setCarTotal([number,sumPrice])
    },[carList,carData])

    //更新資料庫(設定一秒)
    useEffect(()=>{
        if (Object.keys(updataCar).length == 0) return;
        const timeLimit = setTimeout(()=>{
            Object.entries(updataCar).forEach(([index,key])=>{
                DatabaseUpdata(index,key)
            })
            setUpdataCar({})
        },1000)
        return ()=>{
            clearTimeout(timeLimit)
        } 
    },[updataCar])

    const checkBuy = () =>{
        if(carList.length === 0){
            alert("購物車空空的無法購買任何東西");
            return;
        }
        
        const check = confirm("是否確定購買?")
        if(check){
            alert("體驗到此結束 十分感謝您的使用")
            const path =  "users"
            const data = LoginState.LoginState.uid;
            DatabaseDelete(path,data);
            window.scrollTo(0, 0);
            navigate('/');
           
        }else{
            
        }
    }

    //載入購物車清單 並顯示
    const CarProductionList = () =>{
        return(
            carList?carList.map( ({ id,pic, name, price }, key) => {
                return(
                    <div  key={key} className="carProductionList">
                        <img src={pic} className="carProductionListPic" onClick={()=>{linktoProduction(id)}}></img>
                        <div className="carProductionContent" >
                            <div className="carProductionName" id = {id}>
                                <p>{name}</p>
                                <button onClick={(e)=>{removeList(e)}}>
                                    <img src={deleteImg}></img>
                                </button>
                            </div>
                            
                            <div className="CarProductionPrice">
                                <p>${price*carData[id]}</p>
                                <div className="carProductionInput" data-production-id={id}>
                                    <span onClick={(e)=>{ChangeNumber(e,'substract')}}>{"<"}</span>
                                    <input type="number" defaultValue={carData[id]} onChange={(e)=>{
                                        if(!/^\d+$/.test(e.target.value)){
                                            e.target.value = carData[id]
                                            return;
                                        }
                                        ChangeNumber(e,'input',e.target.value)
                                        }}></input>
                                    <span onClick={(e)=>{ChangeNumber(e,"add")}}>{">"}</span>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                )
            }):""
        )
    }
    return(
        <article className="carPageDiv">
            {(carList && carList.length > 0) ? 
                <CarProductionList/>
            :"購物車空空的，快去把一些商品帶回家吧"}
            <div className="carTotalDiv">
                <p>總數量:{carTotal[0]}</p>
                <p>總價格:{carTotal[1]}</p>
            </div>
            <div className="buyButtonDiv">
                <button  onClick={()=>{checkBuy()}}>確定購買</button>
            </div>
        </article>
    );
}
export default CarPage;