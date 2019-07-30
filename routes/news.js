const express = require('express');
const News = require("../models/news");
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  const search = req.query.search || "";
  const findNews = News
    .find({ title: new RegExp(search.trim(), "i") })
    .sort({ created: -1 });
  findNews.exec((err, data) => {
    if (err) return console.log("Error: ", err)
    res.render('news', { title: 'News', data, search });
  });
});

module.exports = router;