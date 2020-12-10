import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
    {
        name : {
            type: String,
            required: true
        },
        gender : {
            type: String,
            required: true
        },
        birthDate : {
            type: Date,
            required: true
        },
        interests : [{
            type: String,
            required: true
        }]
    }
)

const User = mongoose.model("User", UserSchema)

export default User