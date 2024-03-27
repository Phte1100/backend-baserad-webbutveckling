const express = require("express");
const bodyParser = require("body-parser"); // för att läsa FORM-data
const app = express();
const port = 3005;

app.set("view engine", "ejs"); //view engine: EJS
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

const courseList = [];

// route
app.get ("/", (req, res) => {
    res.render("index", { courseList: courseList });
});

app.get ("/addcourses", (req, res) => {
    res.render("addcourses", { error: "" });
});

app.get ("/about", (req, res) => {
    res.render("about");
});
console.log("skituppgift");

app.post("/addcourses", (req, res) => {
            // Läs in formulärdata
            console.log("1");
            let newName = req.body.name;
            console.log("2");
            let newCode = req.body.code
            console.log("3");
            let newUrl = req.body.url;
            console.log("4");
            let newProgression = req.body.progression;
            console.log("5");
            let error = "";

            if(newName && newCode && newUrl && newProgression) {
                // Lägg till i arrayen om alla fält är ifyllda
                courseList.push({
                    Kurs: newName,
                    Kurskod: newCode,
                    Hemsida: newUrl,
                    Progression: newProgression
                });
                // Omdirigera till huvudsidan efter att ha lagt till kursen
                res.redirect("/");
            } else {
                // Om något fält saknas, sätt felmeddelande
                error = "Du måste fylla i alla fält!";
                // Rendera addcourses-vyn igen med felmeddelandet
                res.render("addcourses", { error: error });
            }
        });

// starta
app.listen(port, () => {
    console.log("Serverstarted on port" + port);
});