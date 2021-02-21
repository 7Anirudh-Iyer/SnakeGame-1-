const canvas = document.getElementById('c1');
const c = canvas.getContext('2d');
const unitName = 32;
const g = new Image()
const f = new Image()
let a
let dir
let score = 0
let spx,spy,nh

//in order to load image, use new Image() to call constructor, then say object name.src = path
g.src = 'ground.png'
f.src = 'food.png'

// function hour(){
//    a = new Date().getHours()
//    console.log(a)
// }

let snake = []
snake[0] = {
    x: 320-32,
    y: 320,
}
let food = {
  x: Math.floor(Math.random() * 17) * 32,
  y: Math.floor(Math.random() * 15) * 32
}

function collide(a,b){
  for(var i = 0; i < b.length; i++){
    if(a.x == b[i].x && a.y == b[i].y){
      return true;
    }
    else{
      return false;
    }
  }
}

function draw(){
    c.drawImage(g,0,0)

    for(var i=0;i<snake.length;i+=1){
      (i===0)?c.fillStyle='blue':c.fillStyle='red'
      c.fillRect(snake[i].x,snake[i].y,32,32)
    }

    spx = snake[0].x
    spy = snake[0].y

    c.drawImage(f,food.x,food.y)

    if(dir == 'left'){
      spx-=32
    }

    if(dir == 'right'){
      spx+=32
    }

    if(dir == 'top'){
      spy-=32
    }

    if(dir == 'bottom'){
      spy+=32
    }

    nh = {
      x: spx,
      y: spy,
    }

    snake.unshift(nh)

    c.fillStyle = 'black'
    c.font = '30px TimesNewRoman'
    c.fillText(score,snake[0].x+7,snake[0].y+22)

    if(food.x==spx&&food.y==spy){
      food = {
        x: Math.floor(Math.random() * 17) * 32,
        y: Math.floor(Math.random() * 15) * 32
      }
      score+=1
    }
    else{
      snake.pop()
    }

    if(snake[0].x>608){
      snake[0].x=0
    }

    if(snake[0].y>608){
      snake[0].y=0
    }

    if(snake[0].x<0){
      snake[0].x=608
    }

    if(snake[0].y<0){
      snake[0].y=608
    }

    if(collide(nh,snake)){
      clearInterval(draw)
    }
    else{
      console.log('comeone')
    }
  
}

let callFunction = setInterval(draw,100)

// function rect(x,y,color){
//     this.x=x;
//     this.y=y;
//     this.width=32;
//     this.height=32;
//     this.color=color;

//     c.fillStyle = this.color
//     c.fillRect(this.x,this.y,this.width,this.height)
// }

document.addEventListener("keydown", function(data){
  dir
  if (data.keyCode === 37 && dir!='right'){
    dir = 'left'
  }
  // snake[0].x+=32
  if (data.keyCode === 38 && dir!='bottom'){
    dir = 'top'
  }
  // snake[0].y-=32
  if (data.keyCode === 39 && dir!='left'){
    dir = 'right'
  }
  // snake[0].x+=32
  if (data.keyCode === 40 && dir!='top'){
    dir = 'bottom'
  }
  // snake[0].y-=32
});