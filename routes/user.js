const express = require('express')
const router = express.Router()

const userController = require('../controllers/user')

router.get('/articles', userController.getArticles)

router.get('/create-article', userController.getCreateArticle)
router.post('/create-article', userController.postCreateArticle)

router.get('/edit-article/:articleId', userController.getEditArticle)
router.post('/edit-article/:articleId', userController.postEditArticle)

router.post('/delete-article/:articleId', userController.postDeletetArticle)

module.exports = router