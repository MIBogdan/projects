const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    console.log(result)
    res.render("index.ejs", {data: result});

  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }

});

app.post("/", async (req, res) => {
  try {
    let activityType = req.body.type;
    let participants = req.body.participants
    const response = await axios.get(`https://bored-api.appbrewery.com/filter?type=${activityType}&participants=${participants}`);
    const result = response.data;
    let chosenData = Math.floor(Math.random() * result.length);
    res.render("index.ejs", {data: result[chosenData]});
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: "Sorry, there are no activities available according to the data you provided.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
