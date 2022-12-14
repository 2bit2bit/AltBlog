const express = require('express')
const router = express.Router()

const userController = require('../controllers/user')

router.get('/articles', userController.getArticles)

router.post('/create-article', userController.postCreateArticle)

router.put('/edit-article/:articleId/update_state', userController.postUpdateState)

router.put('/edit-article/:articleId', userController.postEditArticle)

router.delete('/delete-article/:articleId', userController.postDeletetArticle)

module.exports = router