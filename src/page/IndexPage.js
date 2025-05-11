import React,{useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "../component/IndexComponent/Carousel.jsx";
import ProduceList from "../component/IndexComponent/ProduceList";
import { firestore } from "../component/firebase";
import {getDocs, collection,query,limit,where} from "firebase/firestore";
import IndexProduction from "../component/IndexComponent/IndexProduction";
import ShopAdd from "../component/IndexComponent/shopAdd.jsx";
import ShopTimeAdd from "../component/IndexComponent/ShopTimeAdd.jsx";
const IndexPage = () => {
    //清單
    const Nagetive = useNavigate();
    const [tag,setTag] = useState(["最新","水果","3C產品","家具"]);
    const [tagActive,setTagActive] = useState("最新")
    const tagList = tag.map((index,key) => (<li key={key}  onClick={(e)=>{ClickTag(e)}} className={tagActive === index?"productListItem  productListItemActive":"productListItem"}>{index}</li> ))
    const [searchTag,setSearcgTag] = useState("");
    const ClickTag = (e) =>{
        if(e.target.textContent === "最新"){
            setSearcgTag("")
            setTagActive("最新")
        }else{
            setSearcgTag(e.target.textContent.toLocaleLowerCase().trim())
            setTagActive(e.target.textContent.trim())
        }
    }

    //div
    const [productionList,getProductionList] = useState([]);
    let ProductionList = []
    const getProductionData = async() =>{
        ProductionList = [];
        let q = {};
        if(searchTag === ""){
            q = query(collection(firestore,"production"),
            limit(5)
            )  
        }else{
            q = query(collection(firestore,"production"),
            where("searchKey","array-contains",searchTag),
            limit(5)
            )
        }
        
        try{    
            const docRef = await getDocs(q);
            docRef.forEach(index=>{
                const ProductionData = index.data();
                ProductionList.push({
                    id: index.id,
                    pic: ProductionData.pic,
                    name: ProductionData.name,
                    content: ProductionData.content,
                    number: ProductionData.number,
                    price: ProductionData.price
                }
                )
            })
            getProductionList(ProductionList)
        }catch(e){
            console.error("錯誤:",e.error);
        }
    }
    useEffect(()=>{
        getProductionData()
    },[searchTag])
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[])
    //切換後 全部切換
    useEffect(()=>{
        const cards = document.querySelectorAll(".indexProductionCardImg");
        const cardsText = document.querySelectorAll(".indexProductionContent");
        setTimeout(()=>{
            cards.forEach(index=>{
                index.classList.add("Active")
            })
            cardsText.forEach(index=>{
                index.classList.add("Active")
            })
        },1)
       
        
        return ()=>{
            cards.forEach(index=>{
                index.classList.remove("Active")
            })
            cardsText.forEach(index=>{
                index.classList.remove("Active")
            })
        }
    },[tagActive])
    const ClickProdution = (e) =>{
        window.scrollTo(0, 0);
        Nagetive("/production",{state:{ProductionId:e.currentTarget.id}})
    }
    return(
        <>
            <Carousel/>
            <ProduceList tag={tagList}></ProduceList>
            <div className="indexProductionDiv">
                { productionList.length ===0?<p>載入中</p>:
                    productionList.map((index,key)=>(
                        <IndexProduction key={key} {...index} ClickProdution={(e)=>{ClickProdution(e)}}/>
                    ))
                }
            </div>
            <ShopAdd/>
            <ShopTimeAdd/>
        </>
    );
};
export default IndexPage;