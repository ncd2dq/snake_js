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
    song = loadSound("snake_music.mp3");
}

function setup() {    
    createCanvas(Canvas_x, Canvas_y);
    frameRate(FPS);
    food_list = [new Food()];
    snake = new SnakeHead()
    if(song.isLoaded() == true){
        song.play();
    }
}


// All Snake Parts
function SnakeHead(){
    this.x_offset = snake_offset;
    this.y_offset = snake_offset;
    this.x = this.x_offset * Tile_Dimension;
    this.y = this.y_offset * Tile_Dimension;
    this.prev_x = 0;
    this.prev_y = 0;
    this.tail = []
    
    this.show = function(){
        color(0, 255, 0);
        rect(this.x, this.y, Tile_Dimension, Tile_Dimension);
        
        if (this.tail.length != 0){
            for (i = 0; i < this.tail.length; i++){
                this.tail[i].show()
            }
        }
    }
    
    this.move = function(direction){
        this.prev_x = this.x;
        this.prev_y = this.y;
        this.x += direction[0] * Tile_Dimension;
        this.y += direction[1] * Tile_Dimension;
        
        // This checks if head collided with any of tail pieces
        for (i = 0; i< this.tail.length; i++){
            if (this.x == this.tail[i].x && this.y == this.tail[i].y){
                this.tail = [];
                alert("Your final score was " + score)
                score = 0
            }
        }
        
        // This ensures that the snake wraps around the edges of the screen
        if (this.x >= Canvas_x){
            this.x = 0;
        } else if (this.x < 0){
            this.x = Canvas_x - Tile_Dimension;
        } else if (this.y >= Canvas_y){
            this.y = 0;
        } else if (this.y < 0){
            this.y = Canvas_y - Tile_Dimension;
        }
        
        // this handles the trailing affect of the snake tail
        if (this.tail.length != 0){
            for (i = 0; i < this.tail.length; i++){
                if (i == 0){
                    this.tail[i].prev_x = this.tail[i].x;
                    this.tail[i].prev_y = this.tail[i].y;
                    this.tail[i].x = this.prev_x;
                    this.tail[i].y = this.prev_y;
                } else {
                    this.tail[i].prev_x = this.tail[i].x;
                    this.tail[i].prev_y = this.tail[i].y;
                    this.tail[i].x = this.tail[i - 1].prev_x;
                    this.tail[i].y = this.tail[i - 1].prev_y;   
                }
            }
        }
        
    }
    
    this.eat = function(food_list){
        if (food_list.length > 0){
            for (i = 0; i < food_list.length; i++){
                if (this.x == food_list[i].x && this.y == food_list[i].y){
                    this.tail.push(new SnakeBody(this.prev_x, this.prev_y));
                    food_list[i] = new Food();
                    score += 1;
                    
                }
            }
        }
        
    }
    
}


function SnakeBody(x, y){
    this.x = x;
    this.y = y;
    this.prev_x = 0;
    this.prev_y = 0;
    
    this.show = function(){
        rect(this.x, this.y, Tile_Dimension, Tile_Dimension)
    }
}

// All food parts
function Food(){
    this.x_offset = floor(random(Tiles));
    this.y_offset = floor(random(Tiles));
    this.x = this.x_offset * Tile_Dimension;
    this.y = this.y_offset * Tile_Dimension;
    
    this.show = function(){
        rect(this.x, this.y, Tile_Dimension, Tile_Dimension);
        
    }
    
}


// Draw the Sketch
function draw() {
    background(0, 0, 0);
    fill(255,0,0);
    snake.eat(food_list)
    food_list[0].show();
    
    snake.move(direction);
    fill(0, 255, 0);
    snake.show();
    
    textSize(score_size);
    fill(0, 102, 153);
    text(score, Canvas_x / 2 - score_size, score_y_offset);
    
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