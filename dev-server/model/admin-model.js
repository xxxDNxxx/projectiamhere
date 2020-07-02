import mongoose from 'mongoose'
import { StringUtil } from '../utillities/string-util'
import bcrypt from 'bcrypt-nodejs'

const adminSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String

})
adminSchema.virtual('fullname').get(function() {
    const firstname = StringUtil.capitalize(this.firstname.toLowerCase())
    const lastname = StringUtil.capitalize(this.lastname.toLowerCase())
    return `${firstname} ${lastname}`
})
adminSchema.statics.passwordMatches = function(password, hash) {
    return bcrypt.compareSync(password, hash)
}
adminSchema.pre('save', function(next) {
    this.username = this.username.toLowerCase()
    this.firstname = this.firstname.toLowerCase()
    this.lastname = this.lastname.toLowerCase()
    const unsafePassword = this.password
    this.password = bcrypt.hashSync(unsafePassword)
    next()
})

export default mongoose.model('admins', adminSchema)