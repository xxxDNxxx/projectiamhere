import mongoose from 'mongoose'
const eventSchema = new mongoose.Schema({
    title: String,
    body: String,
    dueDate: { type: Date, default: Date.now },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    eventKey: String,
    attendees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'waiter'
    }]


})


export default mongoose.model('events', eventSchema)