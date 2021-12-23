// determine mode
var motionSupport = false;
var stickMode = false;
var rightHand = false;
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
    
    if (ax != null) {   // device has motion sensor
        if (!motionSupport) {
            motionSupport = true;
            stickModeToggle("R");
            muteToggle();
        }
    }

    if (stickMode && rightHand) {
        if (ax < loadBoundary && !loaded) {   // raising phone high enough will load the device
                loaded = true;
        }
        if (ax > triggerBoundary && loaded) {   // lower the phone to trigger the sound when device is loaded
                loaded = false;
                playSound();            
        }
    }

    if (footMode || ( stickMode && leftHand )) {
        if (ax > loadBoundary) {    // raising phone high enough will load the device
            loaded = true;
        }
        if (ax < triggerBoundary) { // lower the phone to trigger the sound when device is load
            if (loaded) {
                loaded = false;
                playSound();           
            }
        }
    }
}

// play sound
function playSound() {
    audio = new Audio(audioPath[path]);
    audio.play();
}

// active the sound set when pressing a drum button
function drumButtonClick(number) {
    if (path != null) {
        turnOffButton(drumButton[path]);
    }

    turnOnButton(drumButton[number]);
    path = number;

    if (buttonMuted == false) { // play a sound if button is not muted
        playSound();
    }
}

// toggle mute behavior for the buttons
function muteToggle() {
    if (buttonMuted == false) {
        buttonMuted = true;
        turnOffButton(optionButton[3]);
    } else {
        buttonMuted = false;
        turnOnButton(optionButton[3]);
    }
}

// toggle stick mode
function stickModeToggle(hand) {
    if (!motionSupport) {   // no motion sensor
        return
    }
    
    if(hand == "R") {   // right stick
        if (rightHand) {    // turning off
            stickMode = false;
            rightHand = false;
            turnOffButton(optionButton[1]);
            return
        }

        stickMode = true;
        footMode = false;
        rightHand = true;
        leftHand = false;
        loadBoundary = rightStickLoadBoundary;
        triggerBoundary = rightStickTriggerBoundary;
        turnOnButton(optionButton[1]);
        turnOffButton(optionButton[0]);
        turnOffButton(optionButton[2]);
    } else if (hand == "L") {   // left stick
        if (leftHand) { // turning off
            stickMode = false;
            leftHand = false;
            turnOffButton(optionButton[0]);
            return
        }

        stickMode = true;
        footMode = false;
        rightHand = false;
        leftHand = true;
        loadBoundary = leftStickLoadBoundary;
        triggerBoundary = leftStickTriggerBoundary;
        turnOnButton(optionButton[0]);
        turnOffButton(optionButton[1]);
        turnOffButton(optionButton[2]);
    }
}

// toggle foot mode
function footModeToggle() {
    if (!motionSupport) {   // no motion sensor
        return
    } else if (footMode) {  // turning off
        footMode = false;
        turnOffButton(optionButton[2]);
        return
    }

    stickMode = false;
    footMode = true;
    loadBoundary = footLoadBoundary;
    triggerBoundary = footTriggerBoundary;
    turnOnButton(optionButton[2]);
    turnOffButton(optionButton[0]);
    turnOffButton(optionButton[1]);
}

// button turn off animation
function turnOffButton(id) {
    btn = document.querySelector("#" + id);
    btn.style.backgroundColor = "black";
    btn.style.color = "white"
}

// button turn on animation
function turnOnButton(id) {
    btn = document.querySelector("#" + id);
    btn.style.backgroundColor = "green";
    btn.style.color = "black"
}