import express from "express";
import bodyParser from 'body-parser';
import axios from "axios";

const app = express();
const port = 3000;
const API_HOLIDAY_URL = "https://holidays.abstractapi.com/v1/";
const API_KEY = process.env.API_KEY;


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.post("/search", async(req, res) => {
    const country = req.body.country;
    var day = req.body.day;
    var month = req.body.month;
    var year = req.body.year;
    var DateTime = new Date();
    if (day === "") {
        day = DateTime.getDate();
    }
    if (month === "") {
        month = DateTime.getMonth() + 1;
    }
    if (year === "") {
        year = DateTime.getFullYear();
    }
    if (country === "error") {
        console.log("Wrong country");
    }

    try {
        const result = await axios.get(API_HOLIDAY_URL, {params : {
            api_key : API_KEY,
            country : country,
            day : day,
            month : month,
            year : year
        }
        });
        console.log(result.data);
        res.render("index.ejs", { content: result.data });
      } catch (error) {
        console.log(error);
      }

})

app.get("/about", (req, res) => {
    res.render("about.ejs");
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
