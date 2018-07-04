var clock;
var dice;
var board;
var desk;
var count;
var id;
var marker1;
var marker2;
var textures=[0,0,0,0,0,0,0];
var diceNumber=3;
var playerChance=1;
var playerIndex1;
var playerIndex2;
var factor;
var button1;
var button2;
var greenLight;
var blueLight;
var indicator1;
var indicator2;
var quitFlag=0;
var flip=0;
var flickPlane;
var coordsX=[0,
  -7.2,-5.6,-4.0,-2.4,-0.8,0.8,2.4,4.0,5.6,7.2,
  7.2,5.6,4.0,2.4,0.8,-0.8,-2.4,-4.0,-5.6,-7.2,
  -7.2,-5.7,-4.0,-2.4,-0.7,0.8,2.5,4.0,5.6,7.2,
  7.1,5.6,4.1,2.5,0.9,-0.7,-2.3,-4.0,-5.6,-7.2,
  -7.0,-5.5,-3.9,-2.4,-0.8,0.8,2.4,4.0,5.5,6.9,
  6.9,5.5,4.0,2.4,0.8,-0.8,-2.4,-3.9,-5.4,-7.0,
  -6.6,-5.1,-3.7,-2.2,-0.8,0.7,2.2,3.7,5.1,6.5,
  6.1,4.8,3.4,2.0,0.6,-0.7,-2.1,-3.5,-4.9,-6.2,
  -5.9,-4.6,-3.3,-2.0,-0.7,0.6,1.9,3.2,4.5,5.8,
  5.5,4.3,3.1,1.8,0.5,-0.7,-1.9,-3.1,-4.4,-5.6
  ];
var coordsY=[0,-1.7,-1.3,-1.0,-0.6,0.2,0.7,1.7,2.6,3.4,4.1];
var coordsZ=[0,7.2,5.5,4.1,2.5,1.7,0.1,0.1,0.1,0.1,0.1];
var map=[];


//Initialising the scene
function initialiseScene()
  {
    clock=new THREE.Clock();
    PIEscene.add(new THREE.AmbientLight(0x606060));
    PIEscene.background=new THREE.Color( 0xbfd1e5 );
    //PIEcamera.position.set(-0.05527074424515538, 2.9731239686405893, 6.0079166151350645);
   //PIEcamera.rotation.set(-0.459533369319057, -0.008245089377707907, -0.0040801596752513564);
    addBoard();
    addDesk();
    addDice();
    addMarker();
    addButton1();
    addButton2();
    window.addEventListener("resize",function(){
      //alert("hello");
      PIEcamera.position.set(-0.05527074424515538, 2.9731239686405893, 6.0079166151350645);
      PIEcamera.rotation.set(-0.459533369319057, -0.008245089377707907, -0.0040801596752513564);
      PIErender();
    });
    // var axesHelper = new THREE.AxesHelper( 5 );
    // PIEscene.add( axesHelper );
    // var gridHelper = new THREE.GridHelper( 10, 10 );
    // //PIEscene.add( gridHelper );
    greenLight = new THREE.PointLight( "green",5,0);
    greenLight.position.set(-3.2,1,-3.2);
    PIEaddElement(greenLight);
    // var pointLightHelper = new THREE.PointLightHelper( greenLight, 0.1 );
    // PIEscene.add( pointLightHelper );

    blueLight = new THREE.PointLight( "blue",5,0);
    blueLight.position.set(-2.7,0.9,-3.2);
    //PIEaddElement(blueLight);
    // var pointLightHelper = new THREE.PointLightHelper( blueLight, 0.1 );
    // PIEscene.add( pointLightHelper );
    addIndicator1();
    addIndicator2();
    PIEremoveElement(indicator2);
    loadTexture();
    PIEstartButton.onclick=function(){PIEstopAnimation();};
    PIErender();
}

function loadExperimentElements()
{
    PIEsetExperimentTitle("Snake And Ladder");
    PIEsetDeveloperName("Rahul Raj");
    PIEsetAreaOfInterest(-5.5,5.5 ,5.5 , -5.5);
    document.title = "Snake And Ladder";
    //PIEhideControlElement();
    //removeUnwantedElements();
    initialiseVariables();
    initialiseHelp();
    initialiseInfo();
    initialiseScene();
    window.addEventListener('resize',function(){
      document.getElementById("reset").click();
      //console.log("hi");
    });
    PIEsetClick(button1,playerButton1);
    PIEsetClick(button2,playerButton2);
    PIErender();
    initialiseControls();
    resetExperiment();
}

