/*Preparation*/
let c = 0;
function createTable(table) {
    if( c > 2){
        location.reload();
    } else {
        let mTab = document.createElement('table');
        for(var i = 0; i < 10; i++){
            let row = document.createElement('tr');
            row.classList.add('row');
            for(var j = 0; j < 10;j++){
               let cell = document.createElement('td');
               cell.classList.add('row');
               row.appendChild(cell);
            }
            mTab.appendChild(row);
        }
    mTab.classList.add(table);
    $(".gameField").append(mTab);
    c++;
    }
       
        
}
    




let findSelected = function() {
    $(document).ready(function () {
        let child = $('.divForShips').children();
         $(child).each(function () {
             if($(this).attr('class') == 'fourLenShip isSelected'){
                 return true;
             }
        })
    })
}

$(document).on('mouseout', '.tableField tr', function () {
    $('td').each( function () {
        $(this).removeClass('possibleCellForShip')
    })
})

shipCount = [4,3,2,1];
function getShip(index){
    return shipCount[index];
}

function setShipCount() {
    $('.divForShips').children().each(function (i) {
        $(this).children().html(getShip(i));
    })
}



/*creating border for selected img*/
let ship = undefined;
$(document).ready(function () {
    let child = $('.divForShips').children();
    $(child).each(function () {
    $(this).click(function () {
        removeSelected();
        ship = $(this).attr('class');
        if(ship == 'oneLenShip'){
          $(this).addClass("isSelected");
        } else if (ship == 'twoLenShip') {
          $(this).addClass("isSelected");
        } else if (ship == 'threeLenShip') {
          $(this).addClass("isSelected");
        } else if (ship == 'fourLenShip'){
          $(this).addClass("isSelected");
        }
       })
    })
})

let removeSelected = function() {
    $(document).ready(function () {
        let child = $('.divForShips').children();
         $(child).each(function () {
             $(this).removeClass('isSelected');
        })
    })
}

/*making objects and printing cells*/ 
let shipsArray = [];

make_ship = function(length, type, coordArr, isRow){
    this.length = length;
    this.type = type;
    this.coordArr = coordArr;
    this.isRow = isRow;
    this.isDead = false;
    this.firstHit;
    this.drow = function() {
        alert('drown');
    }
    this.alertHit = function(x, y) {
        this.firstHit = [x,y];
        console.log('you hitted me ' + this.type + this.firstHit);
    }

    this.checkAlive = function () {
        this.hitCount = 0;
        for(var i = 0; i < this.coordArr.length; i++){
            for(var j = 0; j < this.coordArr[i].length; j+=2){
                if($('.tableField tr:eq(' + (this.coordArr[i][j]-1) + ') td:eq(' + (this.coordArr[i][j+1]-1) +')').attr('class') == 'row cellWithHitShip') {
                    this.hitCount++; 
                }
            }   
        }
       if(this.hitCount == this.length){
           return this.isDead = true;
       } 
    }

    this.checkEnemyAlive = function () {
        this.hitCount = 1;
        for(var i = 0; i < this.coordArr.length; i++){
            for(var j = 0; j < this.coordArr[i].length; j+=2){
               if( $('.enemyField tr:eq(' + (this.coordArr[i][j+1]) + ') td:eq(' + (this.coordArr[i][j]) +')').attr('class') == 'row randomHit playerHitShip') {
                    this.hitCount++;
                }
            }   
        }
       if(this.hitCount == this.length){
           return this.isDead = true;
        } 
    }
   

    this.getIsDead = function() {
        if(this.length == 1){
            this.isDead = true;
            return true;
        }
        this.checkAlive();
        return this.isDead;
    }
}

$(document).on('mousemove', '.tableField tr td', function() {
    $(this).removeClass('possiblePlace');
})


$(document).on('mousemove', '.tableField tr td', function() {
    clearPossibleCells();
    if(ship == 'oneLenShip' && shipCount[0] != 0){
        isRow ? 
        possicbleCellPrint(1,true, $(this))
        :
        possicbleCellPrint(1,false, $(this))
      } else if (ship == 'twoLenShip' && shipCount[1] != 0) {
        isRow ? 
        possicbleCellPrint(2,true, $(this))
        :
        possicbleCellPrint(2,false, $(this))
      } else if (ship == 'threeLenShip' && shipCount[2] != 0) {
        isRow ?
        possicbleCellPrint(3,true, $(this)) :
        possicbleCellPrint(3,false, $(this))
    } else if (ship == 'fourLenShip' && shipCount[3] != 0){
        isRow ?
        possicbleCellPrint(4,true, $(this))
        :
        possicbleCellPrint(4,false, $(this))
    } 
    
})


