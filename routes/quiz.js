const express = require('express');
const Quiz = require("../models/quiz");
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
 Quiz.find({}, (err, data) => {
  if (err) return console.log("Error: ", err);
  const show = !req.session.vote;
  let sum = 0;
  data.forEach(item => sum += item.vote);
  res.render('quiz', { title: 'Quiz', data, show, sum });
 });
});

router.post('/', (req, res) => {
 const id = req.body.quiz;
 Quiz.findOne({ _id: id }, (err, data) => {
  data.vote++;
  data.save(err => {
   if (err) return console.log("Error: ", err);
   req.session.vote = 1;
   res.redirect("/quiz");
  });
 });
});

module.exports = router;