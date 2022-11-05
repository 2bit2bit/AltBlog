const express = require('express')
const router = express.Router()

const userController = require('../controllers/user')

router.get('/articles', userController.getArticles)

router.post('/create-article', userController.postCreateArticle)

router.post('/edit-article/:articleId/update_state', userController.postUpdateState)

router.post('/edit-article/:articleId', userController.postEditArticle)

router.post('/delete-article/:articleId', userController.postDeletetArticle)

module.exports = router