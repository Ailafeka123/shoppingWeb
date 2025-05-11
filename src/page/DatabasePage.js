import React ,{useState,useEffect,useContext} from "react";
import {useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import { RoleContext } from "../context/RoleContext";
import { doc,addDoc,setDoc,getDoc,getDocs,collection,deleteDoc,query,where} from "firebase/firestore";
import { firestore } from "../component/firebase";
import ShowProduction from "../component/databaseComponent/ShowProduction";
import DatabaseShow from "../component/databaseComponent/Databaseshow";
import Alter from "../component/EasyAlterComponent.js/Alter";
const DatabasePage = () =>{
    const navigate = useNavigate();
    const Role = useContext(RoleContext);
    //防止非編輯者可以登入
    useEffect(()=>{
        if(Role.Role !== "auth" && Role.Role !== "editor" && Role.Role !== "test"){
            navigate('/')
        }
    },[Role])

    const Loginstate = useContext(LoginContext);
    // 設定開關 方法 產品ID 刷新頁面記數 刷新方法
    const [isOpen,setIsOpen] = useState(false);
    const [subMethod,setSubMethod] = useState("");
    const [productionId ,setProductionId] = useState();
    const [count,setCount] = useState(1);
    const [reloadMethod,setReloadMethod] = useState("all");
    //搜尋功能
    const [search,setSearch] = useState({
        search:"",
        method:"",
        limit:10
    });
    const setSearchdata = (e)=>{
        const {name,value} = e.target;
        setSearch(index =>({
            ...index,
            [name]:value,
        }))
    }
    const ClearSearch = (e)=>{
        const databaseSearch = document.getElementById("databaseSearch");
        databaseSearch.value = "";
    }
    //產品資訊設定
    const [dataProduction,setDataProduction] = useState({
        name:'',
        number:0,
        category:"",
        content:"",
        pic:"",
        price:0,
    })
    const setProductdata = (e)=>{
        const{name,value} = e.target;
        let newValue = value;
        if(name ==="number" || name === "price"){
            newValue = parseInt(value,10);
        }
        setDataProduction(index =>({
            ...index,
            [name]:newValue,
        }))
    }
    const resetProductdata = () =>{
        setDataProduction({
            name:'',
            number:0,
            category:"",
            content:"",
            pic:"",
            price:0,
        });
    }
    const checkProductData = () =>{
        if(dataProduction.name.trim()===""){
            alert("名稱不可為空")
            return false;
        }
        if(isNaN(dataProduction.number) || dataProduction.number <= 0){
            alert("剩餘數量不可為空或小於0")
            return false;
        }
        if(dataProduction.category.trim()===""){
            alert("產品種類不可以為空")
            return false;
        }
        if(dataProduction.content.trim()===""){
            alert("產品內容不可以為空")
            return false;
        }
        if(isNaN(dataProduction.price) || dataProduction.price <= 0){
            alert("產品價格不可為空或小於0")
            return false;
        }
        if(dataProduction.pic.trim() ===""){
            alert("照片不可以為空")
            return false;
        }
        return true;
    }
    //list
    const datalist = [
        ["名稱:",    "text",     "name"      ,setProductdata ,dataProduction.name],
        ["剩餘數量:", "number",  "number"    ,setProductdata ,dataProduction.number],
        ["圖片:",    "text",     "pic"       ,setProductdata ,dataProduction.pic],
        ["種類:",    "text",     "category"  ,setProductdata ,dataProduction.category],
        ["價格:",    "number",   "price"     ,setProductdata ,dataProduction.price],
        ["說明:",    "text",     "content"   ,setProductdata ,dataProduction.content]
    ]
    //修改ProductionBox
    const DataInputList = datalist.map(([name,type,id,func,index],key)=> 
        <div key={key} className="dataInputDiv">
            <label className="dataLable">
                <p>{name}</p>
                <input type={type} name={id} onChange={(e)=>func(e)} value={index} className="dataInput"></input>
            </label>
        </div>
    )
    //開關設定視窗
    const ClickDivOn = () =>{
        setIsOpen(true);
        setSubMethod("add")
    }
    const ClickDivOff = () =>{
        setIsOpen(false);
        setProductionId();
        resetProductdata();
    }
    //keywordFunction
    const keyWordFunction = (str) =>{
        const keywords = str.split(',').map(index=>index.trim());
        const result = new Set();

        for (const word of keywords) {
            for (let i = 0; i < word.length; i++) {
                for (let j = i + 1; j <= word.length; j++) {
                    result.add(word.slice(i, j));
                }
            }
        }
        return Array.from(result);
    }

    //增加
    const addData = async() =>{

        try{
            const str = `${dataProduction.name.toLocaleLowerCase()},${dataProduction.category.toLocaleLowerCase()}`;
            const searchKey = keyWordFunction(str);
            const docRef = await addDoc(collection(firestore,"production"),{
                name:dataProduction.name,
                number:dataProduction.number,
                pic:dataProduction.pic,
                category:dataProduction.category,
                price:dataProduction.price,
                content:dataProduction.content,
                finalfix:Loginstate.LoginState?.email,
                searchKey:searchKey,
                createTime:new Date(),
                lastFixTime:new Date()
            })
            alert("新增成功")
            resetProductdata();
            setIsOpen(false);
        } catch(err){
            console.error("發生錯誤"+err.message)
            alert(`很抱歉 您無此權限 請通知管理員`)
        }
    }
    //查取特定
    const getData = async(id) =>{
        const productionSearch = doc(firestore, "production",id);
        const docSnap = await getDoc(productionSearch);
        if(docSnap.exists()){
            const newData = docSnap.data();
            setDataProduction(index=>({
                name:newData.name||"",
                number:newData.number||0,
                category:newData.category||"",
                content:newData.content||"",
                pic:newData.pic||"",
                price:newData.price||0
            }))
        }else{
            console.log("查無資料")
        }
    }
    //更新
    const update = async(id)=>{
        try{
            const docRef = doc(firestore,"production",id);
            const str = `${dataProduction.name.toLocaleLowerCase()},${dataProduction.category.toLocaleLowerCase()}`;
            const searchKey = keyWordFunction(str);
            const newdata = {
                name:dataProduction.name,
                number:dataProduction.number,
                pic:dataProduction.pic,
                category:dataProduction.category,
                price:dataProduction.price,
                content:dataProduction.content,
                searchKey:searchKey,
                finalfix:Loginstate.LoginState?.email,
                lastFixTime:new Date()
            }
            await setDoc(docRef,newdata,{merge:true});
            alert("更新成功")
            resetProductdata();
            setIsOpen(false);
        }catch(e){
            console.error(`error:`+ e.message);
        }
    }

    //刪除
    const deleteData = async(id)=>{
        const docRef = doc(firestore,"production",id);
        try{
            await deleteDoc(docRef);
        }catch(e){
            console.error("error:" + e.message)
        }
    }

    //刪除按鈕
    const deleteClick = (id) =>{
        const check1 = confirm("請問是否要刪除")
        if(check1){
            const check2 = confirm("真的確定要刪除嗎?\n此步驟不可復原")
            if(check2){
                if(Role.Role === "test"){
                    alert("很抱歉，測試用帳號僅可觀看使用，無法實際操作，避免資料混亂");
                    return;
                }
                deleteData(id);
                alert("已刪除")
            }else{
                alert("已取消")
            }
        }else{
            alert("已取消")
        }
        
    }
    //更新按鈕
    const fixClick = (id) =>{
        setProductionId(id);
        getData(id);
        setSubMethod("update")
        setIsOpen(true)
    }
    //展示production div的情況
    const [productionList,setProductionList] = useState([]);

    let showProductionList =[]
    //查清單
    const GetAllData = async() =>{
        try{
            const productionSearch = await getDocs(collection(firestore,"production"));
            showProductionList=[];
            productionSearch.forEach(index =>{
                const indexData = index.data();
                showProductionList.push({
                    imgLink:indexData.pic, 
                    name:indexData.name,
                    number:indexData.number,
                    category:indexData.category,
                    price:indexData.price,
                    content:indexData.content,
                    finalFix:indexData.finalfix,
                    id:index.id,
                    fixClick:fixClick,
                    deleteClick:deleteClick,
                    });
            })
            setReloadMethod("all")
            setProductionList(showProductionList)
        }catch(err){
            console.error("發生錯誤"+err.message)
        }   
    }

    const GetSearchData = async(search) =>{
        const docRef = collection(firestore,"production")
        const searchKey = search.search;
        const q = query(docRef,where('searchKey',"array-contains",searchKey))
        try{
            const productionSearch = await getDocs(q);
            showProductionList=[];
            productionSearch.forEach(index =>{
                const indexData = index.data();
                showProductionList.push({
                    imgLink:indexData.pic, 
                    name:indexData.name,
                    number:indexData.number,
                    category:indexData.category,
                    price:indexData.price,
                    content:indexData.content,
                    finalFix:indexData.finalfix,
                    id:index.id,
                    fixClick:fixClick,
                    deleteClick:deleteClick,
                    });
            })
            setReloadMethod("search")
            setProductionList(showProductionList)

        }catch(e){
            console.error("error:"+e.message);
        }
    }



    //提交增新清單
    const addSubmit = (subMethod) =>{
        const check = confirm("請問是否確認提交");
        
        if(check){
            if(!checkProductData()){
                return;
            }
            if(Role.Role === "test"){
                alert("很抱歉，測試用帳號僅可觀看使用，無法實際操作，避免資料混亂")
                ClickDivOff();
                return;
            }
            switch(subMethod){
                case"add":
                    addData();
                    setCount(count+1);
                break;
                case"update":
                    update(productionId)
                    setProductionId();
                    setCount(count+1);
                break;
                default:
                    console.log("未知");
                break;
            }
        }else{
            console.log("已取消")
        }
    }
    useEffect(()=>{
        window.scrollTo(0, 0);
        GetAllData();
    },[])
    useEffect(()=>{
        switch (reloadMethod){
            case "all":
                GetAllData();
                break;
            case "search":
                GetSearchData(search);
                break;
            default:
                console.log("未知");
                break;
        }   
    },[count])
    return(
        <>
            <h1>產品管理頁面</h1>
            <div className="dataSearchDiv">
                <search className="dataSearch">
                    <input placeholder="搜尋關鍵字" name="search" id="databaseSearch"onChange={e=>{setSearchdata(e)}}></input>
                    <button onClick={()=>{GetSearchData(search)}}>查詢</button>
                    <button onClick={()=>{ClearSearch()}}>清除</button>
                </search>
                <div><button onClick={()=>{GetAllData()}}>查詢所有商品</button></div>
                <div><button onClick={()=>{ClickDivOn()}}>增新產品</button></div>
            </div>
            
        
            { productionList.length ===0? <p>尚未載入資料</p>:
                productionList.map((index,key) =>(
                    <ShowProduction key = {key} {...index}/> 
                ))
                
            }
            
            
            
            {isOpen && <DatabaseShow closeClick={()=>ClickDivOff()} submitClick={()=>{addSubmit(subMethod)}} datainputbox={DataInputList}/>}
        </>
    );
}
export default DatabasePage;