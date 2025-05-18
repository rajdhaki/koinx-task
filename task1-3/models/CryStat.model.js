import mongoose from "mongoose";

const cryptoSchema=new mongoose.Schema({
    coin:{
        type:String
    },
    price:{
        type:Number
    },
    marketCap:{
        type:Number
    },
    Change24h:{
        type:Number
    },
    timestamp:{
        type:Date
    }
})

export const Crypto=mongoose.model("Crypto",cryptoSchema)