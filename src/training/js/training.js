
$(document).ready(function () {
    $("#clickMe").click(function () {
    });
});



$(document).ready(function () {
    $("#name").click(function () {
      console.log(this.value);
    });
});


$(document).ready(function () {
    $(".randomClass").hover( c,
    uc)
   
});



let c = function () {
    $(".randomClass").addClass("my_hover");
}

let uc = function W (clazz) {
    $(".randomClass").removeClass("my_hover");
}

let index;
$(document).ready(function () {
    index = 0;
    $("#buttonForm").click ( function () {
        index ++;
        let newDiv = "<div class='appendChild'><strong>append</strong></div>"
        $(".leftDiv").append(newDiv);
    })

})



$(document).on({
    mouseenter: function () {
       $(this).css("color", "yellow")
    },
    mouseleave: function () {
        $(this).css("color", "black")
    }
}, ".appendChild");


$(document).ready(function () {
    $(".fieldButton").click(function () {
        $(".field").append("<div class = 'adds addsCss'>Hello <button class ='addsButton'>remove</button></div>")
    })
})

$(document).on('click', '.addsButton', function () {
    $(".adds").remove();
})


let removeAdd = function () {
    $('.adds').removeClass
}

$(document).on('mousedown',  function (e) {
    let pos = $('.adds').offset();
    let t  = pos.top+$('.adds').height();  
   if((e.pageY > pos.top && e.pageX > pos.left)
    && (e.pageY < pos.top+$('.adds').height() && e.pageX < pos.left+$('.adds').width())){
      $('.adds').addClass('selectedToMove');
      moveObj();
   }
    
})

let moveObj = function() {
    $(document).on('mousemove', function(e) {
        $('.adds').css({top: e.pageY, left: e.pageX})
     
    }),
    $(document).on('mouseup', function() {
        $('.adds').removeClass("selectedToMove")
        $(document).unbind('mousemove');
     
    })
}



let bb = function () {
    $(".adds").on('mouseup', '.adds' , function () {
        console.log("asssssss")
        $(".adds").removeClass('selectedTomove');
    })
}

$(document).ready(function () {
    var v = false;
    let $b;
    $("#vegOn").click(function () {
        
    console.log("asd");
        if(v==false){
            v = true;
            $("li.fish").before("<strong>replaceShit</strong>");
            $(".menu_list").children().eq(1);
           
        //  $b =  $("li.fish").parent().parent().detach();
        //  console.log($b);
        }
    });
    $("#restoreMe").click(function () {
        
    console.log("asd2");
        if(v == true){
            v = false;
        }
    });
});

