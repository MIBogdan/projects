

const e = require('express');
const axios = require('axios');



const app = e();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/random";

app.use(e.static('public/'));

app.get("/", async (req, res) => {
    try {
        const result = await axios.get(API_URL);
        res.render("index.ejs", {data: result.data});
        
    } catch {
        res.status(404).send("Error");
    }

    res.render("index.ejs");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});