let Canvas_x = 800;
let Canvas_y = 800;
let Tiles = 50;
let Tile_Dimension = Canvas_x / Tiles;
let FPS = 15;

function setup() {    
    createCanvas(Canvas_x, Canvas_y);
    food = new Food();
}


function Food(){
    this.x_offset = random(Tiles);
    this.y_offset = random(Tiles);
    this.x = this.x_offset * Tile_Dimension;
    this.y = this.y_offset * Tile_Dimension;
    
    this.show = function(){
        rect(this.x, this.y, Tile_Dimension, Tile_Dimension);
        
    }
    
}

function draw() {
    background(0, 0, 0);
    
    fill(255,0,0);
    food.show();
}