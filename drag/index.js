window.onload = function () {
    /**
     * 解决鼠标焦点丢失问题
     *  + 火狐/IE 解决方法  绑定方法时调用setCapture() 接触绑定时调用releaseCapture()
     *  + 谷歌 解决方法 使用window来绑定和接触方法
     */
    const box = document.querySelector(".box"),
        HTML = document.documentElement,
        minLeft = 0,
        minTop = 0,
        maxLeft = HTML.clientWidth - box.offsetWidth,
        maxTop = HTML.clientHeight - box.offsetHeight;
    //  不能给box添加 mousemove和mouseup事件,因为如果鼠标移动太快时，根本不会触发box的移除事件。这是典型的鼠标焦点丢失问题，这是因为鼠标移动过快，计算盒子位置的程序跟不上处理，导致鼠标移除盒子，从而引发一系列的问题。
    const down = function (ev) {
        //this=>box  console.log(this);
        let { top, left } = this.getBoundingClientRect();
        //记录开始位置
        this.startTop = top;
        this.startLeft = left;
        this.startX = ev.clientX;
        this.startY = ev.clientY;
        // this.setCapture();
        /**
         * 鼠标移动 
         * 在鼠标按下之后开始移动
         */
        //不能用 box 会导致鼠标焦点丢失
        this._move = move.bind(this);
        window.addEventListener('mousemove', this._move)
        //鼠标抬起,
        //不能用 box 会导致鼠标焦点丢失
        this._up = up.bind(this);
        window.addEventListener("mouseup", this._up)
    }
    const up = function () {
        // this.releaseCapture();
        //移除书剑绑定
        window.removeEventListener("mousemove", this._move)
        //从事件池移除
        window.removeEventListener("mouseup", this._up);
    }
    const move = function (ev) {
        let curLeft = ev.clientX - this.startX + this.startLeft,
            curTop = ev.clientY - this.startY + this.startTop;
        console.log(curLeft, curTop);
        curLeft = curLeft < minLeft ? minLeft : curLeft > maxLeft ? maxLeft : curLeft;
        curTop = curTop < minTop ? minTop : curTop > maxTop ? maxTop : curTop;
        this.style.cssText += `left:${curLeft}px;top:${curTop}px`;
    }
    //鼠标按下
    box.addEventListener("mousedown", down);



}