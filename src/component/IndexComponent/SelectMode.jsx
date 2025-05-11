import React,{useState,useEffect} from "react";
import lightImg from '../../assets/resource/light-mode.png'
import darkImg from '../../assets/resource/dark-mode.png'
import defaultImg from '../../assets/resource/moon-half-visible-face-on-light-and-half-on-darkness.png'
import '../../style/index/SelectMode.scss'
const SelectMode = () =>{
    //查詢主題是否為暗色主題
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    //是就選取暗色主題
    const [bgcMode,setBgcMode] = useState(prefersDark ? darkImg : lightImg);
    //主題切換是否打開
    const [wheelCount,setWheelCount] = useState(false)
    //預設圖片
    let SelectImg = lightImg;
    useEffect(()=>{
        const body = document.body;
        switch(bgcMode){
          case(darkImg):
            body.className="dark";
            SelectImg=darkImg;
            break;
          case(lightImg):
            body.className="light";
            SelectImg = lightImg;
            break;
          default:
            body.className="";
            SelectImg = defaultImg;
        }
      },[bgcMode])
    useEffect(()=>{
        const wheelSelectMod = document.getElementById("fixSelectModDiv");
        const optionsRing = document.getElementById('optionsRing');
        if(wheelCount){
          wheelSelectMod.classList.add("fixSelectModDivActive");
          optionsRing.classList.add("optionsRingActive");
        }else{
          wheelSelectMod.classList.remove("fixSelectModDivActive")
          optionsRing.classList.remove("optionsRingActive");
        }
      },[wheelCount])
    return(
    <div id = "fixSelectModDiv" className='fixSelectModDiv ' 
        onMouseEnter={() => setWheelCount(true)}
        onMouseLeave={() => setWheelCount(false)}
        onClick={(e)=>{setWheelCount(!wheelCount)}}>
        <div id="wheelSelectMod" className="selectMod" >
        <img src={bgcMode}></img>
        </div>
        <div id="optionsRing" className='optionsRing'>
        <img src={lightImg} className='options1'onClick={(e)=>{setBgcMode(lightImg)}} ></img>
        <img src={darkImg}  className='options2' onClick={(e)=>{setBgcMode(darkImg)}}></img>
        <img src={defaultImg}  className='options3' onClick={(e)=>{setBgcMode(defaultImg)}}></img>
        </div>
    </div>
    )
}
export default SelectMode;