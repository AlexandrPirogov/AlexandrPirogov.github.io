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
            this.hittedCells.splice(i, 1);
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
                $('.tableField tr:eq(' + y + ') td:eq(' + x +')').removeClass('cellWithShip');
                $('.tableField tr:eq(' + y + ') td:eq(' + x +')').addClass('cellWithMissedHit');
                myTurn = true;
                this.isHit = false;
            }
        }
    };

    
  
    this.lastShootX;
    this.lastShootY;

    this.way;

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
                this.shootLeft(--this.lastShootX, this.lastShootY);
            break;
            case 'Right':
                this.shootRight(++this.lastShootX, this.lastShootY);
            break;
            case 'Top':
                this.shootTop(this.lastShootX, --this.lastShootY);
            break;
            case 'Bottom':
                this.shootBottom(this.lastShootX, ++this.lastShootY);
            break;
        }
        
    }

    this.shootLeft = function(x,y) {
        console.log(this.hittedCells.length)
        setTimeout(() => {
            if($('.tableField tr:eq(' + y + ') td:eq(' + x +')').attr('class') == 'row cellWithShip') {
                this.printHit(x,y);
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
            }
        }, 1000);
        this.hittedCells.splice(this.hittedCells.indexOf(x+y*10),1);
    }

    this.shootRight = function(x,y) {
        console.log(this.hittedCells.length)
        setTimeout(() => {
            if($('.tableField tr:eq(' + y + ') td:eq(' + x +')').attr('class') == 'row cellWithShip') {
                this.printHit(x,y);
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
            }
        }, 1000);
        this.hittedCells.splice(this.hittedCells.indexOf(x+y*10),1);
    }

    this.shootTop = function(x,y) {
        console.log(this.hittedCells.length)
        setTimeout(() => {
            if($('.tableField tr:eq(' + y + ') td:eq(' + x +')').attr('class') == 'row cellWithShip') {
                this.printHit(x,y);
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
            }
        }, 1000);
        this.hittedCells.splice(this.hittedCells.indexOf(x+y*10),1);
    }

    this.shootBottom = function(x,y) {
        console.log(this.hittedCells.length)
        setTimeout(() => {
            if($('.tableField tr:eq(' + y + ') td:eq(' + x +')').attr('class') == 'row cellWithShip') {
                this.printHit(x,y);
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
            }
        }, 1000);
        this.hittedCells.splice(this.hittedCells.indexOf(x+y*10),1);
    }

    this.printHit = function (x, y) {
        $('.tableField tr:eq(' + y + ') td:eq(' + x +')').removeClass('cellWithShip');
        $('.tableField tr:eq(' + y + ') td:eq(' + x +')').addClass('cellWithHitShip');
    }

    this.printMiss = function (x, y) {
        $('.tableField tr:eq(' + y + ') td:eq(' + x +')').removeClass('cellWithShip');
        $('.tableField tr:eq(' + y + ') td:eq(' + x +')').addClass('cellMissedClose');
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

