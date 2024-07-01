import mongoose from 'mongoose';
// import bcrypt from 'bcrypt';

const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        required: false, // Make it optional
    },
}, { timestamps: true });

// // Pre-save hook to hash the password before saving it
// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next();
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

// // Method to compare entered password with the hashed password in the database
// userSchema.methods.matchPassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };

const User = mongoose.model('User', userSchema);

export default User;
