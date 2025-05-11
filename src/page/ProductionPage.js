import React,{useState,useEffect,useContext} from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { firestore } from "../component/firebase";
import { doc,getDoc } from "firebase/firestore";
import DatabaseUpdata from "../component/firebaseComponent/databaseComponent/DatabaseUpdata";
import DatabaseRead from "../component/firebaseComponent/databaseComponent/DatabaseRead";
import { LoginContext } from "../context/LoginContext";
import '../style/Production/production.scss'
const ProductionPage  = () =>{
    const navigate = useNavigate();
    //設定要讀取的資料
    const location = useLocation();
    const ProductionId = location.state?.ProductionId;
    const [ProductionData,setProductionData] = useState({});
    //帳號資訊
    const LoginState = useContext(LoginContext);
    //新舊購物車混合 usersCarData現有購物車 ProductionCarData新購物車
    const [usersCarData,setUsersCarData] = useState({});
    const [ProductionCarData,setProductionCarData] = useState({
        ...usersCarData,
        [ProductionId]:1
    });
    //是否已在購物車
    const [productionHave,setProductionHave] = useState([false,1])
    //改變預計購買的數量
    const ChangeProductionCarNumber = (e) =>{
        let number = e
        if(!/^\d+$/.test(e)){
            return;
        }
        if(number < 1) number = 1;
        if(number > 100) number = 100;
        setProductionHave(index => [index[0],number])
    }
    //箭頭點選
    const changeProductionNumber = (type) =>{
        let number = productionHave[1]
        if(type =="add"){
            number++
            if(number > 100) number = 100;
            setProductionHave(index => [index[0],number]);
        }else if(type = "subtract"){
            number--
            if(number < 1) number = 1 ;
            setProductionHave(index => [index[0],number]);
        }else{
            console.log("未知")
        }
    }

    //讀取產品資料
    const getProductionData = async() =>{
        const docRef = doc(firestore,"production",ProductionId);
        try{
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                setProductionData({});
                const data =docSnap.data();
                setProductionData({
                    pic :data.pic,
                    name:data.name,
                    price:data.price,
                    number:data.number,
                    content:data.content
                })
            }else{
                console.log("查無資料")
            }
        }catch(e){
            console.error(e.message)
        }
    }
    //購物車的路徑
    const path = "users/"+LoginState?.LoginState?.uid;
    //讀取購物車資料
    const ReadUserCarData = async() =>{
        setUsersCarData(await DatabaseRead(path));
    }
    //加入購物車 轉跳至首頁
    const addCar = () =>{
        if(LoginState.LoginState){
            DatabaseUpdata(path,ProductionCarData);
            alert("增新成功")
            navigate('/');
        }else{
            alert("請先登入系統，才能使用購物車")
        }
    }
    //回到至頂，讀取產品資料
    useEffect(()=>{
        window.scrollTo(0, 0);
        getProductionData();
    },[])
    //有登入的情況，讀取帳號的購物車資訊
    useEffect(()=>{
        if(LoginState.LoginState){
            ReadUserCarData();
        }
    },[LoginState])
    //當讀取完購物車後 更新預計增新的購物車清單
    useEffect(()=>{
        if(ProductionId && usersCarData){
            if(usersCarData[ProductionId]){
                setProductionHave([true,usersCarData[ProductionId]]);
                ChangeProductionCarNumber(usersCarData[ProductionId])
            }
        }
        //更新新的購物車資料
        setProductionCarData((index)=>({
            ...usersCarData,
            ...index
        }))
    },[usersCarData])
    //更新 新購物車的資料
    useEffect(()=>{
        setProductionCarData((index)=>({
            ...index,
            [ProductionId]:productionHave[1]
        }))
    },[productionHave])

    return(
        <article className="articleDiv">
            {!ProductionData? "查無資料":
                (<>
                    <div className="ProductionShowGrid">
                        <img src={ProductionData.pic} className="ProductionShowImg"></img>
                        
                        <div className="ProductionShowNameDiv">
                            <div className="ProductionTitle">
                                <h2>{ProductionData.name}</h2>
                                <div className="ProductionPrice">
                                    <span>${ProductionData.price}</span>
                                    <span>剩餘數量:{ProductionData.number}</span>
                                </div>
                            </div>
                            
                            
                            <div className="ProductionShowContent">
                                <h3>產品簡介</h3>
                                <p>{ProductionData.content}</p>
                            </div>
                            
                            <div className="ProductionShowButtonDiv">
                                <div className="ProductionNumber">
                                    <p>數量</p>
                                </div>
                                <div className="ProductionInputDiv">
                                    <span onClick={()=>{changeProductionNumber("subtract")}}>{"<"}</span>
                                    <input type="number" value={productionHave[1]} onChange={(e)=>{ChangeProductionCarNumber(e.target.value)} }></input>
                                    <span onClick={()=>{changeProductionNumber("add")}}>{">"}</span>
                                </div>
                                <button onClick={addCar}>{productionHave[0]?"已加入購物車":"加入購物車"}</button>
                            </div>
                        </div>
                    </div>
                    
                </>
                )
            }
        </article>
    );
}
export default ProductionPage;