var paused = true,
    spiro,
    canvas,
    context,
    line_canvas,
    line_context,
    circle_canvas,
    circle_context,
    center,
    point;

function Gear(x, y, radius) {
    'use strict';
    this.x = x;
    this.y = y;
    this.radius = radius;
}

function Line(length, speed) {
    'use strict';
    this.length = length;
    this.speed = speed;
    this.rotation = 0;
}

Line.prototype.step = function() {
    'use strict';
    var x, y, rads;
    this.rotation += this.speed;
    rads = Math.PI * this.rotation / 360;
    x = this.length * Math.cos(rads);
    y = this.length * Math.sin(rads);
    return [x, y];
};

function Spirograph() {
    'use strict';
    this.lines = [];
    this.lines.push(new Line(400, 1));
    this.gears = [];
    this.gears.push(new Gear(center[0], center[1], 400));
    this.size = 0;
}

Spirograph.prototype.add_gear = function(percent, speed) {
    'use strict';
    var line_len, last_line, new_line;
    last_line = this.lines[this.lines.length - 1];
    line_len = last_line.length * percent / 100;
    last_line.length *= ((100 - percent) / 100);
    new_line = new Line(line_len, speed);
    this.lines.push(new_line);
    this.gears.push(new Gear(0, 0, line_len));
};

Spirograph.prototype.step = function() {
    'use strict';
    var len, i, line, gear, vector, delta;
    delta = [0, 0];
    delta[0] += center[0];
    delta[1] += center[1];
    for (i = 0; i < this.lines.length; i++) {
        this.gears[i].x = delta[0];
        this.gears[i].y = delta[1];
        line = this.lines[i];
        vector = line.step();
        delta[0] += vector[0];
        delta[1] += vector[1];
    }
    return delta;
};

function mainloop() {
    'use strict';
    if (paused === false) {
        // update the line on off-screen canvas
        line_context.moveTo(point[0], point[1]);
        point = spiro.step();
        line_context.lineTo(point[0], point[1]);
        line_context.stroke();

        // predraw the circles on off-screen canvas
        var i, lines, gear;
        lines = spiro.lines;
        circle_context.clearRect(0, 0, canvas.width, canvas.height);
        circle_context.drawImage(line_canvas, 0, 0);
        circle_context.beginPath();
        circle_context.arc(point[0], point[1], 3, 0, Math.PI * 2, false);
        for (i = 0; i < spiro.gears.length; i++) {
            gear = spiro.gears[i];
            circle_context.moveTo(gear.x + gear.radius, gear.y);
            circle_context.arc(gear.x, gear.y, gear.radius, 0, 
                    Math.PI * 2, false);
        }
        circle_context.stroke();

        // draw everything on the visible canvas
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(circle_canvas, 0, 0);

        setTimeout(mainloop, 10);
    }
}

function toggle_pause() {
    'use strict';
    pause = document.getElementById("pause");
    if (paused === true) {
        paused = false;
        pause.innerHTML = "Pause";
        mainloop();
    } else {
        paused = true;
        pause.innerHTML = "Start";
    }
    return false;
}

function readKey(event) {
    'use strict';
    switch (event.keyCode) {
        case 32:
            toggle_pause();
            break;
    }
    // console.log(event.keyCode);
}

function init() {
    'use strict';

    // visible "main" canvas
    canvas = document.getElementById('canv');
    context = canvas.getContext('2d');

    // own context for spirograph line since it doesn't need redrawing
    line_canvas = document.createElement('canvas');
    line_canvas.width = canvas.width;
    line_canvas.height = canvas.height;
    line_context = line_canvas.getContext('2d');
    line_context.clearRect(0, 0, canvas.width, canvas.height);
    line_context.strokeStyle = '#666666';

    // own context for spirograph "gears" since they are redrawn each frame
    circle_canvas = document.createElement('canvas');
    circle_canvas.width = canvas.width;
    circle_canvas.height = canvas.height;
    circle_context = circle_canvas.getContext('2d');
    circle_context.clearRect(0, 0, canvas.width, canvas.height);
    circle_context.strokeStyle = '#888888';

    center = [canvas.width / 2, canvas.height / 2];
    spiro = new Spirograph();
    spiro.add_gear(30, -2);
    spiro.add_gear(20, 3);
    point = spiro.step();
    paused = true;
    mainloop();
}
