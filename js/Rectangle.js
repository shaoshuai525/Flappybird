/**
 * 矩形类，可以移动
 * 属性：宽度、高度、横坐标、纵坐标、横向速度、纵向速度、对应的dom对象
 * xSpeed:横向速度，单位(像素/秒)
 * ySpeed:纵向速度，单位(像素/秒)
 */


class Rectangle{
    constructor(width, height, left, top, xSpeed, ySpeed, dom){
        this.width = width;
        this.height = height;
        this.left = left;
        this.top = top;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.dom = dom;
        this.render();
    }

    render(){
        this.dom.style.width = this.width + 'px';
        this.dom.style.height = this.height + 'px';
        this.dom.style.left = this.left + 'px';
        this.dom.style.top = this.top + 'px';
    }

    /**
     * 按照矩形的速度和指定的时间，移动矩形
     * @param {*} time 
     */
    move(time){
        const xDis = time * this.xSpeed;//横向的距离
        const yDis = time * this.ySpeed;//纵向的距离
        this.left = this.left + xDis;
        this.top = this.top + yDis;

        // 可能会发生一些事
        if(this.onMove){
            this.onMove();
        }

        this.render();
    }
}