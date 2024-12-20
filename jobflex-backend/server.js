const express = require("express");
const bodyParser = require("body-parser");
const HttpError = require("./errors/http-error");
const mongoose = require("mongoose");

const app = express();

//importing routes
const jobRoutes = require("./routes/job-route");
const userRoutes = require("./routes/user-route");

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // * => allow all domains
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization" // allow these headers
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE"); // allow these methods
  next();
});

// => /api/jobs...
app.use("/api/jobs", jobRoutes);
// => /api/users...
app.use("/api/user", userRoutes);

app.use((req, res, next) => {
  const error = new Error("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if(res.headerSent){
    return next(error);
  }
  res.status(error.code || 500)
  res.json({message: error.message || 'An unknown error occurred!'});
});
//Change to Env variable
mongoose
.connect("mongodb+srv://developer:surinder@cluster0.guf8k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
  app.listen(process.env.PORT || 8000);
})
.catch(err =>{
  console.log(err);
}); 