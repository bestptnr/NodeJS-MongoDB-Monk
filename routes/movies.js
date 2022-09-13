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

router.post("/insert", (req, res) => {
  CTMovie.insert({
    nameThai: req.body.nameThai,
    nameEng: req.body.nameEng,
    RunningTime: req.body.RunningTime,
  }).then((data) => {
    console.log(data);
  });
  res.redirect("/movies");
});

router.get("/update/:id", (req, res) => {
  const _id = req.params.id;
  CTMovie.findOne({_id:_id},(err,docs)=>{
    res.render("update",{data:docs})
    console.log(docs)
  })

});

router.post("/update/:id",(req,res)=>{
    const _id = req.params.id;
    CTMovie.findOneAndUpdate(
    { _id: _id },
    {
      $set: {
        nameThai: req.body.nameThai,
        nameEng: req.body.nameEng,
        RunningTime: req.body.RunningTime,
      },
    }
  ).then((updatedDoc) => {
    console.log(updatedDoc)
    res.redirect("../../movies");
  });
})
router.get("/delete/:id", (req, res) => {
  CTMovie.remove({ _id: req.params.id }).then((data) => {
    console.log("Delete");
    res.redirect("/movies");
  });
});
module.exports = router;
