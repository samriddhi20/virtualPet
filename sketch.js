var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood,feedTheDog;
var foodObj;
var lastfeed,lastFed;

//create feed and lastFed variable here
 

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  FeedDog=createButton("Feed The Dog")
  FeedDog.position(900,95);
  FeedDog.mousePressed(FeedDogs);
}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database
 feedTime=database.ref("lastFed")
 feedTime.on("value",function(data){
   lastFed=data.val()
 })
  if(lastFed>=12){
    textSize(20)
    fill("white")
    text("Last Feed:"+lastFed%12 + "PM",350,30);
  }else if(lastFed ===0){
    textSize(20)
    fill("white")
    text("Last Feed :12 AM ",350,30);
  }else{
    textSize(20)
    fill("white")
    text("Last Feed:"+lastFed +"AM",350,30);
    
  }
 
  //write code to display text lastFed time here

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function FeedDogs(){ 
  dog.addImage(happyDog);
  foodS--;
  database.ref('/').update({
    Food:foodS,
  lastFed:hour (),
  
  })
  //write code here to update food stock and last fed time

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

