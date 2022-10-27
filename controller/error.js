function error(req, res, next) {
    res.send('404 page not found')
}

module.exports = error