import dotenv from 'dotenv';
import express from 'express';
import connectDB from './db.js';
import { Crypto } from './models/CryStat.model.js';
import axios from 'axios';


dotenv.config({});

const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

app.use(express.json());

// Task 1
const storeCryptoStats = async () => {
    const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,matic-network&vs_currencies=usd&include_market_cap=true&include_24hr_change=true';
    const { data } = await axios.get(url)
    const res = Object.entries(data).map(([key, value]) => {
        return (
            {
                coin: key,
                price: value.usd,
                marketCap: value.usd_market_cap,
                Change24h: value.usd_24h_change,
                timestamp: new Date
            }
        )
    })
    await Crypto.insertMany(res);
}

// storeCryptoStats();

// Task 2
app.post("/stats", async (req, res) => {
    try {
        const { coin } = req.body;
        const result = await Crypto.findOne({ coin }).sort({ timestamp: -1 });
        if (!result) {
            res.status(404).json({ message: "Not Found data" });
        }
        res.status(200).json({ price: result.price, marketCap: result.marketCap, Change24h: result.Change24h });
    } catch (error) {
        console.log(error);
    }
})


// Task 3
app.post("/deviation", async (req, res) => {
    try {
        const { coin } = req.body;
        if (!coin) {
            return res.status(400).json({ error: "Missing 'coin' query parameter" });
        }
        const records = await Crypto.find({ coin }).sort({ timestamp: -1 }).limit(100);
        if (records.length === 0) {
            return res.status(404).json({ message: `No data found for coin: ${coin}` });
        }
        const prices = records.map((record) => record.price);
        const mean = prices.reduce((acc, price) => acc + price, 0) / prices.length;
        const variance = prices.reduce((acc, price) => acc + Math.pow(price - mean, 2), 0) / prices.length;
        const deviation = Math.sqrt(variance);
        return res.json({
            deviation: parseFloat(deviation.toFixed(2))
        });
    } catch (error) {
        console.log(error);
    }
})

app.listen(PORT, () => {
    console.log(`Server is run on this server : ${PORT}`)
})