let canvas = document.getElementById('myCanvas');
let context = canvas.getContext('2d');

let playerName = prompt('Введите ваше имя?', 'Player1');
let difficalty = prompt('Выбере уровень сложности? л - легкий, н - нормальный, с - сложный', 'л');
let speed = 600;
if (difficalty === 'л'){
    speed = 600;
}
if (difficalty === 'н'){
    speed = 400;
}
if (difficalty === 'с'){
    speed = 200;
}

let buttons = document.getElementById('buttons');
buttons.addEventListener('click', (e)=>{
    if(e.target.innerHTML === 'up' && direction !== 'down') {direction = 'up'};
    if(e.target.innerHTML === 'left' && direction !== 'right') {direction = 'left'};
    if(e.target.innerHTML === 'right' && direction !== 'left') {direction = 'right'};
    if(e.target.innerHTML === 'down' && direction !== 'up') {direction = 'down'};
})

buttons.addEventListener('touchstart', (e)=>{
    console.log(e.target);
    if(e.target.innerHTML === 'up' && direction !== 'down') {direction = 'up'};
    if(e.target.innerHTML === 'left' && direction !== 'right') {direction = 'left'};
    if(e.target.innerHTML === 'right' && direction !== 'left') {direction = 'right'};
    if(e.target.innerHTML === 'down' && direction !== 'up') {direction = 'down'};
})


let scoree = 0;
let record = 0;
let recordName = ''
let numb = 0;
let score = document.getElementById('score');
let rec = document.getElementById('record');
let chemp = document.getElementById('chemp');
let yourname = document.getElementById('yourName');

score.innerHTML = scoree;

yourname.innerHTML += playerName;

let Storage_size = localStorage.length;
// Если в хранилище уже что-то есть…
if (Storage_size > 0) {
  // …то достаём оттуда значение рекорда и имя чемпиона
  record = localStorage.record;
  recordName = localStorage.recordName;
}
rec.innerHTML = record;
chemp.innerHTML = recordName;
var img = new Image();   // Создаёт новый элемент изображения
img.src = 'img/ground.png'; // Устанавливает путь

let  direction= 'left';
let box = 76;
let food = {
    x : Math.floor(Math.random() * (7)),
    y : Math.floor(Math.random() * (7)),
}
let snake = [
    {x : 3,
    y : 3},
    {x : 4,
    y : 3},
]
function drawFood(){
    context.fillStyle = "blue";
    context.fillRect( food.x * box, food.y *box, box, box);
}
function drawSnake(){
    moveSnake();
    for(let i = 0; i < snake.length; i++){
        if( i === 0) context.fillStyle = "#FF0000";
        else context.fillStyle = "black";
        context.fillRect( snake[i].x * box, snake[i].y *box, box, box)
    }
}
function moveSnake(){
    let check = true;
    if(direction === 'left'){
        snake.unshift({x : snake[0].x -1, y : snake[0].y});
        if(snake[0].x < 0) snake[0].x = 7;       
    }
    if(direction === 'up'){
        snake.unshift({x : snake[0].x, y : snake[0].y -1});
        if(snake[0].y < 0) snake[0].y = 7; 
    }
    if(direction === 'right'){
        snake.unshift({x : snake[0].x + 1, y : snake[0].y});
        if(snake[0].x > 7) snake[0].x = 0;  
    }
    if(direction === 'down'){
        snake.unshift({x : snake[0].x, y : snake[0].y + 1});
        if(snake[0].y > 7) snake[0].y = 0;   
    }
    if (snake[0].x === food.x && snake[0].y === food.y ){
        scoree++; 
        if(scoree >= record){
            record = scoree;
            localStorage.record = record;
            rec.innerHTML = record;
            recordName = playerName;
            localStorage.recordName = recordName;
            chemp.innerHTML = playerName;
            console.log(localStorage);
        }
        if(scoree === 61){
            alert('You won!!!');
            clearInterval(game)
        }
        score.innerHTML = scoree;
        while(check){
            food = {
                x : Math.floor(Math.random() * (7)),
                y : Math.floor(Math.random() * (7))};
                for(let i = 0; i < snake.length; i++){
                    if(snake[i].x === food.x &&  snake[i].y === food.y ){
                        check = true;
                        break;
                    } else {check = false}
        }}
        
    } else snake.pop();
    for(let i = 1; i < snake.length; i++){
        if(snake[0].x === snake[i].x && snake[0].y === snake[i].y){
            alert('You lose!!!');
            clearInterval(game)
        }
    }
}
function drawField (){
    context.drawImage(img,0,0);
    drawFood();
    drawSnake();
    
}
let game = setInterval(drawField, speed);


document.addEventListener('keydown', (e)=>{
    if(e.keyCode === 32) {
        numb++;
        if(numb % 2 === 0){
            game = setInterval(drawField, speed);
        } else clearInterval(game);
    };
    if(e.keyCode === 37 && direction !== 'right') direction = 'left';
    if(e.keyCode === 38 && direction !== 'down') direction = 'up';
    if(e.keyCode === 39 && direction !== 'left') direction = 'right';
    if(e.keyCode === 40 && direction !== 'up') direction = 'down';
})

