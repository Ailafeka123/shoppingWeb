import React from "react";
import '../../style/index/IndexProduction.scss'
const IndexProduction = ({id,pic,content,name,number,price, ClickProdution}) =>{
    return(
        <div className="indexProductionCard" id={id} onClick={ClickProdution}>
            <img src={pic} className="indexProductionCardImg" loading="lazy"></img>
            <div className="indexProductionContent">
                <p>{name}</p>
                <p>${price}</p>
            </div>
        </div>
    );
}
export default IndexProduction;