function playerButton1()
{
  if(playerChance==1)
  {
    PIEresetClick(button1,playerButton1);
    roll();
    PIEremoveElement(indicator1);
    PIEremoveElement(greenLight);
    //PIEaddElement(indicator2);
    //PIEaddElement(blueLight);
  }
}

function playerButton2()
{
  if(playerChance==2)
  {
    PIEresetClick(button2,playerButton2);
    roll();
    PIEremoveElement(indicator2);
    PIEremoveElement(blueLight);
    //PIEaddElement(indicator1);
    //PIEaddElement(greenLight);
  }
}
//Adding Dice
function addDice()
{
  var geometry;
  var materials = [
    new THREE.MeshBasicMaterial( { map: textures[1] } ),
    new THREE.MeshBasicMaterial( { map: textures[2] } ),
    new THREE.MeshBasicMaterial( { map: textures[3] } ),
    new THREE.MeshBasicMaterial( { map: textures[4] } ),
    new THREE.MeshBasicMaterial( { map: textures[5] } ),
    new THREE.MeshBasicMaterial( { map: textures[6] } )
  ];
  var faceMaterial = new THREE.MeshFaceMaterial( materials );
  geometry = new THREE.BoxGeometry( 0.22,0.22,0.22 );
  dice = new THREE.Mesh( geometry, faceMaterial );
  dice.position.z=1;
  dice.rotation.y=30*Math.PI/180;
  dice.position.x=2.25;
  dice.rotation.x=10*Math.PI/180;
  PIEaddElement(dice);
}

function addDesk()
{
  var tex = THREE.ImageUtils.loadTexture( 'texture/desk.jpg' );
  var material=new THREE.MeshPhongMaterial({map:tex});
  var geometry=new THREE.PlaneGeometry(5.8, 5.6, 1, 1);
  desk=new THREE.Mesh(geometry, material);
  desk.position.z=-0.2;
  desk.rotation.x=-75*Math.PI/180;
  PIEaddElement(desk);
}

function addButton1()
{
  var tex = THREE.ImageUtils.loadTexture( 'texture/Number_1.png' );
  var material=new THREE.MeshBasicMaterial(
    {
      shading: THREE.SmoothShading,
      map:tex,
      side: THREE.FrontSide,
      transparent: true,
      opacity:0.8
    }
  );
  var geometry=new THREE.PlaneGeometry(0.3,0.2);
  button1=new THREE.Mesh(geometry, material);
  button1.rotation.x=0*Math.PI/180;
  button1.position.x=-8.6*factor;
  button1.position.y=5.1*factor;
  PIEaddElement(button1);
}

function addButton2()
{
  tex = THREE.ImageUtils.loadTexture( 'texture/Number_2.png' );
  var material=new THREE.MeshBasicMaterial(
    {
      shading: THREE.SmoothShading,
      map:tex,
      side: THREE.FrontSide,
      transparent: true,
      opacity:0.8
    }
  );
  var geometry=new THREE.PlaneGeometry(0.3,0.2);
  button2=new THREE.Mesh(geometry, material);
  button2.rotation.x=0*Math.PI/180;
  button2.position.x=-6.6*factor;
  button2.position.y=5.1*factor;
  PIEaddElement(button2);
}

function addIndicator1()
{
    tex = THREE.ImageUtils.loadTexture( 'texture/direct.jpeg' );
    var material=new THREE.MeshBasicMaterial(
      {
        shading: THREE.SmoothShading,
        map:tex,
        side: THREE.FrontSide,
        transparent: true,
        opacity:0.8
      }
    );
    var geometry=new THREE.PlaneGeometry(0.15,0.15);
    indicator1=new THREE.Mesh(geometry, material);
    indicator1.rotation.x=0*Math.PI/180;
    indicator1.position.x=-9.6*factor;
    indicator1.position.y=5.1*factor;
    PIEaddElement(indicator1);
}

function addIndicator2()
{
    tex = THREE.ImageUtils.loadTexture( 'texture/direct.jpeg' );
    var material=new THREE.MeshBasicMaterial(
      {
        shading: THREE.SmoothShading,
        map:tex,
        side: THREE.FrontSide,
        transparent: true,
        opacity:0.8
      }
    );
    var geometry=new THREE.PlaneGeometry(0.15,0.15);
    indicator2=new THREE.Mesh(geometry, material);
    indicator2.rotation.x=0*Math.PI/180;
    indicator2.position.x=-7.6*factor;
    indicator2.position.y=5.1*factor;
    PIEaddElement(indicator2);
}

