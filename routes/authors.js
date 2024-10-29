const express = require('express')
const Author = require('../models/author')
const router = express.Router()

//All Authors Route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if(req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try{
        const authors = await Author.find(searchOptions)
        res.render('authors/index', { 
            authors: authors , 
            searchOptions: req.query 
        })
    }catch{
        res.redirect('/')
    }
})

//New Author Route
router.get('/new',(req, res) => {
    res.render('authors/new', { author: new Author() })
})

//Create Author Route
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    })
    
    try {
        if (req.body.name === '' || req.body.name == null) {
            throw new Error('Author name is required')
        }
        const newAuthor = await author.save()
        res.redirect('authors')
    } catch (err) {
        res.render('authors/new', {
            author: author,
            errorMessage: err.message || 'Error creating Author'
        })
    }
})

module.exports = router