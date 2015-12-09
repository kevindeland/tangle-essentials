

(function() {

    Tangle.views.v_slider = function (value, el, worksheet) {

        // get canvas info from el
        var canvasWidth = el.get("width");
        var canvasHeight = el.get("height");
        var ctx = el.getContext("2d");

        // start with a fresh canvas
        ctx.fillStyle = "#efe";
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        // get the new position
        var pos = worksheet.getValue("pos");
        
        ctx.fillStyle = "#77a";
        ctx.fillRect(0, 0, pos, canvasHeight);
    }

})();