let clearPossibleCells = function() {
    $('.tableField tr td').each(function() {
        $(this).removeClass('possiblePlace')
    })
}



let possicbleCellPrint = function(len, isRow, cell){
    var thisRow = $(cell.parent()).closest('tr');
    var thisCell = $(cell).closest('td').index();
    var firstCellText = thisRow.find('td:eq(' + (thisCell) + ')');  
    if(isRow){
        for(var i = 0; i < len; i++){
            cell.addClass('possiblePlace');
            cell = cell.next();    
        }
    } else {
        for(var i = 0; i < len; i++){
            firstCellText.addClass('possiblePlace')
            thisRow = $(thisRow).closest('tr').prev();
            firstCellText = thisRow.find('td:eq(' + (thisCell) + ')');
        }
    }
}

let coordinates;
$(document).on('click', '.tableField tr td', function() {
        if(ship == 'oneLenShip' && shipCount[0] != 0){
            coordinates =  [[$(this).parent().index()+1 ,$(this).index()+1]];
            printCell(coordinates, $(this), $(this).parent());
            shipsArray.push(new make_ship(1, 'oneLen', coordinates, isRow));
            shipCount[0]--;
          } else if (ship == 'twoLenShip' && shipCount[1] != 0) {
            isRow ?
            coordinates = [[$(this).parent().index()+1 ,$(this).index()+1], [$(this).parent().index()+1 ,$(this).index()+2]]
            :
            coordinates = [[$(this).parent().index()+1, $(this).index()+1], [$(this).parent().index(), $(this).index()+1]];
            printCell(coordinates, $(this), $(this).parent());
            shipsArray.push(new make_ship(2, 'twoLenShip', coordinates, isRow));
            shipCount[1]--;
          } else if (ship == 'threeLenShip' && shipCount[2] != 0) {
            isRow ?
            coordinates = [[$(this).parent().index()+1 ,$(this).index()+1], [$(this).parent().index()+1 ,$(this).index()+2], [$(this).parent().index()+1 ,$(this).index()+3]]
            :
            coordinates = [[$(this).parent().index()+1, $(this).index()+1], [$(this).parent().index(), $(this).index()+1], [$(this).parent().index()-1, $(this).index()+1]];
            printCell(coordinates, $(this), $(this).parent());
            shipsArray.push(new make_ship(3, 'threeLenShip', coordinates, isRow));
            shipCount[2]--;
          } else if (ship == 'fourLenShip' && shipCount[3] != 0){
            isRow ?
            coordinates = [[$(this).parent().index()+1 ,$(this).index()+1], [$(this).parent().index()+1 ,$(this).index()+2], [$(this).parent().index()+1 ,$(this).index()+3], [$(this).parent().index()+1, $(this).index()+4]]
        :            
        coordinates = [[$(this).parent().index()+1, $(this).index()+1], [$(this).parent().index(), $(this).index()+1], [$(this).parent().index()-1, $(this).index()+1], [$(this).parent().index()-2, $(this).index()+1]];
        printCell(coordinates, $(this), $(this).parent());
        shipsArray.push(new make_ship(4, 'fourLenShip', coordinates, isRow));
        shipCount[3]--;
        } 
        setShipCount()
        removeSelected();
        ship = '';
})

let isRow;
function printCell(arr, cells, rows) {
    var thisRow = $(rows).closest('tr');
    var thisCell = $(cells).closest('td').index();
    var firstCellText = thisRow.find('td:eq(' + (thisCell) + ')');  
    if(isRow == true) {
        var next = cells;
        checkArroundRow(arr.length, cells);
        arraysBound(cells, arr.length, true);
        for(var i = 0; i < arr.length; i++){
            next.addClass('cellWithShip');
            next = next.next(); 
        }
    } else {
        checkAroundCollumn(arr.length, cells, rows);
        arraysBound(cells, arr.length, false);
        for(var i= 0; i < arr.length; i++){
            firstCellText.addClass('cellWithShip')
            thisRow = $(thisRow).closest('tr').prev();
            firstCellText = thisRow.find('td:eq(' + (thisCell) + ')');
        }
    }
              
}


