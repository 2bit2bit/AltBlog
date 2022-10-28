const Article = require("../models/article");

exports.getArticles = (req, res, next) => {
  Article.find()
    .then((articles) => {
      console.log(articles);
      res.send("display all articles by user, editable");
    })
    .catch((err) => console.log(err));
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
  const articleId = req.params.articleId;
  Article.findById(articleId)
    .then((article) => {
      console.log(article);
      res.send(
        "display edit article page with details of the particula article"
      );
    })
    .catch((err) => console.log(err));
};

exports.postEditArticle = (req, res, next) => {
  const updatedTitle = req.body.title;
  const updatedDescription = req.body.description;
  const updatedTags = req.body.tags.split(",").map((tag) => {
    return tag.trim();
  });
  const updatedBody = req.body.body;
  // const author = "userId";
  const updatedReading_time = 3;

  const articleId = req.params.articleId;

  Article.findById(articleId)
    .then((article) => {
      article.title = updatedTitle;
      article.description = updatedDescription;
      article.reading_time = updatedReading_time;
      article.tags = updatedTags;
      article.body = updatedBody;

      return article.save();
    })
    .then((updatedArticle) => {
      console.log(updatedArticle);
      res.send("article updated");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeletetArticle = (req, res, next) => {
  const articleId = req.params.articleId;
  Article.findByIdAndRemove(articleId)
    .then((article) => {
      console.log(article);
      res.send(
        "article deleted"
      );
    })
    .catch((err) => console.log(err));
};

// function calcReadingTime(body) {
//     const wordCount = body.split(" ").length
//     const avgReadingTime = (wordCount / 200)

// }
