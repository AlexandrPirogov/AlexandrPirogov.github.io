function createTable(table) {
        let mTab = document.createElement('table');
        for(var i = 0; i < 8; i++){
            let row = document.createElement('tr');
            row.classList.add('row')
            for(var j = 0; j < 8;j++){
               let cell = document.createElement('td');
               cell.classList.add('row');
               row.appendChild(cell);
            }
            mTab.appendChild(row);
        }
    mTab.classList.add(table);
    $(".gameField").append(mTab);
}

make_ship = function(length, type, coordArr){
    this.length = length;
    this.type = type;
    this.coordArr = coordArr;
    this.drow = function() {
        alert('drown');
    }
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
let coordinates;
    $(document).on('click', '.tableField tr td', function() {
        if(ship == 'oneLenShip' && shipCount[0] != 0){
            coordinates =  [[$(this).parent().index()+1 ,$(this).index()+1]];
            new make_ship(1, 'oneLen', coordinates);
            printCell(coordinates, $(this), $(this).parent());
            shipCount[0]--;
          } else if (ship == 'twoLenShip' && shipCount[1] != 0) {
            coordinates = [[$(this).parent().index()+1 ,$(this).index()+1], [$(this).parent().index()+1 ,$(this).index()+2]];
            new make_ship(2, 'twoLenShip', coordinates);
            printCell(coordinates, $(this), $(this).parent());
            shipCount[1]--;
          } else if (ship == 'threeLenShip' && shipCount[2] != 0) {
            coordinates = [[$(this).parent().index()+1 ,$(this).index()+1], [$(this).parent().index()+1 ,$(this).index()+2], [$(this).parent().index()+1 ,$(this).index()+3]];
            new make_ship(3, 'threeLenShip', coordinates);
            printCell(coordinates, $(this), $(this).parent());
            shipCount[2]--;
          } else if (ship == 'fourLenShip' && shipCount[3] != 0){
            coordinates = [[$(this).parent().index()+1 ,$(this).index()+1], [$(this).parent().index()+1 ,$(this).index()+2], [$(this).parent().index()+1 ,$(this).index()+3], [$(this).parent().index()+1 ,$(this).index()+4]];
            new make_ship(4, 'fourLenShip', coordinates);
            printCell(coordinates, $(this), $(this).parent());
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
    console.log(2);
    if(length + cells.index() > 8){
        throw new Error("array bound");
    }
   } else {
        if(cells.parent().index() - length < -1){
            throw new Error("array bound");
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

$(document).on('mousedown', '.tableField tr td', function (e) {
    if(e.button == 2){
        deleteShip(e)
    }
})

function deleteShip(event) {
    
}  

function isReady() {
    shipCount.forEach(function(i) {
        if(shipCount[i] != 0){
            throw new Error("you are not ready");
        } 
    })
    alert('lego');
}