function checkArroundRow(length, next) {
    thisCell = $(next.prev()).closest('td').index(); 
    thisRowUp = $(next).closest('tr').next();
    thisRowDown = $(next).closest('tr').prev();
    if(next.prev().attr('class') == 'row cellWithShip' || thisRowUp.find('td:eq(' + (thisCell) + ')').attr('class') == 'row cellWithShip' 
    || thisRowDown.find('td:eq(' + (thisCell) + ')').attr('class') == 'row cellWithShip'){
        throw new Error('Place int correct');
    }
    for(var i = 0; i < length; i++){
        if(next.attr('class') == 'row cellWithShip'){
            throw new Error('Place int correct');
        }
        thisCell = $(next).closest('td').index(); 
        thisRowUp = $(next).closest('tr').next();
        thisRowDown = $(next).closest('tr').prev(); //next - down prev - upper
        if(thisRowUp.find('td:eq(' + (thisCell) + ')').attr('class') == 'row cellWithShip' || thisRowDown.find('td:eq(' + (thisCell) + ')').attr('class') == 'row cellWithShip') {
            throw new Error('Place int correct');
        }
        next = next.next();
    }
    thisCell = $(next).closest('td').index(); 
    thisRowUp = $(next).closest('tr').next();
    thisRowDown = $(next).closest('tr').prev();
    if(next.attr('class') == 'row cellWithShip' || thisRowUp.find('td:eq(' + (thisCell) + ')').attr('class') == 'row cellWithShip' 
    || thisRowDown.find('td:eq(' + (thisCell) + ')').attr('class') == 'row cellWithShip'){
        throw new Error('Place int correct');
    }
}

function checkAroundCollumn(length, next, rows){
    var thisRow = $(rows).closest('tr');
    var thisCellLeft = $(next).closest('td').index()+1;
    var firstCellLeft = thisRow.find('td:eq(' + (thisCellLeft) + ')');  
    var thisCellRight = $(next).closest('td').index()-1;
    var firstCellRight = thisRow.find('td:eq(' + (thisCellRight) + ')');
      
    thisCell = $(next).closest('td').index();
    
    thisRowDown = thisRow.next().find('td:eq(' + (thisCell) + ')').attr('class');
    thisRowDownLeft = thisRow.next().find('td:eq(' + (thisCellLeft) + ')').attr('class');
    thisRowDownRight = thisRow.next().find('td:eq(' + (thisCellRight) + ')').attr('class');
    if(thisRowDown == 'row cellWithShip' || thisRowDownLeft == 'row cellWithShip' || thisRowDownRight == 'row cellWithShip'){
        throw new Error('Place int correct');
    }
    for(var i = 0; i < length; i++){
        if(firstCellLeft.attr('class') == 'row cellWithShip' || firstCellRight.attr('class') == 'row cellWithShip'){
            throw new Error('Place int correct');
        }
        thisRow = $(thisRow).closest('tr').prev();
        firstCellLeft = thisRow.find('td:eq(' + (thisCellLeft) + ')');
        firstCellRight = thisRow.find('td:eq(' + (thisCellRight) + ')');
    }
    thisCell = $(next).closest('td').index();
    thisCellLeft = $(next).closest('td').index()+1;
    thisCellRight = $(next).closest('td').index()-1;
    
    thisRowUp = thisRow.find('td:eq(' + (thisCell) + ')').attr('class');
    thisRowUpLeft = thisRow.find('td:eq(' + (thisCellLeft) + ')').attr('class');
    thisRowUpRight = thisRow.find('td:eq(' + (thisCellRight) + ')').attr('class');

    if(thisRowUp == 'row cellWithShip' || thisRowUpLeft == 'row cellWithShip' || thisRowUpRight == 'row cellWithShip'){
        throw new Error('Place int correct');
    }
}


function arraysBound(cells, length, isRow) {
   if(isRow == true) {
    if(length + cells.index() > 10){
        throw new Error("array bound x");
    }
   } else {
        if(cells.parent().index() - length < -1){
            console.log(cells.parent().index())
            throw new Error("array bound y");
        }
    
   } 
}

