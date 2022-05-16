
const {Announcement, validateAnnouncement} = require('../models/Announcement');
const Express = require('express');
const router = Express.Router();
const auth =require("../middleware/auth")
const {adminPower} = require('../middleware/admin')
router.get('/',auth, async (req, res) => {
    const anncmnts = await Announcement.find();
    if (!anncmnts)
        res.status(404).send("No announcements found");

    res.send(anncmnts);
});

router.get('/:id',auth, async (req, res) => {
    const anncmnt = await Announcement.findById(req.params.id);
    if (!anncmnt)
        res.status(404).send('Announcement with given id not found');

    res.send(anncmnt);
});

router.post('/',[auth, adminPower], async (req, res) => {
    const { error } = validateAnnouncement(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let announcement = new Announcement(
    { 
        title: req.body.title,
        body: req.body.body,
        createTime: req.body.createTime,
        lastEdited: req.body.lastEdited,
    }
    );
    
    announcement = await announcement.save();

    res.send(announcement);
});

router.put('/:id',[auth, adminPower], async (req, res) => {
    const {error} = validateAnnouncement(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let updatedAnncmnt = await Announcement.findById(req.params.id);
    if (!updatedAnncmnt)
        res.status(400).send('Annoucement with given id not found');

    updatedAnncmnt.set({
        title: req.body.title,
        body: req.body.body,
        lastEdited: Date.now(),
    });

    await updatedAnncmnt.save();

    res.send(updatedAnncmnt);
});

router.delete('/:id',[auth,adminPower], async (req, res) => {
    const deletedAnnouncement = await Announcement.findByIdAndRemove(req.params.id);
    if (!deletedAnnouncement)
        res.status(404).send('Announcement was not found');

    res.send(deletedAnnouncement);
})
module.exports = router; 