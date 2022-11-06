const Article = require("../models/article");
const calcReadingTime = require('../utils/reading_time')

exports.getArticles = async (req, res, next) => {
  const { query } = req;
  const { state, page = 0, per_page = 5 } = query;

  const findQuery = { author: req.user };

  if (state) {
    findQuery.state = state;
  }

  try {
    const articles = await Article
      .find(findQuery)
      .skip(page)
      .limit(per_page)

    res.json(articles);
  } catch (err) {
    res.status(500).json({message: "an error occured"});
    console.log(err);
  }
};



exports.postCreateArticle = async (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const tags = req.body.tags.split(",").map((tag) => {
    return tag.trim();
  });
  const body = req.body.body;
  const author = req.user;
  const reading_time = calcReadingTime.calcReadingTime(body);

  if (await Article.findOne({ title })) {
    res.status(202).json({message : "title already exist, try something different"});
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
    res.status(201).json(article);
  } catch (err) {
    res.status(500).json({message: "an error occured"});
    console.log(err);
  }
};


exports.postEditArticle = async (req, res, next) => {
  const updatedTitle = req.body.title;
  const updatedDescription = req.body.description;
  const updatedTags = req.body.tags.split(",").map((tag) => {
    return tag.trim();
  });
  const updatedBody = req.body.body;
  const updatedReading_time = calcReadingTime.calcReadingTime(updatedBody);
  const articleId = req.params.articleId;

  if (await Article.findOne({ title: updatedTitle })) {
    console.log(Article.findOne({ title: updatedTitle }));
    res.status(202).json({message : "title already exist, try something different"});
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

    res.status(201).json(article);
  } catch (err) {
    res.status(500).json({message: "an error occured"});
    console.log(err);
  }
};

exports.postUpdateState = async (req, res, next) => {
  const articleId = req.params.articleId;

  try {
    const article = await Article.findOne({ _id: articleId, author: req.user });
    article.state = "published";
    await article.save();
    res.status(201).json(article);
  } catch (err) {
    res.status(500).json({message: "an error occured"});
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
    res.status(202).json(response);
  } catch (err) {
    res.status(500).json({message: "an error occured"});
    console.log(err);
  }
};