
//TODO print cell with time
function printCell(){
    currentTime = getCurrentDate().getHours();
  
}

function getCurrentDate(){
    var currentDate = new Date();
    currentDate.setUTCHours(6);
    currentDate.getHours();
    return currentDate;
}
