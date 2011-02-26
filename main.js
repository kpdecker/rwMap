var express = require("express"),
    http = require("http"),
    url = require("url"),
    dataLoader = require("./data-loader");

var app = express.createServer(),
    port = process.env.NODE_SERVER_PORT || 3002;

app.configure(function(){
    app.use(express.methodOverride());
    app.use(express.bodyDecoder());
    app.use(app.router);
    app.use(express.staticProvider(__dirname + '/public'));
});

app.get("/data-source", function(req, res) {
    res.send(JSON.stringify(dataLoader.restaurants));
});

console.log("Starting server on port", port);
app.listen(port);
