const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public/"));

// const db = mysql.createConnection({
//   user: "mariusbo_root",
//   host: "localhost",
//   password: "bB571174000",
//   database: "mariusbo_world",
//   port: 3306
// })

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "world",
  port: 3306
})



db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database as ID', db.threadId);
});



let countriesCode = [];
let totalCountries;
let countryList = [];
let errorField;
let currentCountry = null;


db.query("SELECT country FROM country_list", (err, res) => {
    if (err) {
      errorField = err;
    } else {
      res.forEach(element => {
      countryList.push(element.country);
      });
      errorField = undefined;
    }
  });
  

  app.get("/", async (req, res) => {
    
  db.query("SELECT * FROM visited_countries", (err, res) => {
    if (res.length === 176) {
      db.query("TRUNCATE TABLE visited_countries", (err, res) => {
        if (err) {
          errorField = err;
        } else {
          errorField = undefined;
        }
      });
      
    } 
  });


  db.query("SELECT country_code FROM visited_countries", (err, res) => {
    totalCountries = res.length;
    if (err) {
      errorField = err;

    } else {
      res.forEach(element => {
      countriesCode.push(element.country_code);
      });
      errorField = undefined;
    }
  });


  res.render("index.ejs", {countries: countriesCode, total: totalCountries, countryList1: countryList, errors: errorField, currentCountry});
  
});



app.post("/add", (req, res) => {
  let duplicate = false;
  let addedCountry;

  if (req.body.country) {
    addedCountry = req.body.country.toUpperCase();
    currentCountry = req.body.country.toUpperCase();

    
    
  } else if (req.body.countryList){
    addedCountry = req.body.countryList;
    currentCountry = req.body.country;
    
    
  } 

  if (!addedCountry) {
    errorField = "Cannot store empty data."
  } else {
    db.query("SELECT country_code FROM visited_countries", (err, res) => {
      res.forEach((e) => {
        if (addedCountry == e.country_code) {
          duplicate = true;
        } 
      })
      
      if (duplicate === true) {
        errorField = "Cannot store duplicates";
      } else {
        db.query(`INSERT INTO visited_countries (country_code) VALUES ('${addedCountry}')`, (err, res) => {
          if (err) {
            errorField = err;
          } else {
            countriesCode.push(addedCountry);
            db.query("SELECT country_code FROM visited_countries", (err, res) => {
              totalCountries = res.length;
            })
          }
        });
      }
    });
  }
  res.redirect("/");

});



app.post('/truncate', (req, res) => {
  
  db.query('TRUNCATE TABLE visited_countries', (err, res) => {
    if (err) {
      errorField = err;
    } else {
      totalCountries = 0;
      countriesCode = [];
      
    }
    
  });
  
    res.redirect("/");
  
  
})


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
