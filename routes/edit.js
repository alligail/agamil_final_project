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

    //checking firstname

    //checking lastname

    //checking title

    //checking email

    //checking phone 

    //checking address 

    //checking byPhone

    //checking byEmail

    //checking byMail

    res.redirect('/');
})

module.exports = router;