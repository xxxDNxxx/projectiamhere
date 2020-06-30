import mongoose from 'mongoose'
import { StringUtil } from '../utillities/string-util'
import bcrypt from 'bcrypt-nodejs'

const userSchema = new mongoose.Schema({
    isAdmin: Boolean,
    verified: Boolean,
    username: String,
    password: String,
    firstname: String,
    lastname: String

})
userSchema.virtual('fullname').get(function() {
    const firstname = StringUtil.capitalize(this.firstname.toLowerCase())
    const lastname = StringUtil.capitalize(this.lastname.toLowerCase())
    return `${firstname} ${lastname}`
})
userSchema.statics.passwordMatches = function(password, hash) {
    return bcrypt.compareSync(password, hash)
}
userSchema.pre('save', function(next) {
    this.isAdmin = false
    this.verified = false
    this.username = this.username.toLowerCase()
    this.firstname = this.firstname.toLowerCase()
    this.lastname = this.lastname.toLowerCase()
    const unsafePassword = this.password
    this.password = bcrypt.hashSync(unsafePassword)
    next()
})

export default mongoose.model('users', userSchema)