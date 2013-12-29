var paused = true,
    spiro,
    canvas,
    context,
    center,
    point;

function Line(length, speed) {
    this.length = length;
    this.speed = speed;
    this.rotation = 0;
}

Line.prototype.step = function() {
    this.rotation += this.speed;
    var rads = Math.PI * this.rotation / 360;
    var x = this.length * Math.cos(rads);
    var y = this.length * Math.sin(rads);
    return [x, y];
}

function Spirograph() {
    this.lines = [400];
    this.lines.push(new Line(400, speed))
    this.size = 0;
}

Spirograph.prototype.add_gear = function(percent, speed) {
    last_line =  this.lines[this.lines.length - 1];
    line_len = last_line * percent / 100;
    last_line.length *= ((100 - percent) / 100);
    new_line = (line_len, speed);
    this.lines.push(new_line);
    this.gears.push(new_line);
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
        setTimeout(mainloop, 10);
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
    spiro.add_gear(new Line(200, 7));
    spiro.add_gear(new Line(107, -11));
    point = spiro.step();
    paused = true;
    mainloop();
}
