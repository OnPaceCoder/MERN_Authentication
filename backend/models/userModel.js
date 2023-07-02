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
        unique: true,
        lowercase: true

    },
    password: {
        type: String,
        required: true,

    },
    forgotPasswordToken: {
        type: String
    }
},
    {
        timestamps: true
    })


userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = bcrypt.genSaltSync(15);
    this.password = bcrypt.hashSync(this.password, salt)

})


userSchema.methods.matchPassword = async function (enteredPassword) {


    return bcrypt.compareSync(enteredPassword, this.password)
}



const User = mongoose.model("User", userSchema)
export default User;