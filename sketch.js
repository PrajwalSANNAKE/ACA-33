
var bg, backgroundImg;
var IronMan, IronManImage; 
var stoneGroup,stoneImage;
var diamondGroup,diamondImage;
var score=0;

function preload() {
  backgroundImg = loadImage("images/bg.jpg");
  IronManImage=loadImage("images/iron.png");
  stoneImage=loadImage("images/stone.png");
  diamondImage=loadImage("images/diamond.png");
}

function setup() {
  createCanvas(1000, 600);
  bg = createSprite(580,300);
  bg.addImage(backgroundImg);
  
  IronMan=createSprite(100,500);
  IronMan.addImage(IronManImage);
  IronMan.scale=0.3;
  
  ground=createSprite(200,550,2000,10);
  ground.visible=false;
  IronMan.setCollider("rectangle",10,10,300,300);

  stoneGroup=new Group();
  diamondGroup=new Group();
  
}

function draw() {
  if(keyDown("up")){
    IronMan.velocityY=-10;
  }
  if(keyDown("left")){
    IronMan.x=IronMan.x-7;
  }
  if(keyDown("right")){
    IronMan.x=IronMan.x+7;
  }
  IronMan.velocityY=IronMan.velocityY+0.5;
  IronMan.collide(ground);
  bg.velocityY=-10;
  if(bg.y<200){
    bg.y=bg.width/4;
  }
  
  generatediamond();
  for(var i = 0;i<(diamondGroup).length;i++){
    temp=(diamondGroup).get(i);
    if(temp.isTouching(IronMan)){
      score++;
      temp.destroy();
      temp=null;
    }
    
  }
  generatestone();
  for (var i=0;i<(stoneGroup).length;i++){
    var temp=stoneGroup.get(i);
    if(temp.isTouching(IronMan)){
      IronMan.collide(temp);
    }
  }
    drawSprites();
    textSize(20)
    text("Diamonds Collected:"+score,500,50);

}
function generatestone(){
  if(frameCount%70===0){
    var stone=createSprite(120,120,40,10);
    stone.x=random(50,1000);
    stone.addImage(stoneImage);
    stone.scale=1;
    stone.velocityY=5;
    stone.lifetime=500;
    stoneGroup.add(stone);
  }
}

function generatediamond(){
  if(frameCount%50===0){
    var diamond=createSprite(1200,120,40,10);
    diamond.addImage(diamondImage);
    diamond.x=Math.round(random(80,1000));
    diamond.scale=0.5;
    diamond.velocityY=3;
    diamond.lifetime=1200;
    diamondGroup.add(diamond);
  }
}



