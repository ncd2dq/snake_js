let Canvas_x = 800;
let Canvas_y = 800;
let Tiles = 50;
let Tile_Dimension = Canvas_x / Tiles;
let FPS = 15;
let snake_offset = 10;
let direction = [1, 0];

function setup() {    
    createCanvas(Canvas_x, Canvas_y);
    frameRate(FPS);
    food_list = [new Food()];
    snake = new SnakeHead()
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
        rect(this.x, this.y, Tile_Dimension, Tile_Dimension);
        
        if (this.tail.length != 0){
            for (i = 0; i < this.tail.length; i++){
                this.tail[i].show()
            }
        }
    }
    
    this.move = function(direction){
        this.prev_x = this.x;
        this.prev_y = this.x;
        this.x += direction[0] * Tile_Dimension;
        this.y += direction[1] * Tile_Dimension;
        
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
    food_list[0].show();
    
    snake.show();
    snake.move(direction);
}

// User input
function keyPressed(){
    if (keyCode === LEFT_ARROW){
        direction = [-1, 0];
    } else if (keyCode === RIGHT_ARROW){
        direction = [1, 0];
    } else if (keyCode === DOWN_ARROW){
        direction = [0, 1];
    } else if (keyCode === UP_ARROW){
        direction = [0, -1];
    }
}