import React from "react";

    const ShowProduction = ({imgLink,name,number,category,price,content,finalFix,id,fixClick,deleteClick}) =>{

        return(
            <div className="ProductionDiv">
                <div className="productionImgDiv"><img className="productionImg" src={imgLink}></img></div>
                <div>
                    <p>名稱:{name}</p>
                    <p>剩餘數量:{number}</p>
                </div>
                <div>
                    <p>價格:{price}</p>
                    <p>種類:{category}</p>
                </div>
                <div>
                    <p>說明:{content}</p>
                    <p>最後修改者:{finalFix}</p>
                </div>
                <div className="ProductionButtonDiv">
                    <button onClick={()=>fixClick(id)}>修改</button>
                    <button onClick={()=>deleteClick(id)}>刪除</button>
                </div>
            </div>
        );
    }
    export default ShowProduction;