alert('добавить условия ограничения')
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
            this.chooseWay(this.firstHitX, this.firstHitY);
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
                    gameProcessing();
                }
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

    this.chooseWay = function(x, y) {
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
              //  this.checkCellForMissed(this.firstHitX-1, this.firstHitY);
                this.shootLeft(--this.lastShootX, this.lastShootY);
            break;
            case 'Right':
                this.rightCount = 1;
               // this.checkCellForMissed(this.firstHitX+1, this.firstHitY);
                this.shootRight(++this.lastShootX, this.lastShootY);
            break;
            case 'Top':
                this.topCount = 1;
             //   this.checkCellForMissed(this.firstHitX, this.firstHitY-1);
                this.shootTop(this.lastShootX, --this.lastShootY);
            break;
            case 'Bottom':
                this.bottomCount = 1;
              //  this.checkCellForMissed(this.firstHitX, this.firstHitY+1);
                this.shootBottom(this.lastShootX, ++this.lastShootY);
            break;
            default:
                console.log('asdasd');
                break;
        }
        
    }

    this.checkCellForMissed = function (x ,y){
        if($('.tableField tr:eq(' + y + ') td:eq(' + x +')').attr('class') == 'row cellMissedClose') {
            this.arr.splice(this.arr.indexOf(this.arr[this.way]),1);
            this.chooseWay(this.firstHitX, this.firstHitY);
            return true;
        }
        return false;
    }
    
    this.shootLeft = function(x,y) {
        console.log(this.hittedCells.length)
        setTimeout(() => {
            if($('.tableField tr:eq(' + y + ') td:eq(' + x +')').attr('class') == 'row cellWithShip') {
                this.printHit(x,y);
                this.leftCount++;
                if(searchShip(this.firstHitX, this.firstHitY)){
                    this.arr.splice(this.arr.indexOf(this.arr[this.way]),1);
                    this.lastShootX = undefined;
                    this.lastShootY = undefined;
                    this.isHit = false;
                    this.way = undefined;
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
                    this.removeWays(this.isTop, this.isBottom);
                }
            }
        }, 1000);
    }

    this.shootRight = function(x,y) {
        console.log(this.hittedCells.length)
        setTimeout(() => {
            if($('.tableField tr:eq(' + y + ') td:eq(' + x +')').attr('class') == 'row cellWithShip') {
                this.printHit(x,y);
                this.rightCount++;
                if(searchShip(this.firstHitX, this.firstHitY)){
                    this.arr.splice(this.arr.indexOf(this.arr[this.way]),1);
                    this.lastShootX = undefined;
                    this.lastShootY = undefined;
                    this.isHit = false;
                    this.way = undefined;
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
                    this.removeWays(this.isTop, this.isBottom);
                }
            }
        }, 1000);
    }

    this.shootTop = function(x,y) {
        console.log(this.hittedCells.length)
        setTimeout(() => {
            if($('.tableField tr:eq(' + y + ') td:eq(' + x +')').attr('class') == 'row cellWithShip') {
                this.printHit(x,y);
                this.topCount++;
                if(searchShip(this.firstHitX, this.firstHitY)){
                    this.arr.splice(this.arr.indexOf(this.arr[this.way]),1);
                    this.lastShootX = undefined;
                    this.lastShootY = undefined;
                    this.isHit = false;
                    this.way = undefined;
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
                    this.removeWays(this.isLeft, this.isRight);
                }
            }
        }, 1000);
    }

    this.shootBottom = function(x,y) {
        console.log(this.hittedCells.length)
        setTimeout(() => {
            if($('.tableField tr:eq(' + y + ') td:eq(' + x +')').attr('class') == 'row cellWithShip') {
                this.printHit(x,y);
                this.botCount++;
                if(searchShip(this.firstHitX, this.firstHitY)){
                    this.arr.splice(this.arr.indexOf(this.arr[this.way]),1);
                    this.lastShootX = undefined;
                    this.lastShootY = undefined;
                    this.isHit = false;
                    this.way = undefined;
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
                if(this.botCount >= 2){
                    this.removeWays(this.isLeft, this.isRight);
                }
            }
        }, 1000);
        
    }


    this.removeWays = function(way1, way2){
        this.arr.splice(this.arr.indexOf(way1),1);
        this.arr.splice(this.arr.indexOf(way2),1);
    }

    this.printHit = function (x, y) {
        $('.tableField tr:eq(' + y + ') td:eq(' + x +')').removeClass('cellWithShip');
        $('.tableField tr:eq(' + y + ') td:eq(' + x +')').addClass('cellWithHitShip');
        this.hittedCells.splice(this.hittedCells.indexOf(x+y*10),1);
    }

    this.printMiss = function (x, y) {
        if($('.tableField tr:eq(' + y + ') td:eq(' + x +')').attr('class') != 'row cellMissedClose') {
            this.hittedCells.splice(this.hittedCells.indexOf(x+y*10),1);
            $('.tableField tr:eq(' + y + ') td:eq(' + x +')').removeClass('cellWithShip');
            $('.tableField tr:eq(' + y + ') td:eq(' + x +')').addClass('cellMissedClose');
        }
        
       
    }
    
    this.spliceAround = function(ship) {
        for(var i = 0; i < ship.coordArray.length; i++){
            for(var j = 0; j < ship[i].coordArr.length; j++){
                
            }
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

