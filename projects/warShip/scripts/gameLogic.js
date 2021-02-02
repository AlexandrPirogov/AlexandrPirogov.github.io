let myTurn = new Boolean(false);

let gameIsOver = new Boolean(false);

function startGame() {
    bot = new make_bot([[]]);
    bot.alert();
    var i = 0;
    while(i  < 64){
        (function(i) {
            setTimeout(function() {
              bot.shoot();
              
            }, 100 * i)
          })(i++)
    }
}