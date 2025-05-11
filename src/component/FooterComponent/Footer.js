import React from "react";
import { Link } from "react-router-dom";
const Footer = () =>{
    return(
        <footer>
            <div className="footerConnect">
                <p className="">聯繫方法</p>
                <p className="">電話號碼:0917-871-819</p>
                <p className="">信箱:ailafeka@gmail.com</p>
                <p className="">聯繫時間:1000~2000</p>
            </div>
            <div className="footerDirections">
                <p className="" >本網站是以React配合firebase製作，並放在github上使用，僅供用於展示</p>
                <p></p>
            </div>
            <div className="footerCopyright">
                <p className="">Copyright© 劉星緯 2025</p>
                <Link to='/Credits'>Credits</Link>
            </div>
        </footer>
    )
}

export default Footer;