import mongoose from "mongoose";

const performanceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    correctTypedWord: {
        type: Number,
        required: true,
        default: 0
    },
    incorrectTypedWord: {
        type: Number,
        required: true,
        default: 0
    },
    wordPerMinute: {
        type: Number,
        required: true,
    },
    accuracy:{
        type:Number,
        required: true,
        min:0,
        max:100,
        default: 100
    }
}, { timestamps: true })