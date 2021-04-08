/*

Welcome to the ultimate Z!

*/

var cssColors = ["aliceblue","antiquewhite","aqua","aquamarine","azure","beige","bisque","black","blanchedalmond","blue","blueviolet","brown","burlywood","cadetblue","chartreuse","chocolate","coral","cornflowerblue","cornsilk","crimson","cyan","darkblue","darkcyan","darkgoldenrod","darkgray","darkgrey","darkgreen","darkkhaki","darkmagenta","darkolivegreen","darkorange","darkorchid","darkred","darksalmon","darkseagreen","darkslateblue","darkslategray","darkslategrey","darkturquoise","darkviolet","deeppink","deepskyblue","dimgray","dimgrey","dodgerblue","firebrick","floralwhite","forestgreen","fuchsia","gainsboro","ghostwhite","gold","goldenrod","gray","grey","green","greenyellow","honeydew","hotpink","indianred","indigo","ivory","khaki","lavender","lavenderblush","lawngreen","lemonchiffon","lightblue","lightcoral","lightcyan","lightgoldenrodyellow","lightgray","lightgrey","lightgreen","lightpink","lightsalmon","lightseagreen","lightskyblue","lightslategray","lightslategrey","lightsteelblue","lightyellow","lime","limegreen","linen","magenta","maroon","mediumaquamarine","mediumblue","mediumorchid","mediumpurple","mediumseagreen","mediumslateblue","mediumspringgreen","mediumturquoise","mediumvioletred","midnightblue","mintcream","mistyrose","moccasin","navajowhite","navy","oldlace","olive","olivedrab","orange","orangered","orchid","palegoldenrod","palegreen","paleturquoise","palevioletred","papayawhip","peachpuff","peru","pink","plum","powderblue","purple","rebeccapurple","red","rosybrown","royalblue","saddlebrown","salmon","sandybrown","seagreen","seashell","sienna","silver","skyblue","slateblue","slategray","slategrey","snow","springgreen","steelblue","tan","teal","thistle","tomato","turquoise","violet","wheat","white","whitesmoke","yellow","yellowgreen"];

/***********************************/
/***** helper basic functions *****/
/*********************************/

/*

this function creates a style tag with a certain,
class and its properties. but it also checks if a style
tag already exists, if so, it appends the css
inside the existing style.

*/

function createStyleTag(zClass, property, value, pseudo) {
    var inside = ""

    if (typeof(property) == "object") {
        property.forEach(function(v, i) {
            inside += v + ":" + value + ";";
        });
    } else {
        inside = property + ":" + value;
    }

    if (value) {
        var css = "." + zClass + (pseudo ? ":" + pseudo : "" ) + " {" + inside  + "}";
        var newStyle = document.createElement('style');
        var head = document.getElementsByTagName('head')[0];
        var style = document.getElementsByTagName('style')[0];

        if (style) {
            if (!style.innerHTML.includes(css)) {style.append(css);}
        } else {
            newStyle.appendChild(document.createTextNode(css));
            head.appendChild(newStyle);
        }
    }
}

/********************/
/***** zDetect *****/
/******************/

/*

normally, you can specify a certain criteria for classes in the :root,
but other than that you may choose whatever you wish to use for any element.

*/

