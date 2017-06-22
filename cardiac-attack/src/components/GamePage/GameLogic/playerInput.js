// object to relate keycodes to keyname
const KeyCodes = {
    32: 'space',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
}

// generate object to store status of each key
// initialize status of all pressed keys to false
const KeyStatus = {}

for (let code in KeyCodes) {
    KeyStatus[KeyCodes[code]] = false
}

// listener to change key status to true when key is pressed
document.onkeydown = (e) => {
    let currCode = (e.keyCode) ? e.keyCode : e.charCode
    if (KeyCodes[currCode]) {
        KeyStatus[KeyCodes[currCode]] = true;
    }
}

// listener to change key status to false when key is release
document.onkeyup = (e) => {
    e.preventDefault()
    let currCode = (e.keyCode) ? e.keyCode : e.charCode
    if (KeyCodes[currCode]) {
        KeyStatus[KeyCodes[currCode]] = false;
    }
}
