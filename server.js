"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

//import route handling functions
const { handleFlight, handleSeats, handleUsers, handleConfirmation, SendUsersInfo } = require("./handlers");

const PORT = process.env.PORT || 8000;

express()
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("dev"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .set("view engine", "ejs")

  // endpoints
  .get("/seat-select", handleSeats)

  //sends user to confirmation page
  .get("/seat-select/confirmed/:id", handleConfirmation)

  .get("/flights/:flightNumber", handleFlight)

  //receives form data
  .post("/users", handleUsers)

  //retrieves all reservations, including updated form data
  .get("/users", SendUsersInfo)

  .use("*", (req, res) => res.send("Not Found"))

  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
