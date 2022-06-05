const mongoose  = require('mongoose');
slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const ArticleSchemat = new mongoose.Schema({
    image: { type: String, required: false },
    title: { type: String, required: true },
    content: { type: String, required: true },
    slug: { type: String, slug: 'title', unique: true },
    created_at: { type: Date, default: Date.now },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
})

const Article = mongoose.model('Article', ArticleSchemat);

module.exports = {
    Article
}
