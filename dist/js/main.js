//jQuery to collapse the navbar on scroll
$(window).scroll(function () {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function () {
    $('a.page-scroll').bind('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});
//Collapse on-click (mobile)
$('.nav a').on('click', function () {
    if ($('.navbar-toggle').css('display') != 'none') {
        $(".navbar-toggle").trigger("click");
    }
});


var vid = $("#intro-video");
var wrapper = $('.wrapper-outer');

$(window).on('scroll', function(){
    vid[0].pause();
});

wrapper.on("click", function() {
    if(vid.css('display')==='none'){
        return;
    }
    if (vid[0].paused) {
        vid[0].play();
    } else {
        vid[0].pause();
    }
});

vid.on("ended", function(){
    wrapper.css('background-color', 'black');
});

vid.on("play", function() {
    $('.navbar').css('opacity', '0');
    wrapper.css('opacity', '0');
});

vid.on("pause", function() {
    $('.navbar').css('opacity', '1');
    wrapper.css('opacity', '1');
});

$(document).ready(function(){
    if(vid.css('display')==='none'){
        vid[0].pause();
    }
});