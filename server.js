const express = require("express");
const bodyParser = require("body-parser"); // för att läsa FORM-data
const app = express();
const port = 3055;

app.set("view engine", "ejs"); //view engine: EJS
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

const courseList = [];

// route
app.get("/", (req, res) => {
    connection.query("SELECT * FROM kurser", (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.render("index", { error: "Ett fel uppstod när kurser skulle hämtas.", rows: [] });
        }
        res.render("index", { rows: rows });
    });
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
    let newName = req.body.name;
    let newCode = req.body.code;
    let newUrl = req.body.url;
    let newProgression = req.body.progression;
    let error = "";

    if (newName && newCode && newUrl && newProgression) {
        // Lägg till i databasen om alla fält är ifyllda
        connection.query("INSERT INTO kurser (courseName, courseCode, courseUrl, courseProgression) VALUES (?, ?, ?, ?)",
            [newName, newCode, newUrl, newProgression], (error, results) => {
                if (error) throw error;
                console.log("Course inserted", results);
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

const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "mysqltest1",
    password: "password",
    database: "mysqltest1"
});

connection.connect((err) => {
    if (err) {
        console.error("Connection failed: " + err)
        return;
    }

    console.log("Connected to MySQL");
});





