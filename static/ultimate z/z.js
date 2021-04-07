/*

Welcome to the ultimate Z!

*/

/*****************/
/***** zMob *****/
/***************/

/*
zMob extension will let you use any class inside the Ultimate Z
on the mobile version of your webpage.
Note: The default mobile version width normally is 1024px.
*/

function versus(tag1, tag2, condition) {
    var all = document.querySelectorAll("[class*='"+tag1+"-']");

    all.forEach(function(vLev1, kLev1) {
        if (condition) {
            // get the class names
            var getAllClass = vLev1.className.split(" ");

            // time to check if they are for mobile and add them
            getAllClass.forEach(function(vLev2, kLev2) {
                if (vLev2.includes(tag1+"-")) {
                    var prevClass = getAllClass[kLev2-1];
                    var className = vLev2.replace(tag1+"-", "");
                    var nextClass = tag2+"-"+prevClass

                    // remove the old classes and add the new ones
                    vLev1.classList.remove(prevClass);
                    vLev1.classList.remove(vLev2);
                    vLev1.classList.add(className);
                    vLev1.classList.add(nextClass);
                }
            });
        }
    });
}

function zMobVSzWeb() {
    // let's get the window witdh
    var width = window.innerWidth;

    versus("zMob", "zWeb", width <= 1024);
    versus("zWeb", "zMob", width > 1024);
}

/*******************/
/***** MUFFIN *****/
/*****************/

/*
muffin will let you create animations through your webpage
When you scroll down, the selected class will appear, and
as you continue to go down, it will disappear with an animation.
The opposite will occur on the opposite side.
*/

function muffin(className) {
    if ($(className)) {
        $(className).each(function(){
            // this is the top position of the scrolling
            var scroll = $(window).scrollTop();
            var classN = className.substring(1);

            // our object
            var obj = $(this);

            if(obj.prev().attr('class') !== "ComeFromDown-pos") {obj.before("<div class='ComeFromDown-pos'></div>")}

            // calculate the base point where the animation will take place
            var pos = obj.prev().offset().top - $(window).height() + 200;

            if (scroll >= pos) {
                obj.removeClass().addClass("moveBottom-Top100").addClass("visible").addClass(classN);
            } else {
                obj.removeClass().addClass("moveTop-Bottom100").addClass(classN);
            }
        });
    }
};

/***************************/
/***** movingPictures *****/
/*************************/

function movingPictures(classN) {
    if ($(classN)) {
        $(classN).each(function(){
            // this is the top position of the scrolling
            var scroll = $(window).scrollTop();

            // our object
            var obj = $(this);

            // calculate the base point where the animation will take place
            var pos1 = obj.offset().top - $(window).height() + 100;
            var pos2 = obj.offset().top + obj.height()/2;
            var topPos = obj.position().top;

            if (scroll >= pos1 && scroll <= pos2) {
                if ((topPos + window.calc) < 100 && (topPos + window.calc) > 0) {
                    obj.css("top", (topPos + window.calc) + "px");
                }
            }
        });
    }
};

/***********************/
/***** LITTLE BOX *****/
/*********************/

// this function creates a new magical scrollbar,
// which we will use on every page
function magic() {
    // current top position of the page
    var pTop = $(document).scrollTop();
    // let's find out height of the scrollbar for the current screen
    var litBoxHeight = $(".littleBox").height();
    // this is to calculate the whole height of the document
    // minus the "litBoxHeight" is because, when we use the height()
    // function, it gives us the number all the way from top
    // of the page to the bottom, but we are making a calculation
    // based on the top position, so we need to minus one window height
    var pHeight = $(document).height() - $(window).height();
    // this number can change, it is the thumb
    var straw = 50;
    // this is the line before the straw
    var firstLine = (pTop * (litBoxHeight - straw)) / pHeight;
    // this is the line after the straw
    var secondLine = (litBoxHeight - straw) - firstLine;

    if($(".benFirst").length) {} else {$(".littleBox").append("<div class='benFirst'></div>")}
    if($(".ben").length) {} else {$(".littleBox").append("<div class='ben'></div>")}
    if($(".benSecond").length) {} else {$(".littleBox").append("<div class='benSecond'></div>")}

    // now, time to change all the css codes
    $(".benFirst").css("height", firstLine);
    $(".ben").css("height", straw);
    $(".benSecond").css("height", secondLine);
    $(".littleToggle").css("top", firstLine+175);
}

/***********************************/
/***** run the magical things *****/
/*********************************/

document.addEventListener('DOMContentLoaded', function(event) {
    zMobVSzWeb();
});

document.addEventListener("scroll", function(event) {
    var scroll = window.pageYOffset;

    if (scroll > window.lastScrollTop){
        window.calc = 2;
    } else {
        window.calc = -2;
    }
    window.lastScrollTop = scroll;

    zMobVSzWeb();
});

window.addEventListener("resize", function(event) {
    zMobVSzWeb();
});
