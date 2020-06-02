//Setup
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const ejs = require("ejs");
const { v4: uuidv4 } = require("uuid");

//Global Values
const homeData = [
  {
    id: "1",
    title: "Rupak",
    value: "Nam ac eleifend mauris. Proin in lectus et nibh facilisis ultrices",
  },
  {
    id: "2",
    title: "Mahin",
    value:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae",
  },
  {
    id: "3",
    title: "Samin",
    value: "Interdum et malesuada fames ac ante ipsum primis in faucibus.",
  },
];

const aboutData =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque interdum eu risus vel";

const contactData =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque interdum eu risus vel";

//Middlewares
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));

//Routes
app.get("/", function (req, res) {
  res.render("home", { homeValues: homeData });
});

app.get("/about", function (req, res) {
  res.render("about", { aboutValues: aboutData });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactValues: contactData });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const value = req.body;
  value.id = uuidv4();
  homeData.push(value);
  res.redirect("/");
});

app.get("/:id", function (req, res) {
  let id = req.params.id;

  const value = homeData.find((element) => element.id === id);
  res.render("post", { element: value });
});

app.listen(8080, () => console.log("Server is connected!"));
