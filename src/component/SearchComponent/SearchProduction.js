import React from "react";

const SearchProduction = ({id,pic,name,content,number,price,NumberClass} ) =>{
    return(
        <>
            <img className="SearchProductionImg" src={pic}></img>
            <div className="SearchProductionContent">
                <p>{name}</p>
            </div>
            <div className= {NumberClass}>
                <p>價格:{price}</p>
            </div>
        </>
    );
}
export default SearchProduction;