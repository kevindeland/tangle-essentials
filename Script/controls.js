

Tangle.controls.c_xKnob = function(el, worksheet) {

    var name = worksheet.getVariableName(el); // pos

    var parameter = "pos";

    el.setStyles({position: "absolute", left: 8, top: 28});
    
    // get canvas info
    var canvasEl = el.getParent().getElement("canvas");
    var canvasWidth = canvasEl.get("width");
    var canvasHeight = canvasEl.get("height");

    // initialize dotted line
    var top = 0;
    var lineStyle = "position:absolute; display:block; border-left:1px dotted #00f; pointer-events:none; top:" + top + "px; width: 1px; height: " + canvasHeight + "px;";
    var lineEl = new Element("div", {style: lineStyle});
    // add line to page
    el.grab(lineEl, "bottom");

    // initialize knob
    var knobStyle = "position:absolute; display:none; ";
    var knobWidth = 36, knobHeight = 36;
    var knobEl = new Element("img", { style:knobStyle, src:"http://worrydream.com/ExplorableExplanations/Media/Filter\
ParamsKnob.png", width:knobWidth, height:knobHeight });
    // add knob to page
    el.grab(knobEl, "bottom");

    var knobX, knobY;
    knobX = 0;
    knobY = 0;

    
    worksheet.setView(el, function() {

        var pos = worksheet.getValue(parameter);

        knobX = pos.limit(0, canvasWidth);

        knobY = canvasHeight / 2;

        knobEl.setStyles( { left: knobX - knobWidth/2, top: knobY - knobHeight/2 });
        lineEl.setStyles( { left: knobX } );
        
    });


    // how knob behaves in relation to mouse
    var isShowing = false;
    var isHovering = false;

    // knob will show when the mouse is inside of the canvas
    canvasEl.addEvent("mouseenter", function() {
        isShowing = true; updateRolloverEffects();
    });
    canvasEl.addEvent("mouseleave", function() {
        isShowing = false; updateRolloverEffects();
    });
    // pointer will change style when mouse hovers over cursor
    knobEl.addEvent("mouseenter", function() {
        isHovering = true; updateRolloverEffects();
    });
    knobEl.addEvent("mouseleave", function() {
        isHovering = false; updateRolloverEffects();
    });


    function updateRolloverEffects () {
        updateCursor();
        var isShowingKnob = (isShowing || isHovering || isDragging);
        // TODO  here is where you would make line pulse
        knobEl.setStyle("display", isShowingKnob ? "block" : "none");
    }
    
    function updateCursor() {
        var body = document.getElement("body");
        if (isHovering || isDragging) {body.addClass("cursorDrag"); }
        else { body.removeClass("cursorDrag"); }
    }

    // now the knob behavior when it moves
    var isDragging = false;
    var didDrag = false;
    var knobXAtMouseDown, knobYAtMouseDown;

    new BVTouchable(knobEl, {

        touchDidGoDown: function (touches) {
            knobXAtMouseDown = knobX;
            knobYAtMouseDown = knobY;

            isDragging = true;
            didDrag = true;
            knobEl.set("src", "http://worrydream.com/ExplorableExplanations/Media/FilterParamsKnobDrag.png");
            updateRolloverEffects();
        },

        touchDidMove: function (touches) {
            
            var obj = { };
            
            var newX = knobXAtMouseDown + touches.translation.x;
            // set new x
            obj[parameter] = newX;
            worksheet.setValues(obj);
        },

        touchDidGoUp: function (touches) {
            isDragging = false;
            updateRolloverEffects();
        }
    });
    
}
