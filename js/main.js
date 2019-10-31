$(function () {
    $('#before-load').find('i').fadeOut().end().delay(500).fadeOut('slow');
});


var elements = document.querySelectorAll('[data-chaffle]');

Array.prototype.forEach.call(elements, function (el) {
    var chaffle = new Chaffle(el, {
        delay: 70
    })
    el.addEventListener('mouseover', function () {
        chaffle.init();
    });
});

var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
    } else {
        document.getElementById("navbar").style.top = "-80px";
    }
    prevScrollpos = currentScrollPos;
}

// variables
var $header_top = $(".header");
var $nav = $("nav");

// toggle menu
$header_top.find(".toggle-menu").on("click", function () {
    $(this)
        .parent()
        .toggleClass("open-menu");
});

// Parallax
// ------------- VARIABLES ------------- //
var ticking = false;
var isFirefox = (/Firefox/i.test(navigator.userAgent));
var isIe = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent));
var scrollSensitivitySetting = 30; //Increase/decrease this number to change sensitivity to trackpad gestures (up = less sensitive; down = more sensitive) 
var slideDurationSetting = 600; //Amount of time for which slide is "locked"
var currentSlideNumber = 0;
var totalSlideNumber = $(".background").length;

// ------------- DETERMINE DELTA/SCROLL DIRECTION ------------- //
function parallaxScroll(evt) {
    if (isFirefox) {
        //Set delta for Firefox
        delta = evt.detail * (-120);
    } else if (isIe) {
        //Set delta for IE
        delta = -evt.deltaY;
    } else {
        //Set delta for all other browsers
        delta = evt.wheelDelta;
    }

    if (ticking != true) {
        if (delta <= -scrollSensitivitySetting) {
            //Down scroll
            ticking = true;
            if (currentSlideNumber !== totalSlideNumber - 1) {
                currentSlideNumber++;
                nextItem();
            }
            slideDurationTimeout(slideDurationSetting);
        }
        if (delta >= scrollSensitivitySetting) {
            //Up scroll
            ticking = true;
            if (currentSlideNumber !== 0) {
                currentSlideNumber--;
            }
            previousItem();
            slideDurationTimeout(slideDurationSetting);
        }
    }
}

// ------------- SET TIMEOUT TO TEMPORARILY "LOCK" SLIDES ------------- //
function slideDurationTimeout(slideDuration) {
    setTimeout(function () {
        ticking = false;
    }, slideDuration);
}

// ------------- ADD EVENT LISTENER ------------- //
var mousewheelEvent = isFirefox ? "DOMMouseScroll" : "wheel";
window.addEventListener(mousewheelEvent, _.throttle(parallaxScroll, 60), false);

// ------------- SLIDE MOTION ------------- //
function nextItem() {
    var $previousSlide = $(".background").eq(currentSlideNumber - 1);
    $previousSlide.removeClass("up-scroll").addClass("down-scroll");
}

function previousItem() {
    var $currentSlide = $(".background").eq(currentSlideNumber);
    $currentSlide.removeClass("down-scroll").addClass("up-scroll");
}


// owl-carousel
var owl = $('#text-carousel');
owl.owlCarousel({
    animateIn: 'zoomIn',
    animateOut: 'fadeOut',
    animateOut: 'zoomOut',
    items: 1,
    loop: true,
    margin: 10,
    autoplay: true,
    autoplayTimeout: 5000
});

var owl2 = $('#sponsors');
owl2.owlCarousel({
    loop: true,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: false,
    responsive: {
        0: {
            items: 2,
            margin: 70
        },
        620: {
            items: 3,
            margin: 120
        },
        745: {
            margin: 150
        },
        920: {
            items: 4,
            margin: 120
        },
        1020: {
            items: 6,
            margin: 100
        }
    }
});

function showModal() {
    $('#hide').addClass("hideme");
    $('.modal').removeClass("overflow-hidden");
    $('html').addClass("overflow-hidden");
}

function hideModal() {
    $('#hide').removeClass("hideme");
    $('.modal').addClass("overflow-hidden");
    $('html').removeClass("overflow-hidden");
}

$(".service").hover(function () {
    $(this).children(".service-icon").addClass('shake');
}, function () {
    {
        $(this).children(".service-icon").removeClass('shake');
    }
});