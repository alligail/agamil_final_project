const express = require('express')
const router = express.Router();
const geo = require('node-geocoder');
const geocoder = geo({ provider: 'openstreetmap' });

const logged_in = (req,res,next) => {
    if(req.session.user){
        next();
    }else{
        res.status(401).send("Not Authorized");
    }
}

/**
 * HOME
 */
router.get('/', async (req, res) => {
    const list = await req.db.findContactList();
    if(list != undefined){
        res.render('home', {contacts: list});
        return;
    }

    res.render('home');
});
router.post('/', async(req,res) => {
    
})

/**
 * CREATE CONTACT
 */
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

    let address = "";
    let lat = 0;
    let long = 0;

    const userInput  = street+' '+city+', '+state+' '+zip+' '+country;
    console.log(userInput);
    const result =  await geocoder.geocode(userInput);

    if(result.length > 0){
        address = result[0].formattedAddress;
        lat = result[0].latitude;
        long = result[0].longitude;


        console.log("----ADDRESS FOUND!----");
        console.log("ADDRESS: " + userInput);
        console.log(`LATITUDE: ${lat}`);
        console.log(`LONGITUDE: ${long}`);
        
    }else{
        console.log("Results Not Found");
    }

    //[TEST]
    console.log("AFTER");
    console.log("ADDRESS: " + userInput);
    console.log(`LATITUDE: ${lat}`);
    console.log(`LONGITUDE: ${long}`);

    //Add contact to the database
    const id = await req.db.createContact(firstname, lastname, address, phone, 
    email, title, byMail, byPhone, byEmail, lat, long);

    res.redirect('/');
})


module.exports = router;