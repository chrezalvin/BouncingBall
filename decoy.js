// setup canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return Number(num);
}

class Ball{
    constructor(x, y, vX, vY, color, size){
        this.x = x;
        this.y = y;
        this.vX = vX;
        this.vY = vY;
        this.color = color;
        this.size = size;
        this.clicked = false;
    }

    draw(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    update(){
        if(this.clicked) return;

        if ((this.x + this.size) >= width)
            this.vX = -(this.vX);
        
        if ((this.x - this.size) <= 0)
            this.vX = -(this.vX);
        
        if ((this.y + this.size) >= height)
            this.vY = -(this.vY);
        
        if ((this.y - this.size) <= 0)
            this.vY = -(this.vY);
        
        this.x += this.vX;
        this.y += this.vY;
    }

    changeColor(r, g, b){
        this.color = `rgb(${r}, ${g}, ${b})`
    }

    isInRange(posX, posY){
        // check if position is inside the circle
        if(posX >= this.x && posX <= (this.x + this.size))
            if(posY >= this.y && posY <= (this.y + this.size))
                return true;
        return false;
    }

    isStopped(){
        return ((this.vX == 0) && (this.vY == 0));
    }
}

let balls = [];
while(balls.length < 25){
    let ballSize = random(window.screenX * 3/100, window.screenX * 5/100);
    let ball = new Ball(
        random(ballSize, width - ballSize),
        random(ballSize, width - ballSize),
        random(-7, 7), 
        random(-7, 7), 
        `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`,
        ballSize
    );
    balls.push(ball);
}

function loop(){
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(0, 0, width, height);

    for(ball of balls){
        ball.draw();
        ball.update();
    }

    let clickedBalls = balls.filter((ball)=>{ return ball.clicked})

    for(const clickedBall of clickedBalls)
        clickedBall.changeColor(random(0, 255), random(0, 255), random(0, 255));

    requestAnimationFrame(loop);
}

window.addEventListener('click', (event)=>{
    let clickedBalls = balls.filter(elem=>elem.isInRange(event.offsetX, event.offsetY));
    for(clickedBall of clickedBalls){
        clickedBall.clicked = true;
    }

    new Ball(event.offsetX, event.offsetY, 0, 0, "white", 10).draw();
});

loop();