$(document).keypress(function(event) {
    if(event.key == 'r'){
        if(isRow == true){
            isRow = false;
        } else {
            isRow = true;
        }
    }
  });

  $(document).keypress(function(event) {
    if(event.key == 1){
        removeSelected();
          $('.oneLenShip').addClass("isSelected");
    } else if(event.key == 2){
        removeSelected();
        $('.twoLenShip').addClass("isSelected");
    } else if (event.key == 3){
        removeSelected();
        $('.threeLenShip').addClass("isSelected");
    } else if (event.key == 4){
        removeSelected();
        $('.fourLenShip').addClass("isSelected");
    }
  });

function searchShip(x, y) {
    for(var i = 0; i < shipsArray.length; i++){
        for(var shipX = 0; shipX < shipsArray[i].coordArr.length; shipX++){
            for(var eachCoord = 0; eachCoord < shipsArray[i].coordArr[shipX].length; eachCoord+=2){
                if(y+1 == shipsArray[i].coordArr[shipX][eachCoord] && x+1 == shipsArray[i].coordArr[shipX][eachCoord+1]){
                  return shipsArray[i].getIsDead();
                }
            }
        }
    }
}

function searchMyShip(x,y ){
    for(var i = 0; i < shipsArray.length; i++){
        for(var shipX = 0; shipX < shipsArray[i].coordArr.length; shipX++){
            for(var eachCoord = 0; eachCoord < shipsArray[i].coordArr[shipX].length; eachCoord+=2){
                if(y+1 == shipsArray[i].coordArr[shipX][eachCoord] && x+1 == shipsArray[i].coordArr[shipX][eachCoord+1]){
                  return shipsArray[i];
                }
            }
        }
    }
}


$(document).on('dblclick', '.tableField tr td', function (e) {
    if($(this).attr('class') == 'row cellWithShip'){
        deleteShip(e, $(this), $(this).parent())
    }
    
})


function deleteShip(even, cell, row) {
    var x = cell.index();
    var y = cell.parent().index();
   go : for(var i = 0; i < shipsArray.length; i++){
        for(var shipX = 0; shipX < shipsArray[i].coordArr.length; shipX++){
            for(var eachCoord = 0; eachCoord < shipsArray[i].coordArr[shipX].length; eachCoord+=2){
               if(y+1 == shipsArray[i].coordArr[shipX][eachCoord] && x+1 == shipsArray[i].coordArr[shipX][eachCoord+1]){
                   clearCells(shipsArray[i], cell, row);
                   shipsArray.splice(i, i+1);
                   break go;
                }
            }
        }
    }
}  

function clearCells(shipFromArr, cells, rows){
    var y = shipFromArr.coordArr[0][0]-1;
    var x = shipFromArr.coordArr[0][1]-1;
    for(var i = 0; i < shipFromArr.coordArr.length; i++){
        for(var j = 0; j < shipFromArr.coordArr[i].length; j+=2){
            var y = shipFromArr.coordArr[i][j]-1;
            var x = shipFromArr.coordArr[i][j+1]-1;
            $('.tableField tr:eq('+ y +') td:eq('+ x +')').removeClass('cellWithShip');
        }
    }
    
    shipCount[--shipFromArr.length]++;
    setShipCount();
}

function isReady() {
    for(var i = 0; i < shipCount.length; i++){
        if(shipCount[i] != 0){
            alert('place all ships please')
            throw new Error("you are not ready");
        } 
    }
    startGame();
}
/* gameProcessing */

/* static enemyField*/
enemyFieldWithShips = [new make_ship(1, 'oneLenShip', [[0,0]], isRow), new make_ship(1, 'oneLenShip', [[0,2]], isRow), new make_ship(1, 'oneLenShip', [[0,4]], isRow),
new make_ship(1, 'oneLenShip', [[0,6]], isRow),new make_ship(2, 'twoLenShip', coordinates, isRow),
new make_ship(2, 'twoLenShip', coordinates, isRow),new make_ship(2, 'twoLenShip', coordinates, isRow),
new make_ship(3, 'threeLenShip', coordinates, isRow),new make_ship(3, 'threeLenShip', coordinates, isRow),new make_ship(4, 'fourLenShip', coordinates, isRow)];
/* */