//Adding Board
function addBoard()
{

  var tex = THREE.ImageUtils.loadTexture( 'texture/board.jpg' );
  var material=new THREE.MeshPhongMaterial({map:tex});
  var geometry=new THREE.PlaneGeometry(4.2, 4.2, 1, 1);
  board=new THREE.Mesh(geometry, material);
  board.rotation.x=-75*Math.PI/180;
  PIEaddElement(board);
}
//Adding Marker
function addMarker()
{
  var tex = THREE.ImageUtils.loadTexture( 'texture/Number_1.png' );
  var geometry = new THREE.CircleGeometry( 0.13,32 );
  var material = new THREE.MeshBasicMaterial( {
    shading: THREE.SmoothShading,
    map:tex,
    side: THREE.FrontSide,
    transparent: true,
    opacity: 0.8 });
  marker1 = new THREE.Mesh( geometry, material );
  marker1.position.z=7.2*factor;
  marker1.position.x=-8.6*factor;
  marker1.position.y=-1.5*factor;
  marker1.rotation.x=-75*Math.PI/180;
  PIEaddElement( marker1 );
  tex = THREE.ImageUtils.loadTexture( 'texture/Number_2.png' );
  material = new THREE.MeshBasicMaterial( {
    shading: THREE.SmoothShading,
    map:tex,
    side: THREE.FrontSide,
    transparent: true,
    opacity: 0.75 });
  marker2 = new THREE.Mesh( geometry, material );
  marker2.position.z=5.5*factor;
  marker2.position.x=-8.66*factor;
  marker2.position.y=-1.5*factor;
  marker2.rotation.x=-75*Math.PI/180;
  PIEaddElement( marker2 );
  PIErender();
}

//This allows to load the texture of board and dice
function loadTexture()
{
  id=requestAnimationFrame(loadTexture);
  if(count>=15)
  {
    count=0;
    cancelAnimationFrame(id);
  }
  count++;
  PIErender();
}
// Function to roll the dice
function roll()
{
  if(count>=30)
  {
    PIEscene.remove(dice);
    var randomDice = Math.floor(6*Math.random())+1;
    //console.log(randomDice);
    diceNumber=randomDice;
    play();
    switch(randomDice)
    {
      case 1:
      {
        var materials = [
          new THREE.MeshBasicMaterial( { map: textures[1] } ),
          new THREE.MeshBasicMaterial( { map: textures[3] } ),
          new THREE.MeshBasicMaterial( { map: textures[2] } ),
          new THREE.MeshBasicMaterial( { map: textures[4] } ),
          new THREE.MeshBasicMaterial( { map: textures[5] } ),
          new THREE.MeshBasicMaterial( { map: textures[6] } )
        ];
        break;
      }
      case 2:
      {
        var materials = [
          new THREE.MeshBasicMaterial( { map: textures[5] } ),
          new THREE.MeshBasicMaterial( { map: textures[4] } ),
          new THREE.MeshBasicMaterial( { map: textures[1] } ),
          new THREE.MeshBasicMaterial( { map: textures[3] } ),
          new THREE.MeshBasicMaterial( { map: textures[6] } ),
          new THREE.MeshBasicMaterial( { map: textures[2] } )
        ];
        break;
      }
      case 3:
      {
        var materials = [
          new THREE.MeshBasicMaterial( { map: textures[1] } ),
          new THREE.MeshBasicMaterial( { map: textures[2] } ),
          new THREE.MeshBasicMaterial( { map: textures[3] } ),
          new THREE.MeshBasicMaterial( { map: textures[4] } ),
          new THREE.MeshBasicMaterial( { map: textures[5] } ),
          new THREE.MeshBasicMaterial( { map: textures[6] } )
         ];
        break;
      }
      case 4:
      {
        var materials = [
          new THREE.MeshBasicMaterial( { map: textures[5] } ),
          new THREE.MeshBasicMaterial( { map: textures[6] } ),
          new THREE.MeshBasicMaterial( { map: textures[4] } ),
          new THREE.MeshBasicMaterial( { map: textures[2] } ),
          new THREE.MeshBasicMaterial( { map: textures[1] } ),
          new THREE.MeshBasicMaterial( { map: textures[6] } )
        ];
        break;
      }
      case 5:
      {
        var materials = [
          new THREE.MeshBasicMaterial( { map: textures[1] } ),
          new THREE.MeshBasicMaterial( { map: textures[2] } ),
          new THREE.MeshBasicMaterial( { map: textures[5] } ),
          new THREE.MeshBasicMaterial( { map: textures[4] } ),
          new THREE.MeshBasicMaterial( { map: textures[3] } ),
          new THREE.MeshBasicMaterial( { map: textures[6] } )
        ];
        break;
      }
      case 6:
      {
        var materials = [
          new THREE.MeshBasicMaterial( { map: textures[2] } ),
          new THREE.MeshBasicMaterial( { map: textures[4] } ),
          new THREE.MeshBasicMaterial( { map: textures[6] } ),
          new THREE.MeshBasicMaterial( { map: textures[3] } ),
          new THREE.MeshBasicMaterial( { map: textures[1] } ),
          new THREE.MeshBasicMaterial( { map: textures[5] } )
        ];
         break;
       }
    }
    var faceMaterial = new THREE.MeshFaceMaterial(materials);
    var geometry = new THREE.BoxGeometry( 0.22,0.22,0.22 );
    dice = new THREE.Mesh( geometry, faceMaterial );
    PIEaddElement(dice);
    count=0;
    dice.position.z=1;
    dice.rotation.y=30*Math.PI/180;
    dice.position.x=2.25;
    dice.rotation.x=10*Math.PI/180;
    PIEchangeInputText("Dice Value",diceNumber);
  }
  else
  {
    requestAnimationFrame(roll);
    count++;
    dice.rotation.y+= 0.8;
    dice.rotation.x+= 1;
  }
	PIErender();
}

