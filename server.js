import express from 'express';

export const app = express();


app.get('/', (req, res) => {
    res.send(`<h1>Welcome to the Express Server CI & CD DEMO!</h1>
        Go to <a href="/health">/health</a> to check the health of the server.
        `);
})

app.get('/health', (req, res) => {
    res.send('Server is healthy!');
});

if (process.argv[1] === import.meta.filename) {
  app.listen(3000, () => console.log('Server is running on port 3000'));
}
