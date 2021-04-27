const gameWidth = gameDom.clientWidth;

class Pipe extends Rectangle {
    constructor(height, top, speed, dom) {
        super(52, height, gameWidth, top, speed, 0, dom);
    }

    onMove() {
        if (this.left < -this.width) {
            // 移除dom
            this.dom.remove();
        }
    }
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

class pipePair {
    constructor(speed) {
        const spaceHeight = 150; //空隙位置的高度
        this.minHeight = 80 //水管最小高度
        this.maxHeight = landTop - this.minHeight - spaceHeight; //水管最大高度
        const upHeight = getRandom(this.minHeight, this.maxHeight)


        const upDom = document.createElement("div");
        upDom.className = "pipe up";

        this.upPipe = new Pipe(upHeight, 0, speed, upDom); //上水管
        const downHeight = landTop - upHeight - spaceHeight;
        const downTop = landTop - downHeight;

        const downDom = document.createElement("div");
        downDom.className = "pipe down";
        this.downPipe = new Pipe(downHeight, downTop, speed, downDom); //下水管

        gameDom.appendChild(upDom);
        gameDom.appendChild(downDom);
    }

    /**
     * 判断柱子是否已经移出了视野
     */
    get useLess(){
        return this.upPipe.left < -this.upPipe.width;
    }

    move(time) {
        this.upPipe.move(time);
        this.downPipe.move(time);
    }
}

/**
 * 用于不断产生柱子对
 */
class PipePairProducer {
    constructor(speed) {
        this.speed = speed;
        this.pairs = [];
        this.timer = null;
    }

    startProduce() {
        if (this.timer) {
            return;
        }
        this.timer = setInterval(() => {
            this.pairs.push(new pipePair(this.speed));
            //移除掉不用的柱子
            for (let i = 0; i < this.pairs.length; i++) {
                var pair = this.pairs[i];
                if(pair.useLess){
                    this.pairs.splice(i, 1);
                    i--;
                }
            }
        }, 1500);
    }

    stopProduce() {
        clearInterval(this.timer);
        this.timer = null;
    }
}