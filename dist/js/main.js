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


//--------------------------VIDEO-----------------------------
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


//--------------------------UCINKUJICI---------------------------

$('#modal-inner').click(function (event) {
        event.stopPropagation();
    });

var dataJSON;

$.getJSON("/js/data.json", function (data) {
    dataJSON = data;
});

$(".event").click(function(event){
    if(!dataJSON) return;
    
    if(!makeDescription(event.target)) return;

    $('#modal').css({
        "visibility": "visible",
        "opacity": 1,
        "overflow-y": "scroll"
    });

    $('body').width($('body').width());
    $('body').addClass("noscroll");
    
    $(document).keydown(function (e) { //escape = click
        if (e.keyCode === 27) $('#modal').click();
    });
    $('#modal').click(function () {
        $('#modal').css({
            "visibility": "hidden",
            "opacity": 0,
            "overflow-y": "hidden"
        });
        $('body').removeClass("noscroll").width("100%");
    });
});

var makeDescription = function(element){
    if(!dataJSON.ucinkujici[element.id]) return false;
    var data = dataJSON.ucinkujici[element.id];
    var target = $('#modal-inner');
    target.empty();
    target.append("<h1>"+element.innerHTML+"</h1>");
    if(data.desc){
        data.desc = data.desc.replace("\n", "</p><p>");
        target.append("<p>"+data.desc+"</p>");
    }
    if(data.sample) {
        target.append("<p><a target='_blank' href=\""+data.sample+"\">Ukázka</a></p>");
    }
    if(data.site) {
        target.append("<p><a target='_blank' href=\""+data.site+"\">Stránky</a></p>");   
    }
    return true;
};