function flick1()
{
  if(flip>=12)
  {
    //PIEremoveElement(marker1);
    //console.log("hi1");
    marker1.rotation.set(-75*Math.PI/180,0,0);
    flip=0;
  }
  else
  {
    requestAnimationFrame(flick1);
    flip++;
    marker1.rotation.y+= 0.1;
    marker1.rotation.z+= 0.1;
  }
	PIErender();
}

function flick2()
{
  if(flip>=12)
  {
    //console.log("hi2");
    marker2.rotation.set(-75*Math.PI/180,0,0);
    //PIEremoveElement(marker2);
    flip=0;
  }
  else
  {
    requestAnimationFrame(flick2);
    flip++;
    marker2.rotation.y+= 0.1;
    marker2.rotation.z+= 0.1;
  }
	PIErender();
}

// Play the game
function play()
{
  inputs = document.getElementsByTagName('input');
  inputs[0].disabled=true;
  inputs[1].disabled=true;
  inputs[2].disabled=true;
  inputs[3].disabled=true;
  elem = document.getElementsByClassName("close-button");
  elem[0].innerHTML="ScoreBoard";
  elem = document.getElementsByClassName("close-button");
  elem[1].innerHTML="ScoreBoard";
  if(playerChance==1)
  {
    playerIndex1+=diceNumber;
    if(playerIndex1<=100)
    {
      setTimeout(movePlayer(playerIndex1-diceNumber,playerIndex1,diceNumber,playerChance),1550);
      setTimeout(function(){
        if(map[playerIndex1]!=0) playerIndex1=map[playerIndex1];
        marker1.position.set(coordsX[playerIndex1]*factor,coordsY[Math.ceil(playerIndex1/10)]*factor,coordsZ[Math.ceil(playerIndex1/10)]*factor);
        PIErender();
        //greenLightMarker.position.set(marker1.position.x,marker1.position.y,marker1.position.z);
        PIEchangeInputText("Player 1:",playerIndex1);
        if(playerIndex1==100)
        {
          win(1);
        }
      },1800);
    }
    else
    {
      playerIndex1-=diceNumber;
    }
  }
  else
  {
      playerIndex2+=diceNumber;
      if(playerIndex2<=100)
      {
        setTimeout(movePlayer(playerIndex2-diceNumber,playerIndex2,diceNumber,playerChance),1550);
        setTimeout(function () {
          if(map[playerIndex2]!=0) playerIndex2=map[playerIndex2];
          marker2.position.set(coordsX[playerIndex2]*factor,coordsY[Math.ceil(playerIndex2/10)]*factor,coordsZ[Math.ceil(playerIndex2/10)]*factor);
          PIErender();
          PIEchangeInputText("Player 2:",playerIndex2);
          if(playerIndex2==100)
          {
            win(2);
          }
        },1800);
      }
      else
      {
        playerIndex2-=diceNumber;
      }
  }
  setTimeout(function(){
    playerChance=playerChance%2+1;
    if(quitFlag==0)
    {
      if(playerChance==1)
      {
        PIEsetClick(button1,playerButton1);
        PIEaddElement(indicator1);
        PIEaddElement(greenLight);
        // console.log("marker1",marker1.position.x,marker1.position.y);
        // console.log("flip:",flip);
        flick1();
        //console.log("flip:",flip);
        flip=0;
        //console.log("flip:",flip);
        //PIEaddElement(marker1);
        // marker1.rotation.x=-75*Math.PI/180;
        // marker1.rotation.y=0;
        // marker1.rotation.z=0;
        //console.log("marker1",marker1.position.x,marker1.position.y);
        //PIErender();
      }
      else
      {
        PIEsetClick(button2,playerButton2);
        PIEaddElement(indicator2);
        PIEaddElement(blueLight);
        //console.log("marker2",marker2.position.x,marker2.position.y);
        //console.log("flip:",flip);
        flick2();
        //console.log("flip:",flip);
        //PIEaddElement(marker2);
        //console.log("marker2",marker2.position.x,marker2.position.y);
        // marker2.rotation.x=-75*Math.PI/180;
        // marker2.rotation.y=0;
        // marker2.rotation.z=0;
        flip=0;
        //console.log("flip:",flip);
        //PIErender();
      }
      PIErender();
      PIEchangeInputText("Turn : Player: ",playerChance);
    }
    else
    {
      var li=document.getElementsByTagName("li");
      li[6].style.display='none';
    }
    //PIEchangeInputText("Dice Value",diceNumber);
  },2050);
}
//If the winner is decided and players want to play the game again
function playAgain(){
    //toDo reset variables
    initialiseVariables();
    playerChance++;
    marker1.position.set(-8.6*factor,-1.5*factor,7.2*factor);
    marker2.position.set(-8.66*factor,-1.5*factor,5.5*factor);
    loadTexture();
    PIEchangeInputText("Turn : Player: ",playerChance);
    PIEchangeInputText("Player 2:",playerIndex2);
    PIEchangeInputText("Player 1:",playerIndex1);
}
//When someone is the winner
function win(winner){
    if (confirm("Player :"+winner+" wins!\n"+"Want to play again?")) {
      playAgain();

    } else {
        quitFlag=1;
        PIEresetClick(button1,playerButton1);
        PIEresetClick(button2,playerButton2);
    }
}

