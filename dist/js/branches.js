//Author: Václav Volhejn
var canvas = document.getElementById('bgCanvas');
canvas.style["background-color"] = "white";
var ctx = canvas.getContext("2d");
var C = {
    R_MIN: 1,
    R_MAX: 7,
    R_DECAY: 0.012, //0.008
    R_DECAY_COEF: 4,
    SPEED_MIN: 0.0007,//0.0007,
    SPEED_MAX: 0.0020,//0.0015,
    CORRECTION: 0.4, //0.2,
    RANDOM: 0.4,
    SPLIT_DISTANCE_MIN: 0.06, //04
    SPLIT_DISTANCE_MAX: 0.12, //10
    SPLIT_ANGLE_MIN: 0.7,
    SPLIT_ANGLE_MAX: 1.2,
    EXPLOSION: 100,
    MAX_PARTICLES: 100
};

canvas.width = ctx.canvas.clientWidth;
canvas.height = ctx.canvas.clientHeight;

var centerness = function(x, y) {
    return (1 - Math.hypot(canvas.width * (x - 0.5), canvas.height * (y - 0.5)) /
        Math.hypot(canvas.width / 2, canvas.height / 2));
}

var rand = function(fr, to) {
    return Math.random() * (to - fr) + fr;
}

var Particle = function(x, y, angle, level, r, decay) {
    return {
        x: x,
        y: y,
        trueAngle: angle,
        dev: 0,
        level: level,
        speed: Math.random() * (C.SPEED_MAX - C.SPEED_MIN) + C.SPEED_MIN,
        r: r,
        decay: (decay * rand(9/10, 10/9)),
        splitAfter: (level===0)?0:undefined,
        step: function() {
            this.speed = Math.min(this.speed, this.r  / canvas.height);
            if (this.splitAfter === undefined) {
                this.splitAfter = rand(C.SPLIT_DISTANCE_MIN, C.SPLIT_DISTANCE_MAX);
            } else {
                this.splitAfter -= this.speed;
            }
            this.dev += Math.random() * 2 * C.RANDOM - C.RANDOM;
            this.dev = this.dev * (1 - C.CORRECTION * (this.r / C.R_MAX)); //centerness(this.x, this.y)
            this.x += Math.cos(this.dev + this.trueAngle) * this.speed;
            this.y += Math.sin(this.dev + this.trueAngle) * this.speed;

            if(this.splitAfter < 0){
                var split = rand(C.SPLIT_ANGLE_MIN, C.SPLIT_ANGLE_MAX);
                if (Math.random() < 0.5) split = -split;
                if (this.level > 0) this.trueAngle += split / 2;    
                this.splitAfter = undefined;
                this.level++;
                return Particle(this.x, this.y, this.trueAngle - split, this.level, this.r, this.decay * C.R_DECAY_COEF);
            }
            this.r -= this.decay;
        },

        isOk: function() {
            return this.r >= C.R_MIN && this.x >= 0 && this.x <= 1 && this.y >= 0 && this.y <= 1;
        },

        draw: function() {
            if (this.r < C.R_MIN) return;
            ctx.beginPath();
            ctx.arc(this.x * canvas.width, this.y * canvas.height, this.r, 0, 2 * Math.PI);
            ctx.fill();
        }
    };
};

var p = [], waiting = [];
var wi = 0;

document.body.addEventListener('click', function(e) {
    var x = e.clientX / canvas.width;
    var y = e.clientY / canvas.height;
    if(p.length === 0) requestAnimationFrame(update);
    p.push(Particle(x, y, Math.atan2(y - 0.5, x - 0.5), 0, centerness(x, y) * C.R_MAX, C.R_DECAY));
}, false);

var explode = function(n) {
    var base = (Math.PI * 2 * (1 / n)) * Math.random();
    for (var i = 0; i < n; i++) {
        var angle = Math.PI * 2 * (i / n) + base;
        p.push(Particle(0.5 + Math.cos(angle) * 0.002, 0.5 + Math.sin(angle) * 0.002, angle, 0, C.R_MAX, C.R_DECAY));
    }
}

var update = function(t) {
    ctx.fillStyle = "black";
    if (p.length > 0) {
        var p2 = [];
        for (var x in p) {
            if (!p[x]) continue;
            var next = p[x].step();
            if (next) waiting.push(next);
            if (p[x].isOk()) {
                p[x].draw();
                p2.push(p[x]);
            }
        }
        p = p2;
        while(wi < waiting.length && p.length < C.MAX_PARTICLES) {
            p.push(waiting[wi]);
            wi++;
        }
    }
    /*ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 30, 30);
    ctx.fillStyle = "black";
    ctx.fillText(p.length, 3, 10);*/
    if(p.length > 0){
        requestAnimationFrame(update);
    }
}
explode(C.EXPLOSION);
update(0);
