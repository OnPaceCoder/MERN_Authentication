import mongoose from "mongoose"
import bcrypt from "bcryptjs"
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true,

    }
},
    {
        timestamps: true
    })


userSchema.pre("save", function (next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = bcrypt.genSaltSync(15);
    this.password = bcrypt.hashSync(this.password, salt)

})


userSchema.methods.matchPassword = function (enteredPassword) {
    return bcrypt.compareSync(enteredPassword, this.password)
}



const User = mongoose.model("User", userSchema)
export default User;