let myTurn = new Boolean(false);

let gameIsOver = new Boolean(false);
let bot;
function startGame() {
    bot = new make_bot([[]]);
    bot.alert();
    var i = 0;
    bot.createArrayCoordinates();
    console.log(bot.botShipsCountType)
    
}

function random() {
  for(var i = 0; i <= 10; i++){
    bot.takeRandomCoordinates()
  }
  
}





$(document).on('click', '.enemyField tr td', function () {
    $(this).css('background-color', 'yellow')
    gameProcessing();
  
})

function gameProcessing() {
      if(!checkPlayersShipForAlive()){
      bot.shoot();
      } else {
        alert('you lost dude');
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