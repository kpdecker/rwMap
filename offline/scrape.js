var jsdom = require("jsdom")

var data = {};
jsdom.env("http://www.choosechicago.com/chicago_restaurant_week_2011/pages/default.aspx", function(error, window) {
    jsdom.jQueryify(window, 'http://code.jquery.com/jquery-1.4.3.min.js' , function() {
        var $ = window.$;
        var count = 0;
        $("select").each(function(i) {
            if (/.*RestaurantName$/.test(this.id)) {
                $(this).find("option").each(function(i) {
                    if (this.value !== "restaurant name") {
                        data[this.value] = [];
                        count++;
                    }
                });
            }
        });
        /*
        $(".cellarea").each(function(i) {
            // jsdom does not treat the content as a child of the a element
            // TODO : see if we can fix this
            var name = $.trim(this.textContent);
            data[name] = $(this).find("a").attr("href");
            count++;
        });
        */
        console.log(data, count);
    });
});
