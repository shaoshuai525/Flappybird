const birdDom = document.querySelector('.bird');
const birdStyles = getComputedStyle(birdDom);
const birdWidth = parseFloat(birdStyles.width);
const birdHeight = parseFloat(birdStyles.height);
const birdLeft = parseFloat(birdStyles.left);
const birdTop = parseFloat(birdStyles.top);
const gameDom = document.querySelector('.game');
const gameHeight = gameDom.clientHeight;

class Bird extends Rectangle {
    constructor() {
        super(birdWidth, birdHeight, birdLeft, birdTop, 0, 0, birdDom);
        this.g = 1500; //向下的加速度，单位像素/秒²
        //最大的y坐标
        this.maxY = gameHeight - landHeight - this.height
        this.swingStatus = 1;
        this.timer = null;
        this.render();
    }

    move(time) {
        super.move(time); //调用父类方法
        //根据加速度改变速度
        this.ySpeed = this.ySpeed + time * this.g;
    }

    onMove() {
        //控制坐标范围
        if (this.top >= this.maxY) {
            this.top = this.maxY;
        } else if (this.top < 0) {
            this.top = 0;
        }
    }

    jump() {
        this.ySpeed = -300;
    }

    startSwing() {
        if (this.timer) {
            return;
        }
        this.timer = setInterval(() => {
            this.swingStatus++;
            if (this.swingStatus === 4) {
                this.swingStatus = 1;
            }
            this.render();
        }, 200);
    }

    stopSwing() {
        clearInterval(this.timer);
        this.timer = null;
    }

    render() {
        super.render();
        this.dom.className = `bird swing${this.swingStatus}`
    }
}