import express from 'express';

const app = express();


app.get('/', (req, res) => {
    res.send(`<h1>Welcome to the Express Server CI & CD DEMO!</h1>
        Go to <a href="/health">/health</a> to check the health of the server.
        `);
})

app.get('/health', (req, res) => {
    res.send('Server is healthy!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})