const Article = require("../models/article");

exports.getIndex = (req, res, next) => {
  res.send("home");
};

exports.getArticles = (req, res, next) => {
  Article.find()
    .then((articles) => {
      console.log(articles);
      res.send("display all articles");
    })
    .catch((err) => console.log(err));
};

exports.getArticle = (req, res, next) => {
  const articleId = req.params.articleId;
  Article.findById(articleId)
    .then((article) => {
      console.log(article);
      res.send("display single article");
    })
    .catch((err) => console.log(err));
};
