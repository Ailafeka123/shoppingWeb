import React,{ useState, useEffect } from "react";
import '../../style/index/ShopTimeAdd.scss';
const ShopTimeAdd = () =>{
    const [timeArray,setTimeArray] = useState([99,10,20,10])
    useEffect(()=>{
        const subStactTime = setInterval(()=>{
            setTimeArray(index=>{
                let [day,hour,min,sec] = index;
                if(sec === 0){
                    sec = 60;
                    if(min === 0){
                        min = 60;
                        if(hour === 0){
                            hour = 60;
                            if(day === 0){
                                clearInterval(subStactTime)
                                return [0,0,0,0];
                            }else{
                                day--
                            }
                        }else{
                            hour--;
                        }
                    }else{
                        min--;
                    }
                }else{
                    sec--;
                }
                return[day,hour,min,sec];
            })
        },1000)
        return () =>{
            clearInterval(subStactTime)
        }
    },[])
    return(
        <div className="ShopTimeAdd">
            <div className="ShopTimeContent">
                <h3>距離正式營運倒數</h3>
                <div className="ShoptimeDiv">
                    <span>{timeArray[0]}</span>
                    <span>{timeArray[1]}</span>
                    <span>{timeArray[2]}</span>
                    <span>{timeArray[3]}</span>
                </div>
            </div>
        </div>
    )
}
export default ShopTimeAdd