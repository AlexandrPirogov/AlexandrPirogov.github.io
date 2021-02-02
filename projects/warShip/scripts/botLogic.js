make_bot = function(coordArray){
    this.hittedCells = [];
    this.coordArray = coordArray;
    this.isRow = false;
    this.alert = () => {
        console.log('bot is working');
        for(var i = 0 ; i < 64; i++){
            this.hittedCells[i] = i;
        }
        
    }

    this.shoot = function () {
        var i = Math.floor(Math.random() * (this.hittedCells.length));
        var y = Math.floor(this.hittedCells[i]/8);
        var x = y*8-this.hittedCells[i];
        this.hittedCells.splice(i, 1);
        //console.log(x);
       
        if($('.tableField tr:eq(' + x+ ') td:eq(' + y +')').attr('class') == 'row cellWithShip') {
            $('.tableField tr:eq(' + x+ ') td:eq(' +y +')').css('background-color', 'green');
            this.searchToKill(x,y);
        } else {
            $('.tableField tr:eq(' + x + ') td:eq(' + y +')').css('background-color', 'red');
        }
        
    };

    this.searchToKill = function(x, y) {
        var chooseRow = Math.floor(Math.random() * 1);
        chooseRow == 0 ? this.checkRow() : this.checkColumn();

    }
    
    this.checkRow = function(x, y) {
        var pos = Math.floor(Math.random() * 1);  
        
    }

    this.searchLeft = function() {

    }
    this.searchRight = function() {

    }

    this.checkColumn = function() {
        var pos = Math.floor(Math.random() * 1);   
    }

    this.searchTop = function() {

    }

    this.searchBot = function() {

    }
}




