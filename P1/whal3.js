window.onload = function() {

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    var img = new Image();

    img.src = "new_whale.png";
    img.onload = function() {

        ctx.drawImage(img, 0, 0, img.width,    img.height,     // source rectangle
                           0, 0, canvas.width, canvas.height); // destination rectangle

    };


}; // end window.onload
