import React from "react";

const  Alter = ({data,onClick}) =>{
    return (
        <div id="alterMessage" className="alterMessage" style={{display:data===""? "none":"flex"}}>
            <p>{data}</p>
            <button onClick ={onClick}>確定</button>
        </div>
    )
}
export default Alter;