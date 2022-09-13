var express = require("express");
var router = express.Router();

const monk = require("monk");
const dbURl = "mongodb://localhost:27017/LabXML";
const db = monk(dbURl);

let CTMovie = db.get("Movies");

/* GET users listing. */
router.get("/", function (req, res, next) {
  CTMovie.find({}, (err, docs) => {
    res.render("movies", { callMovies: docs, test: "TSET" });
    console.log(docs);
  });
});

router.get("/insert", (req, res) => {
  CTMovie.insert([{ a: 1, b: 2, c: 3 }], (err, docs) => {
    console.log(docs);
  });
});

router.get("/update", (req, res) => {
  CTMovie.findOneAndUpdate({ a: "3" }, { $set: { a: "4" } }).then(
    (updatedDoc) => {
      res.redirect('../movies')
    }
  );
});
module.exports = router;
