var express = require('express');
var router = express.Router();

const Offer = require('../models/offer');
const mongoose = require('mongoose');
const multer = require('multer');
const checkAuth = require('../middleware/check_auth');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/*') {
        cb(null, true);
    } else {
        cb(new Error("not image"), false);
    }
}
;

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.get('/', function (req, res, next) {
    var q = {};
    if (req.query.q) {
        q = { $text : { $search : req.query.q} };
    }
    Offer.
        find(q)
        .exec()
        .then(offers => {
            res.send(offers);
        })
        .catch(err => {
            res.status(500).send(err);
        })
});


//create an offer
router.post('/',  upload.single('offerImage'), function (req, res, next) {
    console.log(req.file);
    const offerJson = JSON.parse(req.body.offer);
    offerJson._id = new mongoose.Types.ObjectId();
    offerJson.imageUrl = req.file.path;

    Offer.create(offerJson, function (err, offer) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json({
                message: "new offer created",
                offer: offer
            });
        }
    });

});

router.get('/:offerId', function (req, res, next) {
    let id = req.params.offerId;
    Offer.findOne({_id: id})
        .select('_id city name imageUrl')
        .then(offer => {
        res.send(offer);
}).
    catch(err => {
        res.status(500).send(err);
});
});

router.delete('/:offerId', checkAuth, function (req, res, next) {
    const id = req.params.offerId;
    Offer.findOneAndRemove({_id: id})
        .then(result => {
        res.send({
        message: 'deleted'
    });
})
.
    catch(err => {
        res.status(500).send(err);
})
})


module.exports = router;