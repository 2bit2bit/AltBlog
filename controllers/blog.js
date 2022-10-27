exports.getIndex = (req, res, next) => {
    res.send('home')
}


exports.getArticles = (req, res, next) => {
    res.send('display all articles')
}

exports.getArticle = (req, res, next) => {
    res.send('display single article')
}
