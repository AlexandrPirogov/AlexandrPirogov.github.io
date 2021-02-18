
make_bot = function(coordArray){
    this.hittedCells = [];
    this.coordArray = coordArray;
    this.isLeft = new make_way('Left');
    this.isRight = new make_way('Right');
    this.isTop = new make_way('Top');
    this.isBottom = new make_way('Bottom');
    this.arr = [];
    this.isHit;
    this.alert = () => {
        console.log('bot is working');
        for(var i = 0 ; i < 100; i++){
            this.hittedCells[i] = i;
        }
        
    }

    this.firstHitX;
    this.firstHitY;
    this.shoot = function () {
        if(this.isHit == true){
            this.chooseWay();
        } else {
            this.arr = [this.isLeft, this.isRight, this.isTop, this.isBottom];
            var i = Math.floor(Math.random() * (this.hittedCells.length));
            var y = Math.floor(this.hittedCells[i]/10);;
            var x = this.hittedCells[i] - y*10;
            if($('.tableField tr:eq(' + y + ') td:eq(' + x +')').attr('class') == 'row cellWithShip') {
                myTurn = false;
                if(!searchShip(x,y)){
                    this.printHit(x,y);
                    this.isHit = true;
                    this.firstHitY = y;
                    this.firstHitX = x;
                } else{
                    this.printHit(x,y);
                    var ship = searchMyShip(x,y);
                    this.spliceArround(ship);
                }
                gameProcessing();
            } else {
                this.printMiss(x,y);
                myTurn = true;
                this.isHit = false;
            }
        }
    };

    
  
    this.lastShootX;
    this.lastShootY;

    this.way;

    this.leftCount;
    this.rightCount;
    this.topCount;
    this.bottomCount;

    this.chooseWay = function() {
        if(typeof this.lastShootX === "undefined"){
            this.lastShootY = this.firstHitY;
            this.lastShootX = this.firstHitX;
        }
        if(typeof this.way === "undefined"){
            this.way = Math.floor(Math.random() * this.arr.length);
        }
       
        switch(this.arr[this.way].getWay()){
            case 'Left':
                this.leftCount = 1;
                if(this.checkCellForMissed(this.lastShootX-1, this.lastShootY) == true || this.lastShootX-1 < 0){
                    this.arr.splice(this.arr.indexOf(this.arr[this.way]),1);
                    this.way = undefined;
                    this.lastShootX = this.firstHitX;
                    this.lastShootY = this.firstHitY;
                    gameProcessing();
                } else {
                    this.shootLeft(--this.lastShootX, this.lastShootY);
                }
            break;
            case 'Right':
                this.rightCount = 1;
                if(this.checkCellForMissed(this.lastShootX+1, this.lastShootY) == true || this.lastShootX+1 > 9){
                    this.arr.splice(this.arr.indexOf(this.arr[this.way]),1);
                    this.way = undefined;
                    this.lastShootX = this.firstHitX;
                    this.lastShootY = this.firstHitY;
                    gameProcessing();
                } else {
                    this.shootRight(++this.lastShootX, this.lastShootY);
                }
            break;
            case 'Top':
                this.topCount = 1;
                if(this.checkCellForMissed(this.lastShootX, this.lastShootY-1) == true || this.lastShootY-1 < 0){
                    this.arr.splice(this.arr.indexOf(this.arr[this.way]),1);
                    this.way = undefined;
                    this.lastShootX = this.firstHitX;
                    this.lastShootY = this.firstHitY;
                    gameProcessing();
                } else {
                    this.shootTop(this.lastShootX, --this.lastShootY);
                }
            break;
            case 'Bottom':
                this.bottomCount = 1;
                if(this.checkCellForMissed(this.lastShootX, this.lastShootY+1) == true || this.lastShootY+1 > 9){
                    this.arr.splice(this.arr.indexOf(this.arr[this.way]),1);
                    this.way = undefined;
                    this.lastShootX = this.firstHitX;
                    this.lastShootY = this.firstHitY;
                    gameProcessing();
                } else {
                    this.shootBottom(this.lastShootX, ++this.lastShootY);
                }
            break;
            default:
                break;
        }
        
    }

    this.checkCellForMissed = function (x ,y){
        if($('.tableField tr:eq(' + y + ') td:eq(' + x +')').attr('class') == 'row cellMissedClose') {
            return true;
        }
        return false;
    }
    
    this.shootLeft = function(x,y) {
        setTimeout(() => {
            if($('.tableField tr:eq(' + y + ') td:eq(' + x +')').attr('class') == 'row cellWithShip') {
                this.printHit(x,y);
                this.leftCount++;
                if(this.leftCount >= 2){
                    this.removeWays(this.isTop, this.isBottom);
                }
                if(searchShip(this.firstHitX, this.firstHitY)){
                    this.lastShootX = undefined;
                    this.lastShootY = undefined;
                    this.isHit = false;
                    this.way = undefined;
                    let ship = searchMyShip(this.firstHitX, this.firstHitY);
                    this.spliceArround(ship);
                } else {
                    this.lastShootX = x;
                    this.lastShootY = y;
                }
                myTurn = false;
                gameProcessing();
            } else {
                this.arr.splice(this.arr.indexOf(this.arr[this.way]),1);
                this.way = undefined;
                this.printMiss(x,y);
                this.lastShootX = this.firstHitX;
                this.lastShootY = this.firstHitY;
                myTurn = true;
            }
        }, 1000);
    }

    this.shootRight = function(x,y) {
        setTimeout(() => {
            if($('.tableField tr:eq(' + y + ') td:eq(' + x +')').attr('class') == 'row cellWithShip') {
                this.printHit(x,y);
                this.rightCount++;
                if(this.rightCount >= 2){
                    this.removeWays(this.isTop, this.isBottom);
                }
                if(searchShip(this.firstHitX, this.firstHitY)){
                    this.lastShootX = undefined;
                    this.lastShootY = undefined;
                    this.isHit = false;
                    this.way = undefined;
                    let ship = searchMyShip(this.firstHitX, this.firstHitY);
                    this.spliceArround(ship);
                } else {
                    this.lastShootX = x;
                    this.lastShootY = y;
                }
                myTurn = false;
                gameProcessing();
            } else {
                this.arr.splice(this.arr.indexOf(this.arr[this.way]),1);
                this.way = undefined;
                this.printMiss(x,y);
                this.lastShootX = this.firstHitX;
                this.lastShootY = this.firstHitY;
                myTurn = true;
            }
        }, 1000);
    }

    this.shootTop = function(x,y) {
        setTimeout(() => {
            if($('.tableField tr:eq(' + y + ') td:eq(' + x +')').attr('class') == 'row cellWithShip') {
                this.printHit(x,y);
                this.topCount++;
                if(this.topCount >= 2){
                    this.removeWays(this.isLeft, this.isRight);
                }
                if(searchShip(this.firstHitX, this.firstHitY)){
                    this.lastShootX = undefined;
                    this.lastShootY = undefined;
                    this.isHit = false;
                    this.way = undefined;
                    let ship = searchMyShip(this.firstHitX, this.firstHitY);
                    this.spliceArround(ship);
                } else {
                    this.lastShootX = x;
                    this.lastShootY = y;
                }
                myTurn = false;
                gameProcessing();
            } else {
                this.arr.splice(this.arr.indexOf(this.arr[this.way]),1);
                this.way = undefined;
                this.printMiss(x,y);
                this.lastShootX = this.firstHitX;
                this.lastShootY = this.firstHitY;
                myTurn = true;
            }
        }, 1000);
    }

    this.shootBottom = function(x,y) {
        setTimeout(() => {
            if($('.tableField tr:eq(' + y + ') td:eq(' + x +')').attr('class') == 'row cellWithShip') {
                this.printHit(x,y);
                this.botCount++;
                if(this.botCount >= 2){
                    this.removeWays(this.isLeft, this.isRight);
                }
                if(searchShip(this.firstHitX, this.firstHitY)){
                    this.lastShootX = undefined;
                    this.lastShootY = undefined;
                    this.isHit = false;
                    this.way = undefined;
                    let ship = searchMyShip(this.firstHitX, this.firstHitY);
                    this.spliceArround(ship);
                } else {
                    this.lastShootX = x;
                    this.lastShootY = y;
                }
                myTurn = false;
                gameProcessing();
            } else {
                this.arr.splice(this.arr.indexOf(this.arr[this.way]),1);
                this.way = undefined;
                this.printMiss(x,y);
                this.lastShootX = this.firstHitX;
                this.lastShootY = this.firstHitY;
                myTurn = true;   
            }
            
        }, 1000);
        
    }


    this.removeWays = function(way1, way2){
      /* if(this.arr.includes(way1)){
            this.arr.splice(this.arr.indexOf(way1),1);
        }
        if(this.arr.includes(way2)){
            this.arr.splice(this.arr.indexOf(way2),1);
        }*/
    }

    this.printHit = function (x, y) {
        $('.tableField tr:eq(' + y + ') td:eq(' + x +')').removeClass('cellWithShip');
        $('.tableField tr:eq(' + y + ') td:eq(' + x +')').addClass('cellWithHitShip');
        this.hittedCells.splice(this.hittedCells.indexOf(x+y*10),1);
    }

    this.printMiss = function (x, y) {
        if($('.tableField tr:eq(' + y + ') td:eq(' + x +')').attr('class') != 'row cellMissedClose' && (x <= 9 && x >= 0) && (y <= 9 && y >= 0)) {
            this.hittedCells.splice(this.hittedCells.indexOf(x+y*10),1);
            $('.tableField tr:eq(' + y + ') td:eq(' + x +')').removeClass('cellWithShip');
            $('.tableField tr:eq(' + y + ') td:eq(' + x +')').addClass('cellMissedClose');
        }
        
       
    }

    this.spliceArround = function(ship){
        if(ship.isRow == true){
            this.spliceIsRow(ship);
        } else {
            this.spliceIsColumn(ship);
        }
    }

    this.spliceIsRow = function(ship){
        var y = ship.coordArr[0][0];
        var x = ship.coordArr[0][1];   
        this.printMiss(x-2,y-1);
        this.printMiss(x-2,y);
        this.printMiss(x-2,y-2);

        for(var i = 0; i < ship.length; i++){
            this.printMiss(x-1, y);
            this.printMiss(x-1, y-2);
            x++;
        }
        
        this.printMiss(x-1 ,y-1);
        this.printMiss(x-1 ,y);
        this.printMiss(x-1 ,y-2);
    }

    this.spliceIsColumn = function(ship){
        var y = ship.coordArr[0][0];
        var x = ship.coordArr[0][1]; 
        this.printMiss(x, y);  
        this.printMiss(x-1, y);
        this.printMiss(x-2, y);

        for(var i = 0; i < ship.length; i++){
            this.printMiss(x-2, y-1);
            this.printMiss(x, y-1);
            y--;
        }
        
        this.printMiss(x-1 , y-1);
        this.printMiss(x-2 , y-1);
        this.printMiss(x , y-1);
    }
    
    
}



make_way = function(way){
    this.way = way;

    this.getWay = function() {
        return this.way;
    }
}

function sleep(ms) {
    ms += new Date().getTime();
    while (new Date() < ms){}
    } 

