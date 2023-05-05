const express = require('express')
const router = express.Router();

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

    //Check if user is logged in or not
    let checker = false;
    if(req.session.user){
        checker = true;
    }else{
        checker = false;
    }

    res.json({contacts: list, check: checker});
});
router.post('/', async(req,res) => {
    
})


/**
 * DELETE Contact
 */
router.get('/:id/delete', logged_in, async(req,res) => {
    const id = await req.db.findContactById(req.params.id);
    res.render('delete', {contact:id});
})
router.post('/:id/delete', logged_in, async(req,res) => {
    const id = await req.db.findContactById(req.params.id);
    const deletedContact = await req.db.deleteContact(req.params.id);
    res.redirect('/');
})




module.exports = router;