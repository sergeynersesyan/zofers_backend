const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {type: String},
    email: {type: String, required: true, index: true, unique: true},
    password: {type: String, required: true},
});

module.exports = mongoose.model('User', userSchema);
userSchema.set('autoIndex', false); // REQUIRED FOR UNIQUE INDEX AND INDEX IDENTIFIERS
