const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");
let painting = false;

canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;

function startPosition(e) {
	painting = true;
	draw(e);
}

function endPosition() {
	painting = false;
	ctx.beginPath();
}

ctx.strokeStyle = "black";
ctx.lineWidth = 5;

function setColor(color) {
	ctx.strokeStyle = color;
	activeButton = document.getElementById(color);
	activeButton.classList.add("active");

	//remove active class from all other buttons
	var buttons = document.getElementsByClassName("color");
	for (var i = 0; i < buttons.length; i++) {
		if (buttons[i].id != color) {
			buttons[i].classList.remove("active");
		}
	}
}

function setSize(size) {
	ctx.lineWidth = size;
	activeButton = document.getElementsByClassName(size);
	activeButton.classList.add("active");

	//remove active class from all other buttons
	var buttons = document.getElementsByClassName("sizes");
	for (var i = 0; i < buttons.length; i++) {
		if (buttons[i].id != size) {
			buttons[i].classList.remove("active");
		}
	}
}

function draw(e) {
	if (!painting) return;

	ctx.lineCap = "round";

	ctx.lineTo(e.clientX, e.clientY);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(e.clientX, e.clientY);
}

function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function saveCanvas() {
	var image = canvas
		.toDataURL("image/png")
		.replace("image/png", "image/octet-stream");

	var link = document.createElement("a");

	link.download = "creation.png";
	link.href = image;
	link.click();
}

function dragToolbar() {
	toolbar = document.getElementById("toolbar");

	//when mouse is down on the toolbar, move the toolbar
	toolbar.addEventListener(
		"mousedown",
		function (e) {
			window.addEventListener("mousemove", move, false);
		},
		false
	);

	//when mouse is up, stop moving the toolbar
	window.addEventListener(
		"mouseup",
		function () {
			window.removeEventListener("mousemove", move, false);
		},
		false
	);

	//move the toolbar
	function move(e) {
		toolbar.style.top = e.clientY + "px";
		toolbar.style.left = e.clientX + "px";
	}

	//prevent the toolbar from being dragged when clicking on the buttons
	toolbar.addEventListener(
		"click",
		function (e) {
			e.stopPropagation();
		},
		false
	);

	//prevent the toolbar from being dragged when clicking on the canvas
	canvas.addEventListener(
		"click",
		function (e) {
			e.stopPropagation();
		},
		false
	);
}

canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", endPosition);
canvas.addEventListener("mousemove", draw);

//support for touchscreen devices
canvas.addEventListener("touchstart", startPosition);
canvas.addEventListener("touchend", endPosition);
canvas.addEventListener("touchmove", draw);
