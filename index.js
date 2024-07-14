const express = require("express");
const app = express();
const path = require("path");
const port = 3030;

const signUproute = require("./signUp");
const signInroute = require("./signInPage");
const forgotPasswordPage = require("./forgotPasswordPage");

app.use("/HTML_files", express.static(path.join(__dirname, "HTML_files")));
app.use("/CSS_files", express.static(path.join(__dirname, "CSS_files")));
app.use("/Images", express.static(path.join(__dirname, "Images")));

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "HTML_files", "index.html");
  res.sendFile(filePath);
});

app.get("/signIn", (req, res) => {
  console.log("inside signIn page but not in fpwd");
  const signInFilePath = path.join(__dirname, "HTML_files", "signIn.html");
  res.sendFile(signInFilePath);
});

app.use("/", signUproute);
app.use("/", signInroute);
app.use("/", forgotPasswordPage);

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
