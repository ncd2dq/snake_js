let Canvas_x =800;
let Canvas_y = 800;
let Tiles = 50;
let Tile_Dimension = Canvas_x / Tiles;
let FPS = Canvas_x / 53;
let snake_offset = 10;
let direction = [1, 0];
let score = 0;
let score_size = 32;
let score_y_offset = 50;
var song;

function preload(){
    soundFormats('mp3');
    song = loadSound("assets/snake_music.mp3");
} 


function setup() {    
    createCanvas(Canvas_x, Canvas_y);
    frameRate(FPS);
    
    food_list = [new Food()];
    snake = new SnakeHead();
    
    if(song.isLoaded() == true){
        song.play();
    } 
}


function draw() {
    background(0, 0, 0);
    fill(255,0,0);
    
    // Main Game Logic
    snake.eat(food_list)
    food_list[0].show();
    snake.move(direction);
    fill(0, 255, 0);
    snake.show();
    
    // Score counter
    textSize(score_size);
    fill(0, 102, 153);
    text(score, Canvas_x / 2 - score_size, score_y_offset);
    
    // Song playing
    if( song.isPlaying() == false){
        song.play();
    }
}


// User input
function keyPressed(){
    if (keyCode === LEFT_ARROW && direction[0] != 1){
        direction = [-1, 0];
    } else if (keyCode === RIGHT_ARROW && direction[0] != -1){
        direction = [1, 0];
    } else if (keyCode === DOWN_ARROW && direction[1] != -1){
        direction = [0, 1];
    } else if (keyCode === UP_ARROW && direction[1] != 1){
        direction = [0, -1];
    }
}