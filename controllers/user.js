
exports.getCreateArticle = (req, res, next) => {
    res.send('display create article page')
}


exports.postCreateArticle = (req, res, next) => {
    res.send('post article')
}

exports.getArticles = (req, res, next) => {
    res.send('display all articles by user, editable')
}