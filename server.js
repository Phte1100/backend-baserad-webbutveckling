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

app.delete('/delete-course/:id', (req, res) => {
    const courseId = req.params.id;
    connection.query('DELETE FROM kurser WHERE id = ?', [courseId], (error, results) => {
        if (error) {
            console.error('Fel vid borttagning av kurs: ', error);
            res.json({ success: false });
        } else {
            console.log('Kurs raderad: ', results);
            res.json({ success: true });
        }
    });
});


app.get ("/addcourses", (req, res) => {
    res.render("addcourses", { error: "" });
});

app.get ("/about", (req, res) => {
    res.render("about");
});

// Hanterar POST-begäranden för att lägga till nya kurser till databasen.
app.post("/addcourses", (req, res) => {
    // Läs in formulärdata
    let newName = req.body.name;
    let newCode = req.body.code;
    let newUrl = req.body.url;
    let newProgression = req.body.progression;
    let error = "";

    // Kontrollerar att alla fält är ifyllda innan kursen läggs till i databasen.
    if (newName && newCode && newUrl && newProgression) {
        // Lägg till i databasen om alla fält är ifyllda
        connection.query("INSERT INTO kurser (courseName, courseCode, courseUrl, courseProgression) VALUES (?, ?, ?, ?)",
            [newName, newCode, newUrl, newProgression], (error, results) => {
                if (error) throw error;
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

// Startar servern på angiven port.
app.listen(port, () => {
});

// Ansluter till MySQL-databasen
const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "tommy2.heliohost.org",
    user: "phte1100_user",
    password: "PT7950pt",
    database: "phte1100_kurser"
});

connection.connect((err) => {
    if (err) {
        console.error("Connection failed: " + err)
        return;
    }

    console.log("Connected to MySQL");
});





