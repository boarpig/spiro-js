var paused = true,
    spiro,
    canvas,
    context,
    center,
    point;

function Gear(radius, speed) {
    this.radius = radius;
    this.speed = speed;
    this.rotation = 0;
}

Gear.prototype.step = function() {
    this.rotation += this.speed;
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
    this.size += gear.radius;
}

Spirograph.prototype.step = function() {
    var len = this.gears.length;
    var i = 0;
    var gear;
    var delta = [0, 0];
    delta[0] += center[0];
    delta[1] += center[1];
    for (i = 0; i < len; i++) {
        gear = this.gears[i];
        var vector = gear.step();
        delta[0] += vector[0];
        delta[1] += vector[1];
    }
    return delta;
}

function mainloop() {
    if (paused === false) {
        context.moveTo(point[0], point[1]);
        point = spiro.step();
        context.lineTo(point[0], point[1]);
        context.stroke();
        setTimeout(mainloop, 1);
    }
}

function toggle_pause() {
    if (paused === true) {
        paused = false;
        mainloop();
    } else {
        paused = true;
    }
}

function readKey(event) {
    switch (event.keyCode) {
        case 32:
            toggle_pause();
            break;
    }
    console.log(event.keyCode);
}

function init() {
    canvas = document.getElementById("canv");
    context = canvas.getContext("2d");
    context.strokeStyle = "#000000";
    center = [canvas.width / 2, canvas.height / 2];
    spiro = new Spirograph();
    spiro.add_gear(new Gear(200, 5));
    spiro.add_gear(new Gear(100, 11));
    spiro.add_gear(new Gear(50, 17));
    point = spiro.step();
    paused = true;
    mainloop();
}
