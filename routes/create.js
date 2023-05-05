const express = require('express')
const router = express.Router();
const geo = require('node-geocoder');
const geocoder = geo({ provider: 'openstreetmap' });

/**
 * CREATE CONTACT
 */
router.get('/', async (req, res) => {
    console.log ("INSIDE /create");
    //display the home page of the website
    res.render('create');
});

router.post('/', async(req,res) => {
    //Retrieve user's input 
    let firstname = req.body.first.trim(); 
    const lastname = req.body.last.trim(); 
    const title = req.body.title.trim();
    const phone = req.body.phone.trim();
    const email = req.body.email.trim();
    const addr = req.body.address.trim();
    const byPhone = (req.body.contact_by_phone !== undefined) ? 1 : 0; 
    const byEmail = (req.body.contact_by_email !== undefined) ? 1 : 0; 
    const byMail = (req.body.contact_by_mail !== undefined) ? 1 : 0;

    let address = "";
    let lat = 0;
    let long = 0;

    console.log(addr);
    const result =  await geocoder.geocode(addr);

    if(result.length > 0){
        address = result[0].formattedAddress;
        lat = result[0].latitude;
        long = result[0].longitude;


        console.log("----ADDRESS FOUND!----");
        console.log("ADDRESS: " + address);
        console.log(`LATITUDE: ${lat}`);
        console.log(`LONGITUDE: ${long}`);
        
    }else{
        console.log("Results Not Found");
    }

    //Add contact to the database
    const id = await req.db.createContact(firstname, lastname, address, phone, 
    email, title, byMail, byPhone, byEmail, lat, long);

    res.redirect('/');
})

module.exports = router;