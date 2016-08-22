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

    var program = $('#program-body');
    /*
    <div class="col-md-6">
                            <h2>Pondělí 29. 8.</h2>
                            <div class="event">Vobezdud</div>
                        </div>
    */
    var handleClick = function(event){
        showModal(event.target.getAttribute('event-id'));
        event.stopPropagation();
    }

    for(var i = 0; i < data.program.length; i++){
        var day = $('<div>').addClass("col-md-6").addClass('day');
        day.append($('<h2>').append(data.program[i].name));
        for(var j = 0; j < data.program[i].data.length; j++) {
            var cur = data.program[i].data[j];
            if(!data.ucinkujici[cur.id]) {
                console.log(cur.id + " missing");
                continue;
            }
            var stageName = 'Stage: ' + ['', 'Cukr', 'Káva', 'Limonáda'][cur.stage];

            day.append($('<table>')
                .addClass('event')
                .attr('event-id', cur.id)
                .append($('<tr>')
                    .append($('<td>')
                        .attr('colspan', 2)
                        .attr('event-id', cur.id)
                        .append(data.ucinkujici[cur.id].name)
                        .addClass('stage-'+cur.stage)
                        )
                        .addClass('event-name')
                    )
                .append($('<tr>')
                    .append($('<td>').append(cur.time).addClass('event-time').attr('event-id', cur.id))
                    .append($('<td>').append(stageName).addClass('event-stage').attr('event-id', cur.id))
                    )
            );
        }
        program.append(day);
    }
    
    $(".event").click(handleClick);

});

var showModal = function(name){

    if(!dataJSON) return;
    if(!makeDescription(name)) return;
    
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
};

var makeDescription = function(id){
    if(!dataJSON.ucinkujici[id]) return false;
    var data = dataJSON.ucinkujici[id];
    var target = $('#modal-inner');
    target.empty();
    target.append("<h1>"+data.name+"</h1>");
    if(data.desc){
        data.desc = data.desc.split("\n").join("</p><p>");// data.desc.replace("\n", "</p><p>");
        target.append("<p>"+data.desc+"</p>");
    }
    if(data.site) {
        target.append("<p><a target='_blank' href=\""+data.site+"\">Stránky</a></p>");   
    }
    if(data.sample) {
        if(data.sample.startsWith("https://www.youtube.com/watch?")){
            var videoId = data.sample.substring(data.sample.indexOf("v=")+2);
            target.append("<iframe class=\"yt-embed\" width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/"+videoId+"\" frameborder=\"0\" allowfullscreen></iframe>");
        } else {
            target.append("<p><a target='_blank' href=\""+data.sample+"\">Ukázka</a></p>");
        }
    }
    return true;
};
