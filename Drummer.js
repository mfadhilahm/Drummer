var triggered = true;
var loaded = true;
var audio = new Audio('Drums/Hi-hat (open).mp3')

window.addEventListener("deviceorientation", function(event) {
	document.querySelector("#mag").innerHTML = "alpha = " + event.alpha + "<br>" + "beta = " + event.beta + "<br>" + "gamma = " + event.gamma;
    if(event.beta < 0) {
        audio.play();
    }
}, true);

window.ondevicemotion = function(event) { 
	var ax = event.accelerationIncludingGravity.x
	var ay = event.accelerationIncludingGravity.y
	var az = event.accelerationIncludingGravity.z

	document.querySelector("#acc").innerHTML = "X = " + ax + "<br>" + "Y = " + ay + "<br>" + "Z = " + az;
}

function playSound() {
    audio.play();

}