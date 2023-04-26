"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Vector =
/*#__PURE__*/
function () {
  function Vector(x, y) {
    _classCallCheck(this, Vector);

    this.x = x;
    this.y = y;
  }

  _createClass(Vector, [{
    key: "add",
    value: function add(v) {
      return new Vector(this.x + v.x, this.y + v.y);
    }
  }, {
    key: "addTo",
    value: function addTo(v) {
      this.x += v.x;
      this.y += v.y;
      return this;
    }
  }, {
    key: "sub",
    value: function sub(v) {
      return new Vector(this.x - v.x, this.y - v.y);
    }
  }, {
    key: "subFrom",
    value: function subFrom(v) {
      this.x -= v.x;
      this.y -= v.y;
    }
  }, {
    key: "mult",
    value: function mult(n) {
      return new Vector(this.x * n, this.y * n);
    }
  }, {
    key: "multTo",
    value: function multTo(n) {
      this.x *= n;
      this.y *= n;
      return this;
    }
  }, {
    key: "div",
    value: function div(n) {
      return new Vector(this.x / n, this.y / n);
    }
  }, {
    key: "divTo",
    value: function divTo(n) {
      this.x /= n;
      this.y /= n;
    }
  }, {
    key: "setAngle",
    value: function setAngle(angle) {
      var length = this.getLength();
      this.x = Math.cos(angle) * length;
      this.y = Math.sin(angle) * length;
    }
  }, {
    key: "setLength",
    value: function setLength(length) {
      var angle = this.getAngle();
      this.x = Math.cos(angle) * length;
      this.y = Math.sin(angle) * length;
    }
  }, {
    key: "getAngle",
    value: function getAngle() {
      return Math.atan2(this.y, this.x);
    }
  }, {
    key: "getLength",
    value: function getLength() {
      return Math.hypot(this.x, this.y);
    }
  }, {
    key: "getLengthSq",
    value: function getLengthSq() {
      return this.x * this.x + this.y * this.y;
    }
  }, {
    key: "distanceTo",
    value: function distanceTo(v) {
      return this.sub(v).getLength();
    }
  }, {
    key: "distanceToSq",
    value: function distanceToSq(v) {
      return this.sub(v).getLengthSq();
    }
  }, {
    key: "manhattanDistanceTo",
    value: function manhattanDistanceTo(v) {
      return Math.abs(v.x - this.x) + Math.abs(v.y - this.y);
    }
  }, {
    key: "copy",
    value: function copy() {
      return new Vector(this.x, this.y);
    }
  }, {
    key: "rotate",
    value: function rotate(angle) {
      return new Vector(this.x * Math.cos(angle) - this.y * Math.sin(angle), this.x * Math.sin(angle) + this.y * Math.cos(angle));
    }
  }, {
    key: "rotateTo",
    value: function rotateTo(angle) {
      var x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
      var y = this.x * Math.sin(angle) + this.y * Math.cos(angle);
      this.x = x;
      this.y = y;
      return this;
    }
  }, {
    key: "rotateAround",
    value: function rotateAround(v, angle) {
      var x = (this.x - v.x) * Math.cos(angle) - (v.y - this.y) * Math.sin(angle) + v.x;
      var y = (this.x - v.x) * Math.sin(angle) + (v.y - this.y) * Math.cos(angle) + v.y;
      return new Vector(x, y);
    }
  }, {
    key: "rotateMeAround",
    value: function rotateMeAround(v, angle) {
      var x = (this.x - v.x) * Math.cos(angle) - (v.y - this.y) * Math.sin(angle) + v.x;
      var y = (this.x - v.x) * Math.sin(angle) + (v.y - this.y) * Math.cos(angle) + v.y;
      this.x = x;
      this.y = y;
      return this;
    }
  }, {
    key: "equals",
    value: function equals(v) {
      return this.x == v.x && this.y == v.y;
    }
  }, {
    key: "reflectAlongX",
    value: function reflectAlongX() {
      this.y *= -1;
    }
  }, {
    key: "reflectAlongY",
    value: function reflectAlongY() {
      this.x *= -1;
    }
  }]);

  return Vector;
}();

var config = {
  text: ["Welcome to", "PieceArt"],
  widthToSpikeLengthRatio: 0.014
};
var colorConfig = {
  particleOpacity: 0.2,
  baseHue: 899,
  hueRange: 9,
  hueSpeed: 0.04,
  colorSaturation: 100
};

