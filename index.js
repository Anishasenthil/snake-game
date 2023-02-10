
//board
var blocksize=25;
var rows=20;
var col=20;
var board;
var context;
//snake head

var snakex = blocksize * 5;
var snakey = blocksize * 5;

var velocityx = 0;
var velocityy = 0;

var snakeBody = [];
// food

var foodx ;
var foody ;

var gameover= false;
window.onload=function(){
    board = document.getElementById("board");
    board.height=rows * blocksize;
    board.width=col * blocksize;
   context= board.getContext("2d");//helps to draw
     
    placefood();
    document.addEventListener("keyup",changeDirection);
    //update();
    setInterval(update,1000/10);//100 milliseconds
}
//update function

function update(){
    if(gameover){
        return;
    }
   context.fillStyle="black";
   context.fillRect(0,0,board.width,board.height);// from left corner to right bottom


//food
context.fillStyle="red";
context.fillRect(foodx,foody,blocksize,blocksize);


if(snakex == foodx && snakey == foody){
    snakeBody.push([foodx,foody])
    placefood();
}

for(let i= snakeBody.length-1 ;i> 0;i--){
    snakeBody[i]=snakeBody[i-1];
}

if(snakeBody.length){
    snakeBody[0]=[snakex,snakey];
}

//snake color

   context.fillStyle="lime";
   // have to update/reflect the position each time in canvas
   snakex += velocityx * blocksize ; // we multiply velocity by blocksize so it is actually
   snakey += velocityy  * blocksize;                                   //moving one square unit for every 100 milli second
    

   context.fillRect(snakex,snakey,blocksize,blocksize);

   for(let i= 0; i <snakeBody.length; i++ ){
       context.fillRect(snakeBody[i][0],snakeBody[i][1],blocksize,blocksize);
   }
  
   // game over condition
   if(snakex < 0 || snakex > col * blocksize || snakey < 0 || snakey > rows * blocksize){
       gameover = true;
       alert("😔 game over");
   }
    
   for(let i=0; i < snakeBody.length ;i++){
       if(snakex == snakeBody[i][0] && snakey == snakeBody[i][1]){
           gameover = true;
           alert(" 😔 game over")
       }
   }


}
// food function
function placefood(){
    foodx = Math.floor(Math.random() * col ) * blocksize;
    foody = Math.floor(Math.random() * rows) * blocksize;
}
//direction function

function changeDirection(e){
    if(e.code == "ArrowUp" && velocityy != 1){
        velocityx = 0;
        velocityy = -1;
    }
    else if(e.code == "ArrowDown" && velocityy != -1){
        velocityx = 0;
        velocityy = 1;
    }
    else if(e.code == "ArrowLeft" && velocityx != 1){
        velocityx = -1;
        velocityy = 0;
    }
    else if(e.code == "ArrowRight" && velocityx != -1){
        velocityx = 1;
        velocityy = 0;
    }
}