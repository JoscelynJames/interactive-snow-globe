// canvas
var canvas = document.getElementById('snow');
var ctx = canvas.getContext('2d');
// snow globe
var snowglobe = document.getElementById("snowglobe");
// base 
var base = document.getElementById("base");
// set the hight for the canvas so it fits just the globe
var snowGlobeHeight = snowglobe.height.baseVal.value;
var snowGlobeWidth = snowglobe.width.baseVal.value;
var width = ctx.canvas.width = snowGlobeWidth;
var height = ctx.canvas.height = snowGlobeHeight - (base.getBoundingClientRect().height);
// get the animation frames 
var animFrame = window.requestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.msRequestAnimationFrame;
var snowflakes = [];
// resizes canvas if the page is resized 
window.onresize = () => {
	var snowGlobeHeight = snowglobe.height.baseVal.value;
	var snowGlobeWidth = snowglobe.width.baseVal.value;
	var width = ctx.canvas.width = snowGlobeWidth;
	var height = ctx.canvas.height = snowGlobeHeight - (base.getBoundingClientRect().height);
}

function update() {
	for (var i = 0; i < snowflakes.length; i++) {
		snowflakes[i].update();
	}
}
// custom random function 
function random(min, max) {
	var num = (min + Math.random() * (max - min)).toFixed(1);
	num = Math.round(num);
	return num;
}
// create the class Snow 
class Snow {
	constructor() {
		this.x = random(0, width);
		this.y = random(-height, 0);
		this.radius = random(1, 4);
		this.speed = random(1, 2);
		this.wind = random(-0.5, 3.0);
	}
}
// draw the snow on the canvas(ctx)
Snow.prototype.draw = function () {
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
	ctx.fillStyle = '#fff';
	ctx.fill();
	ctx.closePath();
}

Snow.prototype.update = function () {
	this.y += this.speed;
	this.x += this.wind;

	if (this.y > ctx.canvas.height) {
		if (this.isResized) {
			this.y = 0;
			this.x = Math.random(0, width);
		}	
	}
}

function createSnow(count) {
	for (var i = 0; i < count; i++) {
		snowflakes[i] = new Snow();
	}
}

function draw() {
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	for (var i = 0; i < snowflakes.length; i++) {
		snowflakes[i].draw();
	}
}

function loop() {
	draw();
	update();
	animFrame(loop);
}


function shake() {
	var snowglobe = document.getElementById("snowglobe");
	var shakeTimeline = anime.timeline();
	var tiltRight = {
		targets: snowglobe,
		rotate: {
			value: 30,
			duration: 300,
			easing: 'easeInOutCirc'
		},
	}

	var tileLeft = {
		targets: snowglobe,
		rotate: {
			value: -30,
			duration: 300,
			easing: 'easeInOutCirc'
		},
	}

	shakeTimeline
		.add(tiltRight, createSnow(500))
		.add(tileLeft, loop())
		.add(tiltRight)
		.add(tileLeft)
		.add({
			targets: snowglobe,
			rotate: {
				value: 0,
				duration: 300,
				easing: 'easeInOutCubic'
			},
		})

}
