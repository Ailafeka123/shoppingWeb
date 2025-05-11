import React,{useState,useEffect,useMemo,useRef} from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { firestore } from "../component/firebase";
import { getDocs, where, query, collection, limit, orderBy} from "firebase/firestore";
import SearchProduction from "../component/SearchComponent/SearchProduction";
import FilterImg from '../assets/resource/filter.svg'
import '../style/Search/Search.scss'
const SearchPage  = () =>{
    const Nagetive = useNavigate();
    //查詢搜尋內容
    const location = useLocation();
    const search = location.state?.search;
    //以下為塞選參數
    //顯示數量限制
    const [searchlimit,setSearchLimit] = useState(10)
    //最大 以及 當前頁數
    const searchMax = useRef(1);
    const [searchCount,setSearchCount] = useState(1);
    // const searchCount = useRef(1);
    //篩選後有的數量
    const chooseCount = useRef(0);
    //改變搜尋限制
    const changeSearchLimit = (e) =>{
        setSearchLimit(e.currentTarget.dataset.value);
    }
    //排序
    const [order,setOrder] = useState({
        method:"content",
        order:"asc",
    })
    //改變排序
    const changeSelection = (e) =>{
        switch(e.currentTarget.dataset.value){
            case "NameAse":
                setOrder({
                    method:"content",
                    order:"asc"
                })
                break;
            case "PriceAse":
                setOrder({
                    method:"price",
                    order:"asc"
                })
                break;
            case "PriceDesc":
                setOrder({
                    method:"price",
                    order:"desc"
                })
                break;  
            default:
                console.log("未知選項")
        }
    }
    //種類清單篩選
    const categoryList = useRef(new Map());
    const [categoryChoose,setCategoryChoose] = useState("")
    const categoryChooseClick = (e) =>{
        setCategoryChoose(e.currentTarget.dataset.value);
    }
    //產品清單
    const [productionList,setProductionList] = useState([]);
    //搜尋產品API 與firebase查詢資料
    const SearchSelection = async() =>{
        let q = [];
        const ProduceList = []
        if(search == 0){
            q =  query(collection(firestore,"production"),
            orderBy(order.method,order.order));
        }else{
            q = query(collection(firestore,"production"),
            orderBy(order.method,order.order),
            where("searchKey","array-contains-any",search));
        }
        try{
            const docRef = await getDocs(q);
            let categoryMap = categoryList.current;
            categoryMap.clear();
            docRef.forEach(index=>{
                const ProductionData = index.data();
                ProduceList.push({
                    id: index.id,
                    pic: ProductionData.pic,
                    name: ProductionData.name,
                    content: ProductionData.content,
                    number: ProductionData.number,
                    price: ProductionData.price,
                    category:ProductionData.category
                })
                categoryMap.set(ProductionData.category, (categoryMap.get(ProductionData.category)||0)+1)
                
            })
            searchMax.current = Math.ceil(ProduceList.length/searchlimit);
            setProductionList(ProduceList);
        }catch(e){
            console.error("error",e.message);
        }
    }
    //這些改變時 進行排序搜尋 表單，排序，顯示數量，數量限制，種類
    const productionListShow = useMemo(()=>{
        // 處理種類過濾
        let show = [];
        if(categoryChoose === ""){
            show = [...productionList]
        }else{
            show = [...productionList].filter(index=>{
                return(index.category == categoryChoose);
            });
        }
        chooseCount.current = show.length;
        //處理要顯示的範圍 避免超出
        searchMax.current =  Math.ceil(show.length/searchlimit);
        if(searchCount > searchMax.current && searchMax.current > 0){
            setSearchCount(searchMax.current);
        }
        //處理排序
        let method = order["method"];
        let orderMethod = order["order"];
        if(method === "content"){
            show.sort((a,b)=>{
                return a.name.localeCompare(b.name)
            })
        }else if(method === "price"){
            if(orderMethod === "asc"){
                show.sort((a,b)=>{
                    return a.price - b.price
                })
            }else{
                show.sort((a,b)=>{
                    return b.price - a.price
                })
            }
        }
        //回傳結果
        return show.filter((index,key)=>{
            let start = (searchCount-1)*searchlimit;
            let end = searchCount * searchlimit;
            return (start <= key && key < end)
        })
    },[productionList,categoryChoose,order,searchlimit,searchCount])

    //處理按鈕數量
    const CountButonDiv = () =>{
        const ButtonDiv = [];
        //只顯示以當前頁面為中心的五個按鈕(左二 右二)
        ButtonDiv.push(<div key="0" onClick={()=>{searchCount === 1 ?"":ClickSearchCount(1)}} className={searchCount === 1 ? "ButtonActive":""} >{"<<"}</div>)
        let key = 1;
        for(let i = 0 ; i < searchMax.current ; i++){
            if(i < searchCount-2 || i > searchCount + 2)continue;
            ButtonDiv.push(<div key = {key} onClick={()=>{searchCount === i+1 ?"":ClickSearchCount(i+1)}} className={searchCount === i+1 ? "ButtonActive":""}>{i+1}</div>)
            key++
        }
        ButtonDiv.push(<div key={key} onClick={()=>{searchCount === searchMax.current ?"":ClickSearchCount(searchMax.current)}} className={searchCount === searchMax.current ? "ButtonActive":""}>{">>"}</div>)
        return <>{ButtonDiv}</>;
    }
    //按鈕轉跳頁面 並轉到至最高
    const ClickSearchCount = (number) =>{
        setSearchCount(number);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
    }
    //手機板調整選單
    const closeAside = (type) =>{
        const Aside =  document.getElementById("searchAside");
        if(type ==="close"){
            Aside.classList.add("searchAsodeClose")
        }else{
            Aside.classList.remove("searchAsodeClose")
        }
    }
    //API查詢後端
    useEffect(()=>{
        SearchSelection()
        setCategoryChoose("")
    },[search])
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[])
    useEffect(()=>{
        const allClass = document.querySelectorAll(".SearchProductionGrid")
        allClass.forEach(index=>{
            index.classList.remove("active");
        })
        setTimeout(()=>{
            allClass.forEach(index =>{
                index.classList.add("active")
            })
        },1)
    },[productionList,categoryChoose,searchlimit,searchCount])
    const ClickProdution = (e) =>{
        Nagetive("/Production",{state:{ProductionId:e.currentTarget.id}})
    }
    return(
        <div className="SearchDiv">

            <article className="SearchArticle" >
                <div className="SearchItemDiv">
                    <h2><span>目前搜尋 :</span><span className="SearchItem" onClick={(e)=>{categoryChooseClick(e)}} data-value="">{search == 0 ? ` 全部 `:` ${search} `}</span>{categoryChoose === "" ? "" : `> ${categoryChoose}`}</h2>
                    <div>
                        <div className="filterDiv" onClick={()=>closeAside("open")}>
                            <img src={FilterImg} ></img>
                            <span>篩選</span>
                        </div>
                        <p>共有{chooseCount.current}筆資料</p>
                    </div>
                </div>
                <div className={searchlimit? `SearchProductionList${searchlimit}`:`SearchProductionList${searchlimit}`}>
                    {productionListShow == 0?"暫無資料":
                        productionListShow.map((index,key)=>(
                            <div key ={key} id={index.id} className="SearchProductionGrid"
                                onClick={(e)=>{ClickProdution(e)}}>
                                <SearchProduction  {...index} NumberClass="SearchProductionNumber"/>
                            </div>
                        ))
                    }
                </div>
                <div className="chooseCountDiv" id="chooseCountDiv">
                    <CountButonDiv/>
                </div>
            </article>

            <aside className="searchAside searchAsodeClose" id="searchAside">
                <div className="searchAsideCloseButton" id="searchAsideCloseButton">
                    <div className="searchX" onClick={()=>closeAside("close")}>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <h2>當前搜尋分類</h2>
                <details className="searchCategoryDetails" open>
                    <summary>相關分類</summary>
                    {categoryList.current.size ==0 ? "暫無分類":
                        [...categoryList.current].map(([index,value],key)=>{
                            return (
                            <div className={categoryChoose === index?"searchCategoryItem searchCategoryItemActive":"searchCategoryItem"} onClick={(e)=>{categoryChooseClick(e)}} key={key} data-value={index}>
                                <span>{index}</span> <span>{value}</span>
                            </div>)
                        })
                    }
                </details>

                <details className="searchCategoryDetails" open>
                    <summary>顯示排列</summary>
                    <div className={searchlimit == 10? "searchCategoryItem searchCategoryItemActive":"searchCategoryItem"} data-value="10" onClick={(e)=>{changeSearchLimit(e)}} >
                        <span>顯</span>
                        <span>示</span> 
                        <span>10</span> 
                        <span>個</span>
                    </div>
                    <div className={searchlimit == 20? "searchCategoryItem searchCategoryItemActive":"searchCategoryItem"} data-value="20" onClick={(e)=>{changeSearchLimit(e)}} >
                        <span>顯</span>
                        <span>示</span> 
                        <span>20</span> 
                        <span>個</span>
                    </div>
                </details>

                <details className="searchCategoryDetails" open>
                    <summary>排序方式</summary>
                    <div className={order.method=="content"? "searchCategoryItem searchCategoryItemActive":"searchCategoryItem"} data-value = "NameAse" onClick={(e)=>{changeSelection(e)}}>
                        <span>名</span>
                        <span>稱</span>
                        <span>默</span>
                        <span>認</span>
                        <span>排</span>
                        <span>序</span>
                    </div>
                    <div className={(order.method=="price"&&order.order=="asc")?"searchCategoryItem searchCategoryItemActive":"searchCategoryItem"} data-value ="PriceAse" onClick={(e)=>{changeSelection(e)}}>
                        <span>價</span>
                        <span>格</span>
                        <span>由</span>
                        <span>低</span>
                        <span>到</span>
                        <span>高</span>
                    </div>
                    <div className={(order.method=="price"&&order.order=="desc")?"searchCategoryItem searchCategoryItemActive":"searchCategoryItem"} data-value = "PriceDesc" onClick={(e)=>{changeSelection(e)}}>
                        <span>價</span>
                        <span>格</span>
                        <span>由</span>
                        <span>高</span>
                        <span>到</span>
                        <span>低</span>
                    </div>
                </details>
            </aside>
        </div>
    );
}
export default SearchPage;