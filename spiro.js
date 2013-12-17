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
    this.spiro = [];
    this.size = 0;
}

Spirograph.prototype.add_gear = function(gear) {
    this.spiro.push(gear);
    this.size += this.gear.radius;
}


