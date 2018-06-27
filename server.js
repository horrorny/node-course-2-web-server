const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile("server.log", log + "\n", (err) => {
        console.log("Unable to append to server.log.");
    });
    next();
});

// app.use((req, res, next) => {
//     res.render("maintenance.hbs");
// });

app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () => {
    return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text) => {
    if (!text) return "";
    return text.toUpperCase();
});

app.get("/", (req, res) => {
    // res.send("<h1>hello express!</h1>");
    res.render("home.hbs", {
        pageTitle: "Hello page",
        welcomeMessage: "Hello world"
    });
});

app.get("/about", (req, res) => {
    res.render("about.hbs", {
        pageTitle: "About page"
    });
});

app.get("/bad", (req, res) => {
    res.send({errorMessage: "some error"});
});

app.listen(3000);