function movePlayer(i,f,dNum,chance)
{
  if(chance==1)
  {
    switch(dNum)
    {
      case 1:
      {
        setTimeout(function(){
          marker1.position.set(coordsX[i+1]*factor,coordsY[Math.ceil((i+1)/10)]*factor,coordsZ[Math.ceil((i+1)/10)]*factor);
          PIErender();
        },250);

        break;
      }
      case 2:
      {
        setTimeout(function(){
          marker1.position.set(coordsX[i+1]*factor,coordsY[Math.ceil((i+1)/10)]*factor,coordsZ[Math.ceil((i+1)/10)]*factor);
          PIErender();
        },250);
        setTimeout(function(){
          marker1.position.set(coordsX[i+2]*factor,coordsY[Math.ceil((i+2)/10)]*factor,coordsZ[Math.ceil((i+2)/10)]*factor);
          PIErender();
        },500);
        break;
      }
      case 3:
      {
        setTimeout(function(){
          marker1.position.set(coordsX[i+1]*factor,coordsY[Math.ceil((i+1)/10)]*factor,coordsZ[Math.ceil((i+1)/10)]*factor);
          PIErender();
        },250);
        setTimeout(function(){
          marker1.position.set(coordsX[i+2]*factor,coordsY[Math.ceil((i+2)/10)]*factor,coordsZ[Math.ceil((i+2)/10)]*factor);
          PIErender();
        },500);
        setTimeout(function(){
          marker1.position.set(coordsX[i+3]*factor,coordsY[Math.ceil((i+3)/10)]*factor,coordsZ[Math.ceil((i+3)/10)]*factor);
          PIErender();
        },750);
        break;
      }
      case 4:
      {
        setTimeout(function(){
          marker1.position.set(coordsX[i+1]*factor,coordsY[Math.ceil((i+1)/10)]*factor,coordsZ[Math.ceil((i+1)/10)]*factor);
          PIErender();
        },250);
        setTimeout(function(){
          marker1.position.set(coordsX[i+2]*factor,coordsY[Math.ceil((i+2)/10)]*factor,coordsZ[Math.ceil((i+2)/10)]*factor);
          PIErender();
        },500);
        setTimeout(function(){
          marker1.position.set(coordsX[i+3]*factor,coordsY[Math.ceil((i+3)/10)]*factor,coordsZ[Math.ceil((i+3)/10)]*factor);
          PIErender();
        },750);
        setTimeout(function(){
          marker1.position.set(coordsX[i+4]*factor,coordsY[Math.ceil((i+4)/10)]*factor,coordsZ[Math.ceil((i+4)/10)]*factor);
          PIErender();
        },1000);
        break;
      }
      case 5:
      {
        setTimeout(function(){
          marker1.position.set(coordsX[i+1]*factor,coordsY[Math.ceil((i+1)/10)]*factor,coordsZ[Math.ceil((i+1)/10)]*factor);
          PIErender();
        },250);
        setTimeout(function(){
          marker1.position.set(coordsX[i+2]*factor,coordsY[Math.ceil((i+2)/10)]*factor,coordsZ[Math.ceil((i+2)/10)]*factor);
          PIErender();
        },500);
        setTimeout(function(){
          marker1.position.set(coordsX[i+3]*factor,coordsY[Math.ceil((i+3)/10)]*factor,coordsZ[Math.ceil((i+3)/10)]*factor);
          PIErender();
        },750);
        setTimeout(function(){
          marker1.position.set(coordsX[i+4]*factor,coordsY[Math.ceil((i+4)/10)]*factor,coordsZ[Math.ceil((i+4)/10)]*factor);
          PIErender();
        },1000);
        setTimeout(function(){
          marker1.position.set(coordsX[i+5]*factor,coordsY[Math.ceil((i+5)/10)]*factor,coordsZ[Math.ceil((i+5)/10)]*factor);
          PIErender();
        },1250);
        break;
      }
      case 6:
      {
        setTimeout(function(){
          marker1.position.set(coordsX[i+1]*factor,coordsY[Math.ceil((i+1)/10)]*factor,coordsZ[Math.ceil((i+1)/10)]*factor);
          PIErender();
        },250);
        setTimeout(function(){
          marker1.position.set(coordsX[i+2]*factor,coordsY[Math.ceil((i+2)/10)]*factor,coordsZ[Math.ceil((i+2)/10)]*factor);
          PIErender();
        },500);
        setTimeout(function(){
          marker1.position.set(coordsX[i+3]*factor,coordsY[Math.ceil((i+3)/10)]*factor,coordsZ[Math.ceil((i+3)/10)]*factor);
          PIErender();
        },750);
        setTimeout(function(){
          marker1.position.set(coordsX[i+4]*factor,coordsY[Math.ceil((i+4)/10)]*factor,coordsZ[Math.ceil((i+4)/10)]*factor);
          PIErender();
        },1000);
        setTimeout(function(){
          marker1.position.set(coordsX[i+5]*factor,coordsY[Math.ceil((i+5)/10)]*factor,coordsZ[Math.ceil((i+5)/10)]*factor);
          PIErender();
        },1250);
        setTimeout(function(){
          marker1.position.set(coordsX[i+6]*factor,coordsY[Math.ceil((i+6)/10)]*factor,coordsZ[Math.ceil((i+6)/10)]*factor);
          PIErender();
        },1500);
        break;
      }
    }
  }
  else
  {
    switch(dNum)
    {

        case 1:
        {
          setTimeout(function(){
            marker2.position.set(coordsX[i+1]*factor,coordsY[Math.ceil((i+1)/10)]*factor,coordsZ[Math.ceil((i+1)/10)]*factor);
            PIErender();
          },250);

          break;
        }
        case 2:
        {
          setTimeout(function(){
            marker2.position.set(coordsX[i+1]*factor,coordsY[Math.ceil((i+1)/10)]*factor,coordsZ[Math.ceil((i+1)/10)]*factor);
            PIErender();
          },250);
          setTimeout(function(){
            marker2.position.set(coordsX[i+2]*factor,coordsY[Math.ceil((i+2)/10)]*factor,coordsZ[Math.ceil((i+2)/10)]*factor);
            PIErender();
          },500);
          break;
        }
        case 3:
        {
          setTimeout(function(){
            marker2.position.set(coordsX[i+1]*factor,coordsY[Math.ceil((i+1)/10)]*factor,coordsZ[Math.ceil((i+1)/10)]*factor);
            PIErender();
          },250);
          setTimeout(function(){
            marker2.position.set(coordsX[i+2]*factor,coordsY[Math.ceil((i+2)/10)]*factor,coordsZ[Math.ceil((i+2)/10)]*factor);
            PIErender();
          },500);
          setTimeout(function(){
            marker2.position.set(coordsX[i+3]*factor,coordsY[Math.ceil((i+3)/10)]*factor,coordsZ[Math.ceil((i+3)/10)]*factor);
            PIErender();
          },750);
          break;
        }
        case 4:
        {
          setTimeout(function(){
            marker2.position.set(coordsX[i+1]*factor,coordsY[Math.ceil((i+1)/10)]*factor,coordsZ[Math.ceil((i+1)/10)]*factor);
            PIErender();
          },250);
          setTimeout(function(){
            marker2.position.set(coordsX[i+2]*factor,coordsY[Math.ceil((i+2)/10)]*factor,coordsZ[Math.ceil((i+2)/10)]*factor);
            PIErender();
          },500);
          setTimeout(function(){
            marker2.position.set(coordsX[i+3]*factor,coordsY[Math.ceil((i+3)/10)]*factor,coordsZ[Math.ceil((i+3)/10)]*factor);
            PIErender();
          },750);
          setTimeout(function(){
            marker2.position.set(coordsX[i+4]*factor,coordsY[Math.ceil((i+4)/10)]*factor,coordsZ[Math.ceil((i+4)/10)]*factor);
            PIErender();
          },1000);
          break;
        }
        case 5:
        {
          setTimeout(function(){
            marker2.position.set(coordsX[i+1]*factor,coordsY[Math.ceil((i+1)/10)]*factor,coordsZ[Math.ceil((i+1)/10)]*factor);
            PIErender();
          },250);
          setTimeout(function(){
            marker2.position.set(coordsX[i+2]*factor,coordsY[Math.ceil((i+2)/10)]*factor,coordsZ[Math.ceil((i+2)/10)]*factor);
            PIErender();
          },500);
          setTimeout(function(){
            marker2.position.set(coordsX[i+3]*factor,coordsY[Math.ceil((i+3)/10)]*factor,coordsZ[Math.ceil((i+3)/10)]*factor);
            PIErender();
          },750);
          setTimeout(function(){
            marker2.position.set(coordsX[i+4]*factor,coordsY[Math.ceil((i+4)/10)]*factor,coordsZ[Math.ceil((i+4)/10)]*factor);
            PIErender();
          },1000);
          setTimeout(function(){
            marker2.position.set(coordsX[i+5]*factor,coordsY[Math.ceil((i+5)/10)]*factor,coordsZ[Math.ceil((i+5)/10)]*factor);
            PIErender();
          },1250);
          break;
        }
        case 6:
        {
          setTimeout(function(){
            marker2.position.set(coordsX[i+1]*factor,coordsY[Math.ceil((i+1)/10)]*factor,coordsZ[Math.ceil((i+1)/10)]*factor);
            PIErender();
          },250);
          setTimeout(function(){
            marker2.position.set(coordsX[i+2]*factor,coordsY[Math.ceil((i+2)/10)]*factor,coordsZ[Math.ceil((i+2)/10)]*factor);
            PIErender();
          },500);
          setTimeout(function(){
            marker2.position.set(coordsX[i+3]*factor,coordsY[Math.ceil((i+3)/10)]*factor,coordsZ[Math.ceil((i+3)/10)]*factor);
            PIErender();
          },750);
          setTimeout(function(){
            marker2.position.set(coordsX[i+4]*factor,coordsY[Math.ceil((i+4)/10)]*factor,coordsZ[Math.ceil((i+4)/10)]*factor);
            PIErender();
          },1000);
          setTimeout(function(){
            marker2.position.set(coordsX[i+5]*factor,coordsY[Math.ceil((i+5)/10)]*factor,coordsZ[Math.ceil((i+5)/10)]*factor);
            PIErender();
          },1250);
          setTimeout(function(){
            marker2.position.set(coordsX[i+6]*factor,coordsY[Math.ceil((i+6)/10)]*factor,coordsZ[Math.ceil((i+6)/10)]*factor);
            PIErender();
          },1500);
          break;
      }
    }
  }
}

