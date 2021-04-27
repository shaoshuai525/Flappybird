class Game {
    constructor() {
        this.sky = new Sky();
        this.land = new Land(-100);
        this.bird = new Bird();
        this.pipeProduce = new PipePairProducer(-100);
        this.tick = 20; //移动的时间间隔
        this.timer = null;
        this.gameOver = false;
        this.score = 0;
    }

    start() {
        if (this.timer) {
            return;
        }
        if (this.gameOver) {
            window.location.reload();
        }
        this.pipeProduce.startProduce();
        this.bird.startSwing();
        this.timer = setInterval(() => {
            const time = this.tick / 1000;
            this.sky.move(time);
            this.land.move(time);
            this.bird.move(time);
            this.pipeProduce.pairs.forEach(pair => {
                pair.move(time);
            })
            if (this.isGameOver()) {
                this.stop();
                this.gameOver = true;
            }
        }, this.tick);

    }

    stop() {
        clearInterval(this.timer);
        this.timer = null;
        this.bird.stopSwing();
        this.pipeProduce.stopProduce();
    }

    /** 
     * 关联键盘事件
     */
    regEvent() {
        window.onkeydown = (e) => {
            if (e.key == "Enter") {
                if (this.timer) {
                    this.stop();
                } else {
                    this.start();
                }
            } else if (e.key == " ") {
                this.bird.jump();
            }
        }
    }

    isHit(rec1, rec2) {
        //横向：两个矩形的中心点的横向距离的绝对值，是否小于两个矩形宽度之和的一半
        //纵向：两个矩形的中心点的纵向距离的绝对值，是否小于两个矩形高度之和的一半
        const centerX1 = rec1.left + rec1.width / 2;
        const centerY1 = rec1.top + rec1.height / 2;
        const centerX2 = rec2.left + rec2.width / 2;
        const centerY2 = rec2.top + rec2.height / 2;
        const disX = Math.abs(centerX1 - centerX2);
        const disY = Math.abs(centerY1 - centerY2);
        if (disX <= (rec1.width + rec2.width) / 2 && disY <= (rec1.height + rec2.height) / 2){
            return true;
        }
        return false;
    }

    isGameOver() {
        if (this.bird.top == this.bird.maxY) {
            return true;
        }
        for (let i = 0; i < this.pipeProduce.pairs.length; i++) {
            const pair = this.pipeProduce.pairs[i];
            if (this.isHit(this.bird, pair.upPipe) || this.isHit(this.bird, pair.downPipe)) {
                return true;
            }
        }
        return false;
    }


    
}

const g = new Game();
g.regEvent();