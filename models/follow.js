const mongoose = require('mongoose');

const FollowSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    target: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    created_at: { type: Date, default: Date.now },
});

const Follow = mongoose.model('Follow', FollowSchema);

module.exports = {
    Follow
}