var Canvas_x, Canvas_y = 800;
var Tiles = 50;
var Tile_Dimension = Canvas_x / Tiles;
var FPS = 15;

function Food(){
    this.x = random(Canvas_x);
    this.y = random(Canvas_y);
    
    this.show = function(){
        ellipse(this.x, this.y, Tile_Dimension, Tile_Dimension)
        
    }
    
}





function setup() {
    createCanvas(Canvas_x, Canvas_y);
    food = new Food()
}

function draw() {
    background(255, 255, 255);
    food.show();
}