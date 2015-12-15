
function initSlider (tangle) {

    var container = $("sliderDiv");

    var script = {
        initialize: function(model) {

            // initial slider position
            model.pos = 0;
        },

        update: function(model) {

            // wtf
//            model['pos']++;
        }
    };
    
    var worksheet = tangle.addWorksheet("slider", container, script);
}