var Planet =
/*#__PURE__*/
function () {
  function Planet(x, y, g) {
    _classCallCheck(this, Planet);

    this.pos = new Vector(x, y);
    this.g = g;
  }

  _createClass(Planet, [{
    key: "draw",
    value: function draw() {
      ctx.fillStyle = "#AAA";
      ctx.beginPath();
      ctx.arc(this.pos.x, this.pos.y, 8, 0, Math.PI * 2);
      ctx.fill();
    }
  }]);

  return Planet;
}(); // A line that is part of forming the text


var Particle =
/*#__PURE__*/
function () {
  function Particle(x, y) {
    _classCallCheck(this, Particle);

    this.pos = new Vector(x, y);
    this.vel = new Vector(0, spikeLength);
  }

  _createClass(Particle, [{
    key: "move",
    value: function move(force) {
      if (force) {
        this.vel.addTo(force);
      }

      if (this.vel.getLength() > spikeLength) {
        this.vel.setLength(spikeLength);
      }
    }
  }, {
    key: "draw",
    value: function draw() {
      ctx.beginPath();
      ctx.moveTo(this.pos.x, this.pos.y);
      var p2 = this.pos.add(this.vel);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    }
  }]);

  return Particle;
}();

var canvas;
var ctx;
var w, h;
var hue;
var particles;
var spikeLength;
var planets;
var A;
var B;
var a;
var b;
var tick;

function setup() {
  tick = 0;
  planets = [];
  var len = Math.round(Math.random() * 3 + 3);

  for (var i = 0; i < len; i++) {
    var p = new Planet(50 + i * 100, 340, i ? 1000 : 4000);
    planets.push(p);
  }

  canvas = document.querySelector("#text-canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("resize", reset);
  canvas.addEventListener("mousemove", mousemove);
  reset();
}

function reset() {
  hue = colorConfig.baseHue;
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  spikeLength = w * config.widthToSpikeLengthRatio;
  A = w / 2.2;
  B = h / 2.2;
  a = Math.round(Math.random() + 2);
  b = Math.round(Math.random() + 2);
  drawText();
}

function mousemove(event) {
  var x = event.clientX;
  var y = event.clientY;
  planets[0].pos.x = x;
  planets[0].pos.y = y;
}

function draw(now) {
  clear();
  requestAnimationFrame(draw);
  updateParticles();
  updatePlanets();
  tick = now / 50;
}

function clear() {
  ctx.clearRect(0, 0, w, h);
}

function drawText() {
  ctx.save();
  var fontSize = w * 0.065;
  ctx.font = "bold " + fontSize + "px Arial, Helvetica, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.lineWidth = 0.3;
  ctx.strokeStyle = "white";
  ctx.strokeText(config.text[0], w / 2, h / 4);
  ctx.strokeText(config.text[1], w / 2, h / 2.5);
  ctx.restore();
  var imageData = ctx.getImageData(0, 0, w, h);
  particles = [];

  for (var x = 0; x < w; x++) {
    for (var y = 0; y < h; y++) {
      var i = (x + w * y) * 4;
      var average = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2] + imageData.data[i + 3]) / 4;

      if (average > 200) {
        var particle = new Particle(x, y);
        particles.push(particle);
      }
    }
  }

  clear();
}

function updatePlanets() {
  var len = planets.length;

  for (var i = 1; i < len; i++) {
    var angle = Math.PI * 2 / (len - 1) * i;
    var x = A * Math.sin(a * tick / 100 + angle) + w / 2;
    var y = B * Math.sin(b * tick / 100 + angle) + h / 2;
    var p = planets[i];
    p.pos.x = x;
    p.pos.y = y;
    p.draw();
  }
}

function updateParticles() {
  hue += colorConfig.hueSpeed;
  var h = Math.sin(hue) * colorConfig.hueRange + colorConfig.baseHue;
  ctx.strokeStyle = "hsla(".concat(h, ", ").concat(colorConfig.colorSaturation, "%, 50%, ").concat(colorConfig.particleOpacity, ")");
  particles.forEach(function (p) {
    // Apply the force of each planet (repeller) to the current particle
    planets.forEach(function (planet) {
      var d = p.pos.sub(planet.pos);
      var length = d.getLength();
      var g = planet.g / length;

      if (g > 40) {
        g = 40;
      } // We keep the angle of the distance


      d.setLength(g);
      p.move(d);
    });
    p.draw();
  });
}

setup();
draw(1);
VANTA.BIRDS({
  el: ".vanta-canvas",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.00,
  color1: 0xa4ff,
  color2: 0xff00d1
});
document.querySelector('.vanta-canvas').style.width = '100%';
document.querySelector('.vanta-canvas').style.maxHeight = 'calc(84vh - 100px)';
document.querySelector('#text-canvas').style.width = '100%';
document.querySelector('#text-canvas').style.maxHeight = 'calc(84vh - 100px)';