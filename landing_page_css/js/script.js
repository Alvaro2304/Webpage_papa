const carousel = document.querySelector(".carousel");
const carousel_img = document.querySelectorAll(".carousel img");
firstImg=document.querySelectorAll(".carousel img")[0];
arrowIcons = document.querySelectorAll(".wrapper img.flechas")

let isDragStart=false, prevPageX,prevScrollLeft,positionDiff;
let firstImgWidth = firstImg.clientWidth+250;


arrowIcons.forEach(icon=>{
    icon.addEventListener("click",()=>{
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
    })
})

const autoSlide=()=>{
    positionDiff=Math.abs(positionDiff);
    let firstImgWidth=firstImg.clientWidth+14;
    let valDifference=firstImgWidth-positionDiff;

    if(carousel.scrollLeft>prevScrollLeft){
        return carousel.scrollLeft+=positionDiff>firstImgWidth/3?valDifference:-positionDiff;
    }
    carousel.scrollLeft-=positionDiff>firstImgWidth/3?valDifference:-positionDiff;
}

const dragStart=(e)=>{
    isDragStart=true;
    prevPageX=e.pageX || e.touches[0].pageX;
    prevScrollLeft=carousel.scrollLeft;
}

const dragging=(e)=>{
    if(!isDragStart) return;
    // e.preventDefault();
    carousel.classList.add("dragging");
    positionDiff=(e.pageX || e.touches[0].pageX)-prevPageX
    carousel.scrollLeft=prevScrollLeft-positionDiff;
}

const dragStop=()=>{
    isDragStart=false;
    carousel.classList.remove("dragging");
    autoSlide();
}

carousel.addEventListener("mousedown",dragStart);
carousel.addEventListener("touchstart",dragStart);

carousel.addEventListener("mousemove",dragging);
carousel.addEventListener("touchmove",dragging);

carousel.addEventListener("mouseup",dragStop);
carousel.addEventListener("touchend",dragStop);

carousel_img.forEach(image => {
    image.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
});