const express = require('express')
const router = express.Router()

const blogController = require('../controllers/blog')

router.get('/', blogController.getArticles)

router.get('/articles/:articleId', blogController.getArticle)

module.exports = router