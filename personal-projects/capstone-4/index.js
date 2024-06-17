

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');


const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "blog_posts",
    port: 3306
})

const app = express();

 
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;



let errLog;


db.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
    console.log('Connected to the database as ID', db.threadId);
  });

  




app.get("/", (req, res) => {
    let obj = [];
    db.query("SELECT * FROM post_data", (err, result) => {
        if (err) {
            errLog = err;
            res.render("index.ejs", {obj: [], error: errLog})
        } else {
            result.forEach(e => {
                obj.push({id: e.id, title: e.title, post: e.post})
            })
            res.render("index.ejs", {obj: obj, error: errLog});
        }
        errLog;
    })

    
    
})

app.post("/submit", (req, res) => {
    let title = req.body.title;
    let post = req.body.textarea;
    console.log(post)

    if (!title || !post) {
        errLog = "Cannot store empty data."
        res.redirect("/")
    } else {
        db.query(`INSERT INTO post_data (title, post) VALUES ('${title}', '${post}')`, (err, result) => {
            if (err) {
                errLog = err;
                res.redirect("/")
            } else {
                res.redirect("/")
            }
        });
    }
});

app.post("/delete", (req, res) => {
    const id = req.body.id;

    db.query(`DELETE FROM post_data WHERE id = ${id}`, (err, result) => {
        if (err) {
            errLog = err;
            res.redirect("/")
        } else {
            
            res.redirect("/");
            
        }
    })
})





app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});