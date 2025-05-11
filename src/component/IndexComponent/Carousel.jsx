import React,{useState, useEffect,useRef} from "react";
import '../../style/index/Carousel.scss'
import fruit from '../../assets/resource/background/fruit.webp'
import usb from '../../assets/resource/background/usb.webp'
import house from '../../assets/resource/background/house.webp'
import Pre from '../../assets/resource/arrow_back.svg'
import Next from '../../assets/resource/arrow_forward.svg'
const Carousel = () => {
    //輪播的數字
    const [CarouselImgNumber,setCarouselImgNumber] = useState('');
    const [carouselNumber,setCarouselNumber] = useState("");
    const carouseDiv = useRef(null);
    const mouseMove = useRef(false)
    const timeMove = useRef(true)
    const mouseDownX = useRef(0);
    const movepersent = useRef(0)
    //拖移
    //電腦
    const CarouseMovedown = (e) =>{
        mouseMove.current=true;
        mouseDownX.current =  e.clientX;
        movepersent.current = 0;
        document.addEventListener('mousemove',handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp);
    }
    const waitTime = (time)=>{
        timeMove.current = false
        setTimeout(() => {
            timeMove.current  = true;
        }, time);
    }
    const handleMouseMove = (e) =>{        
        if(timeMove.current){
            const mainImgsDiv = document.getElementById('mainImgsDiv');
            let divWidth = mainImgsDiv.clientWidth/3;
            let move = (e.clientX - mouseDownX.current) / divWidth *100;
            movepersent.current = move;
            mainImgsDiv.style.transform = `translateX(-${((carouselNumber/CarouselImgNumber)*100)-(move/3)}%)`;
            waitTime(50);
        }
    }
    const handleMouseUp = () =>{
        mouseMove.current = false;
        if(movepersent.current <= -30){
            nextClick();
        }else if(movepersent.current >= 30){
            preClick();
        }else{
            setTimeout(() => {
                const mainImgsDiv = document.getElementById('mainImgsDiv');
                mainImgsDiv.style.transform = `translateX(-${carouselNumber/CarouselImgNumber*100}%)`;
            }, 1);
        }
        document.removeEventListener('mousemove',handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
    }
    //手機
    const CarousePhondown = (e) =>{
        mouseMove.current=true;
        mouseDownX.current = e.touches[0].clientX;
        movepersent.current = 0;
        document.addEventListener('touchmove',handlePhonMove)
        document.addEventListener('touchend', handlePhonUp);
    }
    const handlePhonMove = (e) =>{
        if(timeMove.current){
            const mainImgsDiv = document.getElementById('mainImgsDiv');
            let divWidth = mainImgsDiv.clientWidth/3;
            let move = (e.touches[0].clientX - mouseDownX.current) / divWidth *100;
            movepersent.current = move;
            mainImgsDiv.style.transform = `translateX(-${((carouselNumber/CarouselImgNumber)*100)-(move/3)}%)`;
            waitTime(50);
        }
    }
    const handlePhonUp = () =>{
        mouseMove.current = false;
        if(movepersent.current <= -30){
            nextClick();
        }else if(movepersent.current >= 30){
            preClick();
        }else{
            setTimeout(() => {
                const mainImgsDiv = document.getElementById('mainImgsDiv');
                mainImgsDiv.style.transform = `translateX(-${carouselNumber/CarouselImgNumber*100}%)`;
            }, 1);
        }

        document.removeEventListener('touchmove',handlePhonMove)
        document.removeEventListener('touchend', handlePhonUp);
    }


    useEffect(()=>{
        const mainImgsDiv = document.getElementById('mainImgsDiv');
        const mainImgs = mainImgsDiv.querySelectorAll('.mainImg');
        setCarouselImgNumber(mainImgs.length);
        mainImgsDiv.style.width =`${mainImgs.length}00%`;
        mainImgs.forEach(index=>{
            index.style.width = `${100/mainImgs.length}%`
        })
        setCarouselNumber(0);
        
    },[])
    useEffect(() =>{
        const mainImgsDiv = document.getElementById('mainImgsDiv');
        mainImgsDiv.style.transform = `translateX(-${carouselNumber/CarouselImgNumber*100}%)`;
        const carouselTimmer =setInterval(()=>{
            if(mouseMove.current === false){
                setCarouselNumber(((carouselNumber+1)%CarouselImgNumber))
            }
        },3000)
        return () => {
            clearInterval(carouselTimmer);
        };
    },[carouselNumber])
    
    const preClick = ()=>{ 
        setCarouselNumber((carouselNumber+CarouselImgNumber-1)%CarouselImgNumber)
    }
    const nextClick = ()=>{
        setCarouselNumber((carouselNumber+1)%CarouselImgNumber)
    }
    return(
        <div ref={carouseDiv} id="mainCarousel" className="CarouselDiv" onMouseDown={(e)=>{CarouseMovedown(e)}} onTouchStart={(e)=>{CarousePhondown(e)}}>
            <div id="mainImgsDiv" className="mainImgsDiv" >
                <img src={fruit} alt="預覽1" className="mainImg" loading="lazy" draggable={false}></img>
                <img src={usb} alt="預覽2" className="mainImg" loading="lazy" draggable={false}></img>
                <img src={house} alt="預覽3" className="mainImg" loading="lazy" draggable={false}></img>
            </div>
            <div className="PreNextDiv">
                <img src={Pre} onClick={(e)=>{
                    e.stopPropagation();
                    if(timeMove.current){
                        preClick()
                        waitTime(300)
                    }
                }}
                    onMouseDown={(e)=>{e.stopPropagation()}}
                    onTouchStart={(e)=>{e.stopPropagation()}}
                    draggable={false}></img>
                <img src={Next} onClick={(e)=>{
                    e.stopPropagation()
                    if(timeMove.current){
                        nextClick()
                        waitTime(300);
                    }
                    }}
                    onMouseDown={(e)=>{e.stopPropagation()}}
                    onTouchStart={(e)=>{e.stopPropagation()}}
                    draggable={false}></img>
            </div>
        </div>
    );
};
export default Carousel;