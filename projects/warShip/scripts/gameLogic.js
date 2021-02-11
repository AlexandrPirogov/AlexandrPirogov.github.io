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
  if(myTurn){
    $(this).css('background-color', 'yellow')
    myTurn = false;
    gameProcessing();
  }
})

function gameProcessing() {
    if(myTurn == false){
      setTimeout(bot.shoot(), 1000);
    }
  
}