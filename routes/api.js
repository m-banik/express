const express = require('express');
const News = require("../models/news");
const router = express.Router();
const defaultSort = -1;

router.get('/', (req, res) => {
 const search = req.query.search || "";
 let sort = req.query.sort || defaultSort;
 if (sort !== -1 || sort !== 1) {
  sort = defaultSort;
 };
 const findNews = News
  .find({ title: new RegExp(search.trim(), "i") })
  .sort({ created: sort })
  .select("_id title description");
 findNews.exec((err, data) => {
  if (err) return console.log("Error: ", err)
  res.json(data);
 });
});

router.get('/:id', (req, res) => {
 const id = req.params.id;
 const findNews = News.findById(id).select("_id title description");
 findNews.exec((err, data) => {
  if (err) return console.log("Error: ", err)
  res.json(data);
 });
});

module.exports = router;