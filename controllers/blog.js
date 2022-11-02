const Article = require("../models/article");

exports.getArticles = async (req, res, next) => {
  try {
    const articles = await Article.find({ state: "published" })
    .populate(
      "author",
      "first_name last_name email"
    );
    
    res.json(articles);
  } catch (err) {
    res.status(500).send('an error occured')
    console.log(err);
  }
};

exports.getArticle = async (req, res, next) => {
  const { articleId } = req.params;

  try {
    const article = await Article.findOne({
      _id: articleId,
      state: "published",
    }).populate("author", "first_name last_name email");

    article.read_count++;

    article.save();

    res.json(article);
  } catch (err) {
    res.status(500).send('an error occured')
    console.log(err);
  }
};
