var triggered = false;
var loaded = false;
var audio = new Audio('Drums/Hi-hat (Open).mp3');
var audioT = [new Audio('Drums/Hi-hat (Open).mp3'),
new Audio('Drums/Hi-hat (Open).mp3'),
new Audio('Drums/Hi-hat (Open).mp3'),
new Audio('Drums/Hi-hat (Open).mp3'),
new Audio('Drums/Hi-hat (Open).mp3')
];
var currSound = 0;
var path = "Drums/Hi-hat (Open).mp3";

var soundPath = ["Drums/Hi-hat (Closed).mp3",
    "Drums/Hi-hat (Open).mp3",
    "Drums/Crash Symbal.mp3",
    "Drums/Ride Symbal.mp3",
    "Drums/Snare Drum.mp3",
    "Drums/High Tom-tom.mp3",
    "Drums/Low Tom-tom.mp3",
    "Drums/Floor Tom.mp3",
    "Drums/Snare Drum (Cross Stick).mp3",
    "Drums/Hi-hat (Foot).mp3",
    "Drums/Bass Drum.mp3"
];

window.addEventListener("deviceorientation", function(event) {
	
    
    /*if (event.beta > 70) {
        loaded = true;
    }
    if (event.beta < 30) {
        if (loaded) {
            loaded = false;
            if(event.beta < 30) {
                if(audioT[currSound].currentTime == 0 || audioT[currSound].ended) {
                    audioT[currSound].play();
                }
                currSound = (currSound + 1) % audioT.length;
            
            }
        }

    }*/
    
    document.querySelector("#mag").innerHTML = "alpha = " + event.alpha + "<br>" + "beta = " + event.beta + "<br>" + "gamma = " + event.gamma + path;

}, true);

window.ondevicemotion = function(event) { 
	var ax = event.accelerationIncludingGravity.x
	var ay = event.accelerationIncludingGravity.y
	var az = event.accelerationIncludingGravity.z

	document.querySelector("#acc").innerHTML = "X = " + ax + "<br>" + "Y = " + ay + "<br>" + "Z = " + az + "<br>";

    if (ax < 1) {
        loaded = true;
    }
    if (ax > 7.5) {
        if (loaded) {
            loaded = false;
                if(audioT[currSound].currentTime == 0 || audioT[currSound].ended) {
                    audioT[currSound].play();
                }
                currSound = (currSound + 1) % audioT.length;
            
            
        }
    }

}

function playSound() {
    if(audioT[currSound].currentTime == 0 || audioT[currSound].ended) {
        audioT[currSound].play();
    }
    currSound = (currSound + 1) % audioT.length;
}

function soundChange(number) {

    audioT = [new Audio(soundPath[number]),
        new Audio(soundPath[number]),
        new Audio(soundPath[number]),
        new Audio(soundPath[number]),
        new Audio(soundPath[number])
    ];
    audioT.load();
    path = soundPath[number];
}