function detecting(zClass, property, pseudo) {
    // select all classes starts with "tag".
    var all = document.querySelectorAll("[class*='"+zClass+"-']");

    // start number variable
    var value;

    // if name is not set, use tag instead,
    // because sometimes they are the same.
    if (!property) {
        property = zClass;
    }

    // start to do the same thing for all classes.
    all.forEach(function(v, i) {
        i = v.className.replace("zHov-", "")
        /* look for a number value */

        // try to define if another unit beside "px" is being used.
        // these units could be: em, ex, ch, px, cm, mm, in, pt, pc, vh, vw, rem, vmax and vmin.
        var value = i.match("(?:^| )"+zClass+"-[0-9]+[pemciv][mxntchw](?:$| )");
        if (!value) {value = i.match("(?:^| )"+zClass+"-[0-9]+rem(?:$| )");}
        if (!value) {value = i.match("(?:^| )"+zClass+"-[0-9]+vm[ia][nx](?:$| )");}
        if (!value) {value = i.match("(?:^| )"+zClass+"-[0-9]+%(?:$| )");}

        // if that is the case, state the case.
        var notPx = true;

        // but if it is not, continue searching for a px number.
        if (!value) {value = i.match("(?:^| )"+zClass+"-[0-9]+(?:$| )"); notPx = false;}

        /* look for a color value */

        // looking for a number so for, but maybe it is a color?
        if (!value) {value = i.match("(?:^| )"+zClass+"-[a-z]+(?:$| )");}
        console.log(value)

        // catched any value yet? remove the spaces.
        if (value) {value = value[0].replace(/ /g,''); value = value.replace(zClass+"-", "");}

        // if catched a color value, then notPx is true, because
        // there should not be a px at the end of a color value
        if (value && cssColors.includes(value)) {notPx = true;}

        // remove the prefix, so that we have our value only.
        if (value) {value = value + (notPx ? "" : "px");}

        // if zClass has "px" at the end, this is wrong
        if (value) {catchedClass = zClass + "-" + value.replace(/px$/, "")}

        // detect if zHov is used.
        if (v.className.includes("zHov-" + zClass)) {pseudo = "hover"; zClass = "zHov-" + zClass;}

        // finally, set the style
        createStyleTag(catchedClass, property, value, pseudo);
    });
}

function zDetect() {
    detecting("font", "font-size");
    detecting("color");
    detecting("pad", "padding");
    detecting("padT", "padding-top");
    detecting("padB", "padding-bottom");
    detecting("padL", "padding-left");
    detecting("padR", "padding-right");
    detecting("padTB", ["padding-top", "padding-bottom"]);
    detecting("padLR", ["padding-left", "padding-right"]);
    detecting("top", "margin-top");
    detecting("bottom", "margin-bottom");
    detecting("left", "margin-left");
    detecting("right", "margin-right");
    detecting("height");
    detecting("width");
    detecting("square", ["height", "width"]);
    detecting("boldMin", "border-width");
    detecting("rad", "border-radius");
    detecting("rad", "border-radius", "before");
    detecting("rad-l", ["border-top-left-radius", "border-bottom-left-radius"]);
    detecting("rad-l", ["border-top-left-radius", "border-bottom-left-radius"], "before");
    detecting("rad-r", ["border-top-right-radius", "border-bottom-right-radius"]);
    detecting("rad-r", ["border-top-right-radius", "border-bottom-right-radius"], "before");
    detecting("rad-t", ["border-top-right-radius", "border-top-left-radius"]);
    detecting("rad-t", ["border-top-right-radius", "border-top-left-radius"], "before");
    detecting("rad-b", ["border-bottom-right-radius", "border-bottom-left-radius"]);
    detecting("rad-b", ["border-bottom-right-radius", "border-bottom-left-radius"], "before");
    detecting("rad-c1", "border-top-left-radius");
    detecting("rad-c1", "border-top-left-radius", "before");
    detecting("rad-c2", "border-top-right-radius");
    detecting("rad-c2", "border-top-right-radius", "before");
    detecting("rad-c3", "border-bottom-left-radius");
    detecting("rad-c3", "border-bottom-left-radius", "before");
    detecting("rad-c4", "border-bottom-right-radius");
    detecting("rad-c4", "border-bottom-right-radius", "before");
}

/*****************/
/***** zMob *****/
/***************/

/*

zMob extension will let you use any class inside the ultimate z
on the mobile version of your webpage.

note: the default mobile version width normally is 1024px.

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

/***********************************/
/***** run the magical things *****/
/*********************************/

document.addEventListener('DOMContentLoaded', function(event) {
    zMobVSzWeb();
    zDetect();
});

document.addEventListener("scroll", function(event) {
    var scroll = window.pageYOffset;

    if (scroll > window.lastScrollTop){
        window.calc = 1;
    } else {
        window.calc = -1;
    }
    window.lastScrollTop = scroll;
    window.css = "";

    zMobVSzWeb();
    zDetect();
});

window.addEventListener("resize", function(event) {
    zMobVSzWeb();
    zDetect();
});