function updateExperimentElements(t, dt){

}
//It initialize the ScoreBoard
function initialiseControls(){
    PIEaddInputText("Player 1:",playerIndex1, function(){});
    PIEaddInputText("Player 2:",playerIndex2, function(){});
    PIEaddInputText("Turn : Player: ",playerChance, function(){});
    PIEaddInputText("Dice Value",3,function(){});

}
//Removing the Unwanted HTML Elements
function unwantedElements()
{
  elem = document.getElementById('start');
  elem.parentNode.removeChild(elem);
  elem = document.getElementById('reset');
  elem.parentNode.removeChild(elem);
  elem = document.getElementById('resume');
  elem.parentNode.removeChild(elem);
  elem = document.getElementById('<<');
  elem.parentNode.removeChild(elem);
  elem = document.getElementById('>>');
  elem.parentNode.removeChild(elem);
  elem = document.getElementById('pause');
  elem.parentNode.removeChild(elem);
  PIEspeedElem.innerHTML="";
  elem = document.getElementsByClassName("close-button");
  elem[0].innerHTML="ScoreBoard";
  elem = document.getElementsByClassName("close-button");
  elem[1].innerHTML="ScoreBoard";

  elem = document.getElementById('info');
  elem.style.marginLeft = "10px";
  elem = document.getElementById('close-button');
}
//Initialising the all variables used
function initialiseVariables()
{
  count=0;
  textures[2] = THREE.ImageUtils.loadTexture( 'texture/Dice_1.png' );
  textures[1] = THREE.ImageUtils.loadTexture( 'texture/Dice_2.png' );
  textures[3] = THREE.ImageUtils.loadTexture( 'texture/Dice_3.png' );
  textures[4] = THREE.ImageUtils.loadTexture( 'texture/Dice_4.png' );
  textures[5] = THREE.ImageUtils.loadTexture( 'texture/Dice_5.png' );
  textures[6] = THREE.ImageUtils.loadTexture( 'texture/Dice_6.png' );
  factor=Math.cos(75*Math.PI/180);
  //playerChance=1;
  playerIndex1=0;
  playerIndex2=0;
  //diceNumber=0;
  for(var i=0;i<=100;i++) map.push(0);
  map[2]=38;
  map[7]=14;
  map[8]=31;
  map[15]=26;
  map[16]=6;
  map[21]=42;
  map[28]=84;
  map[36]=44;
  map[46]=25;
  map[49]=11;
  map[51]=67;
  map[62]=19;
  map[64]=60;
  map[71]=91;
  map[74]=53;
  map[78]=98;
  map[87]=94;
  map[89]=68;
  map[92]=88;
  map[95]=75;
  map[99]=80;
}


