import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import midtransClient from "midtrans-client";

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
});

app.post("/create-transaction", async (req, res) => {
    const { order_id, gross_amount, items } = req.body;

    const parameter = {
        transaction_details: {
            order_id,
            gross_amount,
        },
        item_details: items,
    };

    try {
        const transaction = await snap.createTransaction(parameter);
        res.json({ token: transaction.token });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Gagal membuat transaksi" });
    }
});

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
