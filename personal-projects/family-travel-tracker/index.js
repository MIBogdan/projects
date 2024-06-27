const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const util = require('util');


const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = mysql.createConnection({
  user: "mariusbo_root",
  host: "localhost",
  database: "world",
  password: "bB571174000",
  port: 3306,
});

db.connect();
const query = util.promisify(db.query).bind(db);




let currentUserId = 0;
let error;

async function getCurrentUser() {
  try {
      const rows = await query(`SELECT * FROM users WHERE id = ${currentUserId ? currentUserId : null}`) || [];
      return rows;
  } catch (err) {
      console.log(err);
      return null;
  }
}

async function getUserCountries () {
  let result = [];
  try {
    const rows = await query(`SELECT country_code FROM visited_countries WHERE fk_users = ${currentUserId ? currentUserId : null}`) || [];
    rows.forEach((element) => {
      result.push(element.country_code)
    })
    const countries = result;
    return countries;
  } catch (err) {
    console.log(err);
    return null
  }
}










app.get("/", async (req, res) => {
  let users = [];

  
  

  const currentUser = await getCurrentUser() || [];
  const countries = await getUserCountries() || [];
  const allUsers = await query(`SELECT * FROM users`) || [];

  allUsers.forEach(element => {
    users.push({
      id: element.id,
      name: element.name,
      color: currentUserId && element.id === currentUserId ? 'grey' : element.color})
  });


  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: currentUser.length ? currentUser[0].color : null,
    error: error,
  });

  error = null;
});









app.post("/add", async (req, res) => {

  const input = req.body["country"].toLowerCase();
  

    const userExist = await query(`SELECT id FROM users`);



  
  
  if (!input) {
    error = "Cannot store empty data."
    res.redirect('/');
  } else if (!currentUserId && userExist.length > 0) {
    error = "Please choose a user."
    res.redirect("/");
  } else if (userExist.length === 0 || !currentUserId) {
    error = "Create an user first."
    res.redirect("/");
  }
   else if (currentUserId && userExist.length > 0) {
    try {
      const countryResult = await query(`SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%${input}%'`);
      console.log(countryResult)
      if (countryResult.length === 0) {
        error = "This country doesn't exist."
        res.redirect("/")
      } else {
        const userCountries = await query(`SELECT country_code FROM visited_countries WHERE fk_users = ${currentUserId}`);
        const countryCode = countryResult[0].country_code;
        let isDuplicate = false;
      
      
      userCountries.forEach(element => {
        if (countryCode === element.country_code) {
          isDuplicate = true;
        }
      })

      if (isDuplicate) {
        error = "Can't store duplicates";
        res.redirect('/');
      } else {
        try {
          await query(`INSERT INTO visited_countries (country_code, fk_users) VALUES ('${countryCode}', ${currentUserId})`) || [];
          res.redirect('/');
        } catch (err) {
          console.log(err);
        }
        
      }
      }
      
      
      
    } catch (err) {
      console.log(err)
      
    }
    
  }
});

app.post("/new", async (req, res) => {
  const name = req.body.name;
  const color = req.body.color;
  try {
    await query(`INSERT INTO users (name, color) VALUES ('${name}', '${color}')`) || [];
    res.redirect('/');
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
  
  
});

app.post("/user", async (req, res) => {
  try {
    if (req.body.add === "new") {
      res.render("new.ejs");
  
    } else if (req.body.delete === "remove") {
      let users = [];
      const allUsers = await query(`SELECT * FROM users`) || [];
      allUsers.forEach(element => {
        users.push({id: element.id, name: element.name, color: element.color})
      });
      res.render("delete.ejs", {users: users});
    } else {
      currentUserId = parseInt(req.body.user);
      
      res.redirect("/");
    }
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
  
});



app.post("/delete", async (req, res) => {
  const id = req.body.userId;
  try {
    await query(`DELETE FROM visited_countries WHERE fk_users = ${id ? id : null}`) || [];
    await query(`DELETE FROM users WHERE users.id = ${id}`) || [];
    res.redirect('/');
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }

});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
