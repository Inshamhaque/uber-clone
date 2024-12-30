import mongoose, { mongo } from "mongoose";

const blackListSchema = new mongoose.Schema({
    token : String
})

export const blackListModel = mongoose.model('blacklisted',blackListSchema);