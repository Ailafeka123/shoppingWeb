import React from "react";

const DatabaseShow = (props) =>{


    return (
        <div className="databaseShowDiv">
            <div className ="databaseHeader">
                <button onClick={props.closeClick}>關閉</button>
            </div>
            <div className="dataFixBox">
                <div>
                    {props.datainputbox}
                </div>
            </div>
            <div className="dataSubmitDiv">
                <button  onClick={props.submitClick}>確定</button>
            </div>
        </div>
    );
}
export default DatabaseShow;