const mysql = require("mysql");

// Skapar en anslutning till databasen med specificerade inloggningsuppgifter och databasnamn
const connection = mysql.createConnection({
    host: "localhost",
    user: "mysqltest1",
    password: "password",
    database: "mysqltest1"
});

// Ansluter till MySQL-databasen
connection.connect((err) => {
    if (err) {
        console.error("Connection failed: " + err)
        return;
    }

    console.log("Connected to MySQL");
});

// tar bort tabellen om den redan finns
connection.query("DROP TABLE IF EXISTS kurser;", (err, results) => {
    if (err) throw err;

    console.log("Tabellen kurser raderas!");
});

// Skapar en ny tabell "kurser" i databasen med angivna kolumner och datatyper
connection.query(`CREATE TABLE kurser (
    id INT AUTO_INCREMENT PRIMARY KEY,
    courseName VARCHAR(255),
    courseCode VARCHAR(255),
    courseUrl VARCHAR(255),
    courseProgression VARCHAR(255),  -- Här saknades en komma
    created DATETIME DEFAULT CURRENT_TIMESTAMP
)`, (error, results) => {
    if(error) throw error;

    console.log("Table kurser created: " + results);
});

