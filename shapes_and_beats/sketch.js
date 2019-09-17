
// Player class

let Player = function(x = 0, y = 0, col = palette.BLUE, width = 10, height = 10, speed = 5) {

	this.DIR = createVector(1, 0);
	this.WIDTH = width;
	this.SPEED = speed;
	this.HEIGHT = height;

	this.pos = createVector(x, y);
	this.col = col;
	
	this.width = this.WIDTH;
	this.height = this.HEIGHT;
	this.dir = this.DIR;
	this.speed = this.SPEED;

	this.transformStage = 0;
}

Player.prototype.draw = function() {
	push();
	rectMode(RADIUS);
	noStroke();
	fill(this.col);
	translate(this.pos.x, this.pos.y);
	rotate(this.dir.heading())
	rect(0, 0, this.width, this.height);
	pop();
}

Player.prototype.transform = function(dir = null, change = false) {
	const LAST_TRANSFORM_STAGE = 4;
	if (change) {
		this.transformStage = LAST_TRANSFORM_STAGE;
		this.dir = dir;
	}
	else {
		this.dir = this.DIR;
	}
}

Player.prototype.applyTransform = function() {
	const TRANSFORM_SPEED = 15;

	this.width = this.WIDTH * (1 + this.transformStage / TRANSFORM_SPEED);
	this.height = this.HEIGHT * (1 - this.transformStage / TRANSFORM_SPEED);

	if (this.transformStage > 0)
		this.transformStage--;
}

Player.prototype.update = function(force = null) {

	if (force) {
		this.pos.x += force.x * this.speed;
		this.pos.y += force.y * this.speed;
		this.transform(force, change = true);
	}
	this.applyTransform();
}

let applyForce = function(left = false, up = false, right = false, down = false) {
	return createVector(left * (-1) + right, up * (-1) + down);
}

// Global variables

let palette;
let player;

// Setup

function setup() {
	createCanvas(window.innerWidth, window.innerHeight + 5);

	palette = {
		BLACK: color("#1e1b1b"),
		PINK:  color("#ff2071"),
		BLUE:  color("#00FFFF"),
	}

	player = new Player(width / 2, height / 2);
}

// Draw

function draw() {
	if (keyIsPressed) {
		let force = applyForce(keyIsDown(LEFT_ARROW), keyIsDown(UP_ARROW), keyIsDown(RIGHT_ARROW), keyIsDown(DOWN_ARROW))
		player.update(force);
	}
	else {
		player.update();
	}

	background(palette.BLACK);
	player.draw();
}
