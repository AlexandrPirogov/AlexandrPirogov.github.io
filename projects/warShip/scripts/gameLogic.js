let myTurn = false;

let gameIsOver = new Boolean(false);
let bot;

function startGame() {
      bot = new make_bot([[]]);
      bot.alert();
      bot.createArrayCoordinates();
      random();
}

function random() {
    for(var i = 0; i <= 10; i++){
        bot.takeRandomCoordinates()
    }
}



$(document).on('click', '.enemyField tr td', function () {
  if($(this).attr('class') != 'row playerHit' && $(this).attr('class') != 'row randomHit playerHit' &&
  $(this).attr('class') != 'row playerHit spliceArr' && $(this).attr('class') != 'row spliceArr'){
    if(myTurn == true){
      $(this).addClass('playerHit');
      var x = $(this).index();
      var y = $(this).parent().index();
      if(checkHit(x, y) == true){
        $(this).removeClass('playerHit');
        $(this).addClass('playerHitShip');
        myTurn = true;
      } else {
        myTurn = false;
        gameProcessing();
      }
    }
  }
   
})

function checkHit(x, y){
  for(var i = 0; i < bot.botShips.length; i++){
    for(var j = 0; j < bot.botShips[i].coordArr.length; j++){
      for(var k = 0; k < bot.botShips[i].coordArr[j].length; k+=2){
        if(bot.botShips[i].coordArr[j][k] == x && bot.botShips[i].coordArr[j][k+1] == y){
          console.log('hitted enemy');
          var ship = bot.botShips[i];
          checkShipKill(ship);
          return true;
        }
      }
    }
  }
  return false;
}

function checkShipKill(ship){
  if(ship.checkEnemyAlive() == true){
    spliceArroundEnemy(ship);
    console.log('killed');
  }
  if(checkAllShips())
    alert('you won :)');
}

function checkAllShips(){
  for(var i = 0; i < bot.botShips.length; i++){
    if(bot.botShips[i].isDead != true){
      return false;
    }
  }
  return true;
}

function gameProcessing() {
  if(myTurn == false){
    if(!checkPlayersShipForAlive()){
      bot.shoot();
      } else {
        console.log('you lost :(');
      }
  }
}

function checkPlayersShipForAlive(){
  for(var i = 0; i < shipsArray.length; i++){
      if(shipsArray[i].isDead == false){
        return false;
      }
  }
  return true;
}



spliceArroundEnemy = function(ship){
  if(ship.isRow == true){
      spliceIsRowEnemy(ship);
  } else {
      spliceIsColumnEnemy(ship);
  }
}

spliceIsColumnEnemy = function(ship){
  var x = ship.coordArr[0][0]+1;
  var y = ship.coordArr[0][1]+1;   
//  console.log('row ' + ship.coordArr[1][0] + ' ' + ship.coordArr[1][1]);
  printMissEnemy(x-2,y-1);
  printMissEnemy(x-2,y);
  printMissEnemy(x-2,y-2);
  for(var i = 0; i < ship.length; i++){
      printMissEnemy(x-1, y);
      printMissEnemy(x-1, y-2);
      x++;
  }
  printMissEnemy(x-1 ,y-1);
  printMissEnemy(x-1 ,y);
  printMissEnemy(x-1 ,y-2);
}

spliceIsRowEnemy = function(ship){
  console.log(ship);
  var x = ship.coordArr[0][0]+1;
  var y = ship.coordArr[0][1]+1; 
  console.log(ship.coordArr);
  printMissEnemy(x, y-2);  
  printMissEnemy(x-1, y-2);
  printMissEnemy(x-2, y-2);
  for(var i = 0; i < ship.length; i++){
      printMissEnemy(x-2, y-1);
      printMissEnemy(x, y-1);
      y++;
  }
  printMissEnemy(x , y-1);
  printMissEnemy(x-1 , y-1);
  printMissEnemy(x-2 , y-1);
}

printMissEnemy = function (x, y) {
  if(x >= 0 && x <= 9 && y >= 0 && y <= 9)
     $('.enemyField tr:eq(' + y + ') td:eq(' + x +')').addClass('spliceArr');
}