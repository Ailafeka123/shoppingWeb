import React from "react";
import '../../style/index/ProduceList.scss'
const ProduceList = (props) =>{
    return(
        <div id="productList" className="productList">
            <ul>
                {props.tag}
            </ul>
        </div>
    );
}
export default ProduceList;