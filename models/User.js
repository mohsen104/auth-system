import mongoose from "mongoose";

const schema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true,
        pattern: "[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+"
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
}, { timestamps: true })

const model = mongoose.models.users || mongoose.model("user", schema);

export default model;