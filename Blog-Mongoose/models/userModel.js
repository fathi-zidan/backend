import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: [2, 'too short'],
        maxlength: 50
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: function () {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(this.email);

            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        validate: {
            validator: function () {
                const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
                return passwordRegex.test(this.password);
            }
        }

    },
},{timestamps: true});

const User = mongoose.model('User',userSchema);
export default User;