function resetExperiment()
{
  PIEcamera.position.set(-0.05527074424515538, 2.9731239686405893, 6.0079166151350645);
  PIEcamera.rotation.set(-0.459533369319057, -0.008245089377707907, -0.0040801596752513564);
}
var helpContent;

//Help content
function initialiseHelp()
{
    helpContent="";
    helpContent = helpContent + "<h2>Snake And Ladder</h2>";
    helpContent = helpContent + "<h3>About the experiment</h3>";
    helpContent = helpContent + "<p>The experiment shows the Snake And Ladder Game.</p>";
    helpContent = helpContent + "<h3>The setup stage</h3>";
    helpContent = helpContent + "<p>The initial state is setup stage. In this stage, you can see a board,dice ,2 markers(in the left)and 2 Buttons.Click on the respective button to rotate the Dice for the turn of player.";
    helpContent = helpContent + "The rules of the game are given below.</p>";
    helpContent = helpContent + "<ul>";
    helpContent = helpContent + "<li>Each player gets one chance.";
    helpContent = helpContent + "<li>The chance is shown as arrow before the respective chance of player.";
    helpContent = helpContent + "<li>After the dice is rolled then other player gets the chance.";
    helpContent = helpContent + "<li>After the game is won by some player then the user can opt to play the game again but the player who won the last game will be given the first chance to play";
    helpContent = helpContent + "</ul>";
    helpContent = helpContent + "<p>There is a Scoreboard of both the players.It shows the current position of the players.</p>";
    helpContent = helpContent + "<h2>Happy Experimenting</h2>";
    PIEupdateHelp(helpContent);
}
//Initialise Info
var infoContent;
function initialiseInfo()
{
    infoContent =  "";
    infoContent = infoContent + "<h2>Snake And Ladder</h2>";
    infoContent = infoContent + "<h3>About the experiment</h3>";
    infoContent = infoContent + "<p>The experiment shows that when the dice is rolled,then the marker is moved.</p>";
    infoContent = infoContent + "<p>When there is a ladder then the marker is moved upwards through the ladder.</p>";
    infoContent = infoContent + "<p>When there is a snake then the marker is moved down as the snake bites it.</p>";
    infoContent = infoContent + "<h2>Happy Experimenting</h2>";
    PIEupdateInfo(infoContent);
}
