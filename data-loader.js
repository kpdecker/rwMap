var http = require("http"),
    url = require("url");

var restaurants = {
}

for (var name in restaurants) {
    if (restaurants.hasOwnProperty(name)) {
        getBusinessInfo(name);
    }
}
function getBusinessInfo(name, city) {
    var components = name.split(" | ");

    var lowerName = components[0].toLowerCase(),
        city = components[1] || "Chicago";

    var href = "http://api.yelp.com/business_review_search"
            + "?term=" + encodeURIComponent(name)
            + "&location=" + encodeURIComponent(city + ", IL")
            + "&ywsid=",            // TODO : Append Yelp API key here
        hrefFields = url.parse(href),
        options = {
            host: hrefFields.hostname,
            port: hrefFields.port || 80,
            path: (hrefFields.pathname || "") + (hrefFields.search || "")
        };

    var data = [];
    http.get(options, function(res) {
        res.on("data", function(chunk) {
            data.push(chunk);
        });
        res.on("end", function() {
            var businesses = JSON.parse(data.join("")).businesses,
                business = [],
                halt = false;
            businesses.forEach(function(el) {
                if (el.name.toLowerCase() === lowerName) {
                    business = [el];
                    halt = true;
                } else if (!halt && el.name.toLowerCase().indexOf(lowerName) >= 0) {
                    business.push(el);
                }
            });
            restaurants[name] = business;
            if (business.length !== 1) {
                console.log("Yelp lookup failure: ", name, business.length, businesses.map(function(el) { return el.name; }));
            }
        });
    }).on("error", function(e) {
        console.info("error", e);
    });
}

exports.restaurants = restaurants;
