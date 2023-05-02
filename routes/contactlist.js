const express = require('express')
const router = express.Router();

//HOME 
router.get('/', async (req, res) => {
    res.render('home');
});
router.post('/', async(req,res) => {
    
})

//CREATE
router.get('/create', async (req, res) => {
    //display the home page of the website
    res.render('create');
});
router.post('/create', async(req,res) => {
    let firstname = req.body.first.trim(); 
})


module.exports = router;