import express from "express";

const app = express()

app.get("/", (_req, res) => {
    res.status(200).send("testing")
})

app.listen(3000, () => {
    console.log("listening")
})