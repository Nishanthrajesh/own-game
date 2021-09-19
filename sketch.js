var invisible,timer = 0;

var granade,granadeImg;

var UFosiren;

var totalAliens = 75;

var headshot_sound,burst;

var startmusic;

var UFOGroup,loading,loadingImg;

var deathsound;

var Life = 500;

gameState = 0

var shooting_effect

var alien_dyingSound

var burstImg;

var Playmusic;

var startImg

var Defeat,DefeatImg;

var gh

var hand_gun,hand_gunImg,bg,aim,aimImg;

var alien1,alien1Img,alien1Group

var button,shooting_sound,footstep;

var flag=0;

function preload()
{
  hand_gunImg = loadAnimation("1.png");
  bg = loadImage("alien game background.png");
  alien_dyingSound = loadSound("alien monster dying.mp3")
  shooting_sound = loadSound("shootsound.mp3");
  gh = loadAnimation("gh.png");
  footstep = loadSound("footstep..mp3");
  bga = loadAnimation("frame_02_delay-0.08s.png","frame_03_delay-0.08s.png","frame_04_delay-0.12s.png","frame_05_delay-0.08s.png","frame_06_delay-0.12s.png","frame_07_delay-0.08s.png","frame_08_delay-0.12s.png")
  aimImg = loadImage("aim point.png");
  granadeImg = loadImage("granade.png")
  startImg = loadImage("shoot.jpg");
  startmusic = loadSound("start.mp3",load,functio);
  UFOImg = loadAnimation("UFO.png");
  burst = loadSound("burst sound.wav")
  shooting_effect = loadAnimation("1.png","2.png","3.png","4.png","5.png");
  alien1Img = loadAnimation("frame_00_delay-0.1s.png","frame_01_delay-0.1s.png","frame_02_delay-0.1s.png","frame_03_delay-0.1s.png","frame_04_delay-0.1s.png","frame_05_delay-0.1s.png","frame_06_delay-0.1s.png","frame_07_delay-0.1s.png","frame_08_delay-0.1s.png","frame_09_delay-0.1s.png","frame_10_delay-0.1s.png","frame_11_delay-0.1s.png","frame_12_delay-0.1s.png","frame_13_delay-0.1s.png")
}

function setup()
{
  createCanvas(1000,600);
  
  UFOGroup = createGroup();
  alien1Group = createGroup();

  edges=createEdgeSprites();

  Playmusic = createButton("MUTE");
  Playmusic.position(910,20);
  Playmusic.mousePressed(togglePlaying);

  this.playButton = createButton("PLAY")
  this.playButton.position(width/2,550)

  var bj = createSprite(width/2,height/2,1000,600)
      bj.addAnimation("background",bga);
      bj.scale = 2.7

  granade = createSprite(200,450)
  granade.addImage(granadeImg)
  granade.scale = 0.7
  
  hand_gun = createSprite(width/2,450);
  hand_gun.addAnimation("handgun",hand_gunImg);
  hand_gun.scale =2.2;
  
  aim = createSprite(hand_gun.x-25,425);
  aim.addImage(aimImg);
  aim.scale =0.4;
  aim.setCollider("circle",0,0,-20);
  aim.visible = false;
}

function draw()
{
  if(gameState === 0)
    {
      background(startImg);
      fill("red");
      textSize(40)
      textFont("Algerian")
      text("Let's start the game",300,500)
      fill("blue");
      textSize(50)
      textFont("Algerian")
      text("Click on the play button",150,250)
      Playmusic.hide()

      this.playButton.mousePressed(()=>
        {
          bgmusic = loadSound("the great battle.mp3",loaded)
          startmusic.stop();
          gameState = 1
          this.playButton.hide();
          aim.visible = true;
          aim.debug = true;
        })
    }
  
  if(gameState ===1)
    {
      background("blue")
    var UFO = createSprite(150,-150)
    Playmusic.show();

  if(keyDown("right"))
   {
     hand_gun.x = hand_gun.x+6;
     aim.x = aim.x+6;
     
     if(frameCount%15===0)
      { 
        footstep.play();
      }
   }

   if(mousePressedOver(granade))
   {
     hand_gun.scale = 0.6;
     hand_gun.addAnimation("granade",gh);
     hand_gun.changeAnimation("granade");
     hand_gun.y = 520
     hand_gun.x = mouseX;
     granade.x = mouseX;
     granade.y = hand_gun.y
     granade.x = hand_gun.x
   }
  
  for(var j = 0;j<UFOGroup.length;j=j+1)
    {
      if(UFOGroup[j].y>=150)
       {
         UFosiren.stop();
         UFOGroup[j].velocityY = -5;
         alien1.visible = true
         alien1.scale = 0.1;
         alien1.x = UFOGroup[j].x
         alien1.velocityY = 7;
         alien1Group.add(alien1)
       }
    }
  
  if(frameCount%12===0)
    {
      alien1 = createSprite(UFO.x,150)
      alien1.addAnimation("alien_coming",alien1Img)
      alien1.changeAnimation("alien_coming")
      alien1.visible = false;
      alien1.scale = 0.01;
    }

    this.granade.depth = hand_gun.depth
  
  for(var g = 0;g<alien1Group.length;g = g+1)
    {
      if(alien1Group[g].y>=500)
        {
          alien1Group[g].velocityY = 0;
          if(alien1Group[g].scale<=0.3)
          {
          alien1Group[g].scale = alien1Group[g].scale+0.001;
          }
        }
        if(g>0)
        {
         alien1Group[g].depth = alien1Group[g-1].depth-1;
        }

        if(Life===0)
        {
          textFont("Algerian")
          textSize(30)
          text("let's start the mission again",50,400)
          alien1Group[g].scale = 0.4
          alien1Group[g].pause();
          bj.scale = 0.2
        }

        if(totalAliens === 0)
        {
          textFont("Algerian")
          textSize(40)
          text("You Won!"+won,width/2,height/2)
        }
      
          if((keyDown("space"))&& aim.isTouching(alien1Group[g]))
            {
              alien1Group[g].destroy();
              alien_dyingSound.play();
              totalAliens = totalAliens-1
            }
    }
  
  if(hand_gun.isTouching(alien1Group))
    {
      alien1Group.depth=hand_gun.depth
      hand_gun.depth = hand_gun.depth+5
      alien1Group.scale = 0.3;
    }
  
  if(aim.isTouching(alien1Group))
    {
      alien1Group.depth=aim.depth
      aim.depth = aim.depth+5
      alien1Group.scale = 0.03;
    }
  
  for(var k = 0;k < alien1Group.length;k=k+1)
    {
      if(aim.isTouching(alien1Group[k]))
        {
          Life = Life-2;
        }
    }
  
  if(Life <=0)
    {
      Life = 0;
      UFOGroup.destroyEach()
      alien1Group.scale = alien1Group.scale+1
      alien1Group.scale = alien1Group.scale-3
      hand_gun.velocityY = 5
      aim.velocityY = 5;
      footstep.stop();
      UFosiren.stop();
      bgmusic.stop();  
    }

    for(var i = 0;i<UFOGroup.length;i=i+1)
     {
       if((keyDown("space"))&& aim.isTouching(UFOGroup[i]))
        { 
           burst.play();                                                   
           UFOGroup[i].scale = 0.4;
           console.log("n");
        }
     }
  
  if(keyDown("down"))
   {
     hand_gun.y = hand_gun.y+3;
     aim.y = aim.y+3;
   }
  
  if(keyDown("up")&&hand_gun.y>450 && aim.y>435)
    {
      hand_gun.y = hand_gun.y-3;
      aim.y = aim.y-3;
    }
  
  if(frameCount%250===0)
    {
     UFosiren=loadSound("AlienSiren.mp3",lee)
     UFO.scale = 0.04
     UFO.velocityY = 3;
     UFO.visible = true;
     UFO.x = Math.round(random(500,950))
     UFO.addAnimation("UFO_coming",UFOImg);
     UFOGroup.add(UFO);
    }
  
  if(UFOGroup.isTouching(hand_gun))
   {
     UFOGroup.depth = hand_gun.depth;
     hand_gun.depth = hand_gun.depth+5;
     UFOGroup.depth = UFOGroup.depth-5;
   }
  
  if(UFOGroup.isTouching(aim))
   {
     UFOGroup.depth = aim.depth;
     aim.depth = aim.depth+5;
   }
  
  if(keyDown("left"))
   {
     hand_gun.x = hand_gun.x-6;
     aim.x = aim.x-6;
     
     if(frameCount%20===0)
      { 
        footstep.play();
      }
   }
  
  if(keyDown("space"))
   {
     if(frameCount%2 == 0)
      { 
        shooting_sound.play();
      }
   }
  
  if(keyWentDown("space"))
    {
      hand_gun.addAnimation("shooting",shooting_effect)
      hand_gun.changeAnimation("shooting");
    }
  if(keyWentUp("space"))
    {
      hand_gun.addAnimation("handgun",hand_gunImg);
      hand_gun.changeAnimation("handgun")
    }


  drawSprites();
  
  textSize(30);
  fill("red");
  textFont("Freestyle Script")
  text("LEVEL : 1",width/3,50);
  textFont("Arial Black");
  text("LIFE : "+Life,50,50)
  textFont("Algerian")
  text("Dangerous Aliens: "+totalAliens,550,50)
  }
}

function loaded()
{
  bgmusic.loop()
}

function load()
{
  startmusic.loop()
}

function functio()
{
  startmusic.setVolume(300);
}

function lee()
{
  UFosiren.play();
}

function togglePlaying()
{
  if(!bgmusic.isPlaying())
  {
    bgmusic.loop()
    Playmusic.html("MUTE")
  }
  else
  {
    bgmusic.pause();
    Playmusic.html("UNMUTE")
  }
}
