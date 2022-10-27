const Article = require("../models/article");

exports.getArticles = (req, res, next) => {
  res.send("display all articles by user, editable");
};

exports.getCreateArticle = (req, res, next) => {
  res.send("display create article page");
};

exports.postCreateArticle = (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const tags = req.body.tags.split(",").map((tag) => {
    return tag.trim();
  });
  const body = req.body.body;

  const author = "userId";
  const reading_time = 3;

  const article = new Article({
    title,
    description,
    author,
    reading_time,
    tags,
    body,
  });

  article
    .save()
    .then(() => {
      res.send("post article");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditArticle = (req, res, next) => {
  res.send("display edit article page");
};

exports.postEditArticle = (req, res, next) => {
  res.send("post edit article");
};

exports.postDeletetArticle = (req, res, next) => {
  res.send("delete article");
};

// function calcReadingTime(body) {
//     const wordCount = body.split(" ").length
//     const avgReadingTime = (wordCount / 200)

// }
