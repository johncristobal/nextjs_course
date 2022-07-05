import {  Model, Schema } from "mongoose";
import mongoose from 'mongoose';
import { Entry } from "../interfaces";

export interface IEntry extends Entry{
}

const entrySchema = new Schema({
    description: { type: String, required: true},
    createdAt: { type: Number },
    status : { 
        type: String, 
        enum: {
            values: ['pending', 'inprogress','finished'],
            message: 'Estado no permitido -- {VALUE}'
        },
        default: 'pending'
    },
});

const EntryModel: Model<IEntry> = mongoose.models.Entry || mongoose.model('Entry',entrySchema )

export default EntryModel;
