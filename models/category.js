const mongoose = require('mongoose');
slug = require('mongoose-slug-updater');
mongoose.plugin(slug);


const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    slug: { type: String, slug: 'name', unique: true },
    created_at: { type: Date, default: Date.now },
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = {
    Category
}