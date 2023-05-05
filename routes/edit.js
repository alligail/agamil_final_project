const express = require('express')
const router = express.Router();
const geo = require('node-geocoder');
const geocoder = geo({ provider: 'openstreetmap' });

//Checks if user is logged in b
const logged_in = (req,res,next) => {
    if(req.session.user){
        next();
    }else{
        res.status(401).send("Not Authorized");
    }
}

/**
 * EDIT Contact
 */
router.get('/:id', logged_in, async(req,res) => {
    console.log("----------------------Inside EDIT----------------------");
    const id = await req.db.findContactById(req.params.id); 
    console.log(id);
    res.render('edit', {contact: id});
})

router.post('/:id', logged_in, async(req,res) => {
    //Editing a contact 
    console.log('-------------------------------inside post(/:id/edit)-----------------------');
    
    const id = await req.db.findContactById(req.params.id);
    console.log("BEFORE: " + id);

    //User's Input to Save 
    let firstname = req.body.first.trim(); 
    const lastname = req.body.last.trim(); 
    const title = req.body.title.trim();
    const phone = req.body.phone.trim();
    const email = req.body.email.trim();
    const addr = req.body.address.trim();
    const byPhone = (req.body.contact_by_phone !== undefined) ? 1 : 0; 
    const byEmail = (req.body.contact_by_email !== undefined) ? 1 : 0; 
    const byMail = (req.body.contact_by_mail !== undefined) ? 1 : 0;

    //checking firstname
    if(firstname !== id.firstname){
        const changeFirst = await req.db.updateContact(req.params.id, 'firstname', firstname);
    }

    //checking lastname
    if(lastname !== id.lastname){
        const changeLast = await req.db.updateContact(req.params.id, 'lastname', lastname);
    }

    //checking title
    if(title !== id.title){
        const changeTitle = await req.db.updateContact(req.params.id, 'title', title);
    }

    //checking email
    if(email !== id.email){
        const changeEmail = await req.db.updateContact(req.params.id, 'email', email);
    }

    //checking phone 
    console.log(phone);
    console.log(id.phone);
    if(phone !== id.phone){
        const changePhone = await req.db.updateContact(req.params.id, 'phone', phone);
    }

    //checking address 
    if(addr !== id.address){
        const result =  await geocoder.geocode(addr);
        let address = '';
        let lat = 0;
        let long = 0;

        if(result.length > 0){
            address = result[0].formattedAddress;
            lat = result[0].latitude;
            long = result[0].longitude;


            console.log("----(EDIT)ADDRESS FOUND!----");
            console.log("ADDRESS: " + address);
            console.log(`LATITUDE: ${lat}`);
            console.log(`LONGITUDE: ${long}`);

            const changeAddr = await req.db.updateContact(req.params.id, 'address', address);
            const changeLat = await req.db.updateContact(req.params.id, 'lat', lat);
            const changeLong = await req.db.updateContact(req.params.id, 'long', long);
        }else{
            console.log("Results Not Found");
        }
    }

    //checking byPhone
    if(byPhone !== id.contactbyphone){
        const changeByPhone = await req.db.updateContact(req.params.id, 'contactbyphone', byPhone);
    }

    //checking byEmail
    if(byEmail !== id.contactbyemail){
        const changeByPhone = await req.db.updateContact(req.params.id, 'contactbyemail', byEmail);
    }

    //checking byMail
    if(byMail !== id.contactbymail){
        const changeByPhone = await req.db.updateContact(req.params.id, 'contactbymail', byMail);
    }

    res.redirect('/');
})

module.exports = router;