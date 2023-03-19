import cookieParser from 'cookie-parser';
import express from 'express';

const app = express();
app.use(cookieParser());

app.get('/', (_req, res) => {
    res.status(200).send('testing');
});

app.listen(3000, () => {
    console.log('listening');
});
