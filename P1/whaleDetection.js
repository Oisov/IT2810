function findPos(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
    return undefined;
}

function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

window.onload = function() {

    let img = new Image();

    img.src = "new_whale.png";
    img.setAttribute('crossOrigin', '');
    img.onload = function() {

        ctx.drawImage(img, 0, 0, img.width,    img.height,     // source rectangle
                           0, 0, canvas.width, canvas.height); // destination rectangle

        ctx.beginPath();
        ctx.arc(eyeCoords.x, eyeCoords.y, eye_radius, 0, 2*Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(eyeCoords.x, eyeCoords.y, 1.05*eye_radius, 0, 2*Math.PI);
        ctx.fillStyle = "#0D77B8";
        ctx.fill();
    };


}; // end window.onload

var offset = $('#canvas').offset();

$(window).resize(function() {
    offset = $('#canvas').offset();
});

var eyeCoords = { x: 243, y: 72 };
var currentMousePos = { x: -1, y: -1 };
var eyeball_radius = 0.5;
var eye_radius = 14;

function distance_2_eye(X, Y) {
    return (Math.sqrt(Math.pow(X, 2) + Math.pow(Y, 2)));
}

function in_eye(){
    currentMousePos.x = event.pageX - offset.left - eyeCoords.x;
    currentMousePos.y = event.pageY - offset.top - eyeCoords.y;
    return (distance_2_eye(currentMousePos.x, currentMousePos.y) < eye_radius);
}

function oogly_eyes(){
    currentMousePos.x = event.pageX - offset.left - eyeCoords.x;
    currentMousePos.y = event.pageY - offset.top - eyeCoords.y;

    let angle = Math.atan2(-currentMousePos.x, currentMousePos.y) + Math.PI/2;

    let new_eye_pos = { x: eyeCoords.x + eyeball_radius*eye_radius*Math.cos(angle),
                        y: eyeCoords.y + eyeball_radius*eye_radius*Math.sin(angle) };

    ctx.beginPath();
    ctx.arc(eyeCoords.x, eyeCoords.y, eye_radius, 0, 2*Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(new_eye_pos.x, new_eye_pos.y, eyeball_radius*eye_radius, 0, 2*Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
}


$('#canvas').click(function(){
    let x = event.pageX - offset.left;
    let y = event.pageY - offset.top;
    let coord = "x=" + x + ", y=" + y;
    let p = ctx.getImageData(x, y, 1, 1).data;
    let hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);

    if (hex == "#0d77b8" || hex == "#ffffff") {
        $(".hidden-wifi").fadeToggle();
    }

});

$(document).mousemove(function(event) {

    if (in_eye()) {
        ctx.beginPath();
        ctx.arc(eyeCoords.x, eyeCoords.y, 1.05*eye_radius, 0, 2*Math.PI);
        ctx.fillStyle = "#0D77B8";
        ctx.fill();
    } else {
        oogly_eyes();
    }
});

