const express = require("express");
const path = require("path");

const DB = require("./createDB");
const signUproute = require("./signUp");

const app = express();

app.use("/", signUproute);

console.log('inside signIn page but not in fpwd');

app.use(express.static(path.join(__dirname, "HTML_files")));
app.use(express.static(path.join(__dirname, "CSS_files")));

app.get("/logIn", (req, res) => {
  res.sendFile(path.join(__dirname, "HTML_files", "signIn.html"));
});

app.post("/logIn", async (req, res) => {
  console.log(req);
  try {
    const { email, password } = req.body;
    console.log(email + " " + password);
    const existingEmail = await DB.findOne({ email: email });
    if (!existingEmail) {
      res.send(`<script>alert('Email Id does not exists. Please Register!!!');
                window.location.href = "/createUser";</script>`);
    } else if (existingEmail.pwd === password) {
      console.log("existingEmail.pwd === password" + __dirname);
      res.send(`<script>alert('login Successful !!!');
                window.location.href = "/dashboard";</script>`);
    } else {
      res.send(`<script>alert('Wrong Credentials!!!');
                window.location.href = './logIn';</script>`);
    }
  } catch (err) {
    console.log("in catch block");
    res.status(500).send("wrong password, try again.");
  }
});

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "HTML_files", "dashboard.html"));
});

app.post("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "HTML_files", "dashboard.html"));
});

module.exports = app;
