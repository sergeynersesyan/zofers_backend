const mongoose = require('mongoose');

const offerSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    country : {type: String, required: true},
    city : {type: String, required: true},
    name : {type: String, required: true},
    // description : {type: String, required: true},
    imageUrl : String,
    // costMode : {type: Number, required: true},
    // cost : {type: Number, required: true},
    peopleCount : Number,
    gender : Number,
    requirements : String,
    participantCount: Number,
    availability: String,

    // userId : {type: Number, required: true},
    // bookCount : {type: Number, required: true},
    rating : Number,
    rateCount : Number,
    viewCount : Number
});

offerSchema.index({country: 'text', city: 'text', name: 'text'});
module.exports = mongoose.model('Offer', offerSchema);
