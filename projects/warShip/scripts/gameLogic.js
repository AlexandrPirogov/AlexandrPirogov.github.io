let myTurn = new Boolean(false);

let gameIsOver = new Boolean(false);

function startGame() {
    bot = new make_bot([[]]);
    bot.alert();
    var i = 0;
    
    /*
    while(i  < 64){
        (function(i) {
            setTimeout(function() {
              bot.shoot();
            }, 100 * i)
          })(i++)
    }*/
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
  console.log(shipsArray);
  for(var i = 0; i < shipsArray.length; i++){
    console.log(shipsArray[i].isDead);
      if(shipsArray[i].isDead == false){
        return false;
      }
  }
  return true;
}