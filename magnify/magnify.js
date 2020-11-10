window.onload = function () {
    const magnifier = document.querySelector(".magnifier"),
        abbre = magnifier.querySelector(".abbre"),
        mark = abbre.querySelector(".mark"),
        detail = magnifier.querySelector(".detail"),
        detailImg = detail.querySelector("img");
    // abbre 200 mark 80
    // detailimg ? detail 300
    //计算大图大小
    const abbreW = abbre.offsetWidth,
        abbreH = abbre.offsetHeight;
    abbre.onmouseenter = function (ev) {
        mark.style.display = "block";
        detail.style.display = "block";
        const markW = mark.offsetWidth,
            markH = mark.offsetHeight,
            detailW = detail.offsetWidth,
            detailH = detail.offsetHeight;
        detailImgW = detailW * abbreW / markW,
            detailImgH = detailH * abbreH / markH;
        console.log(detailImgW, detailImgH);
        detailImg.style.cssText = `width:${detailImgW}px;height:${detailImgH}px`;
        computed(ev, mark);


    }
    abbre.onmousemove = function (ev) {
        computed(ev, mark);
    }
    abbre.onmouseleave = function (ev) {
        mark.style.display = "none";
        detail.style.display = "none";
    }
    //计算`mark/大图`移动的位置
    function computed (ev, mark) {
        const markW = mark.offsetWidth,
            markH = mark.offsetHeight;
        let curLeft = ev.pageX - abbre.offsetLeft - markW / 2,
            curTop = ev.pageY - abbre.offsetTop - markH / 2;
        //边界值判断
        const minLeft = 0, maxLeft = abbre.offsetWidth - markW;
        const minTop = 0, maxTop = abbre.offsetHeight - markH;
        curLeft = curLeft < minLeft ? minLeft : curLeft > maxLeft ? maxLeft : curLeft;
        curTop = curTop < minTop ? minTop : curTop > maxTop ? maxTop : curTop;
        //mark偏移
        mark.style.cssText += `top:${curTop}px;left:${curLeft}px`;
        /*
        * mark在abbre移动的距离 A
        * => A / abbre 已经移动的距离
        * 
        * 大图需要移动的距离B
        * => B/detail 已经移动的距离
        */
        // mark在abbre中移动的比例和大图在detailImg中移动的比例应该是一样的，只是移动距离相反
        //detailImg偏移
        const detailImgLeft = -curLeft / abbreW * detailImgH,
            detailImgTop = -curTop / abbreH * detailImgH;
        detailImg.style.cssText += `top:${detailImgTop}px;left:${detailImgLeft}px`;
    }
}