import mongoose from 'mongoose'
const waiterSchema = new mongoose.Schema({

    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'events'
    },
    type: String,
    date: String

})

export default mongoose.model('waiters', waiterSchema)