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
    //Retrieve user's input 
    let firstname = req.body.first.trim(); 
    const lastname = req.body.last.trim(); 
    const title = req.body.title.trim();
    const phone = req.body.phone.trim();
    const email = req.body.email.trim();
    const street = req.body.street.trim();
    const city = req.body.city.trim();
    const state = req.body.state.trim();
    const zip = req.body.zip.trim(); 
    const country = req.body.country.trim();
    const byPhone = (req.body.contact_by_phone !== undefined) ? 1 : 0; 
    const byEmail = (req.body.contact_by_email !== undefined) ? 1 : 0; 
    const byMail = (req.body.contact_by_mail !== undefined) ? 1 : 0;

    //[TEST] print address from user input 
    console.log("TITLE: " + title);

    // const id = await req.db.createContact(firstname, lastname, address, phone, 
    //     email, title, contactbymail, contactbyphone, contactbyemail, lat,long);
    //createContact()

    res.redirect('/');
})


module.exports = router;