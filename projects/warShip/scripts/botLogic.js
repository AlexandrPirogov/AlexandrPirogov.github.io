
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

    this.leftCount = 1;
    this.rightCount = 1;
    this.topCount = 1;
    this.bottomCount = 1;

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
                if(this.checkCellForMissed(this.lastShootX-1, this.lastShootY) == true || this.lastShootX-1 < 0){
                    this.arr.splice(this.arr.indexOf(this.arr[this.way]),1); 
                    this.way = undefined;
                    this.lastShootX = this.firstHitX;
                    this.lastShootY = this.firstHitY;
                    myTurn = false;
                    gameProcessing();
                } else {
                    this.shootLeft(--this.lastShootX, this.lastShootY);
                }
            break;
            case 'Right':
                if(this.checkCellForMissed(this.lastShootX+1, this.lastShootY) == true || this.lastShootX+1 > 9){
                    this.arr.splice(this.arr.indexOf(this.arr[this.way]),1);
                    this.way = undefined;
                    this.lastShootX = this.firstHitX;
                    this.lastShootY = this.firstHitY;
                    myTurn = false;
                    gameProcessing();
                } else {
                    this.shootRight(++this.lastShootX, this.lastShootY);
                }
            break;
            case 'Top':
                if(this.checkCellForMissed(this.lastShootX, this.lastShootY-1) == true || this.lastShootY-1 < 0){
                    this.arr.splice(this.arr.indexOf(this.arr[this.way]),1);
                    this.way = undefined;
                    this.lastShootX = this.firstHitX;
                    this.lastShootY = this.firstHitY;
                    myTurn = false;
                    gameProcessing();
                } else {
                    this.shootTop(this.lastShootX, --this.lastShootY);
                }
            break;
            case 'Bottom':
                if(this.checkCellForMissed(this.lastShootX, this.lastShootY+1) == true || this.lastShootY+1 > 9){
                    this.arr.splice(this.arr.indexOf(this.arr[this.way]),1);
                    this.way = undefined;
                    this.lastShootX = this.firstHitX;
                    this.lastShootY = this.firstHitY;
                    myTurn = false;
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
                if(searchShip(this.firstHitX, this.firstHitY)){
                    this.lastShootX = undefined;
                    this.lastShootY = undefined;
                    this.isHit = false;
                    this.way = undefined;
                    let ship = searchMyShip(this.firstHitX, this.firstHitY);
                    this.spliceArround(ship);
                    this.leftCount = 1;
                    this.rightCount = 1;
                    this.topCount = 1;
                    this.bottomCount = 1;
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
                if(this.leftCount >= 2){
                    this.way = this.arr.indexOf(this.isRight);
                }
            }
        }, 1000);
    }

    this.shootRight = function(x,y) {
        setTimeout(() => {
            if($('.tableField tr:eq(' + y + ') td:eq(' + x +')').attr('class') == 'row cellWithShip') {
                this.printHit(x,y);
                this.rightCount++;
                if(searchShip(this.firstHitX, this.firstHitY)){
                    this.lastShootX = undefined;
                    this.lastShootY = undefined;
                    this.isHit = false;
                    this.way = undefined;
                    let ship = searchMyShip(this.firstHitX, this.firstHitY);
                    this.spliceArround(ship);
                    this.leftCount = 1;
                    this.rightCount = 1;
                    this.topCount = 1;
                    this.bottomCount = 1;
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
                if(this.rightCount >= 2){
                    this.way = this.arr.indexOf(this.isLeft);
                }
            }
        }, 1000);
    }

    this.shootTop = function(x,y) {
        setTimeout(() => {
            if($('.tableField tr:eq(' + y + ') td:eq(' + x +')').attr('class') == 'row cellWithShip') {
                this.printHit(x,y);
                this.topCount++;
                if(searchShip(this.firstHitX, this.firstHitY)){
                    this.lastShootX = undefined;
                    this.lastShootY = undefined;
                    this.isHit = false;
                    this.way = undefined;
                    let ship = searchMyShip(this.firstHitX, this.firstHitY);
                    this.spliceArround(ship);
                    this.leftCount = 1;
                    this.rightCount = 1;
                    this.topCount = 1;
                    this.bottomCount = 1;
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
                if(this.topCount >= 2){
                    this.way = this.arr.indexOf(this.isBottom);
                }
            }
        }, 1000);
    }

    this.shootBottom = function(x,y) {
        setTimeout(() => {
            if($('.tableField tr:eq(' + y + ') td:eq(' + x +')').attr('class') == 'row cellWithShip') {
                this.printHit(x,y);
                this.bottomCount++;
                if(searchShip(this.firstHitX, this.firstHitY)){
                    this.lastShootX = undefined;
                    this.lastShootY = undefined;
                    this.isHit = false;
                    this.way = undefined;
                    let ship = searchMyShip(this.firstHitX, this.firstHitY);
                    this.spliceArround(ship);
                    this.leftCount = 1;
                    this.rightCount = 1;
                    this.topCount = 1;
                    this.bottomCount = 1;
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
                if(this.bottomCount >= 2){
                    this.way = this.arr.indexOf(this.isTop);
                } 
            }
        }, 1000);
    }


    this.removeWays = function(way1, way2){
       if(this.arr.includes(way1)){
            //this.arr.splice(this.arr.indexOf(way1),1);
        }
        if(this.arr.includes(way2)){
           // this.arr.splice(this.arr.indexOf(way2),1);
        }
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
    
    
    /*Implementation of generating bot's ships */
    this.enemyCoord = [];
    this.botShips = [];
    this.botShipsCountType = [];
    this.arrForHits = [];

    this.setShipsOnEnemyField = function (){

    }

    this.createArrayCoordinates = function () {
        for(var i = 0; i < 100; i++){
                this.enemyCoord[i] = i;
        }
        this.botShipsCountType = [1, 2, 3, 4];
    }
   
    this.checkTypesCount = function(botShipsCountType) {
        for(var i = 0; i < botShipsCountType.length; i++){
          //  console.log(botShipsCountType[i])
            if(botShipsCountType[i] != 0){
                return 0;
            }
        }
        return 1;
    }

    this.chooseLenShip = function(botShipsCountType) {
        for(var i = 0; i < botShipsCountType.length; i++){
            if(botShipsCountType[i] != 0){
                var len = botShipsCountType.length-i;
              //  console.log("len " + len);
                botShipsCountType[i]--;
                return len;
            }
        }
        return -1;
    }

    this.takeRandomCoordinates = function () {
        if(this.checkTypesCount(this.botShipsCountType) == 0){
        var i = Math.floor(Math.random() * (this.enemyCoord.length));
        var y = Math.floor(this.enemyCoord[i]/10);
        var x = this.enemyCoord[i] - y*10;
        var len = this.chooseLenShip(this.botShipsCountType);
        var isRow = Math.floor(Math.random() * 2);
        while(this.checkCellsBeforePlace(len, isRow, x, y) == 0){
            isRow = Math.floor(Math.random() * 2);
            i = Math.floor(Math.random() * (this.enemyCoord.length));
            y = Math.floor(this.enemyCoord[i]/10);
            x = this.enemyCoord[i] - y*10;
        }
        if(isRow == 1){
            this.printRandomShipRow(len ,x ,y, isRow);
        } else {
            this.printRandomShipColumn(len, x ,y, isRow);
        }
    } else {
     //   console.log('vseee');
    } 
    //console.log( this.enemyCoord);
    }

    /** Баг заключается в правом крае */
    this.checkCellsBeforePlace = function(len, isRow, x, y) {
        if(isRow == 1){
            if (y < 0 ){
                return 0;
            }
            if( $('.enemyField tr:eq(' + (y-1) + ') td:eq(' + (x-1) +')').attr('class') == 'row randomHit' ||
            $('.enemyField tr:eq(' + (y-1) + ') td:eq(' + x +')').attr('class') == 'row randomHit' ||
            $('.enemyField tr:eq(' + (y-1) + ') td:eq(' + (x+1) +')').attr('class') == 'row randomHit'){
                return 0;
            }
            for(var j = 0; j < len; j++){
                if($('.enemyField tr:eq(' + y + ') td:eq(' + (x-1) +')').attr('class') == 'row randomHit'
                || $('.enemyField tr:eq(' + y + ') td:eq(' + (x+1) +')').attr('class') == 'row randomHit' || y > 9){
                    return 0;
                }
                y++;
            }
            if( $('.enemyField tr:eq(' + y + ') td:eq(' + (x-1) +')').attr('class') == 'row randomHit' ||
            $('.enemyField tr:eq(' + y + ') td:eq(' + x +')').attr('class') == 'row randomHit' ||
            $('.enemyField tr:eq(' + y + ') td:eq(' + (x+1) +')').attr('class') == 'row randomHit'){
                return 0;
            }
        } else {
            if(  $('.enemyField tr:eq(' + (y-1) + ') td:eq(' + (x-1) +')').attr('class') == 'row randomHit' ||
            $('.enemyField tr:eq(' + y + ') td:eq(' + x +')').attr('class') == 'row randomHit' ||
            $('.enemyField tr:eq(' + (y+1) + ') td:eq(' + (x-1) +')').attr('class') == 'row randomHit'){
                return 0;
            }
            for(var j = 0; j < len; j++){
                if($('.enemyField tr:eq(' + (y-1) + ') td:eq(' + x +')').attr('class') == 'row randomHit'
                || $('.enemyField tr:eq(' + (y+1) + ') td:eq(' + x +')').attr('class') == 'row randomHit'
                ){
                    return 0;
                }
                x++;
            }
            if( $('.enemyField tr:eq(' + (y-1) + ') td:eq(' + x +')').attr('class') == 'row randomHit'||
            $('.enemyField tr:eq(' + y + ') td:eq(' + x +')').attr('class') == 'row randomHit'||
            $('.enemyField tr:eq(' + (y+1) + ') td:eq(' + x +')').attr('class') == 'row randomHit') {
                return 0;
            }
            if(x+1 > 10){
                return 0;
            }
        }
        return 1;
    }

    this.printRandomShipRow = function (len, x, y, isRow) {
        var coordinates = [];
        for(var j = 0; j < len; j++){
            this.enemyCoord.splice(this.enemyCoord.indexOf(x+y*10), 1);
            coordinates.push([x,y]);
            $('.enemyField tr:eq(' + y + ') td:eq(' + x +')').addClass('randomHit');
            y++;
        }
        this.createShip(len, isRow, coordinates, isRow);
    }

    this.printRandomShipColumn = function(len, x, y, isRow) {
        var coordinates = [];
        for(var j = 0; j < len; j++){
            this.enemyCoord.splice(this.enemyCoord.indexOf(x+y*10), 1);
            coordinates.push([x,y]);
            $('.enemyField tr:eq(' + y + ') td:eq(' + x +')').addClass('randomHit');
            x++;
        }
        this.createShip(len, isRow, coordinates, isRow);
    }

    this.createShip = function(len, isRow, coordinates, isRow) {
        this.botShips.push(new make_ship(len, 'ship', coordinates, isRow));
        this.spliceArroundEnemy(this.botShips[this.botShips.length-1]);
    }

    this.spliceArroundEnemy = function(ship){
        if(ship.isRow == true){
            this.spliceIsRowEnemy(ship);
        } else {
            this.spliceIsColumnEnemy(ship);
        }
    }

    this.spliceIsColumnEnemy = function(ship){
        var x = ship.coordArr[0][0]+1;
        var y = ship.coordArr[0][1]+1;   
      //  console.log('row ' + ship.coordArr[1][0] + ' ' + ship.coordArr[1][1]);
        this.printMissEnemy(x-2,y-1);
        this.printMissEnemy(x-2,y);
        this.printMissEnemy(x-2,y-2);
        for(var i = 0; i < ship.length; i++){
            this.printMissEnemy(x-1, y);
            this.printMissEnemy(x-1, y-2);
            x++;
        }
        this.printMissEnemy(x-1 ,y-1);
        this.printMissEnemy(x-1 ,y);
        this.printMissEnemy(x-1 ,y-2);
    }
    
    this.spliceIsRowEnemy = function(ship){
       // console.log(ship);
        var x = ship.coordArr[0][0]+1;
        var y = ship.coordArr[0][1]+1; 
        //console.log(ship.coordArr);
        this.printMissEnemy(x, y);  
        this.printMissEnemy(x-1, y);
        this.printMissEnemy(x-2, y);
        for(var i = 0; i < ship.length; i++){
            this.printMissEnemy(x-2, y-1);
            this.printMissEnemy(x, y-1);
            y--;
        }
        this.printMissEnemy(x-1 , y-1);
        this.printMissEnemy(x-2 , y-1);
        this.printMissEnemy(x , y-1);
    }

    this.printMissEnemy = function (x, y) {
        if($('.enemyField tr:eq(' + y + ') td:eq(' + x +')').attr('class') != 'row cellMissedClose' && (x <= 9 && x >= 0) && (y <= 9 && y >= 0)
        &&   $('.enemyField tr:eq(' + y + ') td:eq(' + x +')').attr('class') != 'row randomHit') {
            this.enemyCoord.splice(this.enemyCoord.indexOf(x+y*10), 1);
        }
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

