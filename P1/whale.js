window.onload = function() {

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    var img = new Image();
    img.onload = function() {

        canvas.addEventListener("mouseover", function() {
            draw(ctx, img, "Hello!");
        });
        canvas.addEventListener("mouseout", function() {
            draw(ctx, img);
        });

        draw(ctx, img);
    };

    img.src = "new_whale.png";


    function draw(ctx, img, text) {
        ctx.save();
        ctx.drawImage(img, 0, 0, img.width,    img.height,     // source rectangle
                           0, 0, canvas.width, canvas.height); // destination rectangle
        if (text) {
            ctx.fillStyle = "#f30";
            ctx.fillRect(0, canvas.height - 20, canvas.width, 20);
            ctx.fillStyle = "black";
            ctx.font = "14pt Verdana";
            var textWidth = ctx.measureText(text).width;
            ctx.fillText(text, (canvas.width - textWidth) / 2, canvas.height - 3);
        }
        ctx.restore();
    }

}; // end window.onload
