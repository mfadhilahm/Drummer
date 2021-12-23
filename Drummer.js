// determine mode

var motionSupport = false;
var stickMode = true;
var rightHand = true;
var leftHand = false;
var footMode = false;
var buttonMuted = false;

// audio stuff
var audio;
var path;   // which audio path is currently chosen
var audioPath = ["Drums/Hi-hat (Closed).mp3",
    "Drums/Hi-hat (Open).mp3",
    "Drums/Crash Cymbal.mp3",
    "Drums/Ride Cymbal.mp3",
    "Drums/Snare Drum.mp3",
    "Drums/High Tom-tom.mp3",
    "Drums/Low Tom-tom.mp3",
    "Drums/Floor Tom.mp3",
    "Drums/Snare Drum (Cross Stick).mp3",
    "Drums/Hi-hat (Foot).mp3",
    "Drums/Bass Drum.mp3"
];  // paths to audio files

// device needs to be loaded before firing a sound with motion
var loaded = false;
var loadBoundary = 1;
var triggerBoundary = 7.5;

const rightStickLoadBoundary = 1;
const rightStickTriggerBoundary = 7.5;
const leftStickLoadBoundary = -1;
const leftStickTriggerBoundary = -7.5;
const footLoadBoundary = 2;
const footTriggerBoundary = -2;

//buttons
var drumButton = ["btn_1",
    "btn_2",
    "btn_3",
    "btn_4",
    "btn_5",
    "btn_6",
    "btn_7",
    "btn_8",
    "btn_9",
    "btn_10",
    "btn_11"
]

var optionButton = ["stickButtonL",
    "stickButtonR",
    "footButton",
    "muteButton"
]

//  motion detection
window.ondevicemotion = function(event) {
    var ax = event.accelerationIncludingGravity.x
    
    if (ax != null) {
        if (!motionSupport) {
            motionSupport = true;
            turnOnButton(optionButton[1]);
            turnOffButton(optionButton[0]);
            turnOffButton(optionButton[2]);
            muteToggle();
        }
    }

    if (stickMode && rightHand) {
        if (ax < loadBoundary && !loaded) {   /* raising phone high enough will load the device */
            
                d = ax;
                loaded = true;
            
        }
        if (ax > triggerBoundary && loaded) {
                loaded = false;
                    /*if(audioT[currSound].currentTime == 0 || audioT[currSound].ended) {
                        audioT[currSound].play();
                    }
                    currSound = (currSound + 1) % audioT.length;*/
                playSound();
                document.querySelector("#acc").innerHTML = "load = " + d + "<br>" + "trigger = " + ax;
            
        }
    }

    if (footMode || ( stickMode && leftHand )) {
        if (ax > loadBoundary) {
            loaded = true;
        }
        if (ax < triggerBoundary) {
            if (loaded) {
                loaded = false;
                playSound();           
            }
        }
    }
}

function playSound() {
    audio = new Audio(audioPath[path]);
    audio.play();
}

function buttonClick(number) {
    if (path != null) {
        turnOffButton(drumButton[path]);
    }
    turnOnButton(drumButton[number]);
    path = number;
    if (buttonMuted == false) {
        playSound();
    }
}

function muteToggle() {
    if (buttonMuted == false) {
        buttonMuted = true;
        turnOffButton(optionButton[3]);
    } else {
        buttonMuted = false;
        turnOnButton(optionButton[3]);
    }
}

function stickModeToggle(hand) {
    stickMode = true;
    footMode = false;
    if(hand == "R") {
        rightHand = true;
        leftHand = false;
        loadBoundary = rightStickLoadBoundary;
        triggerBoundary = rightStickTriggerBoundary;
        turnOnButton(optionButton[1]);
        turnOffButton(optionButton[0]);
        turnOffButton(optionButton[2]);
    } else if (hand == "L") {
        rightHand = false;
        leftHand = true;
        loadBoundary = leftStickLoadBoundary;
        triggerBoundary = leftStickTriggerBoundary;
        turnOnButton(optionButton[0]);
        turnOffButton(optionButton[1]);
        turnOffButton(optionButton[2]);
    }
}

function footModeToggle() {
    stickMode = false;
    footMode = true;
    loadBoundary = footLoadBoundary;
    triggerBoundary = footTriggerBoundary;
    turnOnButton(optionButton[2]);
    turnOffButton(optionButton[0]);
    turnOffButton(optionButton[1]);
}

function turnOffButton(id) {
    btn = document.querySelector("#" + id);
    btn.style.backgroundColor = "black";
    btn.style.color = "white"
}

function turnOnButton(id) {
    btn = document.querySelector("#" + id);
    btn.style.backgroundColor = "green";
    btn.style.color = "black"
}

/*var audioT;
var currSound = 0;*/

/*function playSound() {
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
    path = soundPath[number];

    if (buttonMuted == false) {
        playSound();
    }
}*/

/*window.addEventListener("deviceorientation", function(event) {
	
    
    if (event.beta > 70) {
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

    }
    
    document.querySelector("#mag").innerHTML = "alpha = " + event.alpha + "<br>" + "beta = " + event.beta + "<br>" + "gamma = " + event.gamma + path;

}, true);*/