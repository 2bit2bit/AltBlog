const express = require('express')
const router = express.Router()

const userController = require('../controllers/user')

router.get('/articles', userController.getArticles)

router.get('/create-article', userController.getCreateArticle)
router.post('/create-article', userController.postCreateArticle)

router.get('/edit-article/:aricleId', userController.getEditArticle)
router.post('/edit-article', userController.postEditArticle)

router.post('/delete-article', userController.postDeletetArticle)

module.exports = router