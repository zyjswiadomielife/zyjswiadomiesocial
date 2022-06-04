const mongoose  = require('mongoose');
slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const UserSchemat = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    slug: { type: String, slug: 'name', unique: true },
    created_at: { type: Date, default: Date.now },
});

const User = mongoose.model('User', UserSchemat);

module.exports = {
    User
}