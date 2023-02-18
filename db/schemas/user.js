const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    birthdate:String,
	lastname: String,
	name: String,
	telephone: {
            type: String,
            required: true,
            unique: true
    },
    dialcode:String,
	username: String,
    email: {
        type: String,
        required: true,
        min: 6,
        max: 1024,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: Number,
	status:{ type: Number, default: 1 }, // 0=desactivada, 1=activa, -1=suspendida, 2=eliminada
    permissions: Object,
    userID:Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)