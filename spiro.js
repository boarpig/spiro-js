var paused = true,
    spiro,
    canvas,
    context,
    center;

function Gear(radius, speed) {
    this.radius = radius;
    this.speed = speed;
    this.rotation = 0;
}

Gear.prototype.step = function(){
    this.rotation += this.speed;
}

Gear.prototype.get_vector() = function() {
    var rads = Math.PI * this.rotation / 360;
    var x = this.radius * Math.cos(rads);
    var y = this.radius * Math.sin(rads);
    return [x, y];
}

function Spirograph() {
    this.gears = [];
    this.size = 0;
}

Spirograph.prototype.add_gear = function(gear) {
    this.gears.push(gear);
    this.size += this.gear.radius;
}

Spirograph.prototype.step() = function() {
    var len = this.gears.length;
    var i = 0;
    var gear;
    var delta = [0, 0];
    delta[0] += center[0];
    delta[1] += center[1];
    for (i = 0; i < len - 1; i++) {
        gear = this.gears[i];
        gear.step();
        var vector = gear.get_vector();
        delta[0] += vector[0];
        delta[1] += vector[1];
    }
    return delta;
}

function mainloop() {
    if (paused == false) {
        
    }
}

function init() {
    canvas = document.getElementById("canv");
    context = canvas.getContext("2d");
    center = [canvas.width / 2, canvas.height / 2];
    spiro = Spirograph();
    spiro.add_gear(new Gear(100, 5));
    spiro.add_gear(new Gear(50, 17));
}
