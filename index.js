// Hide and show content on click
let experienceMap = new Map();

function Experience(_headerID, _listID, _text) {
    this.headerID = _headerID;
    this.listID = _listID;
    this.text = _text;
}

const research = new Experience("#h3Research", "#research", "Research");
const teach = new Experience("#h3Teach", "#teach", "Teaching");
const work = new Experience("#h3Work", "#work", "Working");
const activity = new Experience("#h3Activity", "#activity", "Activities");

experienceMap.set(research, renderText);
experienceMap.set(teach, renderText);
experienceMap.set(work, renderText);
experienceMap.set(activity, renderText);

experienceMap.forEach((key, value) => {
    $(value.headerID).click(() => {
        key(value);
    });
});

function renderText(object) {
    let style = $(object.listID).css("display");
    if (style === "none") {
        $(object.headerID).html("&#9662; " + object.text);
        $(object.listID).css("display","block");
    }
    else {
        $(object.headerID).html("&#9656; " + object.text);
        $(object.listID).css("display", "none");
    } 
}

// Add image of myself according to season
function displayImage() {
	var date = new Date();
	var month = date.getMonth();
	var picElem = document.getElementById("me");
	if ((5 <= month) && (month <= 10)) {
  		picElem.setAttribute("src", "media/me_spring.jpg");
	}
	else {
  		picElem.setAttribute("src", "media/me_winter.jpg");
	}
}
displayImage();


// Typewriter effect on header
$(document).ready(function () {

    var dataText = ["Thanks for visiting my website","This is","Xinyuan Zhang"];

    function typeWriter(text, i, callBack) {
        if (i < (text.length)) {
            $("h1").html(text.substring(0, i+1));

            setTimeout(() => {
                typeWriter(text, i + 1, callBack)
            }, 100);
        }
        else if (typeof callBack == 'function') {
            setTimeout(callBack, 700);
        }
    }

    function StartTextAnimation(i) {
        if (typeof dataText[i] == 'undefined') {
            return;
        }
        if (i < dataText[i].length) {
            typeWriter(dataText[i], 0, function () {
                StartTextAnimation(i + 1);
            });
        }
    }
    StartTextAnimation(0);
});