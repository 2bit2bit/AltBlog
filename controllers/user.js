const Article = require("../models/article");

exports.getArticles = async (req, res, next) => {
  const { query } = req;
  const { state, page = 1, per_page = 1 } = query;

  const findQuery = { author: req.user };

  if (state) {
    findQuery.state = state;
    console.log(findQuery)
  }



  try {
    const articles = await Article
      .find(findQuery)
      .skip(page)
      .limit(per_page)

    res.json(articles);
  } catch (err) {
    res.status(500).send("an error occured");
    console.log(err);
  }
};

// exports.getCreateArticle = (req, res, next) => {
//   res.send("display create article page");
// };

exports.postCreateArticle = async (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const tags = req.body.tags.split(",").map((tag) => {
    return tag.trim();
  });
  const body = req.body.body;
  const author = req.user;
  const reading_time = calcReadingTime(body);

  if (await Article.findOne({ title })) {
    res.send("title already exist, try something different");
    return;
  }

  const article = new Article({
    title,
    description,
    author,
    reading_time,
    tags,
    body,
  });

  try {
    await article.save();
    res.json(article);
  } catch (err) {
    res.status(500).send("an error occured");
    console.log(err);
  }
};

// exports.getEditArticle = (req, res, next) => {
//   const articleId = req.params.articleId;
//   Article.findById(articleId)
//     .then((article) => {
//       console.log(article);
//       res.send(
//         "display edit article page with details of the particula article"
//       );
//     })
//     .catch((err) => console.log(err));
// };

exports.postEditArticle = async (req, res, next) => {
  const updatedTitle = req.body.title;
  const updatedDescription = req.body.description;
  const updatedTags = req.body.tags.split(",").map((tag) => {
    return tag.trim();
  });
  const updatedBody = req.body.body;
  const updatedReading_time = calcReadingTime(updatedBody);
  const articleId = req.params.articleId;

  if (await Article.findOne({ title: updatedTitle })) {
    console.log(Article.findOne({ title: updatedTitle }));
    res.send("title already exist, try something different ahahah");
    return;
  }

  try {
    const article = await Article.findOne({ _id: articleId, author: req.user });

    article.title = updatedTitle;
    article.description = updatedDescription;
    article.reading_time = updatedReading_time;
    article.tags = updatedTags;
    article.body = updatedBody;

    await article.save();

    res.json(article);
  } catch (err) {
    res.status(500).send("an error occured");
    console.log(err);
  }
};

exports.postUpdateState = async (req, res, next) => {
  const articleId = req.params.articleId;

  try {
    const article = await Article.findOne({ _id: articleId, author: req.user });
    article.state = "published";
    await article.save();
    res.json(article);
  } catch (err) {
    res.status(500).send("an error occured");
    console.log(err);
  }
};

exports.postDeletetArticle = async (req, res, next) => {
  const articleId = req.params.articleId;

  try {
    const response = await Article.deleteOne({
      _id: articleId,
      author: req.user,
    });
    res.json(response);
  } catch (err) {
    res.status(500).send("an error occured");
    console.log(err);
  }
};

function calcReadingTime(body) {
  const wordCount = body.split(" ").length;
  return  Math.round(wordCount / 200);  
}
