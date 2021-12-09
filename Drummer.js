var triggered = true;
var loaded = true;
var audio = new Audio('Drums/Hi-hat (open).mp3');
var audioT = [new Audio('Drums/Hi-hat (open).mp3'),
new Audio('Drums/Hi-hat (open).mp3'),
new Audio('Drums/Hi-hat (open).mp3'),
new Audio('Drums/Hi-hat (open).mp3'),
new Audio('Drums/Hi-hat (open).mp3')
];
var currSound = 0;

window.addEventListener("deviceorientation", function(event) {
	document.querySelector("#mag").innerHTML = "alpha = " + event.alpha + "<br>" + "beta = " + event.beta + "<br>" + "gamma = " + event.gamma;
    if(event.beta < 0) {
        if(audioT[currSound].currentTime == 0 || audioT[currSound].ended) {
            audioT[currSound].play();
        }
        currSound = (currSound + 1) % audioT.length;
    
    }
}, true);

window.ondevicemotion = function(event) { 
	var ax = event.accelerationIncludingGravity.x
	var ay = event.accelerationIncludingGravity.y
	var az = event.accelerationIncludingGravity.z

	document.querySelector("#acc").innerHTML = "X = " + ax + "<br>" + "Y = " + ay + "<br>" + "Z = " + az;
}

function playSound() {
    if(audioT[currSound].currentTime == 0 || audioT[currSound].ended) {
        audioT[currSound].play();
    }
    currSound = (currSound + 1) % audioT.length;

}

/*function load() {
    

    audioT = [new Audio('Drums/Hi-hat (open).mp3'),
new Audio('Drums/Hi-hat (open).mp3'),
new Audio('Drums/Hi-hat (open).mp3'),
new Audio('Drums/Hi-hat (open).mp3'),
new Audio('Drums/Hi-hat (open).mp3')
];
}